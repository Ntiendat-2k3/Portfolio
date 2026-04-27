import { OutputLine } from '@/types';

export const c = {
  green:  (t: string) => `<span class="t-green">${t}</span>`,
  yellow: (t: string) => `<span class="t-yellow">${t}</span>`,
  blue:   (t: string) => `<span class="t-blue">${t}</span>`,
  red:    (t: string) => `<span class="t-red">${t}</span>`,
  gray:   (t: string) => `<span class="t-gray">${t}</span>`,
  cyan:   (t: string) => `<span class="t-cyan">${t}</span>`,
  purple: (t: string) => `<span class="t-purple">${t}</span>`,
  white:  (t: string) => `<span class="t-white">${t}</span>`,
  bold:   (t: string) => `<strong>${t}</strong>`,
  dim:    (t: string) => `<span class="t-dim">${t}</span>`,
  link:   (text: string, href: string) =>
    `<a href="${href}" target="_blank" rel="noopener" class="t-link">${text}</a>`,
};

export const line = (
  content: string,
  type: OutputLine['type'] = 'output',
  animated = false
): OutputLine => ({
  id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
  content,
  type,
  animated,
});

export const blank = () => line('');
