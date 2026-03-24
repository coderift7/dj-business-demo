'use client';

import { motion } from 'framer-motion';

const barHeights = [65, 85, 50, 90, 70, 55, 80, 45, 75, 60];
const barColors = [
  '#A78BFA', '#9B6FE8', '#8B5CF6', '#B44BD8', '#D946B8',
  '#EC4899', '#E05AA0', '#D06CB0', '#22D3EE', '#06B6D4',
];

export default function AnimatedLogo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      {/* DJ + EQ Bars row */}
      <div className="flex items-end gap-1 mb-1">
        <span className="font-[family-name:var(--font-bebas-neue)] text-white text-3xl sm:text-4xl md:text-5xl tracking-wider leading-none mr-1">
          DJ
        </span>
        <div className="flex items-end gap-[3px] sm:gap-1 h-10 sm:h-14 md:h-16">
          {barHeights.map((baseHeight, i) => (
            <motion.div
              key={i}
              className="w-[6px] sm:w-2 md:w-[10px] rounded-sm"
              style={{
                background: barColors[i],
                boxShadow: `0 0 8px ${barColors[i]}60`,
              }}
              animate={{
                height: [
                  `${baseHeight}%`,
                  `${Math.max(20, baseHeight + (Math.random() > 0.5 ? 1 : -1) * 30)}%`,
                  `${Math.max(25, baseHeight - 20)}%`,
                  `${Math.min(100, baseHeight + 15)}%`,
                  `${baseHeight}%`,
                ],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.2 + i * 0.08,
                ease: 'easeInOut',
                delay: i * 0.05,
              }}
            />
          ))}
        </div>
      </div>
      {/* MURTI text */}
      <span className="font-[family-name:var(--font-bebas-neue)] text-white text-6xl sm:text-7xl md:text-8xl tracking-[0.15em] leading-none">
        MURTI
      </span>
    </div>
  );
}
