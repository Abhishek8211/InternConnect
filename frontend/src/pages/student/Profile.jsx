import { useState, useRef } from "react";
import { useAuth } from "@/hooks/useAuth";
import Avatar from "@/components/ui/Avatar";
import Spinner from "@/components/ui/Spinner";
import {
  User, Mail, Phone, MapPin, Linkedin, Github, Globe,
  Edit3, Save, X, Camera, Plus, Trash2, GraduationCap,
  Code2, Award, CheckCircle2, Loader2, FileText, Upload,
} from "lucide-react";
import { userService } from "@/services/user.service";

const SKILLS_SUGGESTIONS = [
  "React", "Node.js", "Python", "Java", "MongoDB", "SQL",
  "TypeScript", "Vue.js", "Django", "Machine Learning",
  "TensorFlow", "Docker", "AWS", "Figma", "UI/UX",
];

const StudentProfile = () => {
  const { user, updateUser } = useAuth();

  // ── Local editable state — seeded from real user object ───────
  const [editSection, setEditSection] = useState(null);
  const [saving, setSaving]           = useState(false);
  const [saveErr, setSaveErr]         = useState("");

  // About
  const [bio, setBio]             = useState(user?.profile?.bio || "");
  const [headline, setHeadline]   = useState(user?.profile?.headline || "");

  // Skills
  const [skills, setSkills]       = useState(user?.profile?.skills || []);
  const [skillInput, setSkillInput] = useState("");

  // Education
  const [education, setEducation] = useState(user?.profile?.education || []);

  // Certifications
  const [certs, setCerts] = useState(user?.profile?.certifications || []);

  // Social links
  const [links, setLinks] = useState({
    linkedin: user?.profile?.socialLinks?.linkedin || "",
    github:   user?.profile?.socialLinks?.github || "",
    portfolio:user?.profile?.socialLinks?.portfolio || "",
  });

  // Contact
  const [phone, setPhone]       = useState(user?.profile?.phone || "");
  const [location, setLocation] = useState(user?.profile?.location || "");

  // File refs
  const avatarRef = useRef(null);
  const resumeRef = useRef(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);

  // ── Profile completion ────────────────────────────────────────
  const profileScore = Math.min(100,
    [user?.name, bio, skills.length > 0, education.length > 0,
     user?.profile?.resume?.url, links.github || links.linkedin].filter(Boolean).length * 17
  );

  // ── Helpers ───────────────────────────────────────────────────
  const addSkill = (s) => {
    const val = s || skillInput.trim();
    if (val && !skills.includes(val)) setSkills([...skills, val]);
    setSkillInput("");
  };
  const removeSkill = (s) => setSkills(skills.filter((x) => x !== s));

  // ── Save section to API ───────────────────────────────────────
  const saveSection = async (sectionId) => {
    setSaving(true);
    setSaveErr("");
    try {
      const payload = { profile: {} };
      if (sectionId === "about") {
        payload.profile.bio = bio;
        payload.profile.headline = headline;
      } else if (sectionId === "skills") {
        payload.profile.skills = skills;
      } else if (sectionId === "education") {
        payload.profile.education = education;
      } else if (sectionId === "certifications") {
        payload.profile.certifications = certs;
      } else if (sectionId === "links") {
        payload.profile.socialLinks = links;
        payload.profile.phone = phone;
        payload.profile.location = location;
      }
      const res = await userService.updateProfile(payload);
      updateUser(res.data.data); // update auth context with fresh user
      setEditSection(null);
    } catch (err) {
      setSaveErr(err?.response?.data?.message || "Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  // ── Avatar upload ─────────────────────────────────────────────
  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const form = new FormData();
    form.append("avatar", file);
    try {
      setUploadingAvatar(true);
      const res = await userService.uploadAvatar(form);
      updateUser(res.data.data);
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to upload avatar");
    } finally {
      setUploadingAvatar(false);
    }
  };

  // ── Resume upload ─────────────────────────────────────────────
  const handleResumeChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const form = new FormData();
    form.append("resume", file);
    try {
      setUploadingResume(true);
      const res = await userService.uploadResume(form);
      updateUser(res.data.data);
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to upload resume");
    } finally {
      setUploadingResume(false);
    }
  };

  // ── Section wrapper ───────────────────────────────────────────
  const Section = ({ id, title, icon: Icon, children }) => (
    <div className="rounded-2xl border border-white/[0.06] bg-[#111827] p-6">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-500/15">
            <Icon className="h-4 w-4 text-blue-400" />
          </div>
          <h2 className="font-semibold text-white">{title}</h2>
        </div>
        <div className="flex items-center gap-2">
          {saveErr && editSection === id && <p className="text-xs text-red-400">{saveErr}</p>}
          {editSection === id ? (
            <div className="flex gap-2">
              <button
                onClick={() => { setEditSection(null); setSaveErr(""); }}
                className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium text-slate-400 hover:bg-white/5 hover:text-white"
              >
                <X className="h-3 w-3" /> Cancel
              </button>
              <button
                onClick={() => saveSection(id)}
                disabled={saving}
                className="flex items-center gap-1.5 rounded-xl bg-blue-600/20 px-3 py-1.5 text-xs font-medium text-blue-400 ring-1 ring-blue-500/30 hover:bg-blue-600/30 disabled:opacity-50"
              >
                {saving ? <Loader2 className="h-3 w-3 animate-spin" /> : <Save className="h-3 w-3" />}
                Save
              </button>
            </div>
          ) : (
            <button
              onClick={() => setEditSection(id)}
              className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium text-slate-400 hover:bg-white/5 hover:text-white"
            >
              <Edit3 className="h-3 w-3" /> Edit
            </button>
          )}
        </div>
      </div>
      {children}
    </div>
  );

  return (
    <div className="min-h-full p-4 sm:p-6 lg:p-8 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">My Profile</h1>
        <p className="mt-1 text-sm text-slate-400">Manage your personal information and career details</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* ── Left column ───────────────────────────────────── */}
        <div className="flex flex-col gap-6">

          {/* Avatar + basic info */}
          <div className="rounded-2xl border border-white/[0.06] bg-[#111827] p-6 text-center">
            <div className="relative mx-auto mb-4 w-fit">
              <Avatar src={user?.avatar?.url} name={user?.name} size="xl" />
              <button
                onClick={() => avatarRef.current?.click()}
                disabled={uploadingAvatar}
                className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-500 disabled:opacity-50"
              >
                {uploadingAvatar ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Camera className="h-3.5 w-3.5" />}
              </button>
              <input ref={avatarRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
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
                <span className="font-bold text-white">{profileScore}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-500"
                  style={{ width: `${profileScore}%` }}
                />
              </div>
            </div>
          </div>

          {/* Contact + Social */}
          <Section id="links" title="Contact & Links" icon={Globe}>
            {editSection === "links" ? (
              <div className="space-y-3">
                {[
                  { icon: Phone,    label: "Phone",     key: "phone",     placeholder: "+91 9876543210", type: "text", isLink: false },
                  { icon: MapPin,   label: "Location",  key: "location",  placeholder: "City, Country",  type: "text", isLink: false },
                ].map(({ icon: Icon, label, key, placeholder, type }) => (
                  <div key={key}>
                    <label className="mb-1 flex items-center gap-1.5 text-xs text-slate-500">
                      <Icon className="h-3.5 w-3.5" />{label}
                    </label>
                    <input
                      value={key === "phone" ? phone : location}
                      onChange={(e) => key === "phone" ? setPhone(e.target.value) : setLocation(e.target.value)}
                      placeholder={placeholder}
                      type={type}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-300 placeholder-slate-600 outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
                    />
                  </div>
                ))}
                {[
                  { icon: Linkedin, label: "LinkedIn",  key: "linkedin",  placeholder: "linkedin.com/in/username",  color: "text-blue-500" },
                  { icon: Github,   label: "GitHub",    key: "github",    placeholder: "github.com/username",       color: "text-slate-300" },
                  { icon: Globe,    label: "Portfolio", key: "portfolio", placeholder: "yoursite.com",              color: "text-cyan-400" },
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
              </div>
            ) : (
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-3 text-slate-400"><Mail className="h-4 w-4 flex-shrink-0 text-slate-600" /><span className="truncate">{user?.email || "—"}</span></li>
                <li className="flex items-center gap-3 text-slate-400"><Phone className="h-4 w-4 flex-shrink-0 text-slate-600" /><span>{user?.profile?.phone || <span className="text-slate-600">Not set</span>}</span></li>
                <li className="flex items-center gap-3 text-slate-400"><MapPin className="h-4 w-4 flex-shrink-0 text-slate-600" /><span>{user?.profile?.location || <span className="text-slate-600">Not set</span>}</span></li>
                {user?.profile?.socialLinks?.linkedin && <li className="flex items-center gap-3"><Linkedin className="h-4 w-4 text-blue-500" /><a href={`https://${user.profile.socialLinks.linkedin.replace(/^https?:\/\//, "")}`} target="_blank" rel="noreferrer" className="text-xs text-blue-400 hover:underline truncate">{user.profile.socialLinks.linkedin}</a></li>}
                {user?.profile?.socialLinks?.github   && <li className="flex items-center gap-3"><Github className="h-4 w-4 text-slate-300" /><a href={`https://${user.profile.socialLinks.github.replace(/^https?:\/\//, "")}`} target="_blank" rel="noreferrer" className="text-xs text-slate-300 hover:underline truncate">{user.profile.socialLinks.github}</a></li>}
                {user?.profile?.socialLinks?.portfolio && <li className="flex items-center gap-3"><Globe className="h-4 w-4 text-cyan-400" /><a href={`https://${user.profile.socialLinks.portfolio.replace(/^https?:\/\//, "")}`} target="_blank" rel="noreferrer" className="text-xs text-cyan-400 hover:underline truncate">{user.profile.socialLinks.portfolio}</a></li>}
              </ul>
            )}
          </Section>

          {/* Resume */}
          <div className="rounded-2xl border border-white/[0.06] bg-[#111827] p-6">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-white">
              <FileText className="h-4 w-4 text-blue-400" /> Resume
            </h3>
            {user?.profile?.resume?.url ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3">
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-emerald-400" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-emerald-400">Resume uploaded</p>
                    <a href={user.profile.resume.url} target="_blank" rel="noreferrer" className="text-xs text-slate-400 hover:text-white truncate block hover:underline">
                      View / Download
                    </a>
                  </div>
                </div>
                <button onClick={() => resumeRef.current?.click()} disabled={uploadingResume} className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 py-2 text-xs font-medium text-slate-400 hover:text-white hover:border-white/20 transition-all disabled:opacity-50">
                  {uploadingResume ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
                  Replace Resume
                </button>
              </div>
            ) : (
              <button onClick={() => resumeRef.current?.click()} disabled={uploadingResume} className="flex w-full flex-col items-center gap-2 rounded-xl border border-dashed border-white/10 py-6 text-slate-500 hover:border-blue-500/30 hover:text-blue-400 transition-all disabled:opacity-50">
                {uploadingResume ? <Loader2 className="h-6 w-6 animate-spin" /> : <Upload className="h-6 w-6" />}
                <span className="text-xs font-medium">{uploadingResume ? "Uploading…" : "Upload Resume (PDF)"}</span>
              </button>
            )}
            <input ref={resumeRef} type="file" accept=".pdf" className="hidden" onChange={handleResumeChange} />
          </div>
        </div>

        {/* ── Right column ──────────────────────────────────── */}
        <div className="flex flex-col gap-6 lg:col-span-2">

          {/* About */}
          <Section id="about" title="About Me" icon={User}>
            {editSection === "about" ? (
              <div className="space-y-3">
                <div>
                  <label className="mb-1 block text-xs text-slate-500">Headline</label>
                  <input
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    placeholder="e.g. Full Stack Developer | React & Node.js"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-blue-500/50"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-slate-500">Bio</label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Write a short bio about yourself, your interests, and career goals…"
                    rows={5}
                    className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>
            ) : (
              <>
                {user?.profile?.headline && <p className="mb-2 text-sm font-medium text-slate-300">{user.profile.headline}</p>}
                <p className="text-sm leading-relaxed text-slate-400">
                  {user?.profile?.bio || <span className="text-slate-600">No bio added yet. Click Edit to introduce yourself.</span>}
                </p>
              </>
            )}
          </Section>

          {/* Skills */}
          <Section id="skills" title="Skills" icon={Code2}>
            <div className="flex flex-wrap gap-2">
              {skills.length === 0 && editSection !== "skills" && (
                <p className="text-sm text-slate-600">No skills added yet.</p>
              )}
              {skills.map((s) => (
                <span key={s} className="flex items-center gap-1.5 rounded-xl bg-blue-500/10 px-3 py-1.5 text-xs font-medium text-blue-400 ring-1 ring-blue-500/20">
                  {s}
                  {editSection === "skills" && (
                    <button onClick={() => removeSkill(s)} className="opacity-60 hover:opacity-100">
                      <X className="h-3 w-3" />
                    </button>
                  )}
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
                      className="rounded-lg bg-white/5 px-2.5 py-1 text-xs text-slate-400 transition-all hover:bg-blue-500/10 hover:text-blue-400"
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
              {education.length === 0 && editSection !== "education" && (
                <p className="text-sm text-slate-600">No education added yet.</p>
              )}
              {education.map((edu, i) => (
                <div key={i} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                  {editSection === "education" ? (
                    <div className="grid gap-3 sm:grid-cols-2">
                      {[
                        { label: "Institution", key: "institution", type: "text" },
                        { label: "Degree",      key: "degree",      type: "text" },
                        { label: "Field of Study", key: "field",    type: "text" },
                      ].map(({ label, key, type }) => (
                        <div key={key}>
                          <label className="mb-1 block text-xs text-slate-500">{label}</label>
                          <input
                            value={edu[key] || ""}
                            onChange={(e) => {
                              const updated = [...education];
                              updated[i] = { ...updated[i], [key]: e.target.value };
                              setEducation(updated);
                            }}
                            type={type}
                            className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-blue-500/50"
                          />
                        </div>
                      ))}
                      <div className="flex gap-2">
                        {[{ label: "Start Year", key: "startYear" }, { label: "End Year", key: "endYear" }].map(({ label, key }) => (
                          <div key={key} className="flex-1">
                            <label className="mb-1 block text-xs text-slate-500">{label}</label>
                            <input
                              value={edu[key] || ""}
                              onChange={(e) => {
                                const updated = [...education];
                                updated[i] = { ...updated[i], [key]: Number(e.target.value) };
                                setEducation(updated);
                              }}
                              type="number"
                              min="1990" max="2035"
                              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-blue-500/50"
                            />
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => setEducation(education.filter((_, j) => j !== i))}
                        className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 sm:col-span-2"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Remove
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-blue-500/15">
                        <GraduationCap className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-white">{edu.institution}</p>
                        <p className="text-sm text-slate-400">{edu.degree}{edu.field ? ` in ${edu.field}` : ""}</p>
                        <p className="text-xs text-slate-600">{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ""}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {editSection === "education" && (
                <button
                  onClick={() => setEducation([...education, { institution: "", degree: "", field: "", startYear: new Date().getFullYear() - 3, endYear: new Date().getFullYear() }])}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/10 py-3 text-sm text-slate-400 transition-all hover:border-blue-500/30 hover:text-blue-400"
                >
                  <Plus className="h-4 w-4" /> Add Education
                </button>
              )}
            </div>
          </Section>

          {/* Certifications */}
          <Section id="certifications" title="Certifications & Achievements" icon={Award}>
            <div className="space-y-3">
              {certs.length === 0 && editSection !== "certifications" && (
                <p className="text-sm text-slate-600">No certifications added yet.</p>
              )}
              {certs.map((cert, i) => (
                <div key={i} className="flex items-center gap-3 rounded-xl border border-white/[0.05] bg-white/[0.02] p-3.5">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-amber-500/15">
                    <Award className="h-4 w-4 text-amber-400" />
                  </div>
                  {editSection === "certifications" ? (
                    <div className="grid flex-1 gap-2 sm:grid-cols-3">
                      <input value={cert.title || ""} onChange={(e) => { const u = [...certs]; u[i] = { ...u[i], title: e.target.value }; setCerts(u); }} placeholder="Title" className="rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-xs text-white outline-none focus:border-blue-500/50" />
                      <input value={cert.organisation || ""} onChange={(e) => { const u = [...certs]; u[i] = { ...u[i], organisation: e.target.value }; setCerts(u); }} placeholder="Organisation" className="rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-xs text-white outline-none focus:border-blue-500/50" />
                      <input value={cert.year || ""} onChange={(e) => { const u = [...certs]; u[i] = { ...u[i], year: e.target.value }; setCerts(u); }} placeholder="Year" className="rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-xs text-white outline-none focus:border-blue-500/50" />
                    </div>
                  ) : (
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-white">{cert.title}</p>
                      <p className="text-xs text-slate-500">{cert.organisation}{cert.year ? ` · ${cert.year}` : ""}</p>
                    </div>
                  )}
                  {editSection === "certifications" && (
                    <button onClick={() => setCerts(certs.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-300">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              ))}
              {editSection === "certifications" && (
                <button
                  onClick={() => setCerts([...certs, { title: "", organisation: "", year: "" }])}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/10 py-3 text-sm text-slate-400 transition-all hover:border-amber-500/30 hover:text-amber-400"
                >
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
