import React, { useRef } from 'react';
import { useTerminal } from '@/hooks/useTerminal';
import { TerminalTitlebar } from './TerminalTitlebar';
import { TerminalOutput } from './TerminalOutput';
import { TerminalInput } from './TerminalInput';
import styles from './Terminal.module.css';

export const Terminal: React.FC = () => {
  const { output, input, setInput, isProcessing, handleKeyDown } = useTerminal();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div className={styles.container} onClick={handleContainerClick}>
      <div className={styles.wrapper}>
        <TerminalTitlebar />
        <TerminalOutput lines={output} />
        <TerminalInput
          ref={inputRef}
          value={input}
          onChange={setInput}
          onKeyDown={handleKeyDown}
          disabled={isProcessing}
        />
      </div>
    </div>
  );
};
