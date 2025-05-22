import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const JobListingsHeader = () => {
  const navigate = useNavigate();
  
  const handleBackToDashboard = () => {
    navigate('/');
  };

  return (
    <div className="bg-reed-light py-8 px-8 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-reed-secondary">Job optimizations</h1>
        <Button 
          variant="outline" 
          className="flex items-center gap-2 text-reed hover:text-white hover:bg-reed transition-colors"
          onClick={handleBackToDashboard}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to dashboard
        </Button>
      </div>
    </div>
  );
};

export default JobListingsHeader;
