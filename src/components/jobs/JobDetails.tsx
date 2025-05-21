
import React from 'react';
import { Job, Suggestion } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getSuggestionsByJobId } from '@/data/mockData';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

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
    <div className="p-6 h-full overflow-y-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">{job.title}</h2>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-gray-600">{job.company}</span>
          <span>•</span>
          <span className="text-gray-600">{job.location}</span>
        </div>
        <div className="mt-2">
          <Badge variant={job.isQualityDescription ? "outline" : "destructive"}>
            {job.isQualityDescription ? "Optimized Description" : "Needs Improvement"}
          </Badge>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Job Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-line">{job.description}</p>

          <div className="mt-4">
            <h3 className="font-medium mb-2">Requirements:</h3>
            <ul className="list-disc pl-5">
              {job.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {suggestions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex items-center gap-2">
                <span>Optimizations & Suggestions</span>
                <Badge variant="outline">{suggestions.length}</Badge>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {suggestions.map((suggestion) => (
                <Alert key={suggestion.id} variant={suggestion.type === 'improvement' ? 'destructive' : 'default'}>
                  <AlertTitle>{suggestion.title}</AlertTitle>
                  <AlertDescription>
                    <div className="mt-2 text-sm">
                      <p>{suggestion.description}</p>
                      
                      {suggestion.before && suggestion.after && (
                        <div className="mt-4 space-y-3">
                          <div>
                            <div className="text-xs font-medium mb-1">Current Text:</div>
                            <div className="p-2 bg-gray-100 rounded text-gray-800">{suggestion.before}</div>
                          </div>
                          <div>
                            <div className="text-xs font-medium mb-1">Suggested Improvement:</div>
                            <div className="p-2 bg-green-50 rounded text-green-800 border border-green-200">{suggestion.after}</div>
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
