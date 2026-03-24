export const locales = ['de', 'fa', 'en'] as const;
export const defaultLocale = 'de' as const;

export type Locale = (typeof locales)[number];

export const rtlLocales: Locale[] = ['fa'];

export function isRtl(locale: Locale): boolean {
  return rtlLocales.includes(locale);
}

export const localeNames: Record<Locale, string> = {
  de: 'Deutsch',
  fa: 'فارسی',
  en: 'English',
};
