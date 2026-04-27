import { PortfolioData } from '@/types';

export const portfolioData: PortfolioData = {
  personal: {
    name: 'Nguyen Tien Dat',
    role: 'Frontend Developer',
    location: 'Vietnam',
    bio: 'Passionate frontend developer building modern, responsive, and dynamic web experiences.',
  },
  contact: {
    email: 'nguyentiendatg2003@gmail.com',
    github: 'github.com/Ntiendat-2k3',
    linkedin: 'linkedin.com/in/đạt-nguyễn-23b142399',
    zalo: '0374322747',
  },
  skills: [
    {
      category: 'Ngôn ngữ',
      skills: ['TypeScript', 'JavaScript'],
    },
    {
      category: 'Framework',
      skills: ['React', 'Next.js', 'Node.js', 'Express.js', 'Tailwind CSS', 'Bootstrap'],
    },
    {
      category: 'Cơ sở dữ liệu',
      skills: ['PostgreSQL', 'MySQL', 'Redis'],
    },
    {
      category: 'Công cụ',
      skills: ['Git', 'Figma', 'VS Code', 'Postman'],
    },
    {
      category: 'Khác',
      skills: ['HTML', 'CSS / SCSS', 'RESTful APIs', 'Github Actions'],
    },
  ],
  projects: [], // We will fetch these dynamically!
};
