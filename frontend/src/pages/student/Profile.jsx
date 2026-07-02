import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import Avatar from "@/components/ui/Avatar";
import {
  User, Mail, Phone, MapPin, Linkedin, Github, Globe,
  Edit3, Save, X, Camera, Plus, Trash2, GraduationCap,
  Code2, Award, CheckCircle2, AlertCircle,
} from "lucide-react";

const SKILLS_SUGGESTIONS = [
  "React", "Node.js", "Python", "Java", "MongoDB", "SQL",
  "TypeScript", "Vue.js", "Django", "Machine Learning",
  "TensorFlow", "Docker", "AWS", "Figma", "UI/UX",
];

const StudentProfile = () => {
  const { user } = useAuth();
  const [editSection, setEditSection] = useState(null);
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState(user?.profile?.skills || ["React", "Node.js", "Python", "MongoDB"]);
  const [education, setEducation] = useState(
    user?.profile?.education?.length
      ? user.profile.education
      : [{ institution: "IIT Delhi", degree: "B.Tech", field: "Computer Science", startYear: 2021, endYear: 2025 }]
  );
  const [links, setLinks] = useState({
    linkedin: user?.profile?.socialLinks?.linkedin || "",
    github: user?.profile?.socialLinks?.github || "",
    portfolio: user?.profile?.socialLinks?.portfolio || "",
  });

  const profileCompletion = Math.min(
    100,
    [user?.name, user?.email, skills.length > 0, education.length > 0, links.github || links.linkedin].filter(Boolean).length * 20
  );

  const addSkill = (s) => {
    const val = s || skillInput.trim();
    if (val && !skills.includes(val)) setSkills([...skills, val]);
    setSkillInput("");
  };
  const removeSkill = (s) => setSkills(skills.filter((x) => x !== s));

  const Section = ({ id, title, icon: Icon, children }) => (
    <div className="rounded-2xl border border-white/[0.06] bg-[#111827] p-6">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-500/15">
            <Icon className="h-4 w-4 text-blue-400" />
          </div>
          <h2 className="font-semibold text-white">{title}</h2>
        </div>
        <button
          onClick={() => setEditSection(editSection === id ? null : id)}
          className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${
            editSection === id
              ? "bg-blue-600/20 text-blue-400 ring-1 ring-blue-500/30"
              : "text-slate-400 hover:bg-white/5 hover:text-white"
          }`}
        >
          {editSection === id ? <><Save className="h-3 w-3" />Save</> : <><Edit3 className="h-3 w-3" />Edit</>}
        </button>
      </div>
      {children}
    </div>
  );

  return (
    <div className="min-h-full p-4 sm:p-6 lg:p-8 animate-fade-in">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">My Profile</h1>
        <p className="mt-1 text-sm text-slate-400">Manage your personal information and career details</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left column */}
        <div className="flex flex-col gap-6">
          {/* Avatar + Basic Info Card */}
          <div className="rounded-2xl border border-white/[0.06] bg-[#111827] p-6 text-center">
            <div className="relative mx-auto mb-4 w-fit">
              <Avatar src={user?.avatar?.url} name={user?.name} size="xl" />
              <button className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-500">
                <Camera className="h-3.5 w-3.5" />
              </button>
            </div>
            <h2 className="text-lg font-bold text-white">{user?.name || "Your Name"}</h2>
            <p className="text-sm text-slate-400">{user?.profile?.headline || "Add a headline"}</p>
            <div className="mt-3 flex items-center justify-center gap-1.5">
              <span className="rounded-full bg-blue-500/15 px-3 py-1 text-xs font-semibold text-blue-400 ring-1 ring-blue-500/25 capitalize">
                {user?.role || "student"}
              </span>
              {user?.isVerified && (
                <span className="flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-semibold text-emerald-400 ring-1 ring-emerald-500/25">
                  <CheckCircle2 className="h-3 w-3" /> Verified
                </span>
              )}
            </div>

            {/* Profile completion */}
            <div className="mt-5">
              <div className="mb-1.5 flex items-center justify-between text-xs">
                <span className="text-slate-400">Profile Completion</span>
                <span className="font-bold text-white">{profileCompletion}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-500"
                  style={{ width: `${profileCompletion}%` }}
                />
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="rounded-2xl border border-white/[0.06] bg-[#111827] p-6">
            <h3 className="mb-4 text-sm font-semibold text-white">Contact Information</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3 text-slate-400">
                <Mail className="h-4 w-4 flex-shrink-0 text-slate-600" />
                <span className="truncate">{user?.email || "—"}</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400">
                <Phone className="h-4 w-4 flex-shrink-0 text-slate-600" />
                <span>{user?.profile?.phone || "Add phone number"}</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400">
                <MapPin className="h-4 w-4 flex-shrink-0 text-slate-600" />
                <span>{user?.profile?.location || "Add location"}</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="rounded-2xl border border-white/[0.06] bg-[#111827] p-6">
            <h3 className="mb-4 text-sm font-semibold text-white">Social Links</h3>
            <div className="space-y-3">
              {[
                { icon: Linkedin, label: "LinkedIn", key: "linkedin", placeholder: "linkedin.com/in/username", color: "text-blue-500" },
                { icon: Github, label: "GitHub", key: "github", placeholder: "github.com/username", color: "text-slate-300" },
                { icon: Globe, label: "Portfolio", key: "portfolio", placeholder: "yoursite.com", color: "text-cyan-400" },
              ].map(({ icon: Icon, label, key, placeholder, color }) => (
                <div key={key}>
                  <label className="mb-1 flex items-center gap-1.5 text-xs text-slate-500">
                    <Icon className={`h-3.5 w-3.5 ${color}`} />{label}
                  </label>
                  <input
                    value={links[key]}
                    onChange={(e) => setLinks({ ...links, [key]: e.target.value })}
                    placeholder={placeholder}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-300 placeholder-slate-600 outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
                  />
                </div>
              ))}
              <button className="mt-1 w-full rounded-xl bg-blue-600/10 py-2 text-xs font-semibold text-blue-400 ring-1 ring-blue-500/20 hover:bg-blue-600/20 transition-all">
                Save Links
              </button>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          {/* About */}
          <Section id="about" title="About Me" icon={User}>
            {editSection === "about" ? (
              <textarea
                defaultValue={user?.profile?.bio || ""}
                placeholder="Write a short bio about yourself, your interests, and career goals…"
                rows={5}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 resize-none"
              />
            ) : (
              <p className="text-sm leading-relaxed text-slate-400">
                {user?.profile?.bio || "Add a bio to introduce yourself to recruiters and showcase your passion and goals."}
              </p>
            )}
          </Section>

          {/* Skills */}
          <Section id="skills" title="Skills" icon={Code2}>
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <span
                  key={s}
                  className="flex items-center gap-1.5 rounded-xl bg-blue-500/10 px-3 py-1.5 text-xs font-medium text-blue-400 ring-1 ring-blue-500/20"
                >
                  {s}
                  <button onClick={() => removeSkill(s)} className="opacity-60 hover:opacity-100">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
              {editSection === "skills" && (
                <div className="flex items-center gap-2">
                  <input
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addSkill()}
                    placeholder="Add skill…"
                    className="w-32 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white placeholder-slate-600 outline-none focus:border-blue-500/50"
                  />
                  <button onClick={() => addSkill()} className="rounded-xl bg-blue-600/20 px-3 py-1.5 text-xs text-blue-400 hover:bg-blue-600/30">
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>
            {editSection === "skills" && (
              <div className="mt-4">
                <p className="mb-2 text-xs text-slate-500">Suggestions:</p>
                <div className="flex flex-wrap gap-1.5">
                  {SKILLS_SUGGESTIONS.filter((s) => !skills.includes(s)).slice(0, 8).map((s) => (
                    <button
                      key={s}
                      onClick={() => addSkill(s)}
                      className="rounded-lg bg-white/5 px-2.5 py-1 text-xs text-slate-400 hover:bg-blue-500/10 hover:text-blue-400 transition-all"
                    >
                      + {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </Section>

          {/* Education */}
          <Section id="education" title="Education" icon={GraduationCap}>
            <div className="space-y-4">
              {education.map((edu, i) => (
                <div key={i} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                  {editSection === "education" ? (
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-xs text-slate-500">Institution</label>
                        <input
                          defaultValue={edu.institution}
                          className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-slate-600 outline-none focus:border-blue-500/50"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs text-slate-500">Degree</label>
                        <input
                          defaultValue={edu.degree}
                          className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-slate-600 outline-none focus:border-blue-500/50"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs text-slate-500">Field of Study</label>
                        <input
                          defaultValue={edu.field}
                          className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-slate-600 outline-none focus:border-blue-500/50"
                        />
                      </div>
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <label className="mb-1 block text-xs text-slate-500">Start Year</label>
                          <input
                            defaultValue={edu.startYear}
                            type="number"
                            className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-blue-500/50"
                          />
                        </div>
                        <div className="flex-1">
                          <label className="mb-1 block text-xs text-slate-500">End Year</label>
                          <input
                            defaultValue={edu.endYear}
                            type="number"
                            className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-blue-500/50"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-blue-500/15">
                          <GraduationCap className="h-5 w-5 text-blue-400" />
                        </div>
                        <div>
                          <p className="font-semibold text-white">{edu.institution}</p>
                          <p className="text-sm text-slate-400">{edu.degree} in {edu.field}</p>
                          <p className="text-xs text-slate-600">{edu.startYear} – {edu.endYear}</p>
                        </div>
                      </div>
                      {editSection === "education" && (
                        <button onClick={() => setEducation(education.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-300">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
              {editSection === "education" && (
                <button
                  onClick={() => setEducation([...education, { institution: "", degree: "", field: "", startYear: 2020, endYear: 2024 }])}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/10 py-3 text-sm text-slate-400 hover:border-blue-500/30 hover:text-blue-400 transition-all"
                >
                  <Plus className="h-4 w-4" /> Add Education
                </button>
              )}
            </div>
          </Section>

          {/* Achievements */}
          <Section id="achievements" title="Achievements & Certifications" icon={Award}>
            <div className="space-y-3">
              {[
                { title: "AWS Cloud Practitioner", org: "Amazon Web Services", year: "2025", verified: true },
                { title: "React Developer Certification", org: "Meta", year: "2024", verified: true },
                { title: "Google Analytics Certified", org: "Google", year: "2024", verified: false },
              ].map((cert, i) => (
                <div key={i} className="flex items-center gap-3 rounded-xl border border-white/[0.05] bg-white/[0.02] p-3.5">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-amber-500/15">
                    <Award className="h-4 w-4 text-amber-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-white">{cert.title}</p>
                    <p className="text-xs text-slate-500">{cert.org} · {cert.year}</p>
                  </div>
                  {cert.verified && (
                    <span className="flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs text-emerald-400">
                      <CheckCircle2 className="h-3 w-3" /> Verified
                    </span>
                  )}
                </div>
              ))}
              {editSection === "achievements" && (
                <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/10 py-3 text-sm text-slate-400 hover:border-amber-500/30 hover:text-amber-400 transition-all">
                  <Plus className="h-4 w-4" /> Add Certification
                </button>
              )}
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
