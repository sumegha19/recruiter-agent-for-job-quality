
import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/layout/Header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { currentUser, jobs } from '@/data/mockData';
import { ArrowDown, Check, Info, MapPin, Briefcase, List } from 'lucide-react';

const JobOptimisations = () => {
  const { jobId } = useParams();
  const job = jobs.find(j => j.id === jobId);
  
  if (!job) {
    return (
      <div className="min-h-screen flex flex-col bg-reed-light">
        <Header user={{...currentUser, company: 'Reed.co.uk'}} />
        <div className="p-8 max-w-5xl mx-auto w-full">
          <Card>
            <CardContent className="p-8 flex justify-center items-center">
              <p>Job not found.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-reed-light">
      <Header user={{...currentUser, company: 'Reed.co.uk'}} />
      
      <div className="p-8 max-w-7xl mx-auto w-full">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-reed-secondary">Optimisations for: {job.title}</h1>
          <p className="text-gray-600">{job.company} • {job.location}</p>
        </div>
        
        {/* Top 3 Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Salary Widget */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="bg-white border-b flex items-center">
              <CardTitle className="text-lg flex items-center">
                <div className="rounded-full bg-reed/10 p-3 mr-3">
                  <ArrowDown className="h-6 w-6 text-reed" />
                </div>
                Salary Optimisation
              </CardTitle>
            </CardHeader>
            <CardContent className="bg-white pt-4">
              <div className="flex flex-col items-center text-center">
                <div className="text-5xl font-bold text-reed mb-4">+45%</div>
                <p className="text-gray-600 mb-4">Applications when salary is clearly stated</p>
                <Badge variant="outline" className="bg-green-50 text-green-700">Add Salary Range</Badge>
              </div>
            </CardContent>
          </Card>
          
          {/* Location Widget */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="bg-white border-b flex items-center">
              <CardTitle className="text-lg flex items-center">
                <div className="rounded-full bg-reed/10 p-3 mr-3">
                  <MapPin className="h-6 w-6 text-reed" />
                </div>
                Location Optimisation
              </CardTitle>
            </CardHeader>
            <CardContent className="bg-white pt-4">
              <div className="flex flex-col items-center text-center">
                <div className="text-5xl font-bold text-reed mb-4">+30%</div>
                <p className="text-gray-600 mb-4">Applications with specific location</p>
                <Badge variant="outline" className="bg-amber-50 text-amber-700">Include Postcode</Badge>
              </div>
            </CardContent>
          </Card>
          
          {/* Job Title Widget */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="bg-white border-b flex items-center">
              <CardTitle className="text-lg flex items-center">
                <div className="rounded-full bg-reed/10 p-3 mr-3">
                  <Briefcase className="h-6 w-6 text-reed" />
                </div>
                Job Title Optimisation
              </CardTitle>
            </CardHeader>
            <CardContent className="bg-white pt-4">
              <div className="flex flex-col items-center text-center">
                <div className="text-5xl font-bold text-reed mb-4">+65%</div>
                <p className="text-gray-600 mb-4">View rate with optimised title</p>
                <Badge variant="outline" className="bg-green-50 text-green-700">Title is Optimised</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Suggestions List */}
        <Card className="mb-8">
          <CardHeader className="bg-white border-b flex items-center">
            <CardTitle className="text-lg flex items-center">
              <div className="rounded-full bg-reed/10 p-3 mr-3">
                <List className="h-6 w-6 text-reed" />
              </div>
              Optimisation Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent className="bg-white pt-4">
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="rounded-full bg-amber-100 p-2 mr-3">
                  <Info className="h-4 w-4 text-amber-700" />
                </div>
                <div>
                  <h4 className="font-medium text-reed-secondary">Add a clear salary range</h4>
                  <p className="text-gray-600 text-sm mt-1">Jobs with visible salary ranges receive 45% more applications.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="rounded-full bg-amber-100 p-2 mr-3">
                  <Info className="h-4 w-4 text-amber-700" />
                </div>
                <div>
                  <h4 className="font-medium text-reed-secondary">Include a specific location with postcode</h4>
                  <p className="text-gray-600 text-sm mt-1">Adding a postcode will help candidates know exactly where they'll be working.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="rounded-full bg-green-100 p-2 mr-3">
                  <Check className="h-4 w-4 text-green-700" />
                </div>
                <div>
                  <h4 className="font-medium text-reed-secondary">Your job title is optimised</h4>
                  <p className="text-gray-600 text-sm mt-1">The job title is clear and uses commonly searched terms.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="rounded-full bg-amber-100 p-2 mr-3">
                  <Info className="h-4 w-4 text-amber-700" />
                </div>
                <div>
                  <h4 className="font-medium text-reed-secondary">Use more formatting in your description</h4>
                  <p className="text-gray-600 text-sm mt-1">Add bullet points and bold text to make key information stand out.</p>
                </div>
              </li>
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
        
        {/* Optimised Job Description */}
        <Card>
          <CardHeader className="bg-white border-b">
            <CardTitle className="text-reed-secondary">Optimised Job Description</CardTitle>
          </CardHeader>
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
        </Card>
      </div>
    </div>
  );
};

export default JobOptimisations;
