import React, { useState } from 'react';
import { Candidate } from '@/data/mockCandidates';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { ChevronRight, Mail, Phone, Calendar, MapPin, Briefcase, GraduationCap, CheckCircle } from 'lucide-react';
import { Job } from '@/types';

interface CandidatesListProps {
  candidates: Candidate[];
  onClose: () => void;
  jobs: Job[];
}

// Format status for display
const formatStatus = (status: Candidate['status']): string => {
  return status
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Get status color
const getStatusColor = (status: Candidate['status']): string => {
  switch (status) {
    case 'uncontacted':
      return 'bg-gray-100 text-gray-800';
    case 'contacted':
      return 'bg-blue-100 text-blue-800';
    case 'replied':
      return 'bg-green-100 text-green-800';
    case 'recruiter_phone_screen':
      return 'bg-purple-100 text-purple-800';
    case 'onsite_interviewed':
      return 'bg-indigo-100 text-indigo-800';
    case 'panel_interview':
      return 'bg-pink-100 text-pink-800';
    case 'hiring_manager_interview':
      return 'bg-orange-100 text-orange-800';
    case 'team_matching':
      return 'bg-teal-100 text-teal-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// Get initials from name
const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(part => part.charAt(0))
    .join('');
};

const CandidatesList = ({ candidates, onClose, jobs }: CandidatesListProps) => {
  const [selectedJobId, setSelectedJobId] = useState<string | 'all'>('all');
  
  // Group candidates by job
  const candidatesByJob = candidates.reduce((acc, candidate) => {
    if (!acc[candidate.jobId]) {
      acc[candidate.jobId] = [];
    }
    acc[candidate.jobId].push(candidate);
    return acc;
  }, {} as Record<string, Candidate[]>);
  
  // Get job title by job ID
  const getJobTitle = (jobId: string): string => {
    const job = jobs.find(j => j.id === jobId);
    return job ? job.title : 'Unknown Job';
  };
  
  // Filter candidates based on selected job
  const filteredCandidates = selectedJobId === 'all' 
    ? candidates 
    : candidatesByJob[selectedJobId] || [];
  
  // Group candidates by status for the selected job
  const candidatesByStatus = filteredCandidates.reduce((acc, candidate) => {
    const status = candidate.status;
    if (!acc[status]) {
      acc[status] = [];
    }
    acc[status].push(candidate);
    return acc;
  }, {} as Record<Candidate['status'], Candidate[]>);

  // Count candidates by status for the selected job
  const statusCounts = {
    uncontacted: candidatesByStatus.uncontacted?.length || 0,
    contacted: candidatesByStatus.contacted?.length || 0,
    replied: candidatesByStatus.replied?.length || 0,
    recruiter_phone_screen: candidatesByStatus.recruiter_phone_screen?.length || 0,
    onsite_interviewed: candidatesByStatus.onsite_interviewed?.length || 0,
    panel_interview: candidatesByStatus.panel_interview?.length || 0,
    hiring_manager_interview: candidatesByStatus.hiring_manager_interview?.length || 0,
    team_matching: candidatesByStatus.team_matching?.length || 0,
  };

  return (
    <div className="bg-reed-light p-6 h-full overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-reed-secondary">Candidates</h2>
        <Button variant="outline" onClick={onClose}>
          Back to Dashboard
        </Button>
      </div>

      {/* Job Selection */}
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Select Job</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={selectedJobId === 'all' ? 'default' : 'outline'} 
              onClick={() => setSelectedJobId('all')}
              className="mb-2"
            >
              All Jobs ({candidates.length})
            </Button>
            
            {Object.keys(candidatesByJob).map(jobId => (
              <Button 
                key={jobId} 
                variant={selectedJobId === jobId ? 'default' : 'outline'} 
                onClick={() => setSelectedJobId(jobId)}
                className="mb-2"
              >
                {getJobTitle(jobId)} ({candidatesByJob[jobId].length})
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6">
        {/* Pipeline Overview */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">
              {selectedJobId === 'all' 
                ? 'Hiring Pipeline - All Jobs' 
                : `Hiring Pipeline - ${getJobTitle(selectedJobId)}`}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="text-sm font-medium">All Candidates</div>
                <div className="text-sm font-medium">{filteredCandidates.length}</div>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-white p-3 rounded-lg border shadow-sm">
                  <div className="text-sm text-gray-500">Uncontacted</div>
                  <div className="text-xl font-semibold">{statusCounts.uncontacted}</div>
                </div>
                <div className="bg-white p-3 rounded-lg border shadow-sm">
                  <div className="text-sm text-gray-500">Contacted</div>
                  <div className="text-xl font-semibold">{statusCounts.contacted}</div>
                </div>
                <div className="bg-white p-3 rounded-lg border shadow-sm">
                  <div className="text-sm text-gray-500">Replied</div>
                  <div className="text-xl font-semibold">{statusCounts.replied}</div>
                </div>
                <div className="bg-white p-3 rounded-lg border shadow-sm">
                  <div className="text-sm text-gray-500">Phone Screen</div>
                  <div className="text-xl font-semibold">{statusCounts.recruiter_phone_screen}</div>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-white p-3 rounded-lg border shadow-sm">
                  <div className="text-sm text-gray-500">Onsite</div>
                  <div className="text-xl font-semibold">{statusCounts.onsite_interviewed}</div>
                </div>
                <div className="bg-white p-3 rounded-lg border shadow-sm">
                  <div className="text-sm text-gray-500">Panel</div>
                  <div className="text-xl font-semibold">{statusCounts.panel_interview}</div>
                </div>
                <div className="bg-white p-3 rounded-lg border shadow-sm">
                  <div className="text-sm text-gray-500">Hiring Manager</div>
                  <div className="text-xl font-semibold">{statusCounts.hiring_manager_interview}</div>
                </div>
                <div className="bg-white p-3 rounded-lg border shadow-sm">
                  <div className="text-sm text-gray-500">Team Matching</div>
                  <div className="text-xl font-semibold">{statusCounts.team_matching}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Candidates by Status */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4 flex flex-wrap">
            <TabsTrigger value="all">All Candidates ({filteredCandidates.length})</TabsTrigger>
            {Object.entries(statusCounts).map(([status, count]) => (
              count > 0 && (
                <TabsTrigger key={status} value={status}>
                  {formatStatus(status as Candidate['status'])} ({count})
                </TabsTrigger>
              )
            ))}
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {filteredCandidates.map(candidate => (
              <CandidateCard 
                key={candidate.id} 
                candidate={candidate} 
                jobTitle={getJobTitle(candidate.jobId)} 
              />
            ))}
          </TabsContent>

          {Object.entries(candidatesByStatus).map(([status, statusCandidates]) => (
            <TabsContent key={status} value={status} className="space-y-4">
              {statusCandidates.map(candidate => (
                <CandidateCard 
                  key={candidate.id} 
                  candidate={candidate} 
                  jobTitle={getJobTitle(candidate.jobId)} 
                />
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

// Individual candidate card component
const CandidateCard = ({ candidate, jobTitle }: { candidate: Candidate; jobTitle: string }) => {
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="p-6 flex flex-col md:flex-row items-start gap-4 flex-grow">
          <Avatar className="h-16 w-16">
            <AvatarImage src={candidate.profileImage} alt={candidate.name} />
            <AvatarFallback className="bg-reed text-white text-lg">
              {candidate.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-grow space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-reed-secondary">{candidate.name}</h3>
                  <p className="text-sm text-gray-600">Applied for: {jobTitle}</p>
                </div>
                <Badge className={getStatusColor(candidate.status)}>
                  {formatStatus(candidate.status)}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 mt-3">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                  {candidate.location}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Briefcase className="h-4 w-4 mr-2 text-gray-400" />
                  {candidate.experience}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <GraduationCap className="h-4 w-4 mr-2 text-gray-400" />
                  {candidate.education}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                  Applied: {candidate.appliedDate}
                </div>
              </div>
            </div>
            
            <div>
              <div className="text-sm font-medium mb-1">Skills</div>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill, index) => (
                  <Badge key={index} variant="outline" className="bg-gray-50">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            
            {candidate.notes && (
              <div>
                <div className="text-sm font-medium mb-1">Notes</div>
                <p className="text-sm text-gray-600">{candidate.notes}</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-gray-50 p-6 flex flex-col justify-between border-t md:border-t-0 md:border-l">
          <div className="space-y-4">
            <div>
              <div className="text-sm font-medium mb-1">Match Score</div>
              <div className="flex items-center gap-2">
                <Progress value={candidate.match} className="h-2 w-24" />
                <span className="text-sm font-medium">{candidate.match}%</span>
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <Button size="sm" className="bg-reed hover:bg-reed-hover w-full justify-start">
                <Mail className="h-4 w-4 mr-2" /> Contact
              </Button>
              <Button size="sm" variant="outline" className="w-full justify-start">
                <Phone className="h-4 w-4 mr-2" /> Schedule Call
              </Button>
              <Button size="sm" variant="outline" className="w-full justify-start">
                <CheckCircle className="h-4 w-4 mr-2" /> Move to Next Stage
              </Button>
            </div>
          </div>
          
          <Button variant="link" className="mt-4 w-full justify-center">
            View Full Profile <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CandidatesList;
