
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';
import { ArrowUpRight, ArrowDownRight, TrendingUp, BriefcaseIcon, Users, ChartBar, ArrowLeft, MessageCircle } from 'lucide-react';
import Header from '@/components/layout/Header';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { currentUser } from '@/data/mockData';
import { 
  HoverCard, 
  HoverCardContent, 
  HoverCardTrigger 
} from "@/components/ui/hover-card";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";

// Market data for different sectors
const sectorData = {
  "IT & Telecom": {
    marketData: [
      { name: 'Jan', value: 4000 },
      { name: 'Feb', value: 3000 },
      { name: 'Mar', value: 5000 },
      { name: 'Apr', value: 2780 },
      { name: 'May', value: 4890 },
      { name: 'Jun', value: 6390 },
    ],
    positionTrends: [
      { name: 'Software Dev', values: 35.7, fill: '#8B5CF6' },
      { name: 'DevOps', values: 28.2, fill: '#D946EF' },
      { name: 'Data Science', values: 22.4, fill: '#9333EA' },
      { name: 'UX/UI', values: 20.1, fill: '#C084FC' },
      { name: 'Security', values: 18.9, fill: '#A855F7' },
    ],
    metrics: {
      averageSalary: "£75,400",
      salaryTrend: "+5.2%", 
      openPositions: "12,487",
      positionsTrend: "+12.3%",
      applicationRate: "18.4",
      applicationTrend: "-3.1%",
      timeToFill: "38",
      timeToFillTrend: "-2.5%",
      talentPool: "143,250",
      talentPoolTrend: "+7.8%",
      demandIndex: "8.4",
      demandIndexTrend: "+1.2",
    }
  },
  "Healthcare": {
    marketData: [
      { name: 'Jan', value: 3200 },
      { name: 'Feb', value: 3400 },
      { name: 'Mar', value: 3800 },
      { name: 'Apr', value: 4200 },
      { name: 'May', value: 4600 },
      { name: 'Jun', value: 5100 },
    ],
    positionTrends: [
      { name: 'Nurses', values: 42.1, fill: '#8B5CF6' },
      { name: 'Doctors', values: 33.4, fill: '#D946EF' },
      { name: 'Healthcare Asst', values: 25.7, fill: '#9333EA' },
      { name: 'Therapists', values: 18.3, fill: '#C084FC' },
      { name: 'Technicians', values: 15.6, fill: '#A855F7' },
    ],
    metrics: {
      averageSalary: "£41,200",
      salaryTrend: "+3.8%", 
      openPositions: "23,614",
      positionsTrend: "+15.7%",
      applicationRate: "12.3",
      applicationTrend: "-1.2%",
      timeToFill: "42",
      timeToFillTrend: "+3.1%",
      talentPool: "89,450",
      talentPoolTrend: "+4.2%",
      demandIndex: "9.2",
      demandIndexTrend: "+2.1",
    }
  },
  "Finance": {
    marketData: [
      { name: 'Jan', value: 5100 },
      { name: 'Feb', value: 4800 },
      { name: 'Mar', value: 5200 },
      { name: 'Apr', value: 5400 },
      { name: 'May', value: 5700 },
      { name: 'Jun', value: 6100 },
    ],
    positionTrends: [
      { name: 'Accountants', values: 31.2, fill: '#8B5CF6' },
      { name: 'Financial Analysts', values: 27.6, fill: '#D946EF' },
      { name: 'Investment Bankers', values: 21.9, fill: '#9333EA' },
      { name: 'Auditors', values: 19.4, fill: '#C084FC' },
      { name: 'Tax Advisors', values: 15.8, fill: '#A855F7' },
    ],
    metrics: {
      averageSalary: "£68,900",
      salaryTrend: "+4.1%", 
      openPositions: "8,742",
      positionsTrend: "+7.2%",
      applicationRate: "21.7",
      applicationTrend: "+2.4%",
      timeToFill: "35",
      timeToFillTrend: "-1.8%",
      talentPool: "104,820",
      talentPoolTrend: "+3.6%",
      demandIndex: "7.8",
      demandIndexTrend: "+0.9",
    }
  },
  "Retail": {
    marketData: [
      { name: 'Jan', value: 3800 },
      { name: 'Feb', value: 3600 },
      { name: 'Mar', value: 3900 },
      { name: 'Apr', value: 4100 },
      { name: 'May', value: 4300 },
      { name: 'Jun', value: 4800 },
    ],
    positionTrends: [
      { name: 'Store Managers', values: 28.3, fill: '#8B5CF6' },
      { name: 'Sales Associates', values: 24.6, fill: '#D946EF' },
      { name: 'Merchandisers', values: 18.9, fill: '#9333EA' },
      { name: 'Customer Service', values: 17.2, fill: '#C084FC' },
      { name: 'Logistics', values: 14.5, fill: '#A855F7' },
    ],
    metrics: {
      averageSalary: "£32,600",
      salaryTrend: "+2.7%", 
      openPositions: "19,854",
      positionsTrend: "+5.9%",
      applicationRate: "24.3",
      applicationTrend: "+1.8%",
      timeToFill: "28",
      timeToFillTrend: "-4.2%",
      talentPool: "188,730",
      talentPoolTrend: "+2.3%",
      demandIndex: "6.5",
      demandIndexTrend: "+0.7",
    }
  }
};

