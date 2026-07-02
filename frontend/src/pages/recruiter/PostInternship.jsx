import { useState } from "react";
import { Plus, X, ChevronDown, Save, Send, Briefcase, MapPin, DollarSign, Clock, Users, CheckCircle2, AlertCircle } from "lucide-react";

const SKILLS_LIST = ["React","Node.js","Python","Java","Django","MongoDB","SQL","TypeScript","Vue.js","AWS","Docker","Kubernetes","Figma","ML","TensorFlow","Go","Rust","Swift","Kotlin","Flutter"];

const Field = ({ label, required, children }) => (
  <div>
    <label className="mb-1.5 block text-xs font-medium text-slate-400">{label}{required && <span className="text-red-400 ml-0.5">*</span>}</label>
    {children}
  </div>
);

const Input = ({ ...props }) => (
  <input {...props} className={`w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none transition-all focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/15 ${props.className || ""}`} />
);

const Select = ({ children, ...props }) => (
  <div className="relative">
    <select {...props} className="w-full appearance-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 pr-10 text-sm text-white outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/15">
      {children}
    </select>
    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
  </div>
);

const STEPS = ["Basic Info", "Details & Requirements", "Compensation & Deadline", "Review & Post"];

const PostInternship = () => {
  const [step, setStep] = useState(0);
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    title: "", company: "", type: "remote", location: "", positions: "1",
    description: "", responsibilities: "", requirements: "",
    skills: [], stipend: "", duration: "3 months", deadline: "",
    perks: "", applyVia: "platform",
  });

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));
  const addSkill = (s) => { const v = s || skillInput.trim(); if (v && !skills.includes(v)) setSkills([...skills, v]); setSkillInput(""); };
  const removeSkill = (s) => setSkills(skills.filter((x) => x !== s));

  if (submitted) return (
    <div className="flex min-h-full flex-col items-center justify-center p-8 text-center animate-fade-in">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20 mb-6">
        <CheckCircle2 className="h-10 w-10 text-emerald-400" />
      </div>
      <h2 className="text-2xl font-bold text-white">Internship Posted!</h2>
      <p className="mt-2 text-slate-400 max-w-sm">Your internship listing is live. Students can now discover and apply.</p>
      <div className="mt-6 flex gap-3">
        <button onClick={() => { setSubmitted(false); setStep(0); setForm({ title:"",company:"",type:"remote",location:"",positions:"1",description:"",responsibilities:"",requirements:"",skills:[],stipend:"",duration:"3 months",deadline:"",perks:"",applyVia:"platform" }); setSkills([]); }}
          className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-500 transition-all">
          Post Another
        </button>
        <a href="/recruiter/listings" className="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-semibold text-slate-300 hover:text-white transition-all">
          View Listings
        </a>
      </div>
    </div>
  );

  return (
    <div className="min-h-full p-4 sm:p-6 lg:p-8 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Post an Internship</h1>
        <p className="mt-1 text-sm text-slate-400">Fill in the details to attract the best student talent</p>
      </div>

      {/* Stepper */}
      <div className="mb-8 flex items-center gap-0">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center flex-1 last:flex-none">
            <button onClick={() => i < step && setStep(i)} className="flex flex-col items-center gap-1.5">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all ${
                i < step ? "bg-emerald-500 text-white" : i === step ? "bg-violet-600 text-white ring-4 ring-violet-600/20" : "bg-white/10 text-slate-500"
              }`}>
                {i < step ? "✓" : i + 1}
              </div>
              <span className={`hidden text-[11px] font-medium sm:block ${i === step ? "text-violet-400" : i < step ? "text-emerald-400" : "text-slate-600"}`}>{s}</span>
            </button>
            {i < STEPS.length - 1 && <div className={`flex-1 h-0.5 mx-2 mb-4 ${i < step ? "bg-emerald-500/40" : "bg-white/10"}`} />}
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-[#111827] p-6">
        {/* Step 0 */}
        {step === 0 && (
          <div className="space-y-5 animate-fade-in">
            <h2 className="font-semibold text-white">Basic Information</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Internship Title" required><Input value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="e.g. Full Stack Developer Intern" /></Field>
              <Field label="Company Name" required><Input value={form.company} onChange={(e) => set("company", e.target.value)} placeholder="e.g. Acme Technologies" /></Field>
              <Field label="Work Type" required>
                <Select value={form.type} onChange={(e) => set("type", e.target.value)}>
                  <option value="remote">Remote</option>
                  <option value="on-site">On-site</option>
                  <option value="hybrid">Hybrid</option>
                </Select>
              </Field>
              <Field label="Location">
                <Input value={form.location} onChange={(e) => set("location", e.target.value)} placeholder={form.type === "remote" ? "Remote (Worldwide)" : "City, Country"} disabled={form.type === "remote"} />
              </Field>
              <Field label="Number of Openings" required>
                <Input type="number" min="1" max="50" value={form.positions} onChange={(e) => set("positions", e.target.value)} />
              </Field>
              <Field label="Application Via">
                <Select value={form.applyVia} onChange={(e) => set("applyVia", e.target.value)}>
                  <option value="platform">InternConnect Platform</option>
                  <option value="email">Email</option>
                  <option value="external">External Link</option>
                </Select>
              </Field>
            </div>
          </div>
        )}

        {/* Step 1 */}
        {step === 1 && (
          <div className="space-y-5 animate-fade-in">
            <h2 className="font-semibold text-white">Details & Requirements</h2>
            <Field label="Job Description" required>
              <textarea rows={4} value={form.description} onChange={(e) => set("description", e.target.value)}
                placeholder="Describe the internship role, team, and what the intern will be working on…"
                className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/15" />
            </Field>
            <Field label="Key Responsibilities">
              <textarea rows={4} value={form.responsibilities} onChange={(e) => set("responsibilities", e.target.value)}
                placeholder="• Build and maintain React components&#10;• Collaborate with design and backend teams&#10;• Write unit tests…"
                className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/15" />
            </Field>
            <Field label="Requirements">
              <textarea rows={3} value={form.requirements} onChange={(e) => set("requirements", e.target.value)}
                placeholder="• 2nd or 3rd year student pursuing B.Tech/BCA&#10;• Proficiency in React and REST APIs…"
                className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/15" />
            </Field>
            <Field label="Required Skills">
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {skills.map((s) => (
                    <span key={s} className="flex items-center gap-1.5 rounded-xl bg-violet-500/10 px-3 py-1.5 text-xs font-medium text-violet-400 ring-1 ring-violet-500/20">
                      {s}<button onClick={() => removeSkill(s)}><X className="h-3 w-3" /></button>
                    </span>
                  ))}
                  <div className="flex items-center gap-2">
                    <Input value={skillInput} onChange={(e) => setSkillInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addSkill()} placeholder="Add skill…" className="w-28 py-1.5" />
                    <button onClick={() => addSkill()} className="rounded-xl bg-violet-600/20 px-2.5 py-1.5 text-xs text-violet-400 hover:bg-violet-600/30"><Plus className="h-3 w-3" /></button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {SKILLS_LIST.filter((s) => !skills.includes(s)).slice(0, 10).map((s) => (
                    <button key={s} onClick={() => addSkill(s)} className="rounded-lg bg-white/5 px-2.5 py-1 text-xs text-slate-400 hover:bg-violet-500/10 hover:text-violet-400 transition-all">+ {s}</button>
                  ))}
                </div>
              </div>
            </Field>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="space-y-5 animate-fade-in">
            <h2 className="font-semibold text-white">Compensation & Timeline</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Monthly Stipend (₹)" required>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">₹</span>
                  <Input type="number" value={form.stipend} onChange={(e) => set("stipend", e.target.value)} placeholder="50000" className="pl-7" />
                </div>
              </Field>
              <Field label="Duration" required>
                <Select value={form.duration} onChange={(e) => set("duration", e.target.value)}>
                  {["1 month","2 months","3 months","6 months"].map((d) => <option key={d} value={d}>{d}</option>)}
                </Select>
              </Field>
              <Field label="Application Deadline" required>
                <Input type="date" value={form.deadline} onChange={(e) => set("deadline", e.target.value)} />
              </Field>
              <Field label="Perks & Benefits">
                <Input value={form.perks} onChange={(e) => set("perks", e.target.value)} placeholder="Certificate, LOR, PPO possibility…" />
              </Field>
            </div>
          </div>
        )}

        {/* Step 3 Review */}
        {step === 3 && (
          <div className="space-y-5 animate-fade-in">
            <h2 className="font-semibold text-white">Review Before Posting</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { icon: Briefcase,  label: "Role",      value: form.title || "—" },
                { icon: Users,      label: "Company",   value: form.company || "—" },
                { icon: MapPin,     label: "Location",  value: form.type === "remote" ? "Remote" : form.location || "—" },
                { icon: DollarSign, label: "Stipend",   value: form.stipend ? `₹${Number(form.stipend).toLocaleString()}/mo` : "—" },
                { icon: Clock,      label: "Duration",  value: form.duration },
                { icon: Users,      label: "Openings",  value: form.positions },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3 rounded-xl border border-white/[0.05] bg-white/[0.02] p-3.5">
                  <Icon className="h-4 w-4 text-violet-400 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-slate-500">{label}</p>
                    <p className="text-sm font-medium text-white mt-0.5">{value}</p>
                  </div>
                </div>
              ))}
            </div>
            {skills.length > 0 && (
              <div>
                <p className="text-xs text-slate-500 mb-2">Required Skills</p>
                <div className="flex flex-wrap gap-2">
                  {skills.map((s) => <span key={s} className="rounded-xl bg-violet-500/10 px-3 py-1 text-xs text-violet-400">{s}</span>)}
                </div>
              </div>
            )}
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
              <div className="flex gap-2">
                <AlertCircle className="h-4 w-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-amber-300">Once posted, the listing will be visible to all students. You can edit or deactivate it later from Manage Internships.</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between border-t border-white/[0.05] pt-6">
          <button onClick={() => setStep((p) => Math.max(0, p - 1))} disabled={step === 0}
            className="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-medium text-slate-400 hover:text-white disabled:opacity-30 transition-all">
            Back
          </button>
          {step < 3 ? (
            <button onClick={() => setStep((p) => p + 1)}
              className="flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-violet-500 transition-all">
              Continue <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
            </button>
          ) : (
            <button onClick={() => setSubmitted(true)}
              className="flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-500 transition-all">
              <Send className="h-4 w-4" /> Post Internship
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostInternship;
