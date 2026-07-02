import { useState } from "react";
import { Building2, Globe, MapPin, Phone, Mail, Linkedin, Edit3, Save, Camera, Users, Briefcase, Star, CheckCircle2 } from "lucide-react";

const CompanyProfile = () => {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: "TechVentures Pvt Ltd", tagline: "Building the future, one line of code at a time.",
    website: "https://techventures.io", email: "hr@techventures.io", phone: "+91 80-4567-8900",
    location: "Koramangala, Bangalore", linkedin: "linkedin.com/company/techventures",
    size: "200-500", industry: "Technology", founded: "2018",
    about: "TechVentures is a fast-growing tech startup focused on building scalable SaaS products for the Indian market. We believe in nurturing fresh talent and offering meaningful internship experiences.",
  });
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const Field = ({ label, k, type = "text", multi }) => (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-slate-400">{label}</label>
      {multi ? (
        <textarea value={form[k]} onChange={e => set(k, e.target.value)} disabled={!editing} rows={4}
          className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white outline-none disabled:opacity-60 focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/15" />
      ) : (
        <input type={type} value={form[k]} onChange={e => set(k, e.target.value)} disabled={!editing}
          className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white outline-none disabled:opacity-60 focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/15" />
      )}
    </div>
  );

  return (
    <div className="min-h-full p-4 sm:p-6 lg:p-8 animate-fade-in">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Company Profile</h1>
          <p className="mt-1 text-sm text-slate-400">Manage your company information and branding</p>
        </div>
        <button onClick={() => setEditing(!editing)}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${editing ? "bg-violet-600 text-white" : "border border-white/10 bg-white/5 text-slate-400 hover:text-white"}`}>
          {editing ? <><Save className="h-4 w-4" />Save Profile</> : <><Edit3 className="h-4 w-4" />Edit Profile</>}
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left: Logo + Stats */}
        <div className="flex flex-col gap-6">
          {/* Logo Card */}
          <div className="rounded-2xl border border-white/[0.06] bg-[#111827] p-6 text-center">
            <div className="relative mx-auto mb-4 w-fit">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-purple-500 text-3xl font-bold text-white shadow-lg shadow-violet-500/30">T</div>
              {editing && (
                <button className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-violet-600 text-white shadow hover:bg-violet-500">
                  <Camera className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
            <h2 className="text-lg font-bold text-white">{form.name}</h2>
            <p className="text-xs text-slate-400 mt-1">{form.tagline}</p>
            <div className="mt-3 flex items-center justify-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span className="text-xs font-medium text-emerald-400">Verified Company</span>
            </div>
          </div>

          {/* Stats */}
          <div className="rounded-2xl border border-white/[0.06] bg-[#111827] p-5">
            <h3 className="mb-4 text-sm font-semibold text-white">Platform Stats</h3>
            <div className="space-y-3">
              {[
                { icon: Briefcase, label: "Internships Posted", value: "8", color: "text-violet-400", bg: "bg-violet-500/15" },
                { icon: Users,     label: "Total Applicants",   value: "239", color: "text-cyan-400",   bg: "bg-cyan-500/15"   },
                { icon: CheckCircle2, label: "Hired",           value: "12",  color: "text-emerald-400",bg: "bg-emerald-500/15"},
                { icon: Star,      label: "Avg. Rating",        value: "4.7", color: "text-amber-400",  bg: "bg-amber-500/15"  },
              ].map(({ icon: Icon, label, value, color, bg }) => (
                <div key={label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className={`flex h-7 w-7 items-center justify-center rounded-lg ${bg}`}><Icon className={`h-3.5 w-3.5 ${color}`} /></div>
                    <span className="text-xs text-slate-400">{label}</span>
                  </div>
                  <span className={`text-sm font-bold ${color}`}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-white/[0.06] bg-[#111827] p-6">
            <h2 className="mb-5 font-semibold text-white">Basic Information</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Company Name" k="name" />
              <Field label="Tagline" k="tagline" />
              <Field label="Industry" k="industry" />
              <Field label="Company Size" k="size" />
              <Field label="Founded Year" k="founded" type="number" />
              <Field label="Headquarters" k="location" />
            </div>
            <div className="mt-4">
              <Field label="About Company" k="about" multi />
            </div>
          </div>

          <div className="rounded-2xl border border-white/[0.06] bg-[#111827] p-6">
            <h2 className="mb-5 font-semibold text-white">Contact & Links</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Website" k="website" />
              <Field label="LinkedIn" k="linkedin" />
              <Field label="Email" k="email" type="email" />
              <Field label="Phone" k="phone" type="tel" />
            </div>
          </div>

          {/* Perks */}
          <div className="rounded-2xl border border-white/[0.06] bg-[#111827] p-6">
            <h2 className="mb-4 font-semibold text-white">Why Intern With Us?</h2>
            <div className="grid gap-2 sm:grid-cols-2">
              {["Mentorship from senior engineers","Certificate + LOR provided","Potential Pre-Placement Offer","Flexible work hours","Exposure to real products","Collaborative team culture"].map((p) => (
                <div key={p} className="flex items-center gap-2.5 rounded-xl bg-white/[0.02] px-3.5 py-2.5">
                  <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0 text-violet-400" />
                  <span className="text-xs text-slate-300">{p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
