
import React from 'react';
import { Bell, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface DashboardHeaderProps {
  userName: string;
  userRole: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ userName, userRole }) => {
  return (
    <header className="flex items-center justify-between py-4 px-6 border-b border-slate-100 animate-fade-in">
      <div className="flex-1">
        <h1 className="text-2xl font-medium tracking-tight">Dashboard</h1>
      </div>
      
      <div className="flex items-center space-x-4 mx-4">
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input 
            type="search" 
            placeholder="Search..." 
            className="pl-8 bg-slate-50 border-none focus-visible:ring-1"
          />
        </div>
        
        <button className="p-2 rounded-full hover:bg-slate-100 transition-colors relative">
          <Bell className="h-5 w-5 text-slate-600" />
          <span className="absolute top-1 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
      </div>
      
      <div className="flex items-center space-x-3">
        <Avatar className="h-9 w-9 border border-slate-200">
          <AvatarImage src="" alt={userName} />
          <AvatarFallback className="bg-dashboard-highlight text-white font-medium">
            {userName.charAt(0)}
          </AvatarFallback>
        </Avatar>
        
        <div className="text-sm">
          <p className="font-medium">{userName}</p>
          <p className="text-xs text-muted-foreground">{userRole}</p>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
