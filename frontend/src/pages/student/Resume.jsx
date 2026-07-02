import { useState } from "react";
import { Upload, FileText, Download, Trash2, Eye, CheckCircle2, AlertCircle, Plus, Star } from "lucide-react";

const ResumeBuilder = () => {
  const [hasResume, setHasResume] = useState(true);
  const [dragging, setDragging] = useState(false);

  const tips = [
    { done: true,  text: "Include your GPA and institution name" },
    { done: true,  text: "List relevant technical skills" },
    { done: false, text: "Add at least 2 projects with GitHub links" },
    { done: false, text: "Include internship or work experience" },
    { done: true,  text: "Keep resume under 1 page" },
    { done: false, text: "Add certifications and awards" },
  ];

  const score = Math.round((tips.filter((t) => t.done).length / tips.length) * 100);

  return (
    <div className="min-h-full p-4 sm:p-6 lg:p-8 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">My Resume</h1>
        <p className="mt-1 text-sm text-slate-400">Upload and manage your resume for internship applications</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Upload + Current Resume */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Current Resume */}
          {hasResume && (
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-500/20">
                    <FileText className="h-6 w-6 text-emerald-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Resume_Abhishek_2026.pdf</p>
                    <p className="text-xs text-slate-400 mt-1">Uploaded Jun 15, 2026 · 2.4 MB · PDF</p>
                    <div className="mt-2 flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="text-xs font-medium text-emerald-400">Active — used in applications</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="rounded-xl border border-white/10 p-2 text-slate-400 hover:text-white transition-colors"><Eye className="h-4 w-4" /></button>
                  <button className="rounded-xl border border-white/10 p-2 text-slate-400 hover:text-white transition-colors"><Download className="h-4 w-4" /></button>
                  <button onClick={() => setHasResume(false)} className="rounded-xl border border-red-500/20 p-2 text-red-400 hover:bg-red-500/10 transition-colors"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
            </div>
          )}

          {/* Upload Area */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => { e.preventDefault(); setDragging(false); setHasResume(true); }}
            className={`rounded-2xl border-2 border-dashed p-10 text-center transition-all ${dragging ? "border-blue-500 bg-blue-500/5" : "border-white/10 bg-[#111827] hover:border-blue-500/40"}`}
          >
            <Upload className={`mx-auto h-10 w-10 mb-3 ${dragging ? "text-blue-400" : "text-slate-600"}`} />
            <p className="text-base font-semibold text-white">
              {hasResume ? "Upload a new version" : "Upload your resume"}
            </p>
            <p className="mt-1 text-sm text-slate-500">Drag & drop PDF here, or</p>
            <label className="mt-3 inline-block cursor-pointer rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-500 transition-colors">
              Browse File
              <input type="file" accept=".pdf" className="hidden" onChange={() => setHasResume(true)} />
            </label>
            <p className="mt-2 text-xs text-slate-600">PDF only · Max 5 MB</p>
          </div>

          {/* Resume History */}
          <div className="rounded-2xl border border-white/[0.06] bg-[#111827] p-6">
            <h2 className="mb-4 font-semibold text-white">Upload History</h2>
            <div className="space-y-3">
              {[
                { name: "Resume_Abhishek_2026.pdf", date: "Jun 15, 2026", size: "2.4 MB", active: true },
                { name: "Resume_v2_May2026.pdf",    date: "May 2, 2026",  size: "2.1 MB", active: false },
                { name: "Resume_v1_Jan2026.pdf",    date: "Jan 10, 2026", size: "1.8 MB", active: false },
              ].map((r, i) => (
                <div key={i} className="flex items-center gap-3 rounded-xl border border-white/[0.04] bg-white/[0.02] p-3">
                  <FileText className="h-5 w-5 flex-shrink-0 text-slate-500" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-white">{r.name}</p>
                    <p className="text-xs text-slate-500">{r.date} · {r.size}</p>
                  </div>
                  {r.active ? (
                    <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs text-emerald-400">Active</span>
                  ) : (
                    <button className="text-xs text-slate-500 hover:text-blue-400 transition-colors">Set Active</button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Resume Score */}
        <div className="flex flex-col gap-6">
          <div className="rounded-2xl border border-white/[0.06] bg-[#111827] p-6">
            <h2 className="mb-1 font-semibold text-white">Resume Score</h2>
            <p className="text-xs text-slate-500">Based on ATS best practices</p>
            {/* Score Ring */}
            <div className="my-6 flex justify-center">
              <div className="relative flex h-28 w-28 items-center justify-center">
                <svg className="absolute inset-0 -rotate-90" viewBox="0 0 112 112">
                  <circle cx="56" cy="56" r="48" fill="none" stroke="#ffffff0d" strokeWidth="10" />
                  <circle
                    cx="56" cy="56" r="48" fill="none"
                    stroke={score >= 80 ? "#10b981" : score >= 60 ? "#f59e0b" : "#ef4444"}
                    strokeWidth="10" strokeLinecap="round"
                    strokeDasharray={`${(score / 100) * 301.59} 301.59`}
                    className="transition-all duration-700"
                  />
                </svg>
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">{score}%</p>
                  <p className="text-xs text-slate-500">Score</p>
                </div>
              </div>
            </div>
            <ul className="space-y-2.5">
              {tips.map(({ done, text }, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs">
                  {done
                    ? <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0 text-emerald-400 mt-0.5" />
                    : <AlertCircle className="h-3.5 w-3.5 flex-shrink-0 text-amber-400 mt-0.5" />
                  }
                  <span className={done ? "text-slate-400 line-through" : "text-slate-300"}>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-white/[0.06] bg-[#111827] p-6">
            <h2 className="mb-4 font-semibold text-white flex items-center gap-2">
              <Star className="h-4 w-4 text-amber-400" /> Pro Tips
            </h2>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex gap-2"><span className="text-blue-400 font-bold">•</span>Use action verbs: Built, Designed, Optimized</li>
              <li className="flex gap-2"><span className="text-blue-400 font-bold">•</span>Quantify achievements with metrics</li>
              <li className="flex gap-2"><span className="text-blue-400 font-bold">•</span>Tailor resume for each application</li>
              <li className="flex gap-2"><span className="text-blue-400 font-bold">•</span>Avoid fancy templates — keep ATS friendly</li>
              <li className="flex gap-2"><span className="text-blue-400 font-bold">•</span>Check grammar and spelling thoroughly</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
