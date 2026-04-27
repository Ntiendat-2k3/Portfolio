import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchLanguages, LANG_COLORS, type LanguageBreakdown } from '../../services/github';
import styles from './Projects.module.css';

interface Props {
  repoName: string;
}

export const LanguageBar = ({ repoName }: Props) => {
  const [langs, setLangs] = useState<LanguageBreakdown>({});

  useEffect(() => {
    fetchLanguages(repoName).then(setLangs).catch(() => {});
  }, [repoName]);

  const total = Object.values(langs).reduce((a, b) => a + b, 0);
  if (total === 0) return null;

  const entries = Object.entries(langs)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <div className={styles.langSection}>
      {/* Stacked bar */}
      <div className={styles.langBar}>
        {entries.map(([lang, bytes]) => {
          const pct = (bytes / total) * 100;
          return (
            <motion.div
              key={lang}
              className={styles.langSegment}
              style={{
                width: `${pct}%`,
                backgroundColor: LANG_COLORS[lang] || '#888',
              }}
              initial={{ width: 0 }}
              whileInView={{ width: `${pct}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              viewport={{ once: true }}
              title={`${lang}: ${pct.toFixed(1)}%`}
            />
          );
        })}
      </div>
      {/* Labels */}
      <div className={styles.langLabels}>
        {entries.map(([lang, bytes]) => {
          const pct = (bytes / total) * 100;
          return (
            <span key={lang} className={styles.langLabel}>
              <span
                className={styles.langDot}
                style={{ backgroundColor: LANG_COLORS[lang] || '#888' }}
              />
              {lang} {pct.toFixed(1)}%
            </span>
          );
        })}
      </div>
    </div>
  );
};
