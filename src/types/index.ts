
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
  optimizationStatus?: {
    salary: 'red' | 'amber' | 'green';
    location: 'red' | 'amber' | 'green';
    jobTitle: 'red' | 'amber' | 'green';
  };
  stats?: {
    timeToFirstApplication: PerformanceMetric;
    applicationsPerVacancy: PerformanceMetric;
    firstWeekApplications: PerformanceMetric;
    conversionRate: PerformanceMetric;
  };
}

export interface PerformanceMetric {
  value: string | number;
  change: number;
  benchmark: string | number;
  chartData: { name: string; value: number }[];
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
