import { Command } from '@/types';
import { c, line, blank } from '@/utils/color';
import { header } from '@/utils/formatter';

export const projectsCommand: Command = {
  name: 'projects',
  description: 'View my projects (fetched dynamically from GitHub)',
  usage: 'projects [name]',
  aliases: ['portfolio', 'work', 'repos'],

  handler: async (args) => {
    // Dynamic Github fetching!
    const username = 'Ntiendat-2k3'; // from user info
    const output = [blank(), line(c.gray(`Fetching repositories for ${username}...`)), blank()];
    
    try {
      const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`);
      if (!response.ok) {
         return [...output, line(c.red(`Failed to fetch projects (API rate limit or error).`)), blank()];
      }
      const repos = await response.json();
      
      if (args.length > 0) {
        const query = args[0].toLowerCase();
        const repo = repos.find((r: any) => r.name.toLowerCase().includes(query));
        
        if (!repo) {
          return [
            blank(),
            line(c.red(`Project "${args[0]}" not found in recent repos.`)),
            line(`${c.gray('Available:')} ${repos.map((r: any) => c.cyan(r.name)).join(' · ')}`),
            blank(),
          ];
        }

        return [
          blank(),
          line(`${c.yellow('❯')} ${c.white(repo.name)} ${repo.stargazers_count ? c.yellow(`★ ${repo.stargazers_count}`) : ''}`),
          line(`  ${c.gray(repo.description || 'No description provided.')}`),
          blank(),
          line(`  ${c.green('Language:')} ${repo.language || 'Multiple'}`),
          line(`  ${c.blue('GitHub:')}   ${c.cyan(repo.html_url)}`),
          repo.homepage ? line(`  ${c.blue('Live:')}     ${c.cyan(repo.homepage)}`) : blank(),
          blank(),
        ];
      }

      output.pop(); // remove fetching
      output.pop();
      output.push(...header('Recent Projects from GitHub'));
      output.push(blank());

      repos.forEach((p: any, i: number) => {
        output.push(line(
          `  ${c.green('✓')} ${c.cyan(p.name.padEnd(28))} ${p.stargazers_count ? c.yellow(`★ ${p.stargazers_count}`) : ''}`
        ));
        output.push(line(`    ${c.gray(p.description || 'No description')}`));
        output.push(line(`    ${c.dim(p.language || 'Unknown')}`));
        if (i < repos.length - 1) output.push(blank());
      });

      output.push(blank());
      output.push(line(`${c.gray('Tip:')} ${c.yellow('projects <name>')} to view details`));
      output.push(blank());

      return output;
    } catch (err) {
      return [blank(), line(c.red(`Error fetching data: ${(err as Error).message}`)), blank()];
    }
  },
};
