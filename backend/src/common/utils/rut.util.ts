// Normalize ruts with different formats
export function normalizeRut(rut: string): string {
  return rut.replace(/\./g, '').replace(/-/g, '').toUpperCase();
}

// Calculate check digit using modulo 11 (SII)
export function calculateCheckDigit(rutBody: string): string {
  let sum = 0;
  let multiplier = 2;

  for (let i = rutBody.length - 1; i >= 0; i--) {
    sum += Number(rutBody[i]) * multiplier;

    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }

  const result = 11 - (sum % 11);

  if (result === 11) return '0';
  if (result === 10) return 'K';

  return result.toString();
}

// Normalize and validate rut
export function isValidRut(rut: string): boolean {
  const normalizedRut = normalizeRut(rut);

  if (!/^\d{1,8}[0-9K]$/.test(normalizedRut)) {
    return false;
  }

  const rutBody = normalizedRut.slice(0, -1);
  const providedCheckDigit = normalizedRut.slice(-1);

  return calculateCheckDigit(rutBody) === providedCheckDigit;
}

// Format rut for api responses
export function formatRut(rut: string): string {
  const normalizedRut = normalizeRut(rut);

  const rutBody = normalizedRut.slice(0, -1);
  const checkDigit = normalizedRut.slice(-1);

  const formattedBody = Number(rutBody).toLocaleString('es-CL');

  return `${formattedBody}-${checkDigit}`;
}
