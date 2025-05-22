
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { currentUser } from '@/data/mockData';
import Header from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';
import { useToast } from "@/hooks/use-toast";
import { Briefcase, MapPin, DollarSign } from "lucide-react";

const NewJob = () => {
  // Form state
  const [title, setTitle] = useState("");
  const [sector, setSector] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  
  const { toast } = useToast();

  const populateJobDescription = () => {
    if (title && sector && location && type) {
      const jobDescription = `Job Title: Software Developer
Location: London (Hybrid – 2 days in-office per week)
Salary: £151,000 + Benefits
Benefits: Third Space gym membership, flexible hybrid working, private health insurance, generous holiday allowance, and meaningful equity options

About Us
We're a fast-growing medical technology startup on a mission to revolutionize patient care through intelligent, scalable software. Our platform bridges the gap between healthcare providers and patients with powerful, data-driven tools that improve diagnosis, treatment, and outcomes.

We're building products that genuinely save lives—and we're doing it with cutting-edge technologies, a world-class team, and a relentless focus on quality and usability.

About the Role
We're looking for an exceptional Software Developer to join our growing engineering team. You'll work closely with product managers, clinicians, and designers to develop and deliver impactful features that support real-world medical use cases.

As an early team member, you'll have significant influence over the tech stack, architecture, and direction of the product. This is a role for someone who wants to do meaningful work with smart people in a high-trust, high-performance environment.

What You'll Do
- Design, build, and maintain scalable web applications and services
- Collaborate with cross-functional teams to understand clinical needs and translate them into technical solutions
- Write clean, maintainable, and testable code
- Contribute to system architecture and technical decision-making
- Participate in code reviews and mentor other developers as we grow
- Ensure security, compliance, and performance standards are upheld

What We're Looking For
- 4+ years of experience in a modern backend or full-stack development role
- Proficiency in Python, Node.js, TypeScript, or similar
- Experience with cloud platforms (AWS, GCP, or Azure)
- Strong understanding of software architecture and system design
- Passion for building high-quality, impactful software
- Interest or background in healthtech, medtech, or regulated environments is a plus
- You value collaboration, transparency, and continuous improvement

Perks & Benefits
- £151,000 salary
- Third Space gym membership – because healthy minds need healthy bodies
- Hybrid working – 2 days in our London office, 3 days remote
- Private health insurance
- Equity options – grow with us and share in our success
- Generous holiday allowance + mental wellness days
- Budget for personal development, learning, and conferences`;
      
      setDescription(jobDescription);
      toast({
        title: "Job description populated",
        description: "We've added a template job description for you.",
      });
    } else {
      toast({
        title: "Missing information",
        description: "Please fill in the job title, sector, location, and employment type first.",
        variant: "destructive",
      });
    }
  };

  const handlePostJob = () => {
    if (title && sector && location && type) {
      populateJobDescription();
    } else {
      toast({
        title: "Required fields missing",
        description: "Please fill in all required fields before posting.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header user={currentUser} />
      <Navigation />
      
      <div className="flex-1 p-6 max-w-3xl mx-auto w-full">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Post New Job</h1>
          <Link to="/">
            <Button variant="outline">Cancel</Button>
          </Link>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Job Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title <span className="text-red-500">*</span></Label>
                  <div className="relative">
                    <Input 
                      id="title" 
                      placeholder="e.g., Senior Software Engineer" 
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="pl-9"
                    />
                    <Briefcase className="absolute left-2.5 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sector">Sector <span className="text-red-500">*</span></Label>
                  <Select value={sector} onValueChange={setSector}>
                    <SelectTrigger id="sector">
                      <SelectValue placeholder="Select sector" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="it">IT & Telecom</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="logistics">Logistics</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location <span className="text-red-500">*</span></Label>
                  <div className="relative">
                    <Input 
                      id="location" 
                      placeholder="e.g., London, UK (Remote)" 
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="pl-9"
                    />
                    <MapPin className="absolute left-2.5 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="type">Employment Type <span className="text-red-500">*</span></Label>
                  <Select value={type} onValueChange={setType}>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fulltime">Full-time</SelectItem>
                      <SelectItem value="parttime">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="freelance">Freelance</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="description">Job Description</Label>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={populateJobDescription}
                    className="text-xs"
                  >
                    Generate Template
                  </Button>
                </div>
                <Textarea 
                  id="description" 
                  placeholder="Describe the role, responsibilities, and ideal candidate..." 
                  className="min-h-[150px]"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2 border-t p-4">
            <Link to="/">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button onClick={handlePostJob}>Post Job</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default NewJob;
