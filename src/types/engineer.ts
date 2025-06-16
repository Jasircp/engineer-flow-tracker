import * as z from 'zod';

export const createEngineerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  user_id: z.string().min(3, 'User ID must be at least 3 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  joined_at: z.date(),
  experience: z.number().min(0, 'Experience must be a positive number'),
  role_id: z.string().min(1, 'Please select a role'),
  skills: z.array(z.object({
    skill_id: z.string(),
    skill_name: z.string(),
    proficiency_level: z.enum(['Beginner', 'Intermediate', 'Advanced', 'Expert']),
  })),
  designations: z.array(z.object({
    designation_name: z.string(),
    start_date: z.date(),
    end_date: z.date().optional(),
    is_current: z.boolean().default(false),
  })),
  notes: z.string().optional(),
});

export type CreateEngineerFormData = z.infer<typeof createEngineerSchema>;

export interface User {
  id: string;
  user_id: string;
  name: string;
  email: string;
  password: string;
  joined_at: Date;
  experience: number;
  role: Role;
  userSkills: UserSkill[];
  designations: UserDesignation[];
  created_at: Date;
  updated_at: Date;
}

export interface Role {
  id: string;
  name: string;
  description?: string;
}

export interface UserSkill {
  id: string;
  user_id: string;
  skill_id: string;
  skill_name: string;
  proficiency_level: string;
}

export interface UserDesignation {
  id: string;
  user_id: string;
  designation_name: string;
  start_date: Date;
  end_date?: Date;
  is_current: boolean;
}

export const AVAILABLE_SKILLS = [
  // Frontend
  { id: 'react', name: 'React', category: 'Frontend' },
  { id: 'angular', name: 'Angular', category: 'Frontend' },
  { id: 'vue', name: 'Vue.js', category: 'Frontend' },
  { id: 'flutter', name: 'Flutter', category: 'Frontend' },
  
  // Backend
  { id: 'nodejs', name: 'Node.js', category: 'Backend' },
  { id: 'python', name: 'Python', category: 'Backend' },
  { id: 'java', name: 'Java', category: 'Backend' },
  { id: 'dotnet', name: '.NET', category: 'Backend' },
  
  // Database
  { id: 'postgresql', name: 'PostgreSQL', category: 'Database' },
  { id: 'mongodb', name: 'MongoDB', category: 'Database' },
  { id: 'mysql', name: 'MySQL', category: 'Database' },
  
  // Cloud
  { id: 'aws', name: 'AWS', category: 'Cloud' },
  { id: 'azure', name: 'Azure', category: 'Cloud' },
  { id: 'gcp', name: 'GCP', category: 'Cloud' },
  
  // Other
  { id: 'devops', name: 'DevOps', category: 'Other' },
  { id: 'qa', name: 'QA Automation', category: 'Other' },
  { id: 'mobile', name: 'Mobile Development', category: 'Other' },
];

export const ROLES = [
  { id: 'junior-developer', name: 'Junior Developer' },
  { id: 'senior-developer', name: 'Senior Developer' },
  { id: 'lead-developer', name: 'Lead Developer' },
  { id: 'frontend-developer', name: 'Frontend Developer' },
  { id: 'backend-developer', name: 'Backend Developer' },
  { id: 'fullstack-developer', name: 'Full Stack Developer' },
  { id: 'mobile-developer', name: 'Mobile Developer' },
  { id: 'devops-engineer', name: 'DevOps Engineer' },
  { id: 'qa-engineer', name: 'QA Engineer' },
];

export const PROFICIENCY_LEVELS = [
  'Beginner',
  'Intermediate', 
  'Advanced',
  'Expert'
] as const;
