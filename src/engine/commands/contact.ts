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
    line(`  ${c.green('Email')}    ${c.link(d.contact.email, `https://mail.google.com/mail/?view=cm&fs=1&to=${d.contact.email}`)}`),
    line(`  ${c.green('GitHub')}   ${c.link('Ntiendat-2k3', `https://${d.contact.github}`)}`),
    line(`  ${c.green('LinkedIn')} ${c.link('Đạt Nguyễn', `https://${d.contact.linkedin}`)}`),
    line(`  ${c.green('Zalo')}     ${c.link(d.contact.zalo, `https://zalo.me/${d.contact.zalo}`)}`),
    blank(),
    line(`  ${c.yellow('✉')}  ${c.gray('I usually reply within 24 hours.')}`),
    blank(),
  ],
};