const suggestedQuestions = [
  "What are the hiring trends for Software Engineers in the IT sector?",
  "Show market insights for Healthcare and nursing positions",
  "What's the average salary for Financial Analysts in London?",
  "Compare retail management roles across different regions"
];

// Custom tooltip component for Recharts
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border/50 p-2 rounded-lg shadow-lg text-xs">
        <p className="font-medium">{label}</p>
        {payload.map((item: any, index: number) => (
          <div key={index} className="flex items-center gap-2 mt-1">
            <div 
              className="h-2 w-2 rounded-sm"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-muted-foreground">{item.name}: </span>
            <span className="font-mono font-medium">{item.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const MarketInsights = () => {
  const navigate = useNavigate();
  const [selectedSector, setSelectedSector] = useState("IT & Telecom");
  const [searchQuery, setSearchQuery] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [sectorMetrics, setSectorMetrics] = useState(sectorData["IT & Telecom"].metrics);
  const [marketData, setMarketData] = useState(sectorData["IT & Telecom"].marketData);
  const [positionTrends, setPositionTrends] = useState(sectorData["IT & Telecom"].positionTrends);
  const [isSearching, setIsSearching] = useState(false);
  
  // Function to detect sector from query
  const detectSector = (query: string): string | null => {
    const query_lower = query.toLowerCase();
    
    if (query_lower.includes("software") || query_lower.includes("developer") || 
        query_lower.includes("programmer") || query_lower.includes("it") || 
        query_lower.includes("tech") || query_lower.includes("web") ||
        query_lower.includes("devops") || query_lower.includes("data science")) {
      return "IT & Telecom";
    } else if (query_lower.includes("nurse") || query_lower.includes("doctor") || 
              query_lower.includes("healthcare") || query_lower.includes("medical") || 
              query_lower.includes("hospital") || query_lower.includes("clinic")) {
      return "Healthcare";
    } else if (query_lower.includes("finance") || query_lower.includes("bank") || 
              query_lower.includes("accountant") || query_lower.includes("financial") ||
              query_lower.includes("analyst") || query_lower.includes("investment")) {
      return "Finance";
    } else if (query_lower.includes("retail") || query_lower.includes("store") || 
              query_lower.includes("sales") || query_lower.includes("shop") ||
              query_lower.includes("merchandiser") || query_lower.includes("cashier")) {
      return "Retail";
    }
    
    return null;
  };

  // Function to handle search query
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setPopoverOpen(false);
    
    if (!query.trim()) return;
    
    setIsSearching(true);
    
    // Simulate API request with a timeout
    setTimeout(() => {
      const detectedSector = detectSector(query);
      
      if (detectedSector) {
        setSelectedSector(detectedSector);
        setSectorMetrics(sectorData[detectedSector].metrics);
        setMarketData(sectorData[detectedSector].marketData);
        setPositionTrends(sectorData[detectedSector].positionTrends);
        
        toast({
          title: "Insights Updated",
          description: `Showing market insights for the ${detectedSector} sector.`,
          duration: 3000,
        });
      } else {
        toast({
          title: "Sector Not Detected",
          description: "We couldn't detect a specific sector. Showing default insights.",
          duration: 3000,
        });
      }
      
      setIsSearching(false);
    }, 1000);
  }, []);

  // Handle suggested question click - modified to fix the issue
  const handleSuggestedQuestionClick = (question: string) => {
    // First update the input field
    setSearchQuery(question);
    
    // Close the popover immediately
    setPopoverOpen(false);
    
    // Set searching state
    setIsSearching(true);
    
    // Process the query (extract from handleSearch to ensure we're always running the same logic)
    setTimeout(() => {
      const detectedSector = detectSector(question);
      
      console.log("Selected question:", question);
      console.log("Detected sector:", detectedSector);
      
      if (detectedSector) {
        setSelectedSector(detectedSector);
        setSectorMetrics(sectorData[detectedSector].metrics);
        setMarketData(sectorData[detectedSector].marketData);
        setPositionTrends(sectorData[detectedSector].positionTrends);
        
        toast({
          title: "Insights Updated",
          description: `Showing market insights for the ${detectedSector} sector.`,
          duration: 3000,
        });
      } else {
        toast({
          title: "Sector Not Detected",
          description: "We couldn't detect a specific sector. Showing default insights.",
          duration: 3000,
        });
      }
      
      setIsSearching(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSearch(searchQuery);
    }
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header user={currentUser} />
      
      <div className="flex-1 p-6 max-w-7xl mx-auto w-full">
        {/* Go Back Button */}
        <Button 
          variant="ghost" 
          onClick={handleGoHome} 
          className="mb-4 hover:bg-gray-100 -ml-2"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        
        {/* Intelligent Search Input */}
        <HoverCard>
          <HoverCardTrigger asChild>
            <div>
              <Popover 
                open={popoverOpen && isInputFocused}
                onOpenChange={setPopoverOpen}
              >
                <PopoverTrigger asChild>
                  <div 
                    className={`bg-gray-100 rounded-lg p-4 mb-6 flex items-center shadow-sm border border-gray-200 ${isInputFocused ? 'ring-2 ring-reed/40' : 'hover:border-gray-300'}`}
                    onClick={() => setIsInputFocused(true)}
                    tabIndex={0}
                  >
                    <MessageCircle className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                    <Textarea
                      placeholder="What job are you looking to post? (e.g., Software Engineer, Registered Nurse, Financial Analyst)"
                      className="border-0 focus-visible:ring-0 focus:ring-0 focus-visible:ring-offset-0 shadow-none resize-none p-0 min-h-0 h-6 bg-transparent placeholder:text-gray-400 text-sm flex-1"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setPopoverOpen(!!e.target.value);
                      }}
                      onKeyDown={handleKeyDown}
                      onFocus={() => {
                        setIsInputFocused(true);
                        setPopoverOpen(true); // Always show suggestions when focused
                      }}
                      onBlur={() => {
                        // Delay hiding popover to allow for click on popover content
                        setTimeout(() => {
                          setIsInputFocused(false);
                          setPopoverOpen(false);
                        }, 200);
                      }}
                    />
                    {isSearching && (
                      <div className="w-4 h-4 rounded-full border-2 border-reed border-t-transparent animate-spin ml-2"></div>
                    )}
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-full max-w-md p-0 shadow-lg border-gray-200" align="start">
                  <div className="py-2">
                    <p className="px-4 py-2 text-sm font-medium text-gray-700">Suggested Questions</p>
                    <div className="mt-1">
                      {suggestedQuestions.map((question, index) => (
                        <button 
                          key={index} 
                          className="px-4 py-3 text-sm text-left w-full hover:bg-gray-100 border-t border-gray-100 flex items-start"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation(); // Stop event bubbling
                            handleSuggestedQuestionClick(question);
                          }}
                          type="button"
                        >
                          <span className="text-reed mr-2 mt-0.5">•</span>
                          {question}
                        </button>
                      ))}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="flex justify-between space-x-4">
              <div>
                <h4 className="text-sm font-semibold">✨ Intelligent Search</h4>
                <p className="text-sm text-muted-foreground">
                  Type in a job title or description and our AI will update the dashboard with relevant sector insights.
                </p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-reed-secondary mb-1">Market Insights</h1>
            <p className="text-muted-foreground">Current trends in {selectedSector} sector</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Link to="/jobs/new">
              <Button className="bg-reed hover:bg-reed-hover">
                Continue to Job Post
              </Button>
            </Link>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <MetricCard 
            title="Average Salary"
            value={sectorMetrics.averageSalary}
            trend={sectorMetrics.salaryTrend}
            trendPositive={true}
            icon={<TrendingUp className="h-5 w-5 text-reed" />}
          />
          
          <MetricCard 
            title="Open Positions"
            value={sectorMetrics.openPositions}
            trend={sectorMetrics.positionsTrend}
            trendPositive={true}
            icon={<BriefcaseIcon className="h-5 w-5 text-reed" />}
          />
          
          <MetricCard 
            title="Applications per Position"
            value={sectorMetrics.applicationRate}
            trend={sectorMetrics.applicationTrend}
            trendPositive={false}
            icon={<ChartBar className="h-5 w-5 text-reed" />}
          />

          <MetricCard 
            title="Time to Fill (days)"
            value={sectorMetrics.timeToFill}
            trend={sectorMetrics.timeToFillTrend}
            trendPositive={true}
            icon={<TrendingUp className="h-5 w-5 text-reed" />}
          />

          <MetricCard 
            title="Talent Pool Size"
            value={sectorMetrics.talentPool}
            trend={sectorMetrics.talentPoolTrend}
            trendPositive={true}
            icon={<Users className="h-5 w-5 text-reed" />}
          />

          <MetricCard 
            title="Market Demand Index"
            value={sectorMetrics.demandIndex}
            trend={sectorMetrics.demandIndexTrend}
            trendPositive={true}
            icon={<ChartBar className="h-5 w-5 text-reed" />}
            info="Scale of 1-10, higher means more demand"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">{selectedSector} Jobs Market Trend</h3>
              <ChartContainer config={{}} className="h-[300px]">
                <LineChart data={marketData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#8B5CF6" 
                    strokeWidth={2}
                    dot={{ r: 4, strokeWidth: 2 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Top {selectedSector} Positions in Demand</h3>
              <ChartContainer config={{}} className="h-[300px]">
                <BarChart 
                  data={positionTrends} 
                  margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis type="number" tickLine={false} axisLine={false} />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    tickLine={false} 
                    axisLine={false} 
                    width={100}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey="values" 
                    fill="#8B5CF6"
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

interface MetricCardProps {
  title: string;
  value: string;
  trend: string;
  trendPositive: boolean;
  icon: React.ReactNode;
  info?: string;
}

const MetricCard = ({ title, value, trend, trendPositive, icon, info }: MetricCardProps) => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <div className="flex items-end gap-2">
              <h3 className="text-2xl font-bold">{value}</h3>
              <div className={`flex items-center text-sm ${trendPositive ? 'text-green-500' : 'text-red-500'}`}>
                {trendPositive ? (
                  <ArrowUpRight className="h-4 w-4 mr-0.5" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 mr-0.5" />
                )}
                {trend}
              </div>
            </div>
            {info && <p className="text-xs text-muted-foreground mt-1">{info}</p>}
          </div>
          <div className="rounded-full bg-reed/10 p-2">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketInsights;
