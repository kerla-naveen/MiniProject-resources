import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, CheckSquare, PenTool, AlertCircle } from "lucide-react";
import { format, isToday, isTomorrow, isThisWeek } from "date-fns";

export default function UpcomingEvents({ assignments, tests, isLoading }) {
  const allEvents = [
    ...assignments.map(a => ({
      ...a,
      type: 'assignment',
      date: a.due_date,
      icon: CheckSquare,
      color: 'bg-blue-50 text-blue-700 border-blue-200'
    })),
    ...tests.map(t => ({
      ...t,
      type: 'test',
      icon: PenTool,
      color: 'bg-purple-50 text-purple-700 border-purple-200'
    }))
  ].sort((a, b) => new Date(a.date) - new Date(b.date)).slice(0, 6);

  const getDateLabel = (date) => {
    const eventDate = new Date(date);
    if (isToday(eventDate)) return "Today";
    if (isTomorrow(eventDate)) return "Tomorrow";
    if (isThisWeek(eventDate)) return format(eventDate, "EEEE");
    return format(eventDate, "MMM d");
  };

  const isUrgent = (date) => {
    const eventDate = new Date(date);
    const daysDiff = Math.ceil((eventDate - new Date()) / (1000 * 60 * 60 * 24));
    return daysDiff <= 1;
  };

  if (isLoading) {
    return (
      <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
        <CardHeader>
          <div className="animate-pulse space-y-2">
            <div className="h-6 bg-slate-200 rounded w-1/3"></div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {Array(4).fill(0).map((_, i) => (
              <div key={i} className="h-16 bg-slate-200 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Calendar className="w-6 h-6 text-indigo-600" />
          Upcoming Events
        </CardTitle>
      </CardHeader>
      <CardContent>
        {allEvents.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600">No upcoming events</p>
          </div>
        ) : (
          <div className="space-y-4">
            {allEvents.map((event, index) => {
              const EventIcon = event.icon;
              const urgent = isUrgent(event.date);
              
              return (
                <div key={`${event.type}-${event.id}`} className={`flex items-center gap-4 p-4 rounded-xl border ${
                  urgent ? 'bg-red-50 border-red-200' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    urgent ? 'bg-red-100' : 'bg-white'
                  }`}>
                    <EventIcon className={`w-5 h-5 ${urgent ? 'text-red-600' : 'text-slate-600'}`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-slate-900">{event.title}</h4>
                      {urgent && (
                        <AlertCircle className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-600">
                      <span>{event.subject_code}</span>
                      <Badge variant="outline" className={event.color}>
                        {event.type === 'assignment' ? 'Assignment' : event.test_type || 'Test'}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm font-semibold text-slate-900">
                      <Clock className="w-4 h-4" />
                      {getDateLabel(event.date)}
                    </div>
                    {event.time && (
                      <p className="text-xs text-slate-600 mt-1">{event.time}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
