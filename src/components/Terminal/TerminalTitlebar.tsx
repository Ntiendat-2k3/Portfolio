import React from 'react';
import styles from './Terminal.module.css';

export const TerminalTitlebar: React.FC = () => {
  return (
    <div className={styles.titlebar}>
      <div className={styles.dots}>
        <div className={`${styles.dot} ${styles.dotRed}`} />
        <div className={`${styles.dot} ${styles.dotYellow}`} />
        <div className={`${styles.dot} ${styles.dotGreen}`} />
      </div>
      <div className={styles.titleText}>guest@portfolio: ~</div>
    </div>
  );
};
