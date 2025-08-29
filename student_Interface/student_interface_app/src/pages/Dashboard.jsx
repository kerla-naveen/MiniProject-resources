import React, { useState, useEffect } from "react";
import { Student, Notice, Assignment, Test, Subject } from "@/entities/all";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  GraduationCap, 
  Users, 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  Calendar,
  TrendingUp,
  BookOpen
} from "lucide-react";
import { format } from "date-fns";

import AttendanceCard from "../components/dashboard/AttendanceCard.jsx";
import GradeCard from "../components/dashboard/GradeCard.jsx";
import UpcomingEvents from "../components/dashboard/UpcomingEvents.jsx";
import RecentNotices from "../components/dashboard/RecentNotices";
import QuickStats from "../components/dashboard/QuickStats";
const assignments = [
  {
    id: 1,
    title: "Math Assignment",
    subject_code: "MATH101",
    description: "Algebra homework",
    due_date: "2025-08-27",
    faculty_name: "Prof. Smith"
  }
];
const tests = [
  {
    id: 1,
    title: "Physics Quiz",
    subject_code: "PHY101",
    test_type: "quiz",
    date: "2025-08-28",
    time: "10:00 AM"
  }
];

export default function Dashboard() {
  const [studentData, setStudentData] = useState(null);
  const [notices, setNotices] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [tests, setTests] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const [studentList, noticeList, assignmentList, testList, subjectList] = await Promise.all([
        Student.list(),
        Notice.list("-created_date", 5),
        Assignment.filter({ status: "pending" }, "-due_date", 10),
        Test.filter({ status: "upcoming" }, "date", 5),
        Subject.list()
      ]);
      
      setStudentData(studentList[0] || null);
      setNotices(noticeList);
      setAssignments(assignmentList);
      setTests(testList);
      setSubjects(subjectList);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-slate-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array(4).fill(0).map((_, i) => (
              <div key={i} className="h-32 bg-slate-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-8 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen w-2/3">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
            Welcome back! 👋
          </h1>
          <p className="text-slate-600 text-lg">
            Here's your academic overview for today
          </p>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 w-230">
          <AttendanceCard 
            percentage={studentData?.attendance_percentage || 85} 
            isLoading={isLoading}
          />
          <GradeCard 
            percentage={studentData?.grade_percentage || 87.5}
            isLoading={isLoading}
          />
          <QuickStats 
            title="Pending Tasks"
            value={assignments.length}
            icon={CheckCircle}
            color="amber"
            description="assignments due"
          />
          <QuickStats 
            title="Upcoming Tests"
            value={tests.length}
            icon={Calendar}
            color="purple"
            description="tests this week"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <UpcomingEvents 
              assignments={assignments}
              tests={tests}
              isLoading={isLoading}
            />
            
            {/* Subject Performance */}
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <BookOpen className="w-6 h-6 text-indigo-600" />
                  Subject Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subjects.slice(0, 6).map((subject, index) => (
                    <div key={subject.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-50">
                      <div className="flex-1">
                        <p className="font-semibold text-slate-900">{subject.subject_name}</p>
                        <p className="text-sm text-slate-600">{subject.subject_code} • {subject.faculty_name}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-3">
                          <div>
                            <p className="text-sm text-slate-600">Attendance</p>
                            <p className="font-bold text-slate-900">{subject.attendance_percentage || 85}%</p>
                          </div>
                          <div>
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              {subject.grade || 'A'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <RecentNotices 
              notices={notices}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
