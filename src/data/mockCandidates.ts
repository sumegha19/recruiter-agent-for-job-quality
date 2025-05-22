import { Job } from "@/types";

export interface Candidate {
  id: string;
  name: string;
  jobId: string;
  status: 'uncontacted' | 'contacted' | 'replied' | 'recruiter_phone_screen' | 'onsite_interviewed' | 'panel_interview' | 'hiring_manager_interview' | 'team_matching';
  location: string;
  experience: string;
  skills: string[];
  education: string;
  appliedDate: string;
  resumeUrl?: string;
  profileImage?: string;
  notes?: string;
  match?: number; // Match percentage with job requirements
}

// Generate mock candidates for each job
export const generateCandidatesForJob = (job: Job, count: number = 6): Candidate[] => {
  const candidates: Candidate[] = [];
  
  // Status distribution based on the pipeline stages shown in the image
  const statuses: Array<Candidate['status']> = [
    'uncontacted', 'contacted', 'replied', 'recruiter_phone_screen', 
    'onsite_interviewed', 'panel_interview', 'hiring_manager_interview', 'team_matching'
  ];
  
  // Common skills by sector
  const skillsBySector: Record<string, string[]> = {
    'IT & Telecom': ['JavaScript', 'React', 'Node.js', 'AWS', 'Python', 'SQL', 'Docker', 'Kubernetes', 'TypeScript', 'GraphQL', 'REST API', 'CI/CD', 'Git', 'Agile'],
    'Admin': ['MS Office', 'Communication', 'Organization', 'Customer Service', 'Scheduling', 'Documentation', 'Project Management', 'CRM Software'],
    'Logistics': ['Supply Chain', 'Inventory Management', 'Warehouse Operations', 'Transportation', 'Forecasting', 'ERP Systems', 'Procurement', 'Distribution'],
    'Marketing': ['Digital Marketing', 'Social Media', 'Content Creation', 'SEO', 'Analytics', 'Campaign Management', 'Brand Development', 'Market Research']
  };
  
  // Education options
  const educationOptions = [
    "Bachelor's in Computer Science, Stanford University",
    "Master's in Information Technology, MIT",
    "Bachelor's in Business Administration, NYU",
    "Master's in Supply Chain Management, Georgia Tech",
    "Bachelor's in Marketing, UCLA",
    "PhD in Computer Science, Carnegie Mellon",
    "Bachelor's in Engineering, University of Michigan",
    "Master's in Data Science, UC Berkeley"
  ];
  
  // Locations based on job location or nearby
  const locations = [
    job.location,
    job.location.includes("Remote") ? "Remote" : job.location,
    "New York, NY",
    "San Francisco, CA",
    "Chicago, IL",
    "Austin, TX",
    "Seattle, WA",
    "Boston, MA"
  ];
  
  // First names and last names for generating random names
  const firstNames = ["Alex", "Jordan", "Taylor", "Morgan", "Casey", "Riley", "Avery", "Quinn", "Skyler", "Dakota", "Jamie", "Jessie", "Rowan", "Emerson", "Finley"];
  const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson"];
  
  // Experience ranges based on job requirements
  const experienceRanges = ["1-3 years", "3-5 years", "5-7 years", "7-10 years", "10+ years"];
  
  // Generate random candidates
  for (let i = 0; i < count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const name = `${firstName} ${lastName}`;
    
    // Distribute statuses based on the pipeline stages in the image
    // More candidates in earlier stages, fewer in later stages
    let status: Candidate['status'];
    if (i < count * 0.2) {
      status = 'uncontacted';
    } else if (i < count * 0.5) {
      status = 'contacted';
    } else if (i < count * 0.7) {
      status = 'replied';
    } else if (i < count * 0.8) {
      status = 'recruiter_phone_screen';
    } else if (i < count * 0.9) {
      status = 'onsite_interviewed';
    } else {
      status = statuses[Math.floor(Math.random() * 3) + 5]; // One of the last 3 stages
    }
    
    // Get skills relevant to the job sector
    const sectorSkills = skillsBySector[job.sector] || skillsBySector['IT & Telecom'];
    const candidateSkills = [];
    
    // Include some of the job requirements as skills
    for (const req of job.requirements) {
      if (Math.random() > 0.3) { // 70% chance to have the required skill
        candidateSkills.push(req);
      }
    }
    
    // Add some additional skills from the sector
    const additionalSkillsCount = Math.floor(Math.random() * 4) + 1; // 1-4 additional skills
    for (let j = 0; j < additionalSkillsCount; j++) {
      const skill = sectorSkills[Math.floor(Math.random() * sectorSkills.length)];
      if (!candidateSkills.includes(skill)) {
        candidateSkills.push(skill);
      }
    }
    
    // Calculate match percentage based on how many job requirements the candidate has
    const matchPercentage = Math.min(
      100,
      Math.floor(
        (candidateSkills.filter(skill => 
          job.requirements.some(req => req.includes(skill))
        ).length / job.requirements.length) * 100
      ) + Math.floor(Math.random() * 30) // Add some randomness
    );
    
    // Generate a date within the last 30 days
    const today = new Date();
    const appliedDate = new Date(today);
    appliedDate.setDate(today.getDate() - Math.floor(Math.random() * 30));
    
    candidates.push({
      id: `candidate-${job.id}-${i + 1}`,
      name,
      jobId: job.id,
      status,
      location: locations[Math.floor(Math.random() * locations.length)],
      experience: experienceRanges[Math.floor(Math.random() * experienceRanges.length)],
      skills: candidateSkills,
      education: educationOptions[Math.floor(Math.random() * educationOptions.length)],
      appliedDate: appliedDate.toISOString().split('T')[0],
      profileImage: `/placeholder.svg`, // Using placeholder for now
      match: matchPercentage,
      notes: Math.random() > 0.7 ? `${name} has excellent experience in ${candidateSkills.slice(0, 2).join(' and ')}. Follow up needed.` : undefined
    });
  }
  
  return candidates;
};

// Get candidates for a specific job
export const getCandidatesForJob = (jobId: string, jobs: Job[]): Candidate[] => {
  const job = jobs.find(j => j.id === jobId);
  if (!job) return [];
  
  return generateCandidatesForJob(job);
};

// Get all candidates for all jobs
export const getAllCandidates = (jobs: Job[]): Candidate[] => {
  let allCandidates: Candidate[] = [];
  
  jobs.forEach(job => {
    // Generate between 3-8 candidates per job
    const candidateCount = Math.floor(Math.random() * 6) + 3;
    allCandidates = [...allCandidates, ...generateCandidatesForJob(job, candidateCount)];
  });
  
  return allCandidates;
};
