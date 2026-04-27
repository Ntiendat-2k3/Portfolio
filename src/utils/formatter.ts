import { c, line } from './color';
import { OutputLine } from '@/types';

export function box(title: string, width = 50): OutputLine[] {
  const top    = `╭${'─'.repeat(width - 2)}╮`;
  const bottom = `╰${'─'.repeat(width - 2)}╯`;
  const mid    = `│  ${title.padEnd(width - 4)}│`;
  return [top, mid, bottom].map(l => line(c.cyan(l)));
}

export function table(rows: [string, string][], keyWidth = 14): OutputLine[] {
  return rows.map(([key, val]) =>
    line(`  ${c.cyan(key.padEnd(keyWidth))} │ ${val}`)
  );
}

export function separator(char = '─', width = 50): OutputLine {
  return line(c.gray(char.repeat(width)));
}

export function header(title: string): OutputLine[] {
  return [
    separator(),
    line(c.purple(`  ${title.toUpperCase()}`)),
    separator(),
  ];
}
