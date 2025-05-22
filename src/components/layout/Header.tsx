
import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User as UserIcon, Bell, HelpCircle, Settings, LogOut } from "lucide-react";

interface HeaderProps {
  user: User;
}

const Header = ({ user }: HeaderProps) => {
  return (
    <header className="w-full bg-white px-6 py-3 flex items-center justify-between border-b shadow-sm">
      <div className="flex items-center gap-2">
        <div className="mr-2">
          <Link to="/">
            <img 
              src="/lovable-uploads/23ec89e3-a2a3-4e37-91f5-99d0c06f6574.png" 
              alt="Reed.co.uk Recruiter" 
              className="h-8 cursor-pointer"
            />
          </Link>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="text-reed-secondary">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-reed-secondary">
          <HelpCircle className="h-5 w-5" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar>
                {/* Use a placeholder Amazon logo for the user avatar */}
                <AvatarImage 
                  src="https://images.unsplash.com/photo-1493962853295-0fd70327578a?auto=format&fit=crop&q=80&w=100&h=100" 
                  alt="Amazon Recruiter" 
                  className="object-cover"
                />
                <AvatarFallback className="bg-orange-500 text-white relative">
                  <UserIcon className="h-5 w-5" />
                  <div className="absolute -top-1 -right-1 h-4 w-4 bg-yellow-400 rounded-full border-2 border-white" 
                    title="Amazon Recruiter">
                  </div>
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64" align="end">
            <DropdownMenuLabel>
              <div className="flex flex-col gap-1">
                <div className="flex items-center">
                  <span className="font-medium">{user.name}</span>
                  <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded-full">Amazon</span>
                </div>
                <span className="text-xs text-muted-foreground">{user.role}</span>
                <span className="text-xs text-muted-foreground">{user.company}</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
              <UserIcon className="h-4 w-4" />
              <span>My Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
              <Settings className="h-4 w-4" />
              <span>Account Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem>Employer Dashboard</DropdownMenuItem>
            <DropdownMenuItem>Manage Adverts</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center gap-2 text-red-600 cursor-pointer">
              <LogOut className="h-4 w-4" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
