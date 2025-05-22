
import React, { useState, useEffect } from 'react';
import { currentUser, jobs } from '@/data/mockData';
import { getAllCandidates, getCandidatesForJob } from '@/data/mockCandidates';
import Header from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';
import JobSidebar from '@/components/jobs/JobSidebar';
import CandidatesList from '@/components/jobs/CandidatesList';
import { Job } from '@/types';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Users, ChevronRight } from 'lucide-react';

const Dashboard = () => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(jobs.length > 0 ? jobs[0] : null);
  const [showCandidates, setShowCandidates] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check for showCandidates query parameter
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('showCandidates') === 'true') {
      setShowCandidates(true);
    }
  }, [location.search]);
  
  const handleSelectJob = (job: Job) => {
    setSelectedJob(job);
    setShowCandidates(false);
    // Navigate to the optimisations page directly
    navigate(`/jobs/${job.id}/optimisations`);
  };
  
  const handleViewCandidates = () => {
    setShowCandidates(true);
  };
  
  const handleCloseCandidates = () => {
    setShowCandidates(false);
  };
  
  // Get candidates for the selected job or all candidates if no job is selected
  const candidates = selectedJob 
    ? getCandidatesForJob(selectedJob.id, jobs)
    : getAllCandidates(jobs);
  
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
        <div className="flex-1 p-6">
          {showCandidates ? (
            <CandidatesList 
              candidates={candidates} 
              onClose={handleCloseCandidates} 
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="text-center max-w-md">
                <h2 className="text-2xl font-medium text-reed-secondary mb-4">
                  Welcome to your Recruitment Dashboard
                </h2>
                <p className="text-gray-600 mb-8">
                  Manage your job listings, view candidates, and get AI-powered optimization suggestions to improve your job descriptions.
                </p>
                <div className="flex flex-col gap-4">
                  <Button 
                    className="bg-reed hover:bg-reed-hover flex items-center justify-center gap-2 w-full"
                    onClick={handleViewCandidates}
                  >
                    <Users className="h-5 w-5" />
                    View Candidates
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex items-center justify-center gap-2 w-full"
                    onClick={() => selectedJob && navigate(`/jobs/${selectedJob.id}/optimisations`)}
                    disabled={!selectedJob}
                  >
                    Job Optimisations
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
