import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Outlet } from "react-router-dom";
import { 
  Home, 
  Bell, 
  Calendar, 
  Clock, 
  BookOpen, 
  FileText, 
  CheckSquare, 
  PenTool,
  GraduationCap,
  Menu,
  X
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Dashboard",
    url: createPageUrl("Dashboard"),
    icon: Home,
  },
  {
    title: "Notice Board",
    url: createPageUrl("NoticeBoard"),
    icon: Bell,
  },
  {
    title: "Timetable",
    url: createPageUrl("Timetable"),
    icon: Clock,
  },
  {
    title: "Academic Calendar",
    url: createPageUrl("AcademicCalendar"),
    icon: Calendar,
  },
  {
    title: "Subjects",
    url: createPageUrl("Subjects"),
    icon: BookOpen,
  },
  {
    title: "Assignments",
    url: createPageUrl("Assignments"),
    icon: CheckSquare,
  },
  {
    title: "Tests & Exams",
    url: createPageUrl("Tests"),
    icon: PenTool,
  },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Sidebar className="flex flex-col border-r border-slate-200 bg-white/80 backdrop-blur-sm">
          <SidebarHeader className="border-b border-slate-200 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-slate-900 text-lg">EduPortal</h2>
                <p className="text-xs text-slate-500 font-medium">Student Dashboard</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-4">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold text-slate-600 uppercase tracking-wider px-3 py-2">
                Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-1">
                  {navigationItems.map((item) => (
                    <SidebarMenuItem className={`hover:bg-indigo-50 ${
                          location.pathname === item.url ? 'bg-indigo-100 text-indigo-700 shadow-sm' : 'text-slate-700'
                        }`} key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        className={`hover:text-indigo-700 transition-all duration-300 rounded-xl p-1 `}
                      >
                        <Link to={item.url} className="flex items-center gap-3">
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup className="mt-8">
              <SidebarGroupLabel className="text-xs font-semibold text-slate-600 uppercase tracking-wider px-3 py-2">
                Quick Stats
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="px-3 py-2 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 font-medium">Attendance</span>
                    <span className="font-bold text-green-600 text-right">85%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 font-medium">Overall Grade</span>
                    <span className="font-bold text-blue-600 text-right">A-</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 font-medium">Pending Tasks</span>
                    <span className="font-bold text-amber-600 text-right">3</span>
                  </div>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-slate-200 p-4">
            <div className="flex items-center gap-3 p-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                S
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-900 text-sm truncate">Student Name</p>
                <p className="text-xs text-slate-500 truncate">Semester 5 • CSE</p>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col min-h-screen">
          <header className="bg-white/70 backdrop-blur-sm border-b border-slate-200 px-6 py-4 md:hidden">
            <div className="flex items-center justify-between">
              <SidebarTrigger className="hover:bg-slate-100 p-2 rounded-lg transition-colors duration-200" />
              <h1 className="text-xl font-bold text-slate-900">EduPortal</h1>
            </div>
          </header>

          <div className="flex-1 overflow-auto">
                <Outlet/>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
