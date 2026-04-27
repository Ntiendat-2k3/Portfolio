import { Command } from '@/types';
import { portfolioData as d } from '@/data/portfolioData';
import { c, line, blank } from '@/utils/color';
import { header } from '@/utils/formatter';

export const skillsCommand: Command = {
  name: 'skills',
  description: 'Technical skills',
  usage: 'skills [--category=<name>]',

  handler: (_args, flags) => {
    const filterCat = flags['category'] as string | undefined;
    const groups = filterCat
      ? d.skills.filter(g => g.category.toLowerCase().includes(filterCat.toLowerCase()))
      : d.skills;

    if (groups.length === 0) {
      return [
        line(c.red(`Category not found: "${filterCat}"`)),
        blank(),
      ];
    }

    const output = [blank(), ...header('Tech Stack'), blank()];

    groups.forEach(group => {
      output.push(line(`  ${c.yellow('▶')} ${c.white(group.category)}`));
      const skillList = group.skills
        .map(s => `    ${c.cyan('·')} ${s}`)
        .join('\n');
      output.push(line(skillList));
      output.push(blank());
    });

    return output;
  },
};
