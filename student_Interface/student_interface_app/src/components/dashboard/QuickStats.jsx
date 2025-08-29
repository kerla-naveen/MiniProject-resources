import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const colorClasses = {
  amber: {
    bg: "bg-gradient-to-r from-amber-500 to-orange-500",
    text: "text-amber-600"
  },
  purple: {
    bg: "bg-gradient-to-r from-purple-500 to-indigo-500",
    text: "text-purple-600"
  },
  green: {
    bg: "bg-gradient-to-r from-green-500 to-emerald-500",
    text: "text-green-600"
  },
  blue: {
    bg: "bg-gradient-to-r from-blue-500 to-cyan-500",
    text: "text-blue-600"
  }
};

export default function QuickStats({ title, value, icon: Icon, color, description }) {
  const colorClass = colorClasses[color] || colorClasses.blue;

  return (
    <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-600">{title}</p>
            <CardTitle className="text-3xl font-bold text-slate-900 mt-1">
              {value}
            </CardTitle>
          </div>
          <div className={`w-12 h-12 ${colorClass.bg} rounded-xl flex items-center justify-center`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-slate-600">{description}</p>
      </CardContent>
    </Card>
  );
}
