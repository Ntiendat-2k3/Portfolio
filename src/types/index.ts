export interface OutputLine {
  id: string;
  content: string; // HTML string for colored output
  type: 'output' | 'input' | 'error' | 'system';
  animated?: boolean;
}

export interface Command {
  name: string;
  description: string;
  usage?: string;
  aliases?: string[];
  handler: (args: string[], flags: Record<string, string | boolean>) => OutputLine[] | Promise<OutputLine[]>;
}

export interface Project {
  name: string;
  description: string;
  longDescription?: string;
  tech: string[];
  url?: string;
  github?: string;
  stars?: number;
  status: 'completed' | 'wip' | 'archived';
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface PortfolioData {
  personal: {
    name: string;
    role: string;
    location: string;
    bio: string;
  };
  contact: {
    email: string;
    github: string;
    linkedin: string;
  };
  skills: SkillGroup[];
  projects: Project[];
}
