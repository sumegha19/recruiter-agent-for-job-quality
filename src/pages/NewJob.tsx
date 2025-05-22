
import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { generateJobDescription, testBedrockCredentials } from '@/services/bedrockService';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { debounce } from '@/lib/debounce';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { currentUser } from '@/data/mockData';
import Header from '@/components/layout/Header';

const NewJob = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [isTesting, setIsTesting] = useState(false);

  // Create a debounced function to generate job description
  const debouncedGenerateDescription = useCallback(
    debounce(async (title: string) => {
      if (title.trim().length > 3) {
        console.log("Generating description for:", title);
        setIsLoading(true);
        try {
          console.log("Calling generateJobDescription API");
          const result = await generateJobDescription({ jobTitle: title });
          console.log("API response:", result);
          setDescription(result.description);
          setRequirements(result.requirements);
        } catch (error) {
          console.error("Error generating job description:", error);
        } finally {
          setIsLoading(false);
        }
      }
    }, 1000), // 1 second delay
    []
  );

  // Call the debounced function when jobTitle changes
  useEffect(() => {
    console.log("Job title changed:", jobTitle);
    if (jobTitle.trim().length > 3) {
      console.log("Job title length > 3, calling debouncedGenerateDescription");
      debouncedGenerateDescription(jobTitle);
    }
  }, [jobTitle, debouncedGenerateDescription]);
  return (
    <div className="min-h-screen flex flex-col">
      <Header user={currentUser} />
      
      <div className="flex-1 p-6 max-w-6xl mx-auto w-full">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Post New Job</h1>
          <Link to="/">
            <Button variant="outline">Cancel</Button>
          </Link>
        </div>
        
        <Card>
          <CardHeader className="flex flex-col space-y-2">
            <div className="flex justify-between items-center">
              <CardTitle>Job Details</CardTitle>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={async () => {
                  setIsTesting(true);
                  setTestResult(null);
                  try {
                    console.log("Testing AWS Bedrock credentials");
                    const result = await testBedrockCredentials();
                    console.log("Test result:", result);
                    setTestResult(result);
                  } catch (error) {
                    console.error("Error testing credentials:", error);
                    setTestResult({ 
                      success: false, 
                      message: `Error testing credentials: ${error instanceof Error ? error.message : String(error)}` 
                    });
                  } finally {
                    setIsTesting(false);
                  }
                }}
                disabled={isTesting}
              >
                {isTesting ? <LoadingSpinner size="small" /> : "Test AWS Credentials"}
              </Button>
            </div>
            {testResult && (
              <div className={`text-sm p-2 rounded ${testResult.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {testResult.message}
              </div>
            )}
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                  <Label htmlFor="title">Job Title</Label>
                  <Input 
                    id="title" 
                    placeholder="e.g., Senior Software Engineer" 
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sector">Sector</Label>
                  <Select>
                    <SelectTrigger id="sector">
                      <SelectValue placeholder="Select sector" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="it">IT & Telecom</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="logistics">Logistics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="e.g., Seattle, WA (Remote)" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="type">Employment Type</Label>
                  <Select>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fulltime">Full-time</SelectItem>
                      <SelectItem value="parttime">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="description">Job Description</Label>
                  {isLoading && <LoadingSpinner size="small" />}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={async () => {
                      if (jobTitle.trim().length > 0) {
                        console.log("Manual generate button clicked for:", jobTitle);
                        setIsLoading(true);
                        try {
                          console.log("Manually calling generateJobDescription API");
                          const result = await generateJobDescription({ jobTitle });
                          console.log("Manual API response:", result);
                          setDescription(result.description);
                          setRequirements(result.requirements);
                        } catch (error) {
                          console.error("Error manually generating job description:", error);
                        } finally {
                          setIsLoading(false);
                        }
                      }
                    }}
                    disabled={isLoading || jobTitle.trim().length === 0}
                  >
                    Generate Description
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    {jobTitle.trim().length > 0 ? "Click to generate description" : "Enter a job title first"}
                  </span>
                </div>
                <Textarea 
                  id="description" 
                  placeholder={isLoading ? "Generating description..." : "Describe the role, responsibilities, and ideal candidate..."}
                  className="min-h-[150px]"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="requirements">Requirements</Label>
                  {isLoading && <LoadingSpinner size="small" />}
                </div>
                <Textarea 
                  id="requirements" 
                  placeholder={isLoading ? "Generating requirements..." : "List key skills and qualifications, one per line..."}
                  className="min-h-[100px]"
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2 border-t p-4">
            <Link to="/">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button>Post Job</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default NewJob;
