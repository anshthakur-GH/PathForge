export interface ResumeData {
  contact: {
    name: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    website?: string;
  };
  summary: string;
  experience: Array<{
    company: string;
    position: string;
    duration: string;
    description: string;
  }>;
  education: Array<{
    school: string;
    degree: string;
    year: string;
    description: string;
  }>;
  skills: string[];
  projects?: Array<{
    name: string;
    description: string;
    technologies: string[];
  }>;
  certifications: string[];
} 