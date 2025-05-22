
import React, { useState, useEffect } from 'react';
import { currentUser, jobs } from '@/data/mockData';
import { getAllCandidates } from '@/data/mockCandidates';
import Header from '@/components/layout/Header';
import { useNavigate, useLocation } from 'react-router-dom';
import CandidatesList from '@/components/jobs/CandidatesList';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Plus, Briefcase, User, ChevronRight } from "lucide-react";
import { Link } from 'react-router-dom';

const Dashboard = () => {
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
  
  const handleViewCandidates = () => {
    setShowCandidates(true);
  };
  
  const handleCloseCandidates = () => {
    setShowCandidates(false);
  };
  
  // Get all candidates for all jobs
  const candidates = getAllCandidates(jobs);
  
  return (
    <div className="min-h-screen flex flex-col bg-reed-light">
      <Header user={{...currentUser, company: 'Reed.co.uk'}} />
      
      {showCandidates ? (
        <div className="flex-1">
          <CandidatesList 
            candidates={candidates} 
            onClose={handleCloseCandidates}
            jobs={jobs}
          />
        </div>
      ) : (
        <div className="bg-reed-light py-6 px-8 flex-1">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-reed-secondary mb-4">Welcome to your recruiter portal</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link to="/jobs/market-insights">
                <Card className="bg-white hover:shadow-md transition-shadow cursor-pointer border-t-4 border-t-reed h-full">
                  <CardContent className="flex items-start p-6">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-reed-secondary mb-2">Post a new job</h3>
                      <p className="text-sm text-gray-500 mb-4">Create a new job listing and reach thousands of candidates.</p>
                      <Button variant="outline" className="text-reed hover:text-white hover:bg-reed">
                        Post job <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                    <div className="rounded-full bg-reed/10 p-3">
                      <Plus className="h-6 w-6 text-reed" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
              
              <Link to="/jobs/job1/optimisations">
                <Card className="bg-white hover:shadow-md transition-shadow cursor-pointer border-t-4 border-t-reed h-full">
                  <CardContent className="flex items-start p-6">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-reed-secondary mb-2">Manage job listings</h3>
                      <p className="text-sm text-gray-500 mb-4">Review and optimize your existing job postings.</p>
                      <Button variant="outline" className="text-reed hover:text-white hover:bg-reed">
                        View jobs <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                    <div className="rounded-full bg-reed/10 p-3">
                      <Briefcase className="h-6 w-6 text-reed" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
              
              <div onClick={handleViewCandidates}>
                <Card className="bg-white hover:shadow-md transition-shadow cursor-pointer border-t-4 border-t-reed-accent h-full">
                  <CardContent className="flex items-start p-6">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-reed-secondary mb-2">Candidate management</h3>
                      <p className="text-sm text-gray-500 mb-4">Review applications and manage your talent pipeline.</p>
                      <Button variant="outline" className="text-reed-accent hover:text-white hover:bg-reed-accent">
                        View candidates <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                    <div className="rounded-full bg-reed-accent/10 p-3">
                      <User className="h-6 w-6 text-reed-accent" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
