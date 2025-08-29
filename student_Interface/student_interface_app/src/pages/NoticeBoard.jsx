import React, { useState, useEffect } from "react";
import { Notice } from "@/entities/all";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bell, Search, AlertTriangle, Calendar, Users, BookOpen, Flag } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";

const categoryIcons = {
  academic: BookOpen,
  administrative: Users,
  examination: Calendar,
  event: Flag,
  urgent: AlertTriangle
};

const categoryColors = {
  academic: "bg-blue-50 text-blue-700 border-blue-200",
  administrative: "bg-purple-50 text-purple-700 border-purple-200",
  examination: "bg-red-50 text-red-700 border-red-200",
  event: "bg-green-50 text-green-700 border-green-200",
  urgent: "bg-orange-50 text-orange-700 border-orange-200"
};

export default function NoticeBoard() {
  const [notices, setNotices] = useState([]);
  const [filteredNotices, setFilteredNotices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadNotices();
  }, []);

  useEffect(() => {
    filterNotices();
  }, [notices, searchTerm, selectedCategory]);

  const loadNotices = async () => {
    setIsLoading(true);
    try {
      const noticeList = await Notice.list("-created_date");
      setNotices(noticeList);
    } catch (error) {
      console.error("Error loading notices:", error);
    }
    setIsLoading(false);
  };

  const filterNotices = () => {
    let filtered = notices;

    if (searchTerm) {
      filtered = filtered.filter(notice =>
        notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notice.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(notice => notice.category === selectedCategory);
    }

    setFilteredNotices(filtered);
  };

  return (
    <div className="p-4 md:p-8 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <Bell className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Notice Board</h1>
              <p className="text-slate-600">Stay updated with college announcements</p>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                placeholder="Search notices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 bg-white/70 backdrop-blur-sm border-slate-200"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48 h-12 bg-white/70 backdrop-blur-sm border-slate-200">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="academic">Academic</SelectItem>
                <SelectItem value="administrative">Administrative</SelectItem>
                <SelectItem value="examination">Examination</SelectItem>
                <SelectItem value="event">Event</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Notices Grid */}
        {isLoading ? (
          <div className="grid gap-6">
            {Array(6).fill(0).map((_, i) => (
              <div key={i} className="h-48 bg-white/50 rounded-xl animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredNotices.map((notice, index) => {
              const CategoryIcon = categoryIcons[notice.category];
              return (
                <motion.div
                  key={notice.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 ${
                    notice.is_urgent ? 'ring-2 ring-orange-200 shadow-orange-100' : ''
                  }`}>
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            {notice.is_urgent && (
                              <Badge className="bg-red-100 text-red-700 border-red-200 animate-pulse">
                                <AlertTriangle className="w-3 h-3 mr-1" />
                                Urgent
                              </Badge>
                            )}
                            <Badge className={`${categoryColors[notice.category]} border`}>
                              <CategoryIcon className="w-3 h-3 mr-1" />
                              {notice.category}
                            </Badge>
                          </div>
                          <CardTitle className="text-xl text-slate-900 leading-tight">
                            {notice.title}
                          </CardTitle>
                          <div className="flex items-center gap-4 text-sm text-slate-600 mt-2">
                            <span>Posted by {notice.posted_by}</span>
                            <span>•</span>
                            <span>{format(new Date(notice.created_date), "MMM d, yyyy")}</span>
                            {notice.valid_until && (
                              <>
                                <span>•</span>
                                <span>Valid until {format(new Date(notice.valid_until), "MMM d, yyyy")}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-700 leading-relaxed">
                        {notice.content}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}

            {filteredNotices.length === 0 && !isLoading && (
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-12 text-center">
                  <Bell className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">No notices found</h3>
                  <p className="text-slate-600">
                    {searchTerm || selectedCategory !== "all" 
                      ? "Try adjusting your search or filter criteria" 
                      : "Check back later for new announcements"}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
