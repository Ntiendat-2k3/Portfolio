import { Command } from '@/types';
import { c, line, blank } from '@/utils/color';
import { table, header } from '@/utils/formatter';

export const getHelpCommand = (getAllCommands: () => Command[]): Command => ({
  name: 'help',
  description: 'List all available commands',
  aliases: ['?'],

  handler: () => {
    const cmds = getAllCommands();
    const rows: [string, string][] = cmds.map(cmd => [
      cmd.name,
      c.gray(cmd.description)
    ]);

    return [
      blank(),
      ...header('Available Commands'),
      blank(),
      ...table(rows, 12),
      blank(),
      line(`  ${c.gray('Tip: Use Tab for autocomplete, ↑/↓ for command history')}`),
      blank(),
    ];
  },
});
