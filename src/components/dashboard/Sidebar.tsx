
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  Users,
  GraduationCap,
  Calendar as CalendarIcon,
  ClipboardList,
  Settings,
  BarChart2,
  Building2,
  PanelLeftClose,
  PanelLeftOpen,
  Table
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar";
import { Button } from '@/components/ui/button';

const menuItems = [
  {
    title: "Dashboard",
    icon: Home,
    path: "/"
  },
  {
    title: "Students",
    icon: GraduationCap,
    path: "/students"
  },
  {
    title: "Teachers",
    icon: Users,
    path: "/teachers"
  },
  {
    title: "Calendar",
    icon: CalendarIcon,
    path: "/calendar"
  },
  {
    title: "Attendance",
    icon: ClipboardList,
    path: "/attendance"
  },
  {
    title: "Timetable",
    icon: Table,
    path: "/timetable"
  },
  {
    title: "Administration",
    icon: Building2,
    path: "/administration"
  },
  {
    title: "Reports",
    icon: BarChart2,
    path: "/reports"
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/settings"
  }
];

const DashboardSidebar = () => {
  const location = useLocation();
  const { isMobile, open, toggleSidebar } = useSidebar();

  return (
    <Sidebar variant={isMobile ? "floating" : "sidebar"}>
      <SidebarHeader>
        <div className="flex items-center p-2">
          <div className="flex-1 text-xl font-bold text-primary">School Admin</div>
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      isActive={isActive} 
                      tooltip={item.title}
                      asChild
                      className={isActive ? "bg-primary/10 text-primary font-medium" : ""}
                    >
                      <Link to={item.path}>
                        <item.icon className={`h-5 w-5 ${isActive ? "text-primary" : ""}`} />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-2 flex flex-col gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full flex items-center gap-2 transition-all duration-300 ease-in-out"
            onClick={toggleSidebar}
          >
            {open ? (
              <>
                <PanelLeftClose className="h-4 w-4" />
                <span>Collapse</span>
              </>
            ) : (
              <>
                <PanelLeftOpen className="h-4 w-4" />
                <span>Expand</span>
              </>
            )}
          </Button>
          <div className="text-xs text-center text-muted-foreground">
            © 2025 School Admin
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
