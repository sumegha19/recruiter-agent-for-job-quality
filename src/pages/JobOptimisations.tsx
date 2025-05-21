
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';
import JobSidebar from '@/components/jobs/JobSidebar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { currentUser, getJobById, jobs } from '@/data/mockData';
import { ArrowDown, Check, Info, MapPin, Briefcase, ChevronDown, BarChart, Clock, Users, TrendingUp, TrendingDown, Activity, Calendar } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart as RechartsBarChart, Bar, Legend } from 'recharts';
import { Job } from '@/types';

const JobOptimisations = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState<Job | undefined>(getJobById(jobId || ''));
  const [selectedJobId, setSelectedJobId] = useState(jobId);
  const [showDescription, setShowDescription] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    setJob(getJobById(jobId || ''));
    setSelectedJobId(jobId);
  }, [jobId]);
  
  const handleSelectJob = (selectedJob: Job) => {
    navigate(`/jobs/${selectedJob.id}/optimisations`);
  };
  
  if (!job) {
    return (
      <div className="min-h-screen flex flex-col bg-reed-light">
        <Header user={{...currentUser, company: 'Reed.co.uk'}} />
        <Navigation />
        <div className="flex-1 flex">
          <div className="w-1/4 max-w-xs bg-white">
            <JobSidebar 
              onSelectJob={handleSelectJob} 
              selectedJobId={selectedJobId || null} 
            />
          </div>
          <div className="p-8 flex-1">
            <Card>
              <CardContent className="p-8 flex justify-center items-center">
                <p>Job not found.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }
  
  // Get the job-specific performance metrics
  const performanceMetrics = job.stats || {
    timeToFirstApplication: {
      value: 'N/A',
      change: 0,
      benchmark: 'N/A',
      chartData: []
    },
    applicationsPerVacancy: {
      value: 'N/A',
      change: 0,
      benchmark: 'N/A',
      chartData: []
    },
    firstWeekApplications: {
      value: 'N/A',
      change: 0,
      benchmark: 'N/A',
      chartData: []
    },
    conversionRate: {
      value: 'N/A',
      change: 0,
      benchmark: 'N/A',
      chartData: []
    }
  };

  // Get the job-specific optimization statuses
  const optimizations = {
    salary: {
      status: job.optimizationStatus?.salary || 'red', 
      message: job.optimizationStatus?.salary === 'red' ? 'No Salary provided' : 
               job.optimizationStatus?.salary === 'amber' ? 'Salary below recommended range' : 
               'Salary within recommended range',
      improvement: '+45% applications when salary is clearly stated',
      action: job.optimizationStatus?.salary === 'red' ? 'Add Salary Range' : 
              job.optimizationStatus?.salary === 'amber' ? 'Increase Salary Range' : 
              'Salary is Optimised'
    },
    location: {
      status: job.optimizationStatus?.location || 'amber', 
      message: job.optimizationStatus?.location === 'red' ? 'County level location provided' : 
               job.optimizationStatus?.location === 'amber' ? 'Town level location provided' : 
               'Postcode provided',
      improvement: '+30% applications with specific location',
      action: job.optimizationStatus?.location === 'red' ? 'Add City/Town' : 
              job.optimizationStatus?.location === 'amber' ? 'Include Postcode' : 
              'Location is Optimised'
    },
    jobTitle: {
      status: job.optimizationStatus?.jobTitle || 'amber', 
      message: job.optimizationStatus?.jobTitle === 'red' ? 'Title too long or contains special characters' : 
               job.optimizationStatus?.jobTitle === 'amber' ? 'Title could be more optimized' : 
               'Title is optimal',
      improvement: '+65% view rate with optimised title',
      action: job.optimizationStatus?.jobTitle === 'red' ? 'Simplify Job Title' : 
              job.optimizationStatus?.jobTitle === 'amber' ? 'Use Industry Standard Title' : 
              'Title is Optimised'
    }
  };

  // Get background and text color based on status
  const getStatusColors = (status: string) => {
    switch(status) {
      case 'red':
        return {
          bg: 'bg-red-500',
          text: 'text-white',
          buttonBg: 'bg-red-50',
          buttonText: 'text-red-700'
        };
      case 'amber':
        return {
          bg: 'bg-amber-500',
          text: 'text-white',
          buttonBg: 'bg-amber-50',
          buttonText: 'text-amber-700'
        };
      case 'green':
      default:
        return {
          bg: 'bg-green-500',
          text: 'text-white',
          buttonBg: 'bg-green-50',
          buttonText: 'text-green-700'
        };
    }
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) {
      return <TrendingUp className="h-5 w-5 text-green-500" />;
    } else if (change < 0) {
      return <TrendingDown className="h-5 w-5 text-red-500" />;
    }
    return <Activity className="h-5 w-5 text-gray-500" />;
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-reed-light">
      <Header user={{...currentUser, company: 'Reed.co.uk'}} />
      <Navigation />
      
      <div className="flex-1 flex">
        <div className="w-1/4 max-w-xs bg-white">
          <JobSidebar 
            onSelectJob={handleSelectJob} 
            selectedJobId={jobId || null} 
          />
        </div>
        
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-reed-secondary">Optimisations for: {job.title}</h1>
            <p className="text-gray-600">{job.company} • {job.location}</p>
          </div>
          
          {/* Performance Metrics Widget */}
          <Card className="mb-6 bg-white hover:shadow-lg transition-shadow">
            <CardHeader className="border-b bg-white">
              <CardTitle className="text-lg flex items-center">
                <div className="rounded-full bg-reed/10 p-3 mr-3">
                  <BarChart className="h-6 w-6 text-reed" />
                </div>
                Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Time to First Application */}
                <Card className="bg-white border-none shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="rounded-full bg-blue-100 p-2 mr-2">
                          <Clock className="h-4 w-4 text-blue-600" />
                        </div>
                        <h3 className="text-sm font-medium">Avg. Time to First App</h3>
                      </div>
                      <div className="flex items-center">
                        {getChangeIcon(performanceMetrics.timeToFirstApplication.change)}
                        <span className={`text-xs font-medium ml-1 ${
                          performanceMetrics.timeToFirstApplication.change < 0 
                            ? 'text-green-500' 
                            : performanceMetrics.timeToFirstApplication.change > 0 
                              ? 'text-red-500' 
                              : 'text-gray-500'
                        }`}>
                          {Math.abs(performanceMetrics.timeToFirstApplication.change)}%
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-col">
                      <span className="text-2xl font-bold">{performanceMetrics.timeToFirstApplication.value}</span>
                      <span className="text-xs text-gray-500">Industry benchmark: {performanceMetrics.timeToFirstApplication.benchmark}</span>
                      <div className="h-16 mt-2">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={performanceMetrics.timeToFirstApplication.chartData}>
                            <defs>
                              <linearGradient id="timeGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <Area type="monotone" dataKey="value" stroke="#3B82F6" fill="url(#timeGradient)" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Applications per Vacancy */}
                <Card className="bg-white border-none shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="rounded-full bg-purple-100 p-2 mr-2">
                          <Users className="h-4 w-4 text-purple-600" />
                        </div>
                        <h3 className="text-sm font-medium">Apps per Vacancy</h3>
                      </div>
                      <div className="flex items-center">
                        {getChangeIcon(performanceMetrics.applicationsPerVacancy.change)}
                        <span className={`text-xs font-medium ml-1 ${
                          performanceMetrics.applicationsPerVacancy.change > 0 
                            ? 'text-green-500' 
                            : performanceMetrics.applicationsPerVacancy.change < 0 
                              ? 'text-red-500' 
                              : 'text-gray-500'
                        }`}>
                          {Math.abs(performanceMetrics.applicationsPerVacancy.change)}%
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-col">
                      <span className="text-2xl font-bold">{performanceMetrics.applicationsPerVacancy.value}</span>
                      <span className="text-xs text-gray-500">Industry benchmark: {performanceMetrics.applicationsPerVacancy.benchmark}</span>
                      <div className="h-16 mt-2">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={performanceMetrics.applicationsPerVacancy.chartData}>
                            <defs>
                              <linearGradient id="apvGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <Area type="monotone" dataKey="value" stroke="#8B5CF6" fill="url(#apvGradient)" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* First Week Applications */}
                <Card className="bg-white border-none shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="rounded-full bg-green-100 p-2 mr-2">
                          <Calendar className="h-4 w-4 text-green-600" />
                        </div>
                        <h3 className="text-sm font-medium">First 7 Days Apps</h3>
                      </div>
                      <div className="flex items-center">
                        {getChangeIcon(performanceMetrics.firstWeekApplications.change)}
                        <span className={`text-xs font-medium ml-1 ${
                          performanceMetrics.firstWeekApplications.change > 0 
                            ? 'text-green-500' 
                            : performanceMetrics.firstWeekApplications.change < 0 
                              ? 'text-red-500' 
                              : 'text-gray-500'
                        }`}>
                          {Math.abs(performanceMetrics.firstWeekApplications.change)}%
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-col">
                      <span className="text-2xl font-bold">{performanceMetrics.firstWeekApplications.value}</span>
                      <span className="text-xs text-gray-500">Industry benchmark: {performanceMetrics.firstWeekApplications.benchmark}</span>
                      <div className="h-16 mt-2">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsBarChart data={performanceMetrics.firstWeekApplications.chartData}>
                            <Bar dataKey="value" fill="#10B981" radius={[4, 4, 0, 0]} />
                          </RechartsBarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Conversion Rate */}
                <Card className="bg-white border-none shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="rounded-full bg-amber-100 p-2 mr-2">
                          <Activity className="h-4 w-4 text-amber-600" />
                        </div>
                        <h3 className="text-sm font-medium">Conversion Rate</h3>
                      </div>
                      <div className="flex items-center">
                        {getChangeIcon(performanceMetrics.conversionRate.change)}
                        <span className={`text-xs font-medium ml-1 ${
                          performanceMetrics.conversionRate.change > 0 
                            ? 'text-green-500' 
                            : performanceMetrics.conversionRate.change < 0 
                              ? 'text-red-500' 
                              : 'text-gray-500'
                        }`}>
                          {Math.abs(performanceMetrics.conversionRate.change)}%
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-col">
                      <span className="text-2xl font-bold">{performanceMetrics.conversionRate.value}</span>
                      <span className="text-xs text-gray-500">Industry benchmark: {performanceMetrics.conversionRate.benchmark}</span>
                      <div className="h-16 mt-2">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={performanceMetrics.conversionRate.chartData}>
                            <defs>
                              <linearGradient id="conversionGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <Area type="monotone" dataKey="value" stroke="#F59E0B" fill="url(#conversionGradient)" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
          
          {/* Top 3 Widgets */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Salary Widget */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className={`border-b flex items-center ${getStatusColors(optimizations.salary.status).bg}`}>
                <CardTitle className="text-lg flex items-center text-white">
                  <div className="rounded-full bg-white/20 p-2 mr-2">
                    <ArrowDown className="h-5 w-5 text-white" />
                  </div>
                  Salary
                </CardTitle>
              </CardHeader>
              <CardContent className="bg-white pt-4">
                <div className="flex flex-col items-center text-center">
                  <div className="text-4xl font-bold text-reed mb-3">+45%</div>
                  <p className="text-gray-600 mb-3 text-sm">Applications when salary is clearly stated</p>
                  <Badge variant="outline" className={`${getStatusColors(optimizations.salary.status).buttonBg} ${getStatusColors(optimizations.salary.status).buttonText}`}>
                    {optimizations.salary.action}
                  </Badge>
                </div>
              </CardContent>
            </Card>
            
            {/* Location Widget */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className={`border-b flex items-center ${getStatusColors(optimizations.location.status).bg}`}>
                <CardTitle className="text-lg flex items-center text-white">
                  <div className="rounded-full bg-white/20 p-2 mr-2">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent className="bg-white pt-4">
                <div className="flex flex-col items-center text-center">
                  <div className="text-4xl font-bold text-reed mb-3">+30%</div>
                  <p className="text-gray-600 mb-3 text-sm">Applications with specific location</p>
                  <Badge variant="outline" className={`${getStatusColors(optimizations.location.status).buttonBg} ${getStatusColors(optimizations.location.status).buttonText}`}>
                    {optimizations.location.action}
                  </Badge>
                </div>
              </CardContent>
            </Card>
            
            {/* Job Title Widget */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className={`border-b flex items-center ${getStatusColors(optimizations.jobTitle.status).bg}`}>
                <CardTitle className="text-lg flex items-center text-white">
                  <div className="rounded-full bg-white/20 p-2 mr-2">
                    <Briefcase className="h-5 w-5 text-white" />
                  </div>
                  Job Title
                </CardTitle>
              </CardHeader>
              <CardContent className="bg-white pt-4">
                <div className="flex flex-col items-center text-center">
                  <div className="text-4xl font-bold text-reed mb-3">+65%</div>
                  <p className="text-gray-600 mb-3 text-sm">View rate with optimised title</p>
                  <Badge variant="outline" className={`${getStatusColors(optimizations.jobTitle.status).buttonBg} ${getStatusColors(optimizations.jobTitle.status).buttonText}`}>
                    {optimizations.jobTitle.action}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Suggestions List */}
          <Card className="mb-6">
            <CardHeader className="bg-white border-b flex items-center">
              <CardTitle className="text-lg flex items-center">
                <div className="rounded-full bg-reed/10 p-3 mr-3">
                  <Info className="h-6 w-6 text-reed" />
                </div>
                Optimisation Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent className="bg-white pt-4">
              <ul className="space-y-4">
                {optimizations.salary.status === 'red' && (
                  <li className="flex items-start">
                    <div className="rounded-full bg-red-100 p-2 mr-3">
                      <Info className="h-4 w-4 text-red-700" />
                    </div>
                    <div>
                      <h4 className="font-medium text-reed-secondary">Add a clear salary range</h4>
                      <p className="text-gray-600 text-sm mt-1">Jobs with visible salary ranges receive 45% more applications.</p>
                    </div>
                  </li>
                )}
                
                {optimizations.salary.status === 'amber' && (
                  <li className="flex items-start">
                    <div className="rounded-full bg-amber-100 p-2 mr-3">
                      <Info className="h-4 w-4 text-amber-700" />
                    </div>
                    <div>
                      <h4 className="font-medium text-reed-secondary">Consider increasing your salary range</h4>
                      <p className="text-gray-600 text-sm mt-1">Your salary is below the recommended range for this role and location.</p>
                    </div>
                  </li>
                )}
                
                {optimizations.location.status !== 'green' && (
                  <li className="flex items-start">
                    <div className="rounded-full bg-amber-100 p-2 mr-3">
                      <Info className="h-4 w-4 text-amber-700" />
                    </div>
                    <div>
                      <h4 className="font-medium text-reed-secondary">Include a specific location with postcode</h4>
                      <p className="text-gray-600 text-sm mt-1">Adding a postcode will help candidates know exactly where they'll be working.</p>
                    </div>
                  </li>
                )}
                
                {optimizations.jobTitle.status === 'green' && (
                  <li className="flex items-start">
                    <div className="rounded-full bg-green-100 p-2 mr-3">
                      <Check className="h-4 w-4 text-green-700" />
                    </div>
                    <div>
                      <h4 className="font-medium text-reed-secondary">Your job title is optimised</h4>
                      <p className="text-gray-600 text-sm mt-1">The job title is clear and uses commonly searched terms.</p>
                    </div>
                  </li>
                )}
                
                {optimizations.jobTitle.status === 'amber' && (
                  <li className="flex items-start">
                    <div className="rounded-full bg-amber-100 p-2 mr-3">
                      <Info className="h-4 w-4 text-amber-700" />
                    </div>
                    <div>
                      <h4 className="font-medium text-reed-secondary">Consider using an industry standard job title</h4>
                      <p className="text-gray-600 text-sm mt-1">Using standard job titles can increase visibility in search results.</p>
                    </div>
                  </li>
                )}
                
                {optimizations.jobTitle.status === 'red' && (
                  <li className="flex items-start">
                    <div className="rounded-full bg-red-100 p-2 mr-3">
                      <Info className="h-4 w-4 text-red-700" />
                    </div>
                    <div>
                      <h4 className="font-medium text-reed-secondary">Simplify your job title</h4>
                      <p className="text-gray-600 text-sm mt-1">Job titles with more than 4 words or special characters perform poorly.</p>
                    </div>
                  </li>
                )}
                
                {!job.isQualityDescription && (
                  <li className="flex items-start">
                    <div className="rounded-full bg-amber-100 p-2 mr-3">
                      <Info className="h-4 w-4 text-amber-700" />
                    </div>
                    <div>
                      <h4 className="font-medium text-reed-secondary">Use more formatting in your description</h4>
                      <p className="text-gray-600 text-sm mt-1">Add bullet points and bold text to make key information stand out.</p>
                    </div>
                  </li>
                )}
                
                <li className="flex items-start">
                  <div className="rounded-full bg-amber-100 p-2 mr-3">
                    <Info className="h-4 w-4 text-amber-700" />
                  </div>
                  <div>
                    <h4 className="font-medium text-reed-secondary">List more benefits</h4>
                    <p className="text-gray-600 text-sm mt-1">Candidates are 3x more likely to apply when benefits are clearly stated.</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          {/* AI Optimised Job Description Widget */}
          <Card className="mb-6 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setShowDescription(!showDescription)}>
            <CardHeader className="bg-white border-b flex items-center justify-between">
              <CardTitle className="text-lg flex items-center">
                <div className="rounded-full bg-reed/10 p-3 mr-3">
                  <Info className="h-6 w-6 text-reed" />
                </div>
                AI Optimised Job Description
              </CardTitle>
              <ChevronDown className={`h-6 w-6 transition-transform duration-200 ${showDescription ? 'transform rotate-180' : ''}`} />
            </CardHeader>
            
            {showDescription && (
              <CardContent className="bg-white pt-4">
                <div className="border-l-4 border-green-400 pl-4 py-2 bg-green-50 mb-4">
                  <p className="text-sm text-green-800">
                    Our AI has analysed your job description and optimised it to attract more qualified candidates. 
                    You can use this as a template to improve your job posting.
                  </p>
                </div>
                
                <div className="prose max-w-none">
                  <h3 className="font-bold text-xl text-reed-secondary">{job.title}</h3>
                  <p className="font-bold">Salary: £35,000 - £45,000 per annum, depending on experience</p>
                  <p className="font-bold">Location: {job.location} (EC1R 5BP)</p>
                  
                  <p className="mt-4">
                    We're seeking an experienced {job.title.toLowerCase()} to join our dynamic team at {job.company} in the heart of {job.location}.
                  </p>
                  
                  <h4 className="font-bold mt-4">About the Role:</h4>
                  <p>
                    As our {job.title}, you will play a vital role in our organization's success by taking ownership of key projects and 
                    collaborating with cross-functional teams to deliver exceptional results.
                  </p>
                  
                  <h4 className="font-bold mt-4">Key Responsibilities:</h4>
                  <ul className="list-disc pl-5">
                    {job.requirements.map((req, index) => (
                      <li key={index} className="mb-2">{req}</li>
                    ))}
                    <li>Continuously improve processes and implement best practices</li>
                    <li>Provide regular reporting and insights to key stakeholders</li>
                  </ul>
                  
                  <h4 className="font-bold mt-4">Benefits:</h4>
                  <ul className="list-disc pl-5">
                    <li>Competitive salary: £35,000 - £45,000</li>
                    <li>25 days holiday + bank holidays</li>
                    <li>Flexible working arrangements</li>
                    <li>Health insurance and wellness benefits</li>
                    <li>Professional development opportunities</li>
                    <li>Regular team social events</li>
                  </ul>
                  
                  <p className="mt-4 font-bold">Why Join {job.company}?</p>
                  <p>
                    At {job.company}, we believe in fostering a collaborative, inclusive environment where talented professionals 
                    can thrive and grow. We offer excellent opportunities for career advancement and the chance to make a real impact.
                  </p>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <Button variant="outline" className="mr-2">Save as Draft</Button>
                  <Button className="bg-reed hover:bg-reed-hover">Apply Changes</Button>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default JobOptimisations;
