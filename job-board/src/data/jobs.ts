import type { Job } from '../types/job';

export const MOCK_JOBS: Job[] = [
  {
    id: '1',
    title: 'Senior React Developer',
    company: 'TechFlow Inc.',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
    location: 'Remote',
    type: 'Full-time',
    experience: 'Senior',
    salaryMin: 4500,
    salaryMax: 6000,
    currency: '$',
    skills: ['React', 'TypeScript', 'Tailwind', 'Redux'],
    description: 'Ищем опытного React-разработчика для масштабирования нашей аналитической SaaS-платформы. Опыт работы с высоконагруженными интерфейсами обязателен.',
    postedAt: '2 часа назад',
    featured: true
  },
  {
    id: '2',
    title: 'Middle Frontend Engineer',
    company: 'FinPulse',
    logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&auto=format&fit=crop&q=80',
    location: 'Kyiv / Remote',
    type: 'Full-time',
    experience: 'Middle',
    salaryMin: 2500,
    salaryMax: 3500,
    currency: '$',
    skills: ['React', 'TypeScript', 'Next.js', 'GraphQL'],
    description: 'Разработка интерфейсов для финансовых дашбордов в сфере Web3 и Fintech. Требуется уверенное знание TypeScript и современного React.',
    postedAt: '1 день назад',
    featured: true
  },
  {
    id: '3',
    title: 'Junior Frontend Developer',
    company: 'Creative Web Studio',
    logo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=100&auto=format&fit=crop&q=80',
    location: 'Odesa / Hybrid',
    type: 'Full-time',
    experience: 'Junior',
    salaryMin: 1000,
    salaryMax: 1500,
    currency: '$',
    skills: ['JavaScript', 'React', 'CSS', 'HTML'],
    description: 'Отличная возможность для старта карьеры в продуктовой IT-компании. Опыт создания реальных пет-проектов на React будет плюсом.',
    postedAt: '3 дня назад'
  },
  {
    id: '4',
    title: 'Full Stack Engineer (Node.js + React)',
    company: 'CloudScale',
    logo: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=100&auto=format&fit=crop&q=80',
    location: 'Remote',
    type: 'Contract',
    experience: 'Middle',
    salaryMin: 3000,
    salaryMax: 4500,
    currency: '$',
    skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL'],
    description: 'Контрактный проект на 6+ месяцев. Разработка полного цикла микросервисов для взаимодействия с облачной инфраструктурой.',
    postedAt: '5 дней назад'
  }
];