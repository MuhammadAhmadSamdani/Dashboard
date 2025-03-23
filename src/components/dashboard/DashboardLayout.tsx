
import React, { ReactNode } from 'react';
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import DashboardSidebar from './Sidebar';

interface DashboardLayoutProps {
  header: ReactNode;
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ header, children }) => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-slate-50">
        <DashboardSidebar />
        <SidebarInset className="transition-all duration-300 ease-in-out">
          <div className="sticky top-0 z-10 bg-white shadow-sm">
            {header}
          </div>
          <main className="container mx-auto py-6 px-4">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
