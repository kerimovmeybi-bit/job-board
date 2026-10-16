export type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
export type ExperienceLevel = 'Junior' | 'Middle' | 'Senior' | 'Lead';

export interface Job {
  id: string;
  title: string;
  company: string;
  logo: string;
  location: string;
  type: JobType;
  experience: ExperienceLevel;
  salaryMin: number;
  salaryMax: number;
  currency: string;
  skills: string[];
  description: string;
  postedAt: string;
  featured?: boolean;
}

export interface JobFilterState {
  search: string;
  location: string;
  type: JobType | 'All';
  experience: ExperienceLevel | 'All';
  minSalary: number;
  selectedSkills: string[];
}