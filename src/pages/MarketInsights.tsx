
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';
import { ArrowUpRight, ArrowDownRight, TrendingUp, BriefcaseIcon, Users, ChartBar } from 'lucide-react';
import Header from '@/components/layout/Header';
import { Button } from "@/components/ui/button";
import { currentUser } from '@/data/mockData';

const itMarketData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 4890 },
  { name: 'Jun', value: 6390 },
];

const positionTrends = [
  { name: 'Software Dev', values: 35.7, fill: '#8B5CF6' },
  { name: 'DevOps', values: 28.2, fill: '#D946EF' },
  { name: 'Data Science', values: 22.4, fill: '#9333EA' },
  { name: 'UX/UI', values: 20.1, fill: '#C084FC' },
  { name: 'Security', values: 18.9, fill: '#A855F7' },
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
  const selectSector = "IT & Telecom";
  
  const sectorMetrics = {
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
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header user={currentUser} />
      
      <div className="flex-1 p-6 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-reed-secondary mb-1">Market Insights</h1>
            <p className="text-muted-foreground">Current trends in {selectSector} sector</p>
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
              <h3 className="text-lg font-medium mb-4">IT Jobs Market Trend</h3>
              <ChartContainer config={{}} className="h-[300px]">
                <LineChart data={itMarketData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
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
              <h3 className="text-lg font-medium mb-4">Top IT Positions in Demand</h3>
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
