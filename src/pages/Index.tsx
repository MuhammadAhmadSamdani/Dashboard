
import React, { useState } from 'react';
import { 
  Users, 
  GraduationCap, 
  Building2, 
  DollarSign,
} from 'lucide-react';

import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import StatCard from '@/components/dashboard/StatCard';
import NavigationCard from '@/components/dashboard/NavigationCard';
import PieChart from '@/components/dashboard/PieChart';
import CardWithHeader from '@/components/dashboard/CardWithHeader';
import Calendar from '@/components/dashboard/Calendar';
import BarChart from '@/components/dashboard/BarChart';
import LineChart from '@/components/dashboard/LineChart';

const Index = () => {
  const [studentsFilter, setStudentsFilter] = useState('BSCS');
  const [attendanceFilter, setAttendanceFilter] = useState('This Week');
  const [earningsFilter, setEarningsFilter] = useState('Feb 2023');
  
  // Mock data for charts
  const pieChartData = [
    { value: 205, color: '#60a5fa', label: 'Boys' },
    { value: 170, color: '#c084fc', label: 'Girls' },
  ];
  
  const barChartData = [
    { label: 'Mon', values: [{ value: 75, color: '#60a5fa' }, { value: 25, color: '#c084fc' }] },
    { label: 'Tue', values: [{ value: 85, color: '#60a5fa' }, { value: 15, color: '#c084fc' }] },
    { label: 'Wed', values: [{ value: 60, color: '#60a5fa' }, { value: 40, color: '#c084fc' }] },
    { label: 'Thu', values: [{ value: 70, color: '#60a5fa' }, { value: 45, color: '#c084fc' }] },
    { label: 'Fri', values: [{ value: 75, color: '#60a5fa' }, { value: 25, color: '#c084fc' }] },
  ];
  
  const lineChartData = [
    { points: [25, 45, 35, 75, 50, 70, 90], color: '#60a5fa', strokeWidth: 3 },
    { points: [15, 35, 40, 30, 80, 60, 40], color: '#c084fc', strokeWidth: 3 },
  ];
  
  const handleNavClick = (section: string) => {
    console.log(`Navigating to ${section}`);
  };

  return (
    <DashboardLayout
      header={<DashboardHeader userName="Ahmad Samdani" userRole="Admin" />}
    >
      <div className="animate-stagger">
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard 
            icon={<GraduationCap className="h-6 w-6" />}
            title="Number of students"
            value="2468"
            color="blue"
          />
          <StatCard 
            icon={<Users className="h-6 w-6" />}
            title="Number of teachers"
            value="245"
            color="purple"
          />
          <StatCard 
            icon={<Building2 className="h-6 w-6" />}
            title="Number of Employee"
            value="508"
            color="purple"
          />
          <StatCard 
            icon={<DollarSign className="h-6 w-6" />}
            title="Total Revenue"
            value="$ 2,32,468"
            color="green"
          />
        </div>
        
        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
          {/* Students Chart Section */}
          <div className="lg:col-span-4">
            <CardWithHeader 
              title="Students" 
              dropdown={{
                selected: studentsFilter,
                options: ['BSCS', 'BSIT', 'BBA'],
                onChange: setStudentsFilter
              }}
            >
              <PieChart 
                data={pieChartData}
                totalLabel="Total"
                totalValue={375}
                legendItems={[
                  { label: 'Boys', value: '205', color: '#60a5fa' },
                  { label: 'Girls', value: '170', color: '#c084fc' }
                ]}
              />
            </CardWithHeader>
          </div>
          
          {/* Navigation Cards and Calendar */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Navigation Section */}
            <div className="space-y-4">
              <NavigationCard title="Student" color="blue" onClick={() => handleNavClick('Student')} />
              <NavigationCard title="Faculty" color="purple" onClick={() => handleNavClick('Faculty')} />
              <NavigationCard title="Timetable" color="green" onClick={() => handleNavClick('Timetable')} />
              <NavigationCard title="Administration" color="purple" onClick={() => handleNavClick('Administration')} />
            </div>
            
            {/* Calendar Section */}
            <div>
              <Calendar month="May" year={2025} />
            </div>
          </div>
        </div>
        
        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Attendance Chart */}
          <CardWithHeader 
            title="Attendance" 
            dropdown={{
              selected: attendanceFilter,
              options: ['This Week', 'Last Week', 'This Month'],
              onChange: setAttendanceFilter
            }}
          >
            <BarChart 
              data={barChartData}
              maxValue={100}
              title=""
              legends={[
                { label: 'Total Present', color: '#60a5fa' },
                { label: 'Total Absent', color: '#c084fc' }
              ]}
            />
          </CardWithHeader>
          
          {/* Earnings Chart */}
          <CardWithHeader 
            title="Earnings" 
            dropdown={{
              selected: earningsFilter,
              options: ['Feb 2023', 'Mar 2023', 'Apr 2023'],
              onChange: setEarningsFilter
            }}
          >
            <LineChart 
              data={lineChartData}
              labels={['01', '05', '10', '15', '20', '25', '30']}
              maxValue={100}
              title=""
              legends={[
                { label: 'Received Payments', color: '#60a5fa' },
                { label: 'Pending Payments', color: '#c084fc' }
              ]}
            />
          </CardWithHeader>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
