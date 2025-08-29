import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { User, TrendingUp } from "lucide-react";

export default function AttendanceCard({ percentage, trend, isLoading }) {
  const getAttendanceStatus = (percent) => {
    if (percent >= 85) return { text: "Excellent", color: "text-green-600" };
    if (percent >= 75) return { text: "Good", color: "text-blue-600" };
    if (percent >= 65) return { text: "Average", color: "text-yellow-600" };
    return { text: "Low", color: "text-red-600" };
  };

  const status = getAttendanceStatus(percentage);

  if (isLoading) {
    return (
      <Card className="shadow-sm rounded-lg bg-white/70">
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
    <Card className="flex flex-col  shadow-sm rounded-lg bg-white/70 backdrop-blur-sm">
      <CardHeader className="">
        <div className="flex flex-row items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-600">Attendance</p>
            <CardTitle className="text-3xl font-bold text-slate-900 ">
              {percentage}%
            </CardTitle>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <User className="w-6 h-6 text-blue-500" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <Progress value={percentage} className="h-2" />
        <div className="flex items-center justify-between ">
          <div className={`text-xs font-semibold ${status.color}`}>
            {status.text}
          </div>
          {trend && (
            <div className="flex items-center gap-1 text-xs text-green-600">
              <TrendingUp className="w-3 h-3" />
              {trend} this week
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
