'use client';

import Image from 'next/image';
import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { useConsent } from '@/contexts/ConsentContext';
import { trackPwaEvent, type PwaEvent } from '@/lib/trackPwaEvent';

const INSTALLED_KEY = 'ebm_pwa_installed';
const DISMISSED_KEY = 'ebm_pwa_dismissed_at';
const OPENED_AS_APP_KEY = 'ebm_pwa_opened_as_app';
const DISMISS_DAYS = 30;
const RETURNING_DELAY_MS = 3000;
const ANIMATION_MS = 300;

type Platform = 'ios' | 'android';
type Step = 'ask' | 'tutorial';

// No viene en los tipos del DOM: solo existe en navegadores Chromium
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

function readItem(key: string, session = false): string | null {
  try {
    return (session ? sessionStorage : localStorage).getItem(key);
  } catch {
    return null;
  }
}

function writeItem(key: string, value: string, session = false): void {
  try {
    (session ? sessionStorage : localStorage).setItem(key, value);
  } catch {}
}

function detectPlatform(): Platform | null {
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/i.test(ua)) return 'ios';
  // iPadOS 13+ se presenta como Mac de escritorio, pero con pantalla táctil
  if (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1) return 'ios';
  if (/Android/i.test(ua)) return 'android';
  return null;
}

function isStandalone(): boolean {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

function wasDismissedRecently(): boolean {
  const raw = readItem(DISMISSED_KEY);
  if (!raw) return false;
  const dismissedAt = Date.parse(raw);
  if (Number.isNaN(dismissedAt)) return false;
  return Date.now() - dismissedAt < DISMISS_DAYS * 24 * 60 * 60 * 1000;
}

function ShareIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="inline-block h-[1.15em] w-[1.15em] -mt-1 align-middle text-sky-400"
    >
      <path d="M12 3v12" />
      <path d="m8 7 4-4 4 4" />
      <path d="M8 10H6a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1h-2" />
    </svg>
  );
}

const TUTORIAL_STEPS: Record<Platform, ReactNode[]> = {
  ios: [
    <>
      Pulsa el botón Compartir <ShareIcon />. Si no lo ves, toca los tres puntos ··· de abajo.
    </>,
    <>
      Elige «Añadir a pantalla de inicio». Puede que tengas que bajar un poco o pulsar «Ver más».
    </>,
    <>
      Pulsa «Añadir». Ya tienes <span translate="no">El Buey</span> en tu pantalla de inicio.
    </>,
  ],
  android: [
    <>Toca el menú ⋮ del navegador, arriba a la derecha.</>,
    <>Elige «Instalar aplicación» o «Añadir a pantalla de inicio».</>,
    <>Confirma. Si estás dentro de Instagram o WhatsApp, abre antes la web en Chrome.</>,
  ],
};

