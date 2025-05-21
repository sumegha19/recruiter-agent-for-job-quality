
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
        <p className="text-muted-foreground">Select a job to view details</p>
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
      </div>

      <Card className="mb-6">
        <CardHeader className="bg-white border-b">
          <CardTitle className="text-reed-secondary">Job Details</CardTitle>
        </CardHeader>
        <CardContent className="bg-white">
          <p className="whitespace-pre-line">{job.description}</p>

          <div className="mt-6">
            <h3 className="font-medium mb-3 text-reed-secondary">Key Requirements:</h3>
            <ul className="list-disc pl-5 space-y-1">
              {job.requirements.map((req, index) => (
                <li key={index} className="text-gray-700">{req}</li>
              ))}
            </ul>
          </div>

          <div className="mt-6 flex justify-end">
            <Button className="bg-reed hover:bg-reed-hover" asChild>
              <Link to={`/jobs/${job.id}/optimisations`}>
                Optimisations and Suggestions <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {suggestions.length > 0 && (
        <Card>
          <CardHeader className="bg-white border-b flex flex-row items-center justify-between">
            <CardTitle className="text-reed-secondary flex items-center">
              <span>Optimizations & Suggestions</span>
              <Badge variant="outline" className="ml-2">{suggestions.length}</Badge>
            </CardTitle>
            <Button variant="link" className="text-reed-accent">Apply All Suggestions</Button>
          </CardHeader>
          <CardContent className="bg-white p-4">
            <div className="space-y-4">
              {suggestions.map((suggestion) => (
                <Alert 
                  key={suggestion.id} 
                  variant={suggestion.type === 'improvement' ? 'destructive' : 'default'}
                  className={suggestion.type === 'improvement' ? "border-amber-200 bg-amber-50" : "border-green-200 bg-green-50"}
                >
                  <AlertTitle className={suggestion.type === 'improvement' ? "text-amber-800" : "text-green-800"}>
                    {suggestion.title}
                  </AlertTitle>
                  <AlertDescription className={suggestion.type === 'improvement' ? "text-amber-700" : "text-green-700"}>
                    <div className="mt-2 text-sm">
                      <p>{suggestion.description}</p>
                      
                      {suggestion.before && suggestion.after && (
                        <div className="mt-4 space-y-3">
                          <div>
                            <div className="text-xs font-medium mb-1">Current Text:</div>
                            <div className="p-2 bg-white rounded text-gray-800 border border-gray-200">{suggestion.before}</div>
                          </div>
                          <div>
                            <div className="text-xs font-medium mb-1">Suggested Improvement:</div>
                            <div className="p-2 bg-white rounded text-gray-800 border border-green-200">{suggestion.after}</div>
                          </div>
                          <div className="flex justify-end mt-2">
                            <Button variant="outline" size="sm" className="mr-2">Ignore</Button>
                            <Button size="sm" className={suggestion.type === 'improvement' ? "bg-amber-600 hover:bg-amber-700" : "bg-green-600 hover:bg-green-700"}>
                              Apply Change
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default JobDetails;
