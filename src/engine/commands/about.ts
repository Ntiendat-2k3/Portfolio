import { Command } from '@/types';
import { portfolioData as d } from '@/data/portfolioData';
import { c, line, blank } from '@/utils/color';
import { table, separator } from '@/utils/formatter';

export const aboutCommand: Command = {
  name: 'about',
  description: 'Who am I?',
  aliases: ['whoami', 'me'],

  handler: () => [
    blank(),
    line(c.purple(`
      █     █░ ██░ ██  ▒█████   ▄▄▄       ███▄ ▄███▓ ██▓
     ▓█░ █ ░█░▓██░ ██▒▒██▒  ██▒▒████▄    ▓██▒▀█▀ ██▒▓██▒
     ▒█░ █ ░█ ▒██▀▀██░▒██░  ██▒▒██  ▀█▄  ▓██    ▓██░▒██▒
     ░█░ █ ░█ ░▓█ ░██ ▒██   ██░░██▄▄▄▄██ ▒██    ▒██ ░██░
     ░░██▒██▓ ░▓█▒░██▓░ ████▓▒░ ▓█   ▓██▒▒██▒   ░██▒░██░
     ░ ▓░▒ ▒   ▒ ░░▒░▒░ ▒░▒░▒░  ▒▒   ▓▒█░░ ▒░   ░  ░░▓  
       ▒ ░ ░   ▒ ░▒░ ░  ░ ▒ ▒░   ▒   ▒▒ ░░  ░      ░ ▒ ░
       ░   ░   ░  ░░ ░░ ░ ░ ▒    ░   ▒   ░      ░    ▒ ░
         ░     ░  ░  ░    ░ ░        ░  ░       ░    ░  
    `)),
    blank(),
    ...table([
      ['Name',     d.personal.name],
      ['Role',     c.yellow(d.personal.role)],
      ['Location', d.personal.location],
      ['Status',   c.green('✓ Available for work')],
    ]),
    blank(),
    line(`  ${c.gray('»')} ${d.personal.bio}`),
    blank(),
    separator(),
    line(`${c.gray('Hint:')} ${c.yellow('skills')} · ${c.yellow('projects')} · ${c.yellow('contact')}`),
    blank(),
  ],
};
