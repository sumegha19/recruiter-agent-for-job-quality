
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
    isQualityDescription: true,
    optimizationStatus: {
      salary: "red",
      location: "amber",
      jobTitle: "green"
    },
    stats: {
      timeToFirstApplication: {
        value: '8.5 hours',
        change: -15,
        benchmark: '10 hours',
        chartData: [
          { name: 'Mon', value: 15 },
          { name: 'Tue', value: 12 },
          { name: 'Wed', value: 9 },
          { name: 'Thu', value: 8.5 },
          { name: 'Fri', value: 10 },
          { name: 'Sat', value: 14 },
          { name: 'Sun', value: 11 },
        ]
      },
      applicationsPerVacancy: {
        value: 32,
        change: 8,
        benchmark: 25,
        chartData: [
          { name: 'Week 1', value: 12 },
          { name: 'Week 2', value: 18 },
          { name: 'Week 3', value: 24 },
          { name: 'Week 4', value: 32 },
        ]
      },
      firstWeekApplications: {
        value: 18,
        change: 5,
        benchmark: 15,
        chartData: [
          { name: 'Day 1', value: 6 },
          { name: 'Day 2', value: 4 },
          { name: 'Day 3', value: 3 },
          { name: 'Day 4', value: 2 },
          { name: 'Day 5', value: 1 },
          { name: 'Day 6', value: 1 },
          { name: 'Day 7', value: 1 },
        ]
      },
      conversionRate: {
        value: '42%',
        change: 5,
        benchmark: '35%',
        chartData: [
          { name: 'Week 1', value: 30 },
          { name: 'Week 2', value: 34 },
          { name: 'Week 3', value: 38 },
          { name: 'Week 4', value: 42 },
        ]
      }
    }
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
    isQualityDescription: false,
    optimizationStatus: {
      salary: "red",
      location: "red",
      jobTitle: "amber"
    },
    stats: {
      timeToFirstApplication: {
        value: '12 hours',
        change: 20,
        benchmark: '10 hours',
        chartData: [
          { name: 'Mon', value: 10 },
          { name: 'Tue', value: 11 },
          { name: 'Wed', value: 12 },
          { name: 'Thu', value: 14 },
          { name: 'Fri', value: 13 },
          { name: 'Sat', value: 15 },
          { name: 'Sun', value: 12 },
        ]
      },
      applicationsPerVacancy: {
        value: 18,
        change: -28,
        benchmark: 25,
        chartData: [
          { name: 'Week 1', value: 8 },
          { name: 'Week 2', value: 12 },
          { name: 'Week 3', value: 15 },
          { name: 'Week 4', value: 18 },
        ]
      },
      firstWeekApplications: {
        value: 8,
        change: -47,
        benchmark: 15,
        chartData: [
          { name: 'Day 1', value: 3 },
          { name: 'Day 2', value: 2 },
          { name: 'Day 3', value: 1 },
          { name: 'Day 4', value: 1 },
          { name: 'Day 5', value: 1 },
          { name: 'Day 6', value: 0 },
          { name: 'Day 7', value: 0 },
        ]
      },
      conversionRate: {
        value: '28%',
        change: -20,
        benchmark: '35%',
        chartData: [
          { name: 'Week 1', value: 20 },
          { name: 'Week 2', value: 22 },
          { name: 'Week 3', value: 25 },
          { name: 'Week 4', value: 28 },
        ]
      }
    }
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
    isQualityDescription: true,
    optimizationStatus: {
      salary: "amber",
      location: "red",
      jobTitle: "green"
    },
    stats: {
      timeToFirstApplication: {
        value: '5.2 hours',
        change: -48,
        benchmark: '10 hours',
        chartData: [
          { name: 'Mon', value: 9 },
          { name: 'Tue', value: 7 },
          { name: 'Wed', value: 6 },
          { name: 'Thu', value: 5.2 },
          { name: 'Fri', value: 8 },
          { name: 'Sat', value: 10 },
          { name: 'Sun', value: 7 },
        ]
      },
      applicationsPerVacancy: {
        value: 45,
        change: 80,
        benchmark: 25,
        chartData: [
          { name: 'Week 1', value: 20 },
          { name: 'Week 2', value: 30 },
          { name: 'Week 3', value: 38 },
          { name: 'Week 4', value: 45 },
        ]
      },
      firstWeekApplications: {
        value: 20,
        change: 33,
        benchmark: 15,
        chartData: [
          { name: 'Day 1', value: 8 },
          { name: 'Day 2', value: 5 },
          { name: 'Day 3', value: 3 },
          { name: 'Day 4', value: 2 },
          { name: 'Day 5', value: 1 },
          { name: 'Day 6', value: 1 },
          { name: 'Day 7', value: 0 },
        ]
      },
      conversionRate: {
        value: '52%',
        change: 49,
        benchmark: '35%',
        chartData: [
          { name: 'Week 1', value: 40 },
          { name: 'Week 2', value: 44 },
          { name: 'Week 3', value: 48 },
          { name: 'Week 4', value: 52 },
        ]
      }
    }
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
    isQualityDescription: false,
    optimizationStatus: {
      salary: "red",
      location: "amber",
      jobTitle: "amber"
    },
    stats: {
      timeToFirstApplication: {
        value: '6.8 hours',
        change: -32,
        benchmark: '10 hours',
        chartData: [
          { name: 'Mon', value: 10 },
          { name: 'Tue', value: 9 },
          { name: 'Wed', value: 8 },
          { name: 'Thu', value: 7 },
          { name: 'Fri', value: 6.8 },
          { name: 'Sat', value: 8 },
          { name: 'Sun', value: 7 },
        ]
      },
      applicationsPerVacancy: {
        value: 35,
        change: 40,
        benchmark: 25,
        chartData: [
          { name: 'Week 1', value: 15 },
          { name: 'Week 2', value: 22 },
          { name: 'Week 3', value: 28 },
          { name: 'Week 4', value: 35 },
        ]
      },
      firstWeekApplications: {
        value: 15,
        change: 0,
        benchmark: 15,
        chartData: [
          { name: 'Day 1', value: 7 },
          { name: 'Day 2', value: 3 },
          { name: 'Day 3', value: 2 },
          { name: 'Day 4', value: 1 },
          { name: 'Day 5', value: 1 },
          { name: 'Day 6', value: 1 },
          { name: 'Day 7', value: 0 },
        ]
      },
      conversionRate: {
        value: '38%',
        change: 8,
        benchmark: '35%',
        chartData: [
          { name: 'Week 1', value: 32 },
          { name: 'Week 2', value: 34 },
          { name: 'Week 3', value: 36 },
          { name: 'Week 4', value: 38 },
        ]
      }
    }
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
    isQualityDescription: true,
    optimizationStatus: {
      salary: "amber",
      location: "amber",
      jobTitle: "green"
    },
    stats: {
      timeToFirstApplication: {
        value: '4.2 hours',
        change: -58,
        benchmark: '10 hours',
        chartData: [
          { name: 'Mon', value: 8 },
          { name: 'Tue', value: 6 },
          { name: 'Wed', value: 5 },
          { name: 'Thu', value: 4.2 },
          { name: 'Fri', value: 7 },
          { name: 'Sat', value: 9 },
          { name: 'Sun', value: 8 },
        ]
      },
      applicationsPerVacancy: {
        value: 48,
        change: 92,
        benchmark: 25,
        chartData: [
          { name: 'Week 1', value: 22 },
          { name: 'Week 2', value: 30 },
          { name: 'Week 3', value: 40 },
          { name: 'Week 4', value: 48 },
        ]
      },
      firstWeekApplications: {
        value: 22,
        change: 47,
        benchmark: 15,
        chartData: [
          { name: 'Day 1', value: 9 },
          { name: 'Day 2', value: 6 },
          { name: 'Day 3', value: 3 },
          { name: 'Day 4', value: 2 },
          { name: 'Day 5', value: 1 },
          { name: 'Day 6', value: 1 },
          { name: 'Day 7', value: 0 },
        ]
      },
      conversionRate: {
        value: '50%',
        change: 43,
        benchmark: '35%',
        chartData: [
          { name: 'Week 1', value: 38 },
          { name: 'Week 2', value: 42 },
          { name: 'Week 3', value: 46 },
          { name: 'Week 4', value: 50 },
        ]
      }
    }
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
    isQualityDescription: false,
    optimizationStatus: {
      salary: "red",
      location: "amber",
      jobTitle: "green"
    },
    stats: {
      timeToFirstApplication: {
        value: '9.5 hours',
        change: -5,
        benchmark: '10 hours',
        chartData: [
          { name: 'Mon', value: 12 },
          { name: 'Tue', value: 11 },
          { name: 'Wed', value: 10 },
          { name: 'Thu', value: 9.5 },
          { name: 'Fri', value: 11 },
          { name: 'Sat', value: 14 },
          { name: 'Sun', value: 13 },
        ]
      },
      applicationsPerVacancy: {
        value: 24,
        change: -4,
        benchmark: 25,
        chartData: [
          { name: 'Week 1', value: 10 },
          { name: 'Week 2', value: 15 },
          { name: 'Week 3', value: 20 },
          { name: 'Week 4', value: 24 },
        ]
      },
      firstWeekApplications: {
        value: 10,
        change: -33,
        benchmark: 15,
        chartData: [
          { name: 'Day 1', value: 4 },
          { name: 'Day 2', value: 3 },
          { name: 'Day 3', value: 1 },
          { name: 'Day 4', value: 1 },
          { name: 'Day 5', value: 1 },
          { name: 'Day 6', value: 0 },
          { name: 'Day 7', value: 0 },
        ]
      },
      conversionRate: {
        value: '32%',
        change: -9,
        benchmark: '35%',
        chartData: [
          { name: 'Week 1', value: 25 },
          { name: 'Week 2', value: 28 },
          { name: 'Week 3', value: 30 },
          { name: 'Week 4', value: 32 },
        ]
      }
    }
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
    isQualityDescription: true,
    optimizationStatus: {
      salary: "amber",
      location: "amber",
      jobTitle: "green"
    },
    stats: {
      timeToFirstApplication: {
        value: '7.1 hours',
        change: -29,
        benchmark: '10 hours',
        chartData: [
          { name: 'Mon', value: 11 },
          { name: 'Tue', value: 9 },
          { name: 'Wed', value: 8 },
          { name: 'Thu', value: 7.1 },
          { name: 'Fri', value: 9 },
          { name: 'Sat', value: 12 },
          { name: 'Sun', value: 10 },
        ]
      },
      applicationsPerVacancy: {
        value: 38,
        change: 52,
        benchmark: 25,
        chartData: [
          { name: 'Week 1', value: 18 },
          { name: 'Week 2', value: 25 },
          { name: 'Week 3', value: 32 },
          { name: 'Week 4', value: 38 },
        ]
      },
      firstWeekApplications: {
        value: 18,
        change: 20,
        benchmark: 15,
        chartData: [
          { name: 'Day 1', value: 7 },
          { name: 'Day 2', value: 5 },
          { name: 'Day 3', value: 3 },
          { name: 'Day 4', value: 2 },
          { name: 'Day 5', value: 1 },
          { name: 'Day 6', value: 0 },
          { name: 'Day 7', value: 0 },
        ]
      },
      conversionRate: {
        value: '45%',
        change: 29,
        benchmark: '35%',
        chartData: [
          { name: 'Week 1', value: 35 },
          { name: 'Week 2', value: 38 },
          { name: 'Week 3', value: 42 },
          { name: 'Week 4', value: 45 },
        ]
      }
    }
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
    isQualityDescription: false,
    optimizationStatus: {
      salary: "red",
      location: "amber",
      jobTitle: "amber"
    },
    stats: {
      timeToFirstApplication: {
        value: '8.2 hours',
        change: -18,
        benchmark: '10 hours',
        chartData: [
          { name: 'Mon', value: 12 },
          { name: 'Tue', value: 10 },
          { name: 'Wed', value: 9 },
          { name: 'Thu', value: 8.2 },
          { name: 'Fri', value: 10 },
          { name: 'Sat', value: 11 },
          { name: 'Sun', value: 9 },
        ]
      },
      applicationsPerVacancy: {
        value: 28,
        change: 12,
        benchmark: 25,
        chartData: [
          { name: 'Week 1', value: 14 },
          { name: 'Week 2', value: 18 },
          { name: 'Week 3', value: 24 },
          { name: 'Week 4', value: 28 },
        ]
      },
      firstWeekApplications: {
        value: 14,
        change: -6,
        benchmark: 15,
        chartData: [
          { name: 'Day 1', value: 5 },
          { name: 'Day 2', value: 4 },
          { name: 'Day 3', value: 2 },
          { name: 'Day 4', value: 1 },
          { name: 'Day 5', value: 1 },
          { name: 'Day 6', value: 1 },
          { name: 'Day 7', value: 0 },
        ]
      },
      conversionRate: {
        value: '40%',
        change: 14,
        benchmark: '35%',
        chartData: [
          { name: 'Week 1', value: 32 },
          { name: 'Week 2', value: 35 },
          { name: 'Week 3', value: 38 },
          { name: 'Week 4', value: 40 },
        ]
      }
    }
  },
  // Add more IT & Telecom jobs
  {
    id: "job9",
    title: "UX/UI Designer",
    company: "Amazon",
    location: "Portland, OR",
    sector: "IT & Telecom",
    description: "Join our design team to create intuitive user experiences for our products. Experience with Figma and Adobe Creative Suite required.",
    requirements: ["Figma", "Adobe XD", "User Research", "Prototyping"],
    datePosted: "2025-05-02",
    isQualityDescription: true,
    optimizationStatus: {
      salary: "green",
      location: "amber",
      jobTitle: "green"
    },
    stats: {
      timeToFirstApplication: {
        value: '3.5 hours',
        change: -65,
        benchmark: '10 hours',
        chartData: [
          { name: 'Mon', value: 7 },
          { name: 'Tue', value: 5 },
          { name: 'Wed', value: 4 },
          { name: 'Thu', value: 3.5 },
          { name: 'Fri', value: 6 },
          { name: 'Sat', value: 8 },
          { name: 'Sun', value: 7 },
        ]
      },
      applicationsPerVacancy: {
        value: 55,
        change: 120,
        benchmark: 25,
        chartData: [
          { name: 'Week 1', value: 25 },
          { name: 'Week 2', value: 35 },
          { name: 'Week 3', value: 45 },
          { name: 'Week 4', value: 55 },
        ]
      },
      firstWeekApplications: {
        value: 25,
        change: 67,
        benchmark: 15,
        chartData: [
          { name: 'Day 1', value: 10 },
          { name: 'Day 2', value: 7 },
          { name: 'Day 3', value: 4 },
          { name: 'Day 4', value: 2 },
          { name: 'Day 5', value: 1 },
          { name: 'Day 6', value: 1 },
          { name: 'Day 7', value: 0 },
        ]
      },
      conversionRate: {
        value: '58%',
        change: 66,
        benchmark: '35%',
        chartData: [
          { name: 'Week 1', value: 45 },
          { name: 'Week 2', value: 50 },
          { name: 'Week 3', value: 54 },
          { name: 'Week 4', value: 58 },
        ]
      }
    }
  },
  {
    id: "job10",
    title: "Data Scientist",
    company: "Amazon",
    location: "Boston, MA",
    sector: "IT & Telecom",
    description: "Need data person for stats.",
    requirements: ["Python", "SQL", "Machine Learning"],
    datePosted: "2025-05-08",
    isQualityDescription: false,
    optimizationStatus: {
      salary: "red",
      location: "amber",
      jobTitle: "green"
    },
    stats: {
      timeToFirstApplication: {
        value: '11.2 hours',
        change: 12,
        benchmark: '10 hours',
        chartData: [
          { name: 'Mon', value: 9 },
          { name: 'Tue', value: 10 },
          { name: 'Wed', value: 11.2 },
          { name: 'Thu', value: 12 },
          { name: 'Fri', value: 11 },
          { name: 'Sat', value: 13 },
          { name: 'Sun', value: 12 },
        ]
      },
      applicationsPerVacancy: {
        value: 22,
        change: -12,
        benchmark: 25,
        chartData: [
          { name: 'Week 1', value: 10 },
          { name: 'Week 2', value: 14 },
          { name: 'Week 3', value: 18 },
          { name: 'Week 4', value: 22 },
        ]
      },
      firstWeekApplications: {
        value: 10,
        change: -33,
        benchmark: 15,
        chartData: [
          { name: 'Day 1', value: 4 },
          { name: 'Day 2', value: 3 },
          { name: 'Day 3', value: 1 },
          { name: 'Day 4', value: 1 },
          { name: 'Day 5', value: 1 },
          { name: 'Day 6', value: 0 },
          { name: 'Day 7', value: 0 },
        ]
      },
      conversionRate: {
        value: '30%',
        change: -14,
        benchmark: '35%',
        chartData: [
          { name: 'Week 1', value: 24 },
          { name: 'Week 2', value: 26 },
          { name: 'Week 3', value: 28 },
          { name: 'Week 4', value: 30 },
        ]
      }
    }
  },
  // Add more Admin jobs
  {
    id: "job11",
    title: "Office Manager",
    company: "Amazon",
    location: "Denver, CO",
    sector: "Admin",
    description: "Amazon is seeking an experienced Office Manager to oversee daily operations at our Denver location. The ideal candidate will have strong organizational skills and experience managing administrative staff.",
    requirements: ["Office Management", "Staff Supervision", "Budget Management", "Vendor Relations"],
    datePosted: "2025-04-25",
    isQualityDescription: true,
    optimizationStatus: {
      salary: "green",
      location: "amber",
      jobTitle: "green"
    },
    stats: {
      timeToFirstApplication: {
        value: '5.8 hours',
        change: -42,
        benchmark: '10 hours',
        chartData: [
          { name: 'Mon', value: 9 },
          { name: 'Tue', value: 7 },
          { name: 'Wed', value: 6 },
          { name: 'Thu', value: 5.8 },
          { name: 'Fri', value: 8 },
          { name: 'Sat', value: 10 },
          { name: 'Sun', value: 9 },
        ]
      },
      applicationsPerVacancy: {
        value: 42,
        change: 68,
        benchmark: 25,
        chartData: [
          { name: 'Week 1', value: 20 },
          { name: 'Week 2', value: 28 },
          { name: 'Week 3', value: 35 },
          { name: 'Week 4', value: 42 },
        ]
      },
      firstWeekApplications: {
        value: 20,
        change: 33,
        benchmark: 15,
        chartData: [
          { name: 'Day 1', value: 8 },
          { name: 'Day 2', value: 5 },
          { name: 'Day 3', value: 3 },
          { name: 'Day 4', value: 2 },
          { name: 'Day 5', value: 1 },
          { name: 'Day 6', value: 1 },
          { name: 'Day 7', value: 0 },
        ]
      },
      conversionRate: {
        value: '48%',
        change: 37,
        benchmark: '35%',
        chartData: [
          { name: 'Week 1', value: 36 },
          { name: 'Week 2', value: 40 },
          { name: 'Week 3', value: 44 },
          { name: 'Week 4', value: 48 },
        ]
      }
    }
  },
  {
    id: "job12",
    title: "Receptionist",
    company: "Amazon",
    location: "Miami, FL",
    sector: "Admin",
    description: "Need front desk person. Answer phones.",
    requirements: ["Phone Skills", "MS Office", "Customer Service"],
    datePosted: "2025-05-14",
    isQualityDescription: false,
    optimizationStatus: {
      salary: "red",
      location: "amber",
      jobTitle: "amber"
    },
    stats: {
      timeToFirstApplication: {
        value: '7.5 hours',
        change: -25,
        benchmark: '10 hours',
        chartData: [
          { name: 'Mon', value: 11 },
          { name: 'Tue', value: 9 },
          { name: 'Wed', value: 8 },
          { name: 'Thu', value: 7.5 },
          { name: 'Fri', value: 9 },
          { name: 'Sat', value: 10 },
          { name: 'Sun', value: 9 },
        ]
      },
      applicationsPerVacancy: {
        value: 32,
        change: 28,
        benchmark: 25,
        chartData: [
          { name: 'Week 1', value: 15 },
          { name: 'Week 2', value: 22 },
          { name: 'Week 3', value: 28 },
          { name: 'Week 4', value: 32 },
        ]
      },
      firstWeekApplications: {
        value: 15,
        change: 0,
        benchmark: 15,
        chartData: [
          { name: 'Day 1', value: 6 },
          { name: 'Day 2', value: 4 },
          { name: 'Day 3', value: 2 },
          { name: 'Day 4', value: 1 },
          { name: 'Day 5', value: 1 },
          { name: 'Day 6', value: 1 },
          { name: 'Day 7', value: 0 },
        ]
      },
      conversionRate: {
        value: '36%',
        change: 3,
        benchmark: '35%',
        chartData: [
          { name: 'Week 1', value: 30 },
          { name: 'Week 2', value: 32 },
          { name: 'Week 3', value: 34 },
          { name: 'Week 4', value: 36 },
        ]
      }
    }
  },
  // Add more Logistics jobs
  {
    id: "job13",
    title: "Transportation Manager",
    company: "Amazon",
    location: "Dallas, TX",
    sector: "Logistics",
    description: "Amazon is seeking a Transportation Manager to optimize our delivery network in the Dallas region. The successful candidate will oversee route planning, carrier relations, and delivery performance metrics.",
    requirements: ["Transportation Management", "Route Optimization", "Carrier Relations", "Analytics"],
    datePosted: "2025-04-20",
    isQualityDescription: true,
    optimizationStatus: {
      salary: "green",
      location: "amber",
      jobTitle: "green"
    },
    stats: {
      timeToFirstApplication: {
        value: '6.2 hours',
        change: -38,
        benchmark: '10 hours',
        chartData: [
          { name: 'Mon', value: 10 },
          { name: 'Tue', value: 8 },
          { name: 'Wed', value: 7 },
          { name: 'Thu', value: 6.2 },
          { name: 'Fri', value: 8 },
          { name: 'Sat', value: 9 },
          { name: 'Sun', value: 8 },
        ]
      },
      applicationsPerVacancy: {
        value: 40,
        change: 60,
        benchmark: 25,
        chartData: [
          { name: 'Week 1', value: 18 },
          { name: 'Week 2', value: 25 },
          { name: 'Week 3', value: 33 },
          { name: 'Week 4', value: 40 },
        ]
      },
      firstWeekApplications: {
        value: 18,
        change: 20,
        benchmark: 15,
        chartData: [
          { name: 'Day 1', value: 7 },
          { name: 'Day 2', value: 5 },
          { name: 'Day 3', value: 3 },
          { name: 'Day 4', value: 2 },
          { name: 'Day 5', value: 1 },
          { name: 'Day 6', value: 0 },
          { name: 'Day 7', value: 0 },
        ]
      },
      conversionRate: {
        value: '46%',
        change: 31,
        benchmark: '35%',
        chartData: [
          { name: 'Week 1', value: 36 },
          { name: 'Week 2', value: 40 },
          { name: 'Week 3', value: 43 },
          { name: 'Week 4', value: 46 },
        ]
      }
    }
  },
  {
    id: "job14",
    title: "Inventory Control Specialist",
    company: "Amazon",
    location: "Atlanta, GA",
    sector: "Logistics",
    description: "Need inventory person. Count stock.",
    requirements: ["Inventory Management", "Excel", "Attention to Detail"],
    datePosted: "2025-05-10",
    isQualityDescription: false,
    optimizationStatus: {
      salary: "red",
      location: "amber",
      jobTitle: "amber"
    },
    stats: {
      timeToFirstApplication: {
        value: '9.8 hours',
        change: -2,
        benchmark: '10 hours',
        chartData: [
          { name: 'Mon', value: 12 },
          { name: 'Tue', value: 11 },
          { name: 'Wed', value: 10 },
          { name: 'Thu', value: 9.8 },
          { name: 'Fri', value: 11 },
          { name: 'Sat', value: 12 },
          { name: 'Sun', value: 10 },
        ]
      },
      applicationsPerVacancy: {
        value: 26,
        change: 4,
        benchmark: 25,
        chartData: [
          { name: 'Week 1', value: 12 },
          { name: 'Week 2', value: 17 },
          { name: 'Week 3', value: 22 },
          { name: 'Week 4', value: 26 },
        ]
      },
      firstWeekApplications: {
        value: 12,
        change: -20,
        benchmark: 15,
        chartData: [
          { name: 'Day 1', value: 5 },
          { name: 'Day 2', value: 3 },
          { name: 'Day 3', value: 2 },
          { name: 'Day 4', value: 1 },
          { name: 'Day 5', value: 1 },
          { name: 'Day 6', value: 0 },
          { name: 'Day 7', value: 0 },
        ]
      },
      conversionRate: {
        value: '34%',
        change: -3,
        benchmark: '35%',
        chartData: [
          { name: 'Week 1', value: 28 },
          { name: 'Week 2', value: 30 },
          { name: 'Week 3', value: 32 },
          { name: 'Week 4', value: 34 },
        ]
      }
    }
  },
  // Add a new sector: Marketing
  {
    id: "job15",
    title: "Marketing Manager",
    company: "Amazon",
    location: "San Francisco, CA (EC1R 5BP)",
    sector: "Marketing",
    description: "Amazon is seeking a talented Marketing Manager to lead our digital marketing initiatives. The ideal candidate will have experience developing and executing comprehensive marketing strategies across multiple channels.",
    requirements: ["Digital Marketing", "Campaign Management", "Analytics", "Content Strategy"],
    datePosted: "2025-04-12",
    isQualityDescription: true,
    optimizationStatus: {
      salary: "green",
      location: "green",
      jobTitle: "green"
    },
    stats: {
      timeToFirstApplication: {
        value: '2.8 hours',
        change: -72,
        benchmark: '10 hours',
        chartData: [
          { name: 'Mon', value: 6 },
          { name: 'Tue', value: 4 },
          { name: 'Wed', value: 3 },
          { name: 'Thu', value: 2.8 },
          { name: 'Fri', value: 5 },
          { name: 'Sat', value: 7 },
          { name: 'Sun', value: 6 },
        ]
      },
      applicationsPerVacancy: {
        value: 62,
        change: 148,
        benchmark: 25,
        chartData: [
          { name: 'Week 1', value: 30 },
          { name: 'Week 2', value: 42 },
          { name: 'Week 3', value: 54 },
          { name: 'Week 4', value: 62 },
        ]
      },
      firstWeekApplications: {
        value: 30,
        change: 100,
        benchmark: 15,
        chartData: [
          { name: 'Day 1', value: 12 },
          { name: 'Day 2', value: 8 },
          { name: 'Day 3', value: 5 },
          { name: 'Day 4', value: 3 },
          { name: 'Day 5', value: 1 },
          { name: 'Day 6', value: 1 },
          { name: 'Day 7', value: 0 },
        ]
      },
      conversionRate: {
        value: '65%',
        change: 86,
        benchmark: '35%',
        chartData: [
          { name: 'Week 1', value: 50 },
          { name: 'Week 2', value: 55 },
          { name: 'Week 3', value: 60 },
          { name: 'Week 4', value: 65 },
        ]
      }
    }
  },
  {
    id: "job16",
    title: "Social Media Specialist",
    company: "Amazon",
    location: "Los Angeles, CA",
    sector: "Marketing",
    description: "Need social media person. Post content.",
    requirements: ["Social Media", "Content Creation", "Analytics"],
    datePosted: "2025-05-16",
    isQualityDescription: false,
    optimizationStatus: {
      salary: "red",
      location: "amber",
      jobTitle: "amber"
    },
    stats: {
      timeToFirstApplication: {
        value: '6.5 hours',
        change: -35,
        benchmark: '10 hours',
        chartData: [
          { name: 'Mon', value: 10 },
          { name: 'Tue', value: 8 },
          { name: 'Wed', value: 7 },
          { name: 'Thu', value: 6.5 },
          { name: 'Fri', value: 8 },
          { name: 'Sat', value: 9 },
          { name: 'Sun', value: 8 },
        ]
      },
      applicationsPerVacancy: {
        value: 45,
        change: 80,
        benchmark: 25,
        chartData: [
          { name: 'Week 1', value: 20 },
          { name: 'Week 2', value: 30 },
          { name: 'Week 3', value: 38 },
          { name: 'Week 4', value: 45 },
        ]
      },
      firstWeekApplications: {
        value: 20,
        change: 33,
        benchmark: 15,
        chartData: [
          { name: 'Day 1', value: 8 },
          { name: 'Day 2', value: 5 },
          { name: 'Day 3', value: 3 },
          { name: 'Day 4', value: 2 },
          { name: 'Day 5', value: 1 },
          { name: 'Day 6', value: 1 },
          { name: 'Day 7', value: 0 },
        ]
      },
      conversionRate: {
        value: '40%',
        change: 14,
        benchmark: '35%',
        chartData: [
          { name: 'Week 1', value: 32 },
          { name: 'Week 2', value: 35 },
          { name: 'Week 3', value: 38 },
          { name: 'Week 4', value: 40 },
        ]
      }
    }
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

