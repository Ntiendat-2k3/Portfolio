import { Command } from '@/types';
import { portfolioData as d } from '@/data/portfolioData';
import { c, line, blank } from '@/utils/color';
import { header } from '@/utils/formatter';

export const contactCommand: Command = {
  name: 'contact',
  description: 'Contact information',
  aliases: ['hire', 'reach'],

  handler: () => [
    blank(),
    ...header('Get in touch'),
    blank(),
    line(`  ${c.green('Email')}    ${c.link(d.contact.email, `mailto:${d.contact.email}`)}`),
    line(`  ${c.green('GitHub')}   ${c.link(d.contact.github, `https://${d.contact.github}`)}`),
    line(`  ${c.green('LinkedIn')} ${c.link(d.contact.linkedin, `https://${d.contact.linkedin}`)}`),
    blank(),
    line(`  ${c.yellow('✉')}  ${c.gray('I usually reply within 24 hours.')}`),
    blank(),
  ],
};
