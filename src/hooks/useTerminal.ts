import { useState, useMemo } from 'react';
import { OutputLine } from '@/types';
import { CommandRegistry } from '@/engine/CommandRegistry';
import { CommandParser } from '@/engine/CommandParser';
import { useCommandHistory } from './useCommandHistory';
import { useAutocomplete } from './useAutocomplete';
import { line, c, blank } from '@/utils/color';

// Import commands
import {
  aboutCommand,
  skillsCommand,
  projectsCommand,
  contactCommand,
  clearCommand,
  getHelpCommand
} from '@/engine/commands';

export function useTerminal() {
  const [output, setOutput] = useState<OutputLine[]>([
    line(c.purple('Welcome to Terminal Portfolio v2.0.0')),
    line(c.gray('Type "help" to see available commands.')),
    blank()
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const registry = useMemo(() => {
    const reg = new CommandRegistry();
    reg.registerAll([
      aboutCommand,
      skillsCommand,
      projectsCommand,
      contactCommand,
      clearCommand,
    ]);
    // Help command needs reference to registry to list commands
    reg.register(getHelpCommand(() => reg.getAll()));
    return reg;
  }, []);

  const history = useCommandHistory();
  const autocomplete = useAutocomplete(registry);

  const handleExecute = async (rawInput: string) => {
    const trimmed = rawInput.trim();
    if (!trimmed) {
      setOutput(prev => [...prev, line(`${c.green('guest')}@${c.blue('portfolio')}:~$ `, 'input')]);
      return;
    }

    history.push(trimmed);
    const parsed = CommandParser.parse(trimmed);
    
    // Echo the command
    setOutput(prev => [
      ...prev,
      line(`${c.green('guest')}@${c.blue('portfolio')}:~$ ${CommandParser.sanitize(trimmed)}`, 'input')
    ]);

    if (parsed.name === 'clear' || parsed.name === 'cls') {
      setOutput([]);
      return;
    }

    setIsProcessing(true);
    const resultLines = await registry.execute(parsed.name, parsed.args, parsed.flags);
    setOutput(prev => [...prev, ...resultLines]);
    setIsProcessing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleExecute(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setInput(history.navigateUp(input));
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setInput(history.navigateDown());
    } else if (e.key === 'Tab') {
      e.preventDefault();
      setInput(autocomplete.complete(input));
    }
  };

  return {
    output,
    input,
    setInput,
    isProcessing,
    handleKeyDown
  };
}
