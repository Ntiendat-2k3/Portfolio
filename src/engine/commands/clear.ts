import { Command } from '@/types';

export const clearCommand: Command = {
  name: 'clear',
  description: 'Clear the terminal output',
  aliases: ['cls'],
  handler: () => {
    // Return empty array, the hook will handle clearing
    return [];
  },
};
