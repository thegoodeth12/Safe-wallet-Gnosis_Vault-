// src/utils/safeAppValidator.ts

export const OFFICIAL_SAFE_APPS = [
  'https://apps.safe.global',
  'https://app.safe.global',
  'https://multisig.app',
];

export function isOfficialSafeAppUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return OFFICIAL_SAFE_APPS.some((officialUrl) => url.startsWith(officialUrl));
  } catch {
    return false;
  }
}
