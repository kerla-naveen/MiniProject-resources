import React, { useState, useEffect } from "react";
import { TimeTable } from "@/entities/all";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, User, Calendar } from "lucide-react";

const timeSlots = [
  "9:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-1:00",
  "1:00-2:00", "2:00-3:00", "3:00-4:00", "4:00-5:00"
];

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function Timetable() {
  const [timetableData, setTimetableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentDay, setCurrentDay] = useState(new Date().getDay());

  useEffect(() => {
    loadTimetable();
  }, []);

  const loadTimetable = async () => {
    setIsLoading(true);
    try {
      const timetable = await TimeTable.list();
      setTimetableData(timetable);
    } catch (error) {
      console.error("Error loading timetable:", error);
    }
    setIsLoading(false);
  };

  const getClassForSlot = (day, timeSlot) => {
    return timetableData.find(item => 
      item.day === day && item.time_slot === timeSlot
    );
  };

  const getCurrentDayName = () => {
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return dayNames[currentDay];
  };

  const isCurrentTimeSlot = (timeSlot) => {
    const now = new Date();
    const currentHour = now.getHours();
    const [startHour] = timeSlot.split('-')[0].split(':').map(Number);
    return currentHour === startHour && getCurrentDayName() !== "Sunday";
  };

  return (
    <div className="p-4 md:p-8 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Class Timetable</h1>
              <p className="text-slate-600">Your weekly class schedule</p>
            </div>
          </div>

          {/* Current Day Indicator */}
          <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 border-0 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Calendar className="w-6 h-6" />
                  <div>
                    <h3 className="font-semibold text-lg">Today is {getCurrentDayName()}</h3>
                    <p className="text-blue-100">Check your current classes below</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-blue-100">Current Time</p>
                  <p className="text-xl font-bold">{new Date().toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Timetable Grid */}
        {isLoading ? (
          <div className="animate-pulse">
            <div className="h-96 bg-white/50 rounded-xl"></div>
          </div>
        ) : (
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-slate-800 to-slate-900 text-white">
              <CardTitle className="text-xl">Weekly Schedule</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <div className="min-w-4xl">
                  {/* Header Row */}
                  <div className="grid grid-cols-7 bg-slate-100 border-b">
                    <div className="p-4 font-semibold text-slate-900">Time</div>
                    {days.map(day => (
                      <div key={day} className={`p-4 font-semibold text-center ${
                        day === getCurrentDayName() ? 'bg-blue-50 text-blue-700' : 'text-slate-900'
                      }`}>
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Time Slots */}
                  {timeSlots.map(timeSlot => (
                    <div key={timeSlot} className={`grid grid-cols-7 border-b border-slate-200 ${
                      isCurrentTimeSlot(timeSlot) ? 'bg-yellow-50' : ''
                    }`}>
                      <div className={`p-4 font-medium text-slate-700 bg-slate-50 flex items-center ${
                        isCurrentTimeSlot(timeSlot) ? 'bg-yellow-100 text-yellow-800' : ''
                      }`}>
                        <Clock className="w-4 h-4 mr-2" />
                        {timeSlot}
                      </div>
                      
                      {days.map(day => {
                        const classInfo = getClassForSlot(day, timeSlot);
                        return (
                          <div key={`${day}-${timeSlot}`} className="p-2 border-l border-slate-200 min-h-20">
                            {classInfo ? (
                              <div className={`h-full p-3 rounded-lg border-l-4 ${
                                day === getCurrentDayName() && isCurrentTimeSlot(timeSlot)
                                  ? 'bg-yellow-100 border-yellow-400'
                                  : 'bg-white border-indigo-400 shadow-sm'
                              }`}>
                                <p className="font-semibold text-slate-900 text-sm leading-tight mb-1">
                                  {classInfo.subject_name}
                                </p>
                                <div className="space-y-1">
                                  <div className="flex items-center gap-1 text-xs text-slate-600">
                                    <User className="w-3 h-3" />
                                    {classInfo.faculty_name}
                                  </div>
                                  <div className="flex items-center gap-1 text-xs text-slate-600">
                                    <MapPin className="w-3 h-3" />
                                    {classInfo.room_number}
                                  </div>
                                </div>
                                <Badge variant="outline" className="text-xs mt-1">
                                  {classInfo.subject_code}
                                </Badge>
                              </div>
                            ) : (
                              <div className="h-full flex items-center justify-center text-slate-300">
                                <span className="text-xs">Free</span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
