'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';
import LanguageSwitcher from '@/components/LanguageSwitcher';

/* ============================================================
   Animations
   ============================================================ */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

/* ============================================================
   Service Card Icons (inline SVGs)
   ============================================================ */
const icons = {
  wedding: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  birthday: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
      <path d="M12 2v4m0 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM4 14h16v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6zm0 0L6 10h12l2 4" />
    </svg>
  ),
  club: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
      <path d="M9 18V5l12-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm12-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
    </svg>
  ),
  corporate: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
      <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16m14 0H5m14 0h2m-16 0H3m5-12h.01M8 13h.01M12 9h.01M12 13h.01M16 9h.01M16 13h.01" />
    </svg>
  ),
};

const serviceKeys = ['wedding', 'birthday', 'club', 'corporate'] as const;

/* EQ Bars for music genre cards */
const eqBarColors = {
  purple: 'bg-neon-purple/40',
  pink: 'bg-neon-pink/40',
  cyan: 'bg-neon-cyan/40',
} as const;

function EqBars({ color }: { color: keyof typeof eqBarColors }) {
  return (
    <div className="flex items-end justify-center gap-1 mt-6 h-8">
      {[0.8, 1.1, 0.7, 1.3, 0.9, 1.0, 0.85].map((speed, j) => (
        <motion.div
          key={j}
          animate={{ height: ['30%', '80%', '30%'] }}
          transition={{ repeat: Infinity, duration: speed, delay: j * 0.1, ease: 'easeInOut' }}
          className={`w-1 rounded-full ${eqBarColors[color]}`}
          style={{ minHeight: '4px' }}
        />
      ))}
    </div>
  );
}

/* ============================================================
   Main Page
   ============================================================ */
