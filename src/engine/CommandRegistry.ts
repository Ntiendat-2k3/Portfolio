import { Command, OutputLine } from '@/types';
import { c, line, blank } from '@/utils/color';

export class CommandRegistry {
  private registry = new Map<string, Command>();
  private aliasMap  = new Map<string, string>(); 

  register(cmd: Command): void {
    this.registry.set(cmd.name, cmd);
    cmd.aliases?.forEach(alias => this.aliasMap.set(alias, cmd.name));
  }

  registerAll(cmds: Command[]): void {
    cmds.forEach(cmd => this.register(cmd));
  }

  async execute(name: string, args: string[], flags: Record<string, string | boolean>): Promise<OutputLine[]> {
    if (!name) return [];
    
    const realName = this.aliasMap.get(name) ?? name;
    const cmd = this.registry.get(realName);

    if (!cmd) {
      return [
        line(`${c.red('command not found:')} ${c.white(name)}`),
        line(`${c.gray('Type')} ${c.yellow('help')} ${c.gray('to see available commands.')}`),
        blank(),
      ];
    }

    try {
      return await cmd.handler(args, flags);
    } catch (err) {
      console.error(err);
      return [
        line(c.red(`Error executing command "${name}"`)),
        blank(),
      ];
    }
  }

  getAll(): Command[] {
    return Array.from(this.registry.values());
  }

  autocomplete(prefix: string): string[] {
    const lower = prefix.toLowerCase();
    return [
      ...Array.from(this.registry.keys()),
      ...Array.from(this.aliasMap.keys()),
    ].filter(name => name.startsWith(lower) && name !== lower);
  }
}
