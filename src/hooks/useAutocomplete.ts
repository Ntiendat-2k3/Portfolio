import { CommandRegistry } from '@/engine/CommandRegistry';

export function useAutocomplete(registry: CommandRegistry) {
  const complete = (input: string): string => {
    const trimmed = input.trimStart();
    if (!trimmed || trimmed.includes(' ')) return input;

    const matches = registry.autocomplete(trimmed);
    if (matches.length === 1) {
      return matches[0] + ' ';
    }
    return input; // return original if no clear match
  };

  return { complete };
}
