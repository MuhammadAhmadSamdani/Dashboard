
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Index from "./pages/Index";
import Students from "./pages/Students";
import CalendarPage from "./pages/CalendarPage";
import Attendance from "./pages/Attendance";
import Administration from "./pages/Administration";
import Reports from "./pages/Reports";
import Timetable from "./pages/Timetable";
import NotFound from "./pages/NotFound";
import TeachersPage from "./pages/Teachers";

// Create placeholder page for settings
const Settings = () => (
  <div className="flex items-center justify-center min-h-[80vh]">
    <h1 className="text-2xl font-bold">Settings Page</h1>
    <p>This is a placeholder for the Settings page.</p>
  </div>
);

const App = () => {
  // Create a new QueryClient instance inside the component
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/students" element={<Students />} />
            <Route path="/teachers" element={<TeachersPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/administration" element={<Administration />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/timetable" element={<Timetable />} />
            <Route path="/settings" element={<Settings />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
