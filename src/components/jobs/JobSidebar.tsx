
import React, { useState } from 'react';
import { Job } from '@/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getAllSectors, getJobsBySector } from '@/data/mockData';

interface JobSidebarProps {
  onSelectJob: (job: Job) => void;
  selectedJobId: string | null;
}

const JobSidebar = ({ onSelectJob, selectedJobId }: JobSidebarProps) => {
  const sectors = getAllSectors();
  const [activeTab, setActiveTab] = useState(sectors[0] || '');
  
  const jobsBySector = getJobsBySector(activeTab);
  
  return (
    <div className="w-full h-full border-r">
      <div className="p-4 border-b">
        <h3 className="font-semibold text-lg">Job Listings</h3>
      </div>
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <div className="px-2 pt-2">
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
                    className={`p-3 rounded-md cursor-pointer ${selectedJobId === job.id 
                      ? 'bg-amazon text-white' 
                      : 'hover:bg-gray-100'}`}
                    onClick={() => onSelectJob(job)}
                  >
                    <h4 className="font-medium">{job.title}</h4>
                    <p className="text-sm truncate">{job.location}</p>
                    <p className="text-xs text-opacity-80">Posted: {job.datePosted}</p>
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
