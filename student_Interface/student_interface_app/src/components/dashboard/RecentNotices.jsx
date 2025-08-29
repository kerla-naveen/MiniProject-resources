import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, ExternalLink, AlertTriangle } from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

const categoryColors = {
  academic: "bg-blue-50 text-blue-700 border-blue-200",
  administrative: "bg-purple-50 text-purple-700 border-purple-200",
  examination: "bg-red-50 text-red-700 border-red-200",
  event: "bg-green-50 text-green-700 border-green-200",
  urgent: "bg-orange-50 text-orange-700 border-orange-200"
};

export default function RecentNotices({ notices, isLoading }) {
  if (isLoading) {
    return (
      <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
        <CardHeader>
          <div className="animate-pulse space-y-2">
            <div className="h-6 bg-slate-200 rounded w-1/2"></div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {Array(3).fill(0).map((_, i) => (
              <div key={i} className="h-20 bg-slate-200 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Bell className="w-6 h-6 text-indigo-600" />
            Recent Notices
          </CardTitle>
          <Link 
            to={createPageUrl("NoticeBoard")}
            className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
          >
            View All
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        {notices.length === 0 ? (
          <div className="text-center py-8">
            <Bell className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600">No recent notices</p>
          </div>
        ) : (
          <div className="space-y-4">
            {notices.slice(0, 5).map((notice) => (
              <div key={notice.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {notice.is_urgent && (
                        <AlertTriangle className="w-4 h-4 text-orange-500" />
                      )}
                      <Badge className={`${categoryColors[notice.category]} border text-xs`}>
                        {notice.category}
                      </Badge>
                    </div>
                    <h4 className="font-semibold text-slate-900 leading-tight mb-2">
                      {notice.title}
                    </h4>
                    <p className="text-sm text-slate-600 line-clamp-2">
                      {notice.content}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-2">
                      <span>{notice.posted_by}</span>
                      <span>•</span>
                      <span>{format(new Date(notice.created_date), "MMM d")}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
