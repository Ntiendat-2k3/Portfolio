export interface ParsedCommand {
  name: string;
  args: string[];
  flags: Record<string, string | boolean>;
  raw: string;
}

export class CommandParser {
  static parse(input: string): ParsedCommand {
    const tokens = input.trim().split(/\s+/);
    const name   = (tokens[0] ?? '').toLowerCase();
    const args:  string[] = [];
    const flags: Record<string, string | boolean> = {};

    for (let i = 1; i < tokens.length; i++) {
      const tok = tokens[i];
      if (tok.startsWith('--')) {
        const part = tok.slice(2);
        const eqIdx = part.indexOf('=');
        if (eqIdx !== -1) {
          flags[part.slice(0, eqIdx)] = part.slice(eqIdx + 1);
        } else {
          flags[part] = true;
        }
      } else if (/^-[a-z]$/i.test(tok)) {
        flags[tok.slice(1)] = true;
      } else {
        args.push(tok);
      }
    }

    return { name, args, flags, raw: input };
  }

  static sanitize(input: string): string {
    return input
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .slice(0, 500);
  }
}
