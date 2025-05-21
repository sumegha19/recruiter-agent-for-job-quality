
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Briefcase, User, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  return (
    <div className="bg-reed-light py-6 px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-reed-secondary mb-4">Welcome to your recruiter portal</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/jobs/new">
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
          
          <Link to="/">
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
  );
};

export default Navigation;
