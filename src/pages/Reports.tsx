
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import CardWithHeader from '@/components/dashboard/CardWithHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BarChart from '@/components/dashboard/BarChart';
import LineChart from '@/components/dashboard/LineChart';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const Reports = () => {
  const [attendanceFilter, setAttendanceFilter] = useState('Monthly');
  const [performanceFilter, setPerformanceFilter] = useState('2023');

  // Attendance data
  const attendanceData = [
    {
      label: 'Jan',
      values: [
        { value: 88, color: '#3b82f6' },
        { value: 92, color: '#10b981' }
      ]
    },
    {
      label: 'Feb',
      values: [
        { value: 85, color: '#3b82f6' },
        { value: 90, color: '#10b981' }
      ]
    },
    {
      label: 'Mar',
      values: [
        { value: 90, color: '#3b82f6' },
        { value: 94, color: '#10b981' }
      ]
    },
    {
      label: 'Apr',
      values: [
        { value: 92, color: '#3b82f6' },
        { value: 96, color: '#10b981' }
      ]
    },
    {
      label: 'May',
      values: [
        { value: 89, color: '#3b82f6' },
        { value: 93, color: '#10b981' }
      ]
    },
    {
      label: 'Jun',
      values: [
        { value: 87, color: '#3b82f6' },
        { value: 91, color: '#10b981' }
      ]
    }
  ];

  // Enrollment data
  const enrollmentData = [
    {
      points: [420, 450, 480, 495, 510, 525],
      color: '#3b82f6'
    }
  ];

  // Performance data
  const performanceData = [
    {
      points: [3.2, 3.4, 3.5, 3.6, 3.7, 3.5],
      color: '#8b5cf6'
    },
    {
      points: [3.0, 3.1, 3.2, 3.3, 3.4, 3.3],
      color: '#10b981'
    }
  ];

  // Revenue data
  const revenueData = [
    {
      label: 'Q1',
      values: [
        { value: 250000, color: '#8b5cf6' }
      ]
    },
    {
      label: 'Q2',
      values: [
        { value: 300000, color: '#8b5cf6' }
      ]
    },
    {
      label: 'Q3',
      values: [
        { value: 280000, color: '#8b5cf6' }
      ]
    },
    {
      label: 'Q4',
      values: [
        { value: 320000, color: '#8b5cf6' }
      ]
    }
  ];

  return (
    <DashboardLayout
      header={
        <div className="flex justify-between items-center p-4 border-b">
          <div>
            <h1 className="text-2xl font-bold">Reports</h1>
            <p className="text-muted-foreground">School performance analytics and reports</p>
          </div>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Export Reports
          </Button>
        </div>
      }
    >
      <Tabs defaultValue="overview" className="mb-6">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="academic">Academic</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CardWithHeader
              title="Attendance Rate"
              dropdown={{
                selected: attendanceFilter,
                options: ['Weekly', 'Monthly', 'Yearly'],
                onChange: setAttendanceFilter
              }}
            >
              <BarChart
                data={attendanceData}
                maxValue={100}
                title="Average Attendance Rate (%)"
                legends={[
                  { label: 'Students', color: '#3b82f6' },
                  { label: 'Teachers', color: '#10b981' }
                ]}
              />
            </CardWithHeader>
            
            <CardWithHeader
              title="Student Enrollment"
            >
              <LineChart
                data={enrollmentData}
                labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']}
                maxValue={600}
                title="Total Enrolled Students"
                legends={[
                  { label: 'Students', color: '#3b82f6' }
                ]}
              />
            </CardWithHeader>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CardWithHeader
              title="Academic Performance"
              dropdown={{
                selected: performanceFilter,
                options: ['2021', '2022', '2023'],
                onChange: setPerformanceFilter
              }}
            >
              <LineChart
                data={performanceData}
                labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']}
                maxValue={4.0}
                title="Average GPA"
                legends={[
                  { label: 'Science', color: '#8b5cf6' },
                  { label: 'Arts', color: '#10b981' }
                ]}
              />
            </CardWithHeader>
            
            <CardWithHeader
              title="Revenue Overview"
            >
              <BarChart
                data={revenueData}
                maxValue={400000}
                title="Quarterly Revenue"
                legends={[
                  { label: 'Revenue', color: '#8b5cf6' }
                ]}
              />
            </CardWithHeader>
          </div>
        </TabsContent>
        
        <TabsContent value="academic">
          <div className="h-64 flex items-center justify-center border rounded-lg">
            <p className="text-muted-foreground">Academic reports content</p>
          </div>
        </TabsContent>
        
        <TabsContent value="financial">
          <div className="h-64 flex items-center justify-center border rounded-lg">
            <p className="text-muted-foreground">Financial reports content</p>
          </div>
        </TabsContent>
        
        <TabsContent value="attendance">
          <div className="h-64 flex items-center justify-center border rounded-lg">
            <p className="text-muted-foreground">Attendance reports content</p>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Reports;