export default function InstallAppPrompt() {
  const { isLoaded, decided, consent } = useConsent();
  const analyticsAccepted = isLoaded && consent.analisis;
  const [platform, setPlatform] = useState<Platform | null>(null);
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState<Step>('ask');
  const deferredPrompt = useRef<BeforeInstallPromptEvent | null>(null);
  const decidedOnLoad = useRef<boolean | null>(null);
  const hasShown = useRef(false);
  const closeTimer = useRef<number | undefined>(undefined);
  const dialogRef = useRef<HTMLDivElement>(null);
  const analyticsRef = useRef(analyticsAccepted);
  const titleId = useId();

  useEffect(() => {
    analyticsRef.current = analyticsAccepted;
  }, [analyticsAccepted]);

  const track = useCallback(
    (evento: PwaEvent) => {
      if (platform) trackPwaEvent(evento, platform, analyticsRef.current);
    },
    [platform]
  );

  // Abierta como app: una vez por sesión, en cuanto la analítica esté aceptada
  useEffect(() => {
    if (!analyticsAccepted) return;
    const appPlatform = detectPlatform();
    if (!appPlatform || !isStandalone() || readItem(OPENED_AS_APP_KEY, true)) return;
    // <Analytics /> se monta en este mismo render y se inicializa en sus efectos,
    // que van después de los nuestros: esperamos a que terminen para no perder el evento
    const timer = window.setTimeout(() => {
      writeItem(OPENED_AS_APP_KEY, '1', true);
      trackPwaEvent('opened-as-app', appPlatform, true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [analyticsAccepted]);

  // Solo en móvil, fuera de la app instalada y si no lo ha descartado hace poco
  useEffect(() => {
    const detected = detectPlatform();
    if (!detected || isStandalone() || readItem(INSTALLED_KEY) || wasDismissedRecently()) return;
    setPlatform(detected);
  }, []);

  const close = useCallback(() => {
    setVisible(false);
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => {
      setOpen(false);
      setStep('ask');
    }, ANIMATION_MS);
  }, []);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  const markInstalled = useCallback(() => {
    writeItem(INSTALLED_KEY, '1');
    hasShown.current = true;
  }, []);

  const dismiss = useCallback(() => {
    writeItem(DISMISSED_KEY, new Date().toISOString());
    close();
  }, [close]);

  useEffect(() => {
    if (!platform) return;
    const onBeforeInstall = (e: Event) => {
      e.preventDefault();
      deferredPrompt.current = e as BeforeInstallPromptEvent;
    };
    const onInstalled = () => {
      deferredPrompt.current = null;
      markInstalled();
      close();
    };
    window.addEventListener('beforeinstallprompt', onBeforeInstall);
    window.addEventListener('appinstalled', onInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstall);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, [platform, markInstalled, close]);

  // Justo tras decidir las cookies; si ya venían decididas de otra visita, a los 3 s
  useEffect(() => {
    if (!isLoaded) return;
    if (decidedOnLoad.current === null) decidedOnLoad.current = decided;
    if (!platform || !decided || hasShown.current) return;
    const timer = window.setTimeout(
      () => {
        hasShown.current = true;
        setOpen(true);
        track('shown');
      },
      decidedOnLoad.current ? RETURNING_DELAY_MS : 0
    );
    return () => window.clearTimeout(timer);
  }, [isLoaded, decided, platform, track]);

  // Doble rAF para que el navegador pinte la posición inicial antes de animar
  useEffect(() => {
    if (!open) return;
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setVisible(true));
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, [open]);

  useEffect(() => {
    if (visible) dialogRef.current?.focus({ preventScroll: true });
  }, [visible, step]);

  const handleNo = useCallback(() => {
    track('no');
    dismiss();
  }, [track, dismiss]);

  // En la pregunta, salir sin elegir cuenta como "Ahora no"; en el tutorial
  // también aplaza 30 días, pero sin enviar el evento `no`
  const handleOutside = step === 'ask' ? handleNo : dismiss;

  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleOutside();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [visible, handleOutside]);

  const handleInstall = async () => {
    track('yes');
    const promptEvent = deferredPrompt.current;
    if (platform !== 'android' || !promptEvent) {
      setStep('tutorial');
      return;
    }
    // El evento solo se puede usar una vez
    deferredPrompt.current = null;
    try {
      await promptEvent.prompt();
      const { outcome } = await promptEvent.userChoice;
      if (outcome === 'accepted') {
        markInstalled();
        close();
      } else {
        track('cancelled');
        dismiss();
      }
    } catch {
      setStep('tutorial');
    }
  };

  if (!open || !platform) return null;

  const isTutorial = step === 'tutorial';

  return (
    <div className={`fixed inset-0 z-[1100] ${visible ? '' : 'pointer-events-none'}`}>
      <div
        aria-hidden="true"
        onClick={handleOutside}
        className={`
          absolute inset-0 bg-black/60
          transition-opacity duration-300 motion-reduce:transition-none
          ${visible ? 'opacity-100' : 'opacity-0'}
        `}
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        style={{ paddingBottom: 'calc(24px + env(safe-area-inset-bottom))' }}
        className={`
          absolute inset-x-4 bottom-0 mx-auto max-w-sm
          bg-[#160a00] border border-b-0 border-amber-500/30 rounded-t-3xl
          p-6 outline-none
          transition-transform duration-300 ease-out motion-reduce:transition-none
          ${visible ? 'translate-y-0' : 'translate-y-full'}
        `}
      >
        <div className="flex items-center gap-4">
          <Image
            src="/icon-192.png"
            alt=""
            width={48}
            height={48}
            className="h-12 w-12 shrink-0 rounded-xl bg-black"
          />
          <h2 id={titleId} className="text-xl font-bold leading-tight text-white">
            {isTutorial ? 'Instálala en 3 pasos' : '¿Quieres descargar nuestra app?'}
          </h2>
        </div>

        {isTutorial ? (
          <>
            <ol className="mt-5 space-y-4">
              {TUTORIAL_STEPS[platform].map((content, i) => (
                <li key={i} className="flex gap-3 text-sm leading-6 text-gray-300">
                  <span
                    aria-hidden="true"
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-400 text-xs font-bold text-black"
                  >
                    {i + 1}
                  </span>
                  <span>{content}</span>
                </li>
              ))}
            </ol>

            <button
              type="button"
              onClick={dismiss}
              className="
                mt-6 h-12 w-full rounded-full
                bg-amber-400 text-base font-bold text-black
                hover:bg-amber-300 transition-colors duration-200
                focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#160a00]
              "
            >
              Entendido
            </button>
          </>
        ) : (
          <>
            <p className="mt-4 text-sm leading-6 text-gray-300">
              Ten la carta y las reservas de <span translate="no">El Buey Madurado</span> a un
              toque, desde tu pantalla de inicio.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={handleNo}
                className="
                  h-12 flex-1 rounded-full
                  border border-white/25 text-base font-semibold text-gray-300
                  hover:border-white/50 hover:text-white transition-colors duration-200
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#160a00]
                "
              >
                Ahora no
              </button>
              <button
                type="button"
                onClick={handleInstall}
                className="
                  h-12 flex-1 rounded-full
                  bg-amber-400 text-base font-bold text-black
                  hover:bg-amber-300 transition-colors duration-200
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#160a00]
                "
              >
                Sí, descargar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
