
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  sector: string;
  description: string;
  requirements: string[];
  datePosted: string;
  isQualityDescription: boolean;
}

export interface Suggestion {
  id: string;
  jobId: string;
  type: 'improvement' | 'optimization';
  title: string;
  description: string;
  before?: string;
  after?: string;
}

export interface User {
  id: string;
  name: string;
  company: string;
  avatar: string;
  role: string;
}
