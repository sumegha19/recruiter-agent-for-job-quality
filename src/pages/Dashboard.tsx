
import React, { useState } from 'react';
import { currentUser, jobs } from '@/data/mockData';
import Header from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';
import JobSidebar from '@/components/jobs/JobSidebar';
import JobDetails from '@/components/jobs/JobDetails';
import { Job } from '@/types';

const Dashboard = () => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(jobs.length > 0 ? jobs[0] : null);
  
  return (
    <div className="min-h-screen flex flex-col bg-reed-light">
      <Header user={{...currentUser, company: 'Reed.co.uk'}} />
      <Navigation />
      
      <div className="flex-1 flex shadow-inner">
        <div className="w-1/3 max-w-xs border-r">
          <JobSidebar 
            onSelectJob={setSelectedJob} 
            selectedJobId={selectedJob?.id || null} 
          />
        </div>
        <div className="flex-1">
          <JobDetails job={selectedJob} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
