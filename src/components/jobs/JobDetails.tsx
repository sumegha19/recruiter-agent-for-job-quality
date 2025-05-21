
import React from 'react';
import { Job, Suggestion } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getSuggestionsByJobId } from '@/data/mockData';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Edit, Share, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface JobDetailsProps {
  job: Job | null;
}

const JobDetails = ({ job }: JobDetailsProps) => {
  if (!job) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Select a job to view optimisations</p>
      </div>
    );
  }

  const suggestions = getSuggestionsByJobId(job.id);

  return (
    <div className="p-6 h-full overflow-y-auto bg-reed-light">
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6 border-t-4 border-t-reed">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-reed-secondary">{job.title}</h2>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-gray-600">{job.company}</span>
              <span>•</span>
              <span className="text-gray-600">{job.location}</span>
            </div>
            <div className="mt-2">
              <Badge variant={job.isQualityDescription ? "outline" : "destructive"} className={job.isQualityDescription ? "bg-green-50 text-green-700 hover:bg-green-100" : ""}>
                {job.isQualityDescription ? "Optimized Description" : "Needs Improvement"}
              </Badge>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Edit className="h-4 w-4" />
              Edit
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Share className="h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <Button className="bg-reed hover:bg-reed-hover" asChild>
            <Link to={`/jobs/${job.id}/optimisations`}>
              Optimisations and Suggestions <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
