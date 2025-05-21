
import React, { useState } from 'react';
import { Job } from '@/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getAllSectors, getJobsBySector } from '@/data/mockData';
import { Search } from 'lucide-react';

interface JobSidebarProps {
  onSelectJob: (job: Job) => void;
  selectedJobId: string | null;
}

const JobSidebar = ({ onSelectJob, selectedJobId }: JobSidebarProps) => {
  const sectors = getAllSectors();
  const [activeTab, setActiveTab] = useState(sectors[0] || '');
  
  const jobsBySector = getJobsBySector(activeTab);
  
  return (
    <div className="w-full h-full bg-white border-r">
      <div className="p-4 border-b bg-reed-light">
        <h3 className="font-semibold text-lg text-reed-secondary">Your Job Listings</h3>
        <div className="relative mt-2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search jobs..." 
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-reed text-sm"
          />
        </div>
      </div>
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <div className="px-2 pt-2 bg-white">
          <TabsList className="w-full justify-start overflow-x-auto">
            {sectors.map((sector) => (
              <TabsTrigger key={sector} value={sector} className="whitespace-nowrap">
                {sector}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        
        {sectors.map((sector) => (
          <TabsContent key={sector} value={sector} className="mt-0">
            <ScrollArea className="h-[calc(100vh-230px)]">
              <div className="p-2 space-y-2">
                {getJobsBySector(sector).map((job) => (
                  <div 
                    key={job.id} 
                    className={`p-3 rounded-md cursor-pointer border-l-4 ${selectedJobId === job.id 
                      ? 'bg-reed-light border-l-reed text-reed-secondary' 
                      : 'border-l-transparent hover:bg-gray-50 hover:border-l-reed/50'}`}
                    onClick={() => onSelectJob(job)}
                  >
                    <h4 className="font-medium text-reed-secondary">{job.title}</h4>
                    <p className="text-sm text-gray-500 truncate">{job.location}</p>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-xs text-gray-400">Posted: {job.datePosted}</p>
                      {job.isQualityDescription ? 
                        <span className="text-xs px-2 py-0.5 bg-green-50 text-green-600 rounded-full">Optimized</span> : 
                        <span className="text-xs px-2 py-0.5 bg-accent/10 text-accent rounded-full">Needs review</span>
                      }
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default JobSidebar;
