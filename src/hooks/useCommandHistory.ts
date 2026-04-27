import { useRef, useState } from 'react';

const MAX_HISTORY = 100;

export function useCommandHistory() {
  const history = useRef<string[]>([]);
  const index   = useRef(-1);
  const [draft, setDraft] = useState(''); 

  const push = (cmd: string) => {
    if (cmd && cmd !== history.current[0]) {
      history.current.unshift(cmd);
      if (history.current.length > MAX_HISTORY) {
        history.current.pop();
      }
    }
    index.current = -1;
  };

  const navigateUp = (currentInput: string): string => {
    if (index.current === -1) setDraft(currentInput);
    if (history.current.length === 0) return currentInput;
    const next = Math.min(index.current + 1, history.current.length - 1);
    index.current = next;
    return history.current[next] ?? currentInput;
  };

  const navigateDown = (): string => {
    if (index.current <= 0) {
      index.current = -1;
      return draft;
    }
    index.current -= 1;
    return history.current[index.current];
  };

  return { push, navigateUp, navigateDown };
}
