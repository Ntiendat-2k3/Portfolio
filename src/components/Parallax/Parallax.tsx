import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxProps {
  children: ReactNode;
  speed?: number; // negative = slower, positive = faster
  className?: string;
}

export const Parallax = ({ children, speed = 0.3, className }: ParallaxProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [speed * -100, speed * 100]);

  return (
    <div ref={ref} style={{ overflow: 'visible', position: 'relative' }} className={className}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
};
