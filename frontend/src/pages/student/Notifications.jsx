import { useState } from "react";
import { Bell, CheckCircle2, Star, AlertTriangle, Briefcase, UserCheck, Settings, Check, Trash2, Filter } from "lucide-react";

const NOTIFICATIONS = [
  { id: 1,  type: "application", icon: CheckCircle2, iconColor: "text-emerald-400", bg: "bg-emerald-500/10", title: "Application Accepted!", message: "Flipkart accepted your Data Analyst Intern application. Offer letter has been sent to your email.", time: "1 hour ago", read: false, category: "application" },
  { id: 2,  type: "shortlist",   icon: Star,         iconColor: "text-blue-400",    bg: "bg-blue-500/10",    title: "Shortlisted at Google", message: "You've been shortlisted for the SWE Intern role. A technical interview will be scheduled shortly.", time: "2 days ago", read: false, category: "application" },
  { id: 3,  type: "reminder",    icon: AlertTriangle, iconColor: "text-amber-400",  bg: "bg-amber-500/10",   title: "Deadline Approaching", message: "The Razorpay Full Stack Intern application closes in 3 days. Don't miss out!", time: "3 days ago", read: false, category: "reminder" },
  { id: 4,  type: "new",         icon: Briefcase,    iconColor: "text-violet-400",  bg: "bg-violet-500/10",  title: "New Match Found", message: "A new internship at Microsoft matches 92% of your profile. Check it out!", time: "4 days ago", read: true,  category: "recommendation" },
  { id: 5,  type: "profile",     icon: UserCheck,    iconColor: "text-cyan-400",    bg: "bg-cyan-500/10",    title: "Profile Viewed", message: "A recruiter from Zomato viewed your profile. Keep your resume updated!", time: "5 days ago", read: true,  category: "profile" },
  { id: 6,  type: "reminder",    icon: AlertTriangle, iconColor: "text-amber-400",  bg: "bg-amber-500/10",   title: "Complete Your Profile", message: "Your profile is 72% complete. Add projects and experience to get better matches.", time: "1 week ago", read: true,  category: "profile" },
  { id: 7,  type: "new",         icon: Briefcase,    iconColor: "text-violet-400",  bg: "bg-violet-500/10",  title: "5 New Internships", message: "5 new internships matching your skills have been posted this week.", time: "1 week ago", read: true, category: "recommendation" },
];

const CATEGORIES = ["all", "application", "recommendation", "reminder", "profile"];

const Notifications = () => {
  const [notes, setNotes] = useState(NOTIFICATIONS);
  const [category, setCat] = useState("all");

  const markRead = (id) => setNotes((p) => p.map((n) => n.id === id ? { ...n, read: true } : n));
  const markAllRead = () => setNotes((p) => p.map((n) => ({ ...n, read: true })));
  const remove = (id) => setNotes((p) => p.filter((n) => n.id !== id));

  const filtered = notes.filter((n) => category === "all" || n.category === category);
  const unread = notes.filter((n) => !n.read).length;

  return (
    <div className="min-h-full p-4 sm:p-6 lg:p-8 animate-fade-in">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold text-white">
            Notifications
            {unread > 0 && <span className="rounded-full bg-blue-600 px-2.5 py-0.5 text-sm font-bold text-white">{unread}</span>}
          </h1>
          <p className="mt-1 text-sm text-slate-400">{unread} unread notifications</p>
        </div>
        {unread > 0 && (
          <button onClick={markAllRead} className="flex items-center gap-1.5 rounded-xl border border-white/10 px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-all">
            <Check className="h-3.5 w-3.5" /> Mark all read
          </button>
        )}
      </div>

      {/* Category Tabs */}
      <div className="mb-5 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button key={c} onClick={() => setCat(c)}
            className={`rounded-xl px-4 py-2 text-xs font-semibold capitalize transition-all ${category === c ? "bg-blue-600 text-white" : "bg-[#111827] text-slate-400 hover:text-white"}`}>
            {c}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div className="space-y-2">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center py-16 rounded-2xl border border-white/[0.05] bg-[#111827]">
            <Bell className="h-12 w-12 text-slate-700 mb-4" />
            <p className="text-base font-semibold text-white">All caught up!</p>
            <p className="text-sm text-slate-500 mt-1">No notifications in this category</p>
          </div>
        ) : filtered.map((n) => {
          const Icon = n.icon;
          return (
            <div key={n.id} onClick={() => markRead(n.id)}
              className={`group flex cursor-pointer items-start gap-4 rounded-2xl border p-4 transition-all ${
                !n.read ? "border-blue-500/20 bg-blue-500/[0.03]" : "border-white/[0.04] bg-[#111827]"
              } hover:border-white/10`}>
              <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${n.bg}`}>
                <Icon className={`h-5 w-5 ${n.iconColor}`} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-white">{n.title}</p>
                  {!n.read && <span className="h-2 w-2 rounded-full bg-blue-500 flex-shrink-0" />}
                </div>
                <p className="mt-1 text-xs text-slate-400 leading-relaxed">{n.message}</p>
                <p className="mt-1.5 text-xs text-slate-600">{n.time}</p>
              </div>
              <button onClick={(e) => { e.stopPropagation(); remove(n.id); }}
                className="flex-shrink-0 rounded-lg p-1.5 text-slate-700 opacity-0 group-hover:opacity-100 hover:bg-red-500/10 hover:text-red-400 transition-all">
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Notifications;
