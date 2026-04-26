import { NextResponse } from 'next/server';

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwsLdZBu6Xp-zi4m6otwBEFGodsX4MHnQPESkhRayBH4KUv-BCA8onQXaH6G8Y30rZc/exec';
type SorteoPayload = {
  nombre?: string;
  email?: string;
  aceptaCondi?: boolean;
  aceptaPubli?: boolean;
};

type AppsScriptResponse = {
  result?: 'success' | 'duplicate' | 'error' | string;
  error?: string;
  message?: string;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeText(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function getClientIp(request: Request) {
  const forwardedFor = normalizeText(request.headers.get('x-forwarded-for'));

  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim() || 'unknown';
  }

  return (
    normalizeText(request.headers.get('cf-connecting-ip')) ||
    normalizeText(request.headers.get('x-real-ip')) ||
    normalizeText(request.headers.get('x-client-ip')) ||
    'unknown'
  );
}

function formatRegistrationDate(date: Date) {
  return new Intl.DateTimeFormat('es-ES', {
    timeZone: 'Europe/Madrid',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  })
    .format(date)
    .replace(',', '');
}

function getAppsScriptErrorMessage(upstreamData: AppsScriptResponse | null) {
  const upstreamError = normalizeText(upstreamData?.error);

  if (
    upstreamError.includes("Cannot read properties of null") &&
    upstreamError.includes('getLastRow')
  ) {
    return 'El Apps Script no encuentra la hoja "Sorteo". Revisa que la pestana se llame exactamente asi.';
  }

  return (
    upstreamError ||
    normalizeText(upstreamData?.message) ||
    'El servicio del sorteo no ha aceptado la participacion.'
  );
}

export async function POST(request: Request) {
  let payload: SorteoPayload;

  try {
    payload = (await request.json()) as SorteoPayload;
  } catch {
    return NextResponse.json(
      { error: 'No se ha podido leer el formulario enviado.' },
      { status: 400 }
    );
  }

  const nombre = normalizeText(payload.nombre);
  const email = normalizeText(payload.email).toLowerCase();
  const aceptaCondi = Boolean(payload.aceptaCondi);
  const aceptaPubli = Boolean(payload.aceptaPubli);
  const fecha = formatRegistrationDate(new Date());
  const ip = getClientIp(request);

  if (!nombre) {
    return NextResponse.json(
      { error: 'Indica tu nombre y apellidos para completar tu inscripción.' },
      { status: 400 }
    );
  }

  if (!email || !emailRegex.test(email)) {
    return NextResponse.json(
      { error: 'Introduce un correo electrónico válido.' },
      { status: 400 }
    );
  }

  if (!aceptaCondi) {
    return NextResponse.json(
      {
        error:
          'Acepta las bases legales y condiciones del sorteo para validar tu participación.',
      },
      { status: 400 }
    );
  }

  try {
    const upstreamResponse = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombre,
        email,
        acepta_condi: aceptaCondi ? 'SI' : 'NO',
        acepta_publi: aceptaPubli ? 'SI' : 'NO',
        fecha,
        ip,
      }),
      cache: 'no-store',
      redirect: 'follow',
    });

    const upstreamBody = await upstreamResponse.text();
    console.log(upstreamBody);

    let upstreamData: AppsScriptResponse | null = null;

    if (upstreamBody) {
      try {
        upstreamData = JSON.parse(upstreamBody) as AppsScriptResponse;
      } catch {
        upstreamData = null;
      }
    }

    if (upstreamData?.result === 'duplicate') {
      return NextResponse.json(
        {
          error:
            normalizeText(upstreamData.error) ||
            'Ya existe una participación asociada a esta persona. Solo se permite una inscripción por participante.',
        },
        { status: 409 }
      );
    }

    if (!upstreamResponse.ok || upstreamData?.result === 'error') {
      return NextResponse.json(
        {
          error: getAppsScriptErrorMessage(upstreamData),
        },
        { status: 502 }
      );
    }

    if (upstreamData?.result !== 'success') {
      return NextResponse.json(
        {
          error:
            'El Apps Script ha respondido con un formato inesperado. Revisa la deployment activa publicada.',
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      ok: true,
      message:
        normalizeText(upstreamData.message) ||
        '¡Participación confirmada! Ya estás dentro del sorteo. Mucha suerte 🍀',
    });
  } catch {
    return NextResponse.json(
      {
        error:
          'No hemos podido conectar con el servicio del sorteo. Intentalo de nuevo en unos segundos.',
      },
      { status: 502 }
    );
  }
}
