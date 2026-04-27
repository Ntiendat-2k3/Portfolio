import React, { useEffect, useRef } from 'react';
import { OutputLine } from '@/types';
import styles from './Terminal.module.css';

interface Props {
  lines: OutputLine[];
}

export const TerminalOutput: React.FC<Props> = ({ lines }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  return (
    <div className={styles.output}>
      {lines.map((line, index) => (
        <div
          key={`${line.id}-${index}`}
          className={`${styles.line} ${styles[`line-${line.type}`]}`}
          dangerouslySetInnerHTML={{ __html: line.content }}
        />
      ))}
      <div ref={bottomRef} />
    </div>
  );
};