export default function HomePage() {
  const t = useTranslations();
  const locale = useLocale();

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  const [formSent, setFormSent] = useState(false);

  const navItems = ['about', 'services', 'music', 'contact'] as const;

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'DJ Murti',
            description: t('meta.description'),
            url: 'https://djmurti.de',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Limburg an der Lahn',
              addressCountry: 'DE',
            },
            priceRange: '$$',
            knowsLanguage: ['de', 'fa', 'en'],
            additionalType: 'https://schema.org/EntertainmentBusiness',
          }),
        }}
      />

      {/* ======== NAVIGATION ======== */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-xl bg-black/40 border-b border-white/5"
      >
        <a href="#hero" className="flex-shrink-0">
          <Image
            src="/logo.jpeg"
            alt="DJ Murti"
            width={120}
            height={40}
            className="h-8 w-auto object-contain"
            priority
          />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className="text-sm text-white/60 hover:text-white transition-colors duration-300 uppercase tracking-widest"
            >
              {t(`nav.${item}`)}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-neon-purple to-neon-pink px-5 py-2 text-sm font-semibold text-white transition-all hover:shadow-[0_0_25px_rgba(139,92,246,0.4)] hover:scale-105"
          >
            {t('nav.bookNow')}
          </a>
        </div>
      </motion.nav>

      <main>
        {/* ======== HERO ======== */}
        <motion.section
          ref={heroRef}
          id="hero"
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
        >
          {/* Ambient orbs */}
          <div className="ambient-orb top-1/4 -left-32 h-96 w-96 bg-neon-purple/20" style={{ animationDelay: '0s' }} />
          <div className="ambient-orb bottom-1/4 -right-32 h-80 w-80 bg-neon-pink/20" style={{ animationDelay: '1.5s' }} />
          <div className="ambient-orb top-1/2 left-1/2 -translate-x-1/2 h-64 w-64 bg-neon-cyan/10" style={{ animationDelay: '0.8s' }} />

          {/* Grid lines */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'linear-gradient(rgba(139,92,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }} />

          <div className="relative z-10 text-center max-w-5xl">
            {/* Floating Logo */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="mb-8"
            >
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="inline-block"
              >
                <Image
                  src="/logo.jpeg"
                  alt="DJ Murti"
                  width={400}
                  height={400}
                  className="w-48 sm:w-64 md:w-80 h-auto mx-auto rounded-2xl"
                  style={{ filter: 'drop-shadow(0 0 30px rgba(139,92,246,0.4)) drop-shadow(0 0 60px rgba(236,72,153,0.2))' }}
                  priority
                />
              </motion.div>
            </motion.div>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="mb-4 text-sm uppercase tracking-[0.3em] text-neon-cyan glow-cyan"
            >
              {t('hero.tagline')}
            </motion.p>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="font-[family-name:var(--font-bebas-neue)] text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] leading-[0.85] tracking-wide"
            >
              <span className="bg-gradient-to-r from-neon-purple via-neon-pink to-neon-cyan bg-clip-text text-transparent">
                {t('hero.headline')}
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
              className="mt-6 text-lg text-white/60 max-w-2xl mx-auto"
            >
              {t('hero.subline')}
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={4}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <a
                href="#contact"
                className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-neon-purple to-neon-pink px-8 py-4 text-lg font-semibold text-white transition-all hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] hover:scale-105"
              >
                <span>{t('hero.cta')}</span>
                <svg className="h-5 w-5 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="#music"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 text-lg font-medium text-white/80 transition-all hover:border-neon-cyan/50 hover:text-white hover:shadow-[0_0_25px_rgba(6,182,212,0.2)]"
              >
                <span>{t('hero.ctaSecondary')}</span>
              </a>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <div className="h-10 w-6 rounded-full border-2 border-white/20 flex justify-center pt-2">
              <div className="h-2 w-1 rounded-full bg-neon-purple" />
            </div>
          </motion.div>
        </motion.section>

        {/* ======== ABOUT ======== */}
        <section id="about" className="relative py-32 px-6">
          <div className="mx-auto max-w-5xl">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="grid md:grid-cols-2 gap-16 items-center"
            >
              {/* Left: Text */}
              <div>
                <h2 className="font-[family-name:var(--font-bebas-neue)] text-5xl sm:text-6xl md:text-7xl tracking-wide text-white mb-6">
                  {t('about.title')}
                </h2>
                <p className="text-lg text-white/60 leading-relaxed">
                  {t('about.text')}
                </p>
              </div>

              {/* Right: Stats */}
              <div className="grid grid-cols-3 gap-4">
                <motion.div variants={scaleIn} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} className="rounded-2xl bg-card border border-white/5 p-6 text-center box-glow-purple">
                  <div className="font-[family-name:var(--font-bebas-neue)] text-4xl sm:text-5xl text-neon-purple glow-purple">3+</div>
                  <div className="mt-2 text-xs uppercase tracking-widest text-white/40">{t('about.experience')}</div>
                </motion.div>
                <motion.div variants={scaleIn} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} className="rounded-2xl bg-card border border-white/5 p-6 text-center box-glow-pink">
                  <div className="font-[family-name:var(--font-bebas-neue)] text-4xl sm:text-5xl text-neon-pink glow-pink">50+</div>
                  <div className="mt-2 text-xs uppercase tracking-widest text-white/40">{t('about.events')}</div>
                </motion.div>
                <motion.div variants={scaleIn} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2} className="rounded-2xl bg-card border border-white/5 p-6 text-center box-glow-cyan">
                  <div className="font-[family-name:var(--font-bebas-neue)] text-4xl sm:text-5xl text-neon-cyan glow-cyan">3</div>
                  <div className="mt-2 text-xs uppercase tracking-widest text-white/40">{t('about.languages')}</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ======== SERVICES ======== */}
        <section id="services" className="relative py-32 px-6">
          {/* Background accent */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-purple/[0.02] to-transparent" />

          <div className="relative mx-auto max-w-6xl">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="text-center mb-16"
            >
              <h2 className="font-[family-name:var(--font-bebas-neue)] text-5xl sm:text-7xl md:text-8xl tracking-wide bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                {t('services.title')}
              </h2>
              <p className="mt-4 text-lg text-white/50">
                {t('services.subtitle')}
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-6">
              {/* Wedding */}
              <motion.div variants={scaleIn} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} whileHover={{ y: -4, transition: { duration: 0.3 } }} className="group relative rounded-2xl bg-card border border-white/5 p-8 transition-colors hover:bg-card-hover gradient-border overflow-hidden">
                <div className="absolute top-0 end-0 h-32 w-32 bg-neon-purple/5 blur-3xl transition-opacity group-hover:opacity-100 opacity-0" />
                <div className="inline-flex rounded-xl bg-neon-purple/10 p-3 text-neon-purple mb-4">{icons.wedding}</div>
                <h3 className="font-[family-name:var(--font-bebas-neue)] text-2xl tracking-wider text-white mb-2">{t('services.wedding.title')}</h3>
                <p className="text-white/50 leading-relaxed">{t('services.wedding.description')}</p>
              </motion.div>
              {/* Birthday */}
              <motion.div variants={scaleIn} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} whileHover={{ y: -4, transition: { duration: 0.3 } }} className="group relative rounded-2xl bg-card border border-white/5 p-8 transition-colors hover:bg-card-hover gradient-border overflow-hidden">
                <div className="absolute top-0 end-0 h-32 w-32 bg-neon-pink/5 blur-3xl transition-opacity group-hover:opacity-100 opacity-0" />
                <div className="inline-flex rounded-xl bg-neon-pink/10 p-3 text-neon-pink mb-4">{icons.birthday}</div>
                <h3 className="font-[family-name:var(--font-bebas-neue)] text-2xl tracking-wider text-white mb-2">{t('services.birthday.title')}</h3>
                <p className="text-white/50 leading-relaxed">{t('services.birthday.description')}</p>
              </motion.div>
              {/* Club */}
              <motion.div variants={scaleIn} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2} whileHover={{ y: -4, transition: { duration: 0.3 } }} className="group relative rounded-2xl bg-card border border-white/5 p-8 transition-colors hover:bg-card-hover gradient-border overflow-hidden">
                <div className="absolute top-0 end-0 h-32 w-32 bg-neon-cyan/5 blur-3xl transition-opacity group-hover:opacity-100 opacity-0" />
                <div className="inline-flex rounded-xl bg-neon-cyan/10 p-3 text-neon-cyan mb-4">{icons.club}</div>
                <h3 className="font-[family-name:var(--font-bebas-neue)] text-2xl tracking-wider text-white mb-2">{t('services.club.title')}</h3>
                <p className="text-white/50 leading-relaxed">{t('services.club.description')}</p>
              </motion.div>
              {/* Corporate */}
              <motion.div variants={scaleIn} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={3} whileHover={{ y: -4, transition: { duration: 0.3 } }} className="group relative rounded-2xl bg-card border border-white/5 p-8 transition-colors hover:bg-card-hover gradient-border overflow-hidden">
                <div className="absolute top-0 end-0 h-32 w-32 bg-neon-purple/5 blur-3xl transition-opacity group-hover:opacity-100 opacity-0" />
                <div className="inline-flex rounded-xl bg-neon-purple/10 p-3 text-neon-purple mb-4">{icons.corporate}</div>
                <h3 className="font-[family-name:var(--font-bebas-neue)] text-2xl tracking-wider text-white mb-2">{t('services.corporate.title')}</h3>
                <p className="text-white/50 leading-relaxed">{t('services.corporate.description')}</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ======== MUSIC / GENRES ======== */}
        <section id="music" className="relative py-32 px-6 overflow-hidden">
          <div className="mx-auto max-w-5xl">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="text-center mb-16"
            >
              <h2 className="font-[family-name:var(--font-bebas-neue)] text-5xl sm:text-7xl md:text-8xl tracking-wide text-white">
                {t('music.title')}
              </h2>
              <p className="mt-4 text-xl text-white/50">
                {t('music.subtitle')}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Persian */}
              <motion.div variants={scaleIn} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} whileHover={{ scale: 1.03, transition: { duration: 0.3 } }} className="relative rounded-3xl bg-card border border-white/5 p-8 text-center box-glow-purple cursor-default">
                <div className="text-5xl mb-4">🎵</div>
                <h3 className="font-[family-name:var(--font-bebas-neue)] text-3xl tracking-wider text-neon-purple mb-2">{t('music.persian')}</h3>
                <p className="text-sm text-white/40">Sasy • Arash • Shadmehr</p>
                <EqBars color="purple" />
              </motion.div>
              {/* German */}
              <motion.div variants={scaleIn} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} whileHover={{ scale: 1.03, transition: { duration: 0.3 } }} className="relative rounded-3xl bg-card border border-white/5 p-8 text-center box-glow-pink cursor-default">
                <div className="text-5xl mb-4">🎶</div>
                <h3 className="font-[family-name:var(--font-bebas-neue)] text-3xl tracking-wider text-neon-pink mb-2">{t('music.german')}</h3>
                <p className="text-sm text-white/40">Schlager • 90er • Charts</p>
                <EqBars color="pink" />
              </motion.div>
              {/* International */}
              <motion.div variants={scaleIn} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2} whileHover={{ scale: 1.03, transition: { duration: 0.3 } }} className="relative rounded-3xl bg-card border border-white/5 p-8 text-center box-glow-cyan cursor-default">
                <div className="text-5xl mb-4">🌍</div>
                <h3 className="font-[family-name:var(--font-bebas-neue)] text-3xl tracking-wider text-neon-cyan mb-2">{t('music.international')}</h3>
                <p className="text-sm text-white/40">Hip-Hop • Latin • EDM</p>
                <EqBars color="cyan" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ======== CONTACT ======== */}
        <section id="contact" className="relative py-32 px-6">
          <div className="absolute inset-0 bg-gradient-to-t from-neon-purple/[0.03] to-transparent" />

          <div className="relative mx-auto max-w-2xl">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="text-center mb-12"
            >
              <h2 className="font-[family-name:var(--font-bebas-neue)] text-5xl sm:text-7xl md:text-8xl tracking-wide bg-gradient-to-r from-neon-pink to-neon-cyan bg-clip-text text-transparent">
                {t('contact.title')}
              </h2>
              <p className="mt-4 text-lg text-white/50">
                {t('contact.subtitle')}
              </p>
            </motion.div>

            <motion.form
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              onSubmit={(e) => {
                e.preventDefault();
                setFormSent(true);
              }}
              className="space-y-5 rounded-3xl bg-card border border-white/5 p-8 md:p-10 gradient-border"
            >
              {formSent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center"
                >
                  <div className="text-5xl mb-4">🎉</div>
                  <p className="text-xl text-neon-cyan glow-cyan">
                    {t('contact.success')}
                  </p>
                </motion.div>
              ) : (
                <>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">
                        {t('contact.name')}
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full rounded-xl bg-black/50 border border-white/10 px-4 py-3 text-white placeholder-white/20 outline-none transition-all focus:border-neon-purple/50 focus:shadow-[0_0_15px_rgba(139,92,246,0.15)]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">
                        {t('contact.email')}
                      </label>
                      <input
                        type="email"
                        required
                        className="w-full rounded-xl bg-black/50 border border-white/10 px-4 py-3 text-white placeholder-white/20 outline-none transition-all focus:border-neon-purple/50 focus:shadow-[0_0_15px_rgba(139,92,246,0.15)]"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">
                        {t('contact.date')}
                      </label>
                      <input
                        type="date"
                        className="w-full rounded-xl bg-black/50 border border-white/10 px-4 py-3 text-white outline-none transition-all focus:border-neon-purple/50 focus:shadow-[0_0_15px_rgba(139,92,246,0.15)] [color-scheme:dark]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">
                        {t('contact.eventType')}
                      </label>
                      <select className="w-full rounded-xl bg-black/50 border border-white/10 px-4 py-3 text-white outline-none transition-all focus:border-neon-purple/50 focus:shadow-[0_0_15px_rgba(139,92,246,0.15)] [color-scheme:dark]">
                        {serviceKeys.map((key) => (
                          <option key={key} value={key}>
                            {t(`services.${key}.title`)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">
                      {t('contact.message')}
                    </label>
                    <textarea
                      rows={4}
                      className="w-full rounded-xl bg-black/50 border border-white/10 px-4 py-3 text-white placeholder-white/20 outline-none transition-all focus:border-neon-purple/50 focus:shadow-[0_0_15px_rgba(139,92,246,0.15)] resize-none"
                      placeholder={t('contact.message')}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full rounded-xl bg-gradient-to-r from-neon-purple to-neon-pink py-4 text-lg font-semibold text-white transition-shadow hover:shadow-[0_0_40px_rgba(139,92,246,0.4)]"
                  >
                    {t('contact.send')}
                  </motion.button>
                </>
              )}
            </motion.form>
          </div>
        </section>
      </main>

      {/* ======== FOOTER ======== */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6">
          <Image src="/logo.jpeg" alt="DJ Murti" width={120} height={40} className="h-8 w-auto object-contain" />

          <div className="flex items-center gap-6">
            <a href="#" className="text-white/40 hover:text-neon-purple transition-colors">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="#" className="text-white/40 hover:text-neon-pink transition-colors">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
            </a>
            <a href="#" className="text-white/40 hover:text-neon-cyan transition-colors">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.97a8.28 8.28 0 004.86 1.56V7.09a4.84 4.84 0 01-1.1-.4z"/></svg>
            </a>
          </div>

          <div className="flex items-center gap-6 text-sm text-white/30">
            <span>© {new Date().getFullYear()} DJ Murti. {t('footer.rights')}</span>
            <a href="#" className="hover:text-white/60 transition-colors">{t('footer.imprint')}</a>
            <a href="#" className="hover:text-white/60 transition-colors">{t('footer.privacy')}</a>
          </div>
        </div>
      </footer>
    </>
  );
}
