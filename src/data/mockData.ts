
import { Job, Suggestion, User } from "../types";

export const currentUser: User = {
  id: "u1",
  name: "Sarah Johnson",
  company: "Amazon",
  avatar: "/placeholder.svg",
  role: "Senior Technical Recruiter"
};

export const jobs: Job[] = [
  {
    id: "job1",
    title: "Senior Software Engineer",
    company: "Amazon",
    location: "Seattle, WA (Remote)",
    sector: "IT & Telecom",
    description: "Looking for a talented software engineer to join our team. Must have experience with AWS and cloud computing. You will work on challenging problems and collaborate with a team of talented engineers.",
    requirements: ["5+ years experience", "AWS", "React", "Node.js"],
    datePosted: "2025-04-15",
    isQualityDescription: true
  },
  {
    id: "job2",
    title: "Full Stack Developer",
    company: "Amazon",
    location: "Austin, TX (Hybrid)",
    sector: "IT & Telecom",
    description: "Need dev for web stuff. Good coding skills required. Join team asap.",
    requirements: ["JavaScript", "React", "Node.js"],
    datePosted: "2025-05-01",
    isQualityDescription: false
  },
  {
    id: "job3",
    title: "DevOps Engineer",
    company: "Amazon",
    location: "Remote",
    sector: "IT & Telecom",
    description: "Join our cloud infrastructure team to build and maintain our DevOps pipeline. Experience with CI/CD, Kubernetes, and AWS required.",
    requirements: ["AWS", "Kubernetes", "CI/CD", "Docker"],
    datePosted: "2025-05-10",
    isQualityDescription: true
  },
  {
    id: "job4",
    title: "Executive Assistant",
    company: "Amazon",
    location: "Seattle, WA",
    sector: "Admin",
    description: "Need assistant for exec. Must be good with schedules and emails. Start immediately.",
    requirements: ["Scheduling", "Email", "MS Office"],
    datePosted: "2025-05-12",
    isQualityDescription: false
  },
  {
    id: "job5",
    title: "Administrative Coordinator",
    company: "Amazon",
    location: "New York, NY",
    sector: "Admin",
    description: "We are seeking a detail-oriented Administrative Coordinator to support our leadership team. This role requires excellent organization skills, proficiency in all Microsoft Office applications, and a proactive approach to problem-solving.",
    requirements: ["MS Office", "Calendar Management", "Communication Skills", "Problem Solving"],
    datePosted: "2025-04-22",
    isQualityDescription: true
  },
  {
    id: "job6",
    title: "Supply Chain Manager",
    company: "Amazon",
    location: "Nashville, TN",
    sector: "Logistics",
    description: "Manage supply chain ops. Need exp. Good pay. Contact HR.",
    requirements: ["Supply Chain", "Management", "Logistics"],
    datePosted: "2025-05-15",
    isQualityDescription: false
  },
  {
    id: "job7",
    title: "Logistics Coordinator",
    company: "Amazon",
    location: "Chicago, IL",
    sector: "Logistics",
    description: "Amazon is looking for a talented Logistics Coordinator to join our expanding team. In this role, you will be responsible for coordinating shipments, optimizing delivery routes, and ensuring timely delivery of products to our customers. The ideal candidate has strong analytical skills and experience in logistics management.",
    requirements: ["Logistics", "Route Optimization", "Supply Chain Knowledge", "Problem Solving"],
    datePosted: "2025-04-18",
    isQualityDescription: true
  },
  {
    id: "job8",
    title: "Warehouse Supervisor",
    company: "Amazon",
    location: "Phoenix, AZ",
    sector: "Logistics",
    description: "Need supervisor for warehouse. Must be able to work nights and weekends. Experience preferred.",
    requirements: ["Supervision", "Warehouse", "Inventory Management"],
    datePosted: "2025-05-05",
    isQualityDescription: false
  }
];

export const suggestions: Suggestion[] = [
  {
    id: "s1",
    jobId: "job2",
    type: "improvement",
    title: "Incomplete Job Description",
    description: "Your job description is too brief and lacks essential details that candidates need to understand the role and requirements.",
    before: "Need dev for web stuff. Good coding skills required. Join team asap.",
    after: "Amazon is seeking a skilled Full Stack Developer to join our dynamic engineering team. You will be responsible for developing and maintaining web applications using React and Node.js. The ideal candidate has strong problem-solving skills and experience building scalable web applications."
  },
  {
    id: "s2",
    jobId: "job2",
    type: "optimization",
    title: "Missing Technical Requirements",
    description: "Consider adding specific technical requirements and years of experience to attract qualified candidates.",
    before: "JavaScript, React, Node.js",
    after: "3+ years experience with JavaScript, React, and Node.js. Experience with AWS services, RESTful API design, and database management (SQL and NoSQL)."
  },
  {
    id: "s3",
    jobId: "job4",
    type: "improvement",
    title: "Vague Job Description",
    description: "The current description doesn't provide enough information about responsibilities and expectations.",
    before: "Need assistant for exec. Must be good with schedules and emails. Start immediately.",
    after: "Amazon is seeking an experienced Executive Assistant to provide comprehensive support to our Senior Leadership Team. This role involves managing complex calendars, coordinating meetings, handling correspondence, and preparing reports. The ideal candidate is highly organized, discreet, and able to prioritize competing demands."
  },
  {
    id: "s4",
    jobId: "job6",
    type: "optimization",
    title: "Incomplete Role Details",
    description: "Add specific responsibilities and qualifications to attract qualified supply chain professionals.",
    before: "Manage supply chain ops. Need exp. Good pay. Contact HR.",
    after: "Amazon is seeking an experienced Supply Chain Manager to oversee our regional distribution operations. The role involves optimizing inventory levels, managing vendor relationships, and implementing cost-saving initiatives across the supply chain. Candidates should have 5+ years of experience in supply chain management and a bachelor's degree in Supply Chain Management, Business, or a related field."
  },
  {
    id: "s5",
    jobId: "job8",
    type: "improvement",
    title: "Add Benefits and Company Information",
    description: "Include information about Amazon's benefits and company culture to make the position more attractive.",
    before: "Need supervisor for warehouse. Must be able to work nights and weekends. Experience preferred.",
    after: "Amazon is hiring a Warehouse Supervisor to lead operations at our Phoenix fulfillment center. You will oversee daily warehouse activities, manage a team of 15-20 associates, and ensure safety protocols are followed. This role requires weekend and night shifts. At Amazon, we offer competitive pay, health benefits from day one, and opportunities for career advancement."
  }
];

export const getSuggestionsByJobId = (jobId: string): Suggestion[] => {
  return suggestions.filter(suggestion => suggestion.jobId === jobId);
};

export const getJobById = (jobId: string): Job | undefined => {
  return jobs.find(job => job.id === jobId);
};

export const getJobsBySector = (sector: string): Job[] => {
  return jobs.filter(job => job.sector === sector);
};

export const getAllSectors = (): string[] => {
  return Array.from(new Set(jobs.map(job => job.sector)));
};
