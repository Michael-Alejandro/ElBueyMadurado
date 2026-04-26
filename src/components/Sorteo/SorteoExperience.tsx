'use client';

import Image from 'next/image';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import Button from '@/components/ui/Button';

type FormState = {
  nombre: string;
  email: string;
  aceptaCondi: boolean;
  aceptaPubli: boolean;
};

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';
type FieldErrors = Partial<Record<keyof FormState, string>>;

const initialFormState: FormState = {
  nombre: '',
  email: '',
  aceptaCondi: false,
  aceptaPubli: false,
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const participationStorageKey = 'participacion_sorteo';

const inputBaseClasses =
  'w-full rounded-lg border bg-black/45 px-4 py-3 text-white placeholder:text-white/40 transition focus:outline-none';
const checkboxClasses =
  'mt-1 h-5 w-5 shrink-0 rounded border-white/20 accent-amber-500';

const benefitCards = [
  {
    title: 'Participación rápida',
    text: 'Completa tus datos y quedarás inscrito al instante.',
  },
  {
    title: 'Resultado transparente',
    text: 'Elegiremos al ganador entre participaciones válidas.',
  },
] as const;

const legalPoints = [
  'Premio: comida o cena para 2 personas valorada en 150€',
  'Participación gratuita',
  'Una participación por persona',
  'Participaciones duplicadas o fraudulentas serán eliminadas',
  'El ganador será contactado por email',
] as const;

function validateForm(form: FormState): FieldErrors {
  const errors: FieldErrors = {};

  if (!form.nombre.trim()) {
    errors.nombre = 'Indica tu nombre y apellidos para completar tu inscripción.';
  }

  if (!form.email.trim()) {
    errors.email = 'Introduce un correo electrónico válido.';
  } else if (!emailRegex.test(form.email.trim())) {
    errors.email = 'Introduce un correo electrónico válido.';
  }

  if (!form.aceptaCondi) {
    errors.aceptaCondi =
      'Acepta las bases legales y condiciones del sorteo para validar tu participación.';
  }

  return errors;
}

export default function SorteoExperience() {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [hasParticipated, setHasParticipated] = useState(false);
  const [hasCheckedParticipation, setHasCheckedParticipation] = useState(false);
  const [showNewsletterPrompt, setShowNewsletterPrompt] = useState(false);

  useEffect(() => {
    try {
      setHasParticipated(
        localStorage.getItem(participationStorageKey) === 'true'
      );
    } catch {
      setHasParticipated(false);
    } finally {
      setHasCheckedParticipation(true);
    }
  }, []);

  const isSubmitting = submitState === 'submitting';

  const helperCopy = useMemo(() => {
    if (submitState === 'success') {
      return feedbackMessage;
    }

    if (submitState === 'error') {
      return feedbackMessage;
    }

    return '📌 Solo utilizaremos tus datos para gestionar tu participación y, si lo autorizas, enviarte descuentos.';
  }, [feedbackMessage, submitState]);

  const updateField = <K extends keyof FormState>(
    key: K,
    value: FormState[K]
  ) => {
    setForm((current) => ({ ...current, [key]: value }));

    if (submitState !== 'submitting') {
      setSubmitState('idle');
      setFeedbackMessage('');
    }

    setFieldErrors((current) => {
      if (!current[key]) {
        return current;
      }

      const next = { ...current };
      delete next[key];
      return next;
    });
  };

  const submitParticipation = async (formToSubmit: FormState) => {
    const errors = validateForm(formToSubmit);

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setSubmitState('error');
      setFeedbackMessage(
        'Revisa los campos marcados para completar tu inscripción.'
      );
      return;
    }

    setFieldErrors({});
    setSubmitState('submitting');
    setFeedbackMessage('');

    try {
      const response = await fetch('/api/sorteo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formToSubmit),
      });

      const data = (await response.json().catch(() => null)) as
        | { error?: string; message?: string }
        | null;

      if (!response.ok) {
        throw new Error(
          data?.error ??
            'No hemos podido registrar tu participación. Inténtalo de nuevo en unos segundos.'
        );
      }

      setSubmitState('success');
      setFeedbackMessage('Ya estás dentro del sorteo. Mucha suerte 🍀');
      try {
        localStorage.setItem(participationStorageKey, 'true');
      } catch {
        // El registro ya está guardado en servidor aunque el navegador bloquee localStorage.
      }
      setHasParticipated(true);
      setForm(initialFormState);
    } catch (error) {
      setSubmitState('error');
      setFeedbackMessage(
        error instanceof Error
          ? error.message
          : 'No hemos podido completar el envío ahora mismo.'
      );
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedForm = {
      ...form,
      nombre: form.nombre.trim(),
      email: form.email.trim(),
    };

    if (Object.keys(validateForm(trimmedForm)).length > 0) {
      await submitParticipation(trimmedForm);
      return;
    }

    if (!trimmedForm.aceptaPubli) {
      setShowNewsletterPrompt(true);
      return;
    }

    await submitParticipation(trimmedForm);
  };

  const handleNewsletterAccept = async () => {
    const formToSubmit = {
      ...form,
      nombre: form.nombre.trim(),
      email: form.email.trim(),
      aceptaPubli: true,
    };

    setShowNewsletterPrompt(false);
    setForm((current) => ({ ...current, aceptaPubli: true }));
    await submitParticipation(formToSubmit);
  };

  const handleNewsletterDecline = async () => {
    const formToSubmit = {
      ...form,
      nombre: form.nombre.trim(),
      email: form.email.trim(),
      aceptaPubli: false,
    };

    setShowNewsletterPrompt(false);
    await submitParticipation(formToSubmit);
  };

  const participatedTitle =
    submitState === 'success'
      ? '¡Participación confirmada!'
      : 'Participación ya registrada';

  const participatedCopy =
    submitState === 'success'
      ? 'Ya estás dentro del sorteo. Mucha suerte 🍀'
      : 'Ya existe una participación guardada desde este navegador. Solo se permite una inscripción por participante.';

  return (
    <section className="relative isolate overflow-hidden bg-[#080502]">
      <Image
        src="/assets/images/carne3.jpeg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 -z-20 object-cover object-[center_70%] opacity-40"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,_rgba(5,3,1,0.96)_0%,_rgba(5,3,1,0.83)_48%,_rgba(5,3,1,0.58)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/70 to-transparent" />

      <div className="relative mx-auto grid w-full max-w-6xl gap-8 px-5 pb-20 pt-10 md:px-6 md:pb-24 md:pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div className="space-y-7">
          <div className="space-y-5">
            <span className="inline-flex items-center rounded-full border border-amber-400/40 bg-black/35 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-amber-200 backdrop-blur">
              Sorteo Exclusivo · El Buey Madurado
            </span>

            <div className="space-y-4">
              <p className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm font-semibold text-white/90 backdrop-blur">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5 text-pink-400"
                >
                  <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5A3.5 3.5 0 1 0 12 15.5 3.5 3.5 0 0 0 12 8.5Zm5.25-2.38a1.13 1.13 0 1 1 0 2.25 1.13 1.13 0 0 1 0-2.25Z" />
                </svg>

                Sorteo activo hasta llegar a 5000 seguidores
              </p>

              <h1 className="max-w-4xl text-4xl font-black leading-tight text-white md:text-6xl">
                Gana una comida valorada en 150€
              </h1>

              <p className="max-w-2xl text-base leading-7 text-white/78 md:text-lg">
                Participa gratis en menos de 1 minuto y entra en el sorteo de
                una experiencia gastronómica para disfrutar con quien tú
                quieras.
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {benefitCards.map((card) => (
              <article
                key={card.title}
                className="rounded-lg border border-white/10 bg-black/38 p-4 backdrop-blur"
              >
                <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-amber-200">
                  {card.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/75">
                  {card.text}
                </p>
              </article>
            ))}
          </div>

          <div className="rounded-lg border border-amber-300/35 bg-amber-400/12 p-6 backdrop-blur">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-200">
              🎁 Premio del sorteo
            </p>
            <p className="mt-3 text-xl font-bold leading-8 text-white md:text-2xl">
              Una comida o cena para 2 personas, valorada en 150€, para
              disfrutar en El Buey Madurado.
            </p>
            <p className="mt-4 text-sm leading-6 text-white/70">
              El sorteo se realizará cuando alcancemos los 5000 seguidores en
              Instagram.
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-white/12 bg-[#120900]/92 p-5 shadow-[0_30px_80px_rgba(0,0,0,0.42)] backdrop-blur md:p-7">
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
                Apúntate gratis
              </p>
              <h2 className="text-2xl font-bold text-white md:text-3xl">
                Participa ahora
              </h2>
              <p className="text-sm leading-6 text-white/65">
                Déjanos tu nombre completo y correo electrónico para registrar
                tu participación.
              </p>
            </div>

            {!hasCheckedParticipation ? (
              <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-sm leading-6 text-white/60">
                Comprobando participación...
              </div>
            ) : hasParticipated ? (
              <div
                aria-live="polite"
                className="rounded-lg border border-emerald-400/40 bg-emerald-500/10 p-6 text-emerald-50"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-200">
                  {participatedTitle}
                </p>
                <p className="mt-3 text-base leading-7">{participatedCopy}</p>
              </div>
            ) : (
              <form className="space-y-5" onSubmit={handleSubmit} noValidate>
                <div className="space-y-2">
                  <label
                    htmlFor="sorteo-nombre"
                    className="text-sm font-semibold text-white/90"
                  >
                    Nombre y apellidos *
                  </label>
                  <input
                    id="sorteo-nombre"
                    name="nombre"
                    type="text"
                    autoComplete="name"
                    value={form.nombre}
                    onChange={(event) =>
                      updateField('nombre', event.target.value)
                    }
                    className={`${inputBaseClasses} ${
                      fieldErrors.nombre
                        ? 'border-red-400/70 focus:border-red-300'
                        : 'border-white/10 focus:border-amber-400'
                    }`}
                    placeholder="Ejemplo: Juan Pérez García"
                    disabled={isSubmitting}
                    aria-invalid={Boolean(fieldErrors.nombre)}
                    aria-describedby={
                      fieldErrors.nombre ? 'sorteo-nombre-error' : undefined
                    }
                  />
                  {fieldErrors.nombre && (
                    <p
                      id="sorteo-nombre-error"
                      className="text-sm text-red-200"
                    >
                      {fieldErrors.nombre}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="sorteo-email"
                    className="text-sm font-semibold text-white/90"
                  >
                    Correo electrónico *
                  </label>
                  <input
                    id="sorteo-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(event) =>
                      updateField('email', event.target.value)
                    }
                    className={`${inputBaseClasses} ${
                      fieldErrors.email
                        ? 'border-red-400/70 focus:border-red-300'
                        : 'border-white/10 focus:border-amber-400'
                    }`}
                    placeholder="Ejemplo: juan@email.com"
                    disabled={isSubmitting}
                    aria-invalid={Boolean(fieldErrors.email)}
                    aria-describedby={
                      fieldErrors.email ? 'sorteo-email-error' : undefined
                    }
                  />
                  {fieldErrors.email && (
                    <p id="sorteo-email-error" className="text-sm text-red-200">
                      {fieldErrors.email}
                    </p>
                  )}
                </div>

                <div className="space-y-4 rounded-lg border border-white/10 bg-black/22 p-5">
                  <label className="flex items-start gap-3">
                    <input
                      name="aceptaCondi"
                      type="checkbox"
                      checked={form.aceptaCondi}
                      onChange={(event) =>
                        updateField('aceptaCondi', event.target.checked)
                      }
                      className={checkboxClasses}
                      disabled={isSubmitting}
                      aria-invalid={Boolean(fieldErrors.aceptaCondi)}
                    />

                    <span className="space-y-1">
                      <span className="block text-sm font-semibold text-white/90">
                        Acepto las bases legales y condiciones del sorteo *
                      </span>
                      <span className="block text-sm leading-6 text-white/60">
                        Necesitamos esta aceptación para validar tu
                        participación.
                      </span>
                    </span>
                  </label>

                  {fieldErrors.aceptaCondi && (
                    <p className="text-sm text-red-200">
                      {fieldErrors.aceptaCondi}
                    </p>
                  )}

                  <label className="flex items-start gap-3">
                    <input
                      name="aceptaPubli"
                      type="checkbox"
                      checked={form.aceptaPubli}
                      onChange={(event) =>
                        updateField('aceptaPubli', event.target.checked)
                      }
                      className={checkboxClasses}
                      disabled={isSubmitting}
                    />

                    <span className="space-y-1">
                      <span className="block text-sm font-semibold text-white/90">
                        Suscribirme a la newsletter
                      </span>
                      <span className="block text-sm leading-6 text-white/60">
                        Recibirás descuentos especiales, ofertas para suscriptores y ventajas que no publicamos en otros canales.
                      </span>
                    </span>
                  </label>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full justify-center py-3 text-base disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting
                    ? 'Registrando tu participación...'
                    : 'Participar ahora'}
                </Button>

                <div
                  aria-live="polite"
                  className={`rounded-lg border px-4 py-3 text-sm leading-6 ${
                    submitState === 'success'
                      ? 'border-emerald-400/40 bg-emerald-500/10 text-emerald-100'
                      : submitState === 'error'
                        ? 'border-red-400/30 bg-red-500/10 text-red-100'
                        : 'border-white/10 bg-white/5 text-white/65'
                  }`}
                >
                  {helperCopy}
                </div>

                <div
                  id="bases-sorteo"
                  className="rounded-lg border border-white/10 bg-white/[0.04] p-4 text-sm leading-6 text-white/68"
                >
                  <p className="font-semibold text-white/90">Bases resumidas</p>
                  <ul className="mt-3 space-y-1">
                    {legalPoints.map((point) => (
                      <li key={point}>• {point}</li>
                    ))}
                  </ul>

                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {showNewsletterPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/72 px-5 py-8 backdrop-blur-sm">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="newsletter-prompt-title"
            className="w-full max-w-lg rounded-lg border border-amber-300/35 bg-[#120900] p-6 text-white shadow-[0_28px_90px_rgba(0,0,0,0.58)] md:p-7"
          >
            <p
              id="newsletter-prompt-title"
              className="text-2xl font-bold leading-8 text-white"
            >
              Seguro que quieres dejar pasar nuestras mejores ofertas?
            </p>
            <p className="mt-4 text-sm leading-6 text-white/72 md:text-base md:leading-7">
              Suscríbete a nuestra newsletter y sé el primero en recibir
              descuentos exclusivos, novedades y promociones especiales
              directamente en tu correo.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={handleNewsletterAccept}
                disabled={isSubmitting}
                className="justify-center px-4 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-70"
              >
                Sí, unirme ahora
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="md"
                onClick={handleNewsletterDecline}
                disabled={isSubmitting}
                className="justify-center px-4 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-70"
              >
                No, continuar sin beneficios
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
