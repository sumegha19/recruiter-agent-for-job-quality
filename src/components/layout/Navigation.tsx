
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Briefcase } from "lucide-react";

const Navigation = () => {
  return (
    <div className="flex gap-4 p-4">
      <Link to="/jobs/new">
        <Card className="bg-white hover:bg-gray-50 transition-colors cursor-pointer w-[180px]">
          <CardContent className="flex items-center justify-center gap-2 h-[100px] p-4">
            <Plus className="h-5 w-5" />
            <span className="font-medium text-lg">New Job</span>
          </CardContent>
        </Card>
      </Link>
      
      <Link to="/">
        <Card className="bg-amazon-light hover:bg-gray-200 transition-colors cursor-pointer border-amazon border-2 w-[180px]">
          <CardContent className="flex items-center justify-center gap-2 h-[100px] p-4">
            <Briefcase className="h-5 w-5" />
            <span className="font-medium text-lg">Existing Jobs</span>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};

export default Navigation;
