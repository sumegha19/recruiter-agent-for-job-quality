
import React from 'react';
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
import { User as UserIcon, Bell, HelpCircle } from "lucide-react";

interface HeaderProps {
  user: User;
}

const Header = ({ user }: HeaderProps) => {
  return (
    <header className="w-full bg-white px-6 py-3 flex items-center justify-between border-b shadow-sm">
      <div className="flex items-center gap-2">
        <div className="mr-2">
          <img 
            src="/lovable-uploads/23ec89e3-a2a3-4e37-91f5-99d0c06f6574.png" 
            alt="Reed.co.uk Recruiter" 
            className="h-8"
          />
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
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-reed text-white">
                  <UserIcon className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel>
              <div className="flex flex-col gap-1">
                <span className="font-medium">{user.name}</span>
                <span className="text-xs text-muted-foreground">{user.role}</span>
                <span className="text-xs text-muted-foreground">{user.company}</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>My Account</DropdownMenuItem>
            <DropdownMenuItem>Employer Dashboard</DropdownMenuItem>
            <DropdownMenuItem>Manage Adverts</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
