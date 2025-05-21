
import React, { useState } from 'react';
import { currentUser, jobs } from '@/data/mockData';
import Header from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';
import JobSidebar from '@/components/jobs/JobSidebar';
import { Job } from '@/types';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(jobs.length > 0 ? jobs[0] : null);
  const navigate = useNavigate();
  
  const handleSelectJob = (job: Job) => {
    setSelectedJob(job);
    // Navigate to the optimisations page directly
    navigate(`/jobs/${job.id}/optimisations`);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-reed-light">
      <Header user={{...currentUser, company: 'Reed.co.uk'}} />
      <Navigation />
      
      <div className="flex-1 flex">
        <div className="w-1/4 max-w-xs bg-white">
          <JobSidebar 
            onSelectJob={handleSelectJob} 
            selectedJobId={selectedJob?.id || null} 
          />
        </div>
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center">
            <h2 className="text-xl font-medium text-gray-700 mb-4">Select a job to view optimisations</h2>
            <p className="text-gray-500">Choose a job from the sidebar to see AI-powered optimisation suggestions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
