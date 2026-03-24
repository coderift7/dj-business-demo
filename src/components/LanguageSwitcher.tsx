'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { locales, type Locale } from '@/i18n/config';
import { motion } from 'framer-motion';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('languageSwitcher');

  function switchLocale(newLocale: Locale) {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'));
  }

  return (
    <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-sm">
      {locales.map((loc) => (
        <motion.button
          key={loc}
          onClick={() => switchLocale(loc)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`relative rounded-full px-3 py-1 text-xs font-medium transition-colors ${
            locale === loc
              ? 'text-white'
              : 'text-white/50 hover:text-white/80'
          }`}
        >
          {locale === loc && (
            <motion.div
              layoutId="activeLocale"
              className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-purple/30 to-neon-pink/30"
              transition={{ type: 'spring', bounce: 0.3, duration: 0.5 }}
            />
          )}
          <span className="relative z-10">{t(loc)}</span>
        </motion.button>
      ))}
    </div>
  );
}
