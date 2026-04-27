import React, { forwardRef, useEffect } from 'react';
import styles from './Terminal.module.css';

interface Props {
  value: string;
  onChange: (v: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  username?: string;
}

export const TerminalInput = forwardRef<HTMLInputElement, Props>(({
  value, onChange, onKeyDown, disabled = false, username = 'guest'
}, ref) => {

  useEffect(() => { 
    if (!disabled && ref && 'current' in ref) {
      ref.current?.focus(); 
    }
  }, [disabled, ref]);

  return (
    <div className={styles.inputRow}>
      <span className={styles.prompt}>
        <span className={styles.promptUser}>{username}</span>
        <span className={styles.promptAt}>@</span>
        <span className={styles.promptHost}>portfolio</span>
        <span className={styles.promptColon}>:</span>
        <span className={styles.promptPath}>~</span>
        <span className={styles.promptDollar}>$</span>
      </span>
      <input
        ref={ref}
        className={styles.input}
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        disabled={disabled}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        aria-label="Terminal input"
      />
    </div>
  );
});
