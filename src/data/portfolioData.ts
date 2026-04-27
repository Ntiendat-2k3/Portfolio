import { PortfolioData } from '@/types';

export const portfolioData: PortfolioData = {
  personal: {
    name: 'Nguyen Tien Dat',
    role: 'Frontend Developer',
    location: 'Vietnam',
    bio: 'Passionate frontend developer building modern, responsive, and dynamic web experiences.',
  },
  contact: {
    email: 'contact@example.com',
    github: 'github.com/Ntiendat-2k3',
    linkedin: 'linkedin.com/in/nguyentiendat',
  },
  skills: [
    {
      category: 'Frontend',
      skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vite', 'CSS Modules'],
    },
    {
      category: 'Backend',
      skills: ['Node.js', 'Express', 'PostgreSQL', 'Prisma', 'RESTful APIs'],
    },
    {
      category: 'Tools & Others',
      skills: ['Git', 'GitHub Actions', 'Vercel', 'Docker', 'Figma'],
    },
  ],
  projects: [], // We will fetch these dynamically!
};
