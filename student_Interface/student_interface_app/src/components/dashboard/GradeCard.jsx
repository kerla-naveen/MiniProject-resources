import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { GraduationCap, Star } from "lucide-react";

export default function GradeCard({ percentage, isLoading }) {
  const getGradeInfo = (percent) => {
    if (percent >= 90) return { grade: "A+", color: "text-green-600", bg: "bg-green-100" };
    if (percent >= 80) return { grade: "A", color: "text-blue-600", bg: "bg-blue-100" };
    if (percent >= 70) return { grade: "B+", color: "text-indigo-600", bg: "bg-indigo-100" };
    if (percent >= 60) return { grade: "B", color: "text-yellow-600", bg: "bg-yellow-100" };
    return { grade: "C", color: "text-red-600", bg: "bg-red-100" };
  };

  const gradeInfo = getGradeInfo(percentage);

  if (isLoading) {
    return (
      <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <div className="animate-pulse space-y-2">
            <div className="h-4 bg-slate-200 rounded w-3/4"></div>
            <div className="h-8 bg-slate-200 rounded w-1/2"></div>
          </div>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-600">Overall Grade</p>
            <div className="flex items-center gap-2 mt-1">
              <CardTitle className="text-3xl font-bold text-slate-900">
                {percentage}%
              </CardTitle>
              {/* <div className={`px-2 py-1 rounded-md text-lg font-bold ${gradeInfo.bg} ${gradeInfo.color}`}>
                {gradeInfo.grade}
              </div> */}
            </div>
          </div>
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <Progress value={percentage} className="h-2" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs text-amber-600">
              <Star className="w-3 h-3 fill-current" />
              Top 15% of class
            </div>
            <div className="text-xs text-slate-500">
              Target: 90%
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
