import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import {
  User, Lock, Bell, Shield, Palette, LogOut, Save, Eye, EyeOff,
  Moon, Sun, Monitor, CheckCircle2, Smartphone,
} from "lucide-react";

const Toggle = ({ checked, onChange }) => (
  <button onClick={() => onChange(!checked)}
    className={`relative inline-flex h-6 w-10 items-center rounded-full transition-colors duration-200 ${checked ? "bg-blue-600" : "bg-white/10"}`}>
    <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${checked ? "translate-x-5" : "translate-x-1"}`} />
  </button>
);

const Settings = () => {
  const { user, logout } = useAuth();
  const [tab, setTab] = useState("account");
  const [showPw, setShowPw] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [notifs, setNotifs] = useState({
    applications: true, recommendations: true, reminders: true, email: false, sms: false,
  });
  const [privacy, setPrivacy] = useState({
    profileVisible: true, showEmail: false, show2fa: false,
  });

  const TABS = [
    { id: "account",  label: "Account",       icon: User },
    { id: "security", label: "Security",      icon: Lock },
    { id: "notif",    label: "Notifications", icon: Bell },
    { id: "privacy",  label: "Privacy",       icon: Shield },
    { id: "appear",   label: "Appearance",    icon: Palette },
  ];

  return (
    <div className="min-h-full p-4 sm:p-6 lg:p-8 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="mt-1 text-sm text-slate-400">Manage your account preferences</p>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Sidebar Tabs */}
        <div className="lg:w-56 flex flex-col gap-1">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setTab(id)}
              className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-left transition-all ${
                tab === id ? "bg-blue-600/15 text-blue-400 ring-1 ring-blue-500/20" : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}>
              <Icon className="h-4 w-4 flex-shrink-0" />{label}
            </button>
          ))}
          <div className="mt-4 pt-4 border-t border-white/[0.05]">
            <button onClick={logout}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all">
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 rounded-2xl border border-white/[0.06] bg-[#111827] p-6">
          {/* Account */}
          {tab === "account" && (
            <div className="space-y-6">
              <h2 className="font-semibold text-white">Account Information</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { label: "Full Name", value: user?.name, type: "text" },
                  { label: "Email Address", value: user?.email, type: "email" },
                  { label: "Phone Number", value: "", placeholder: "+91 98765 43210", type: "tel" },
                  { label: "Location", value: "", placeholder: "City, Country", type: "text" },
                ].map(({ label, value, type, placeholder }) => (
                  <div key={label}>
                    <label className="mb-1.5 block text-xs font-medium text-slate-400">{label}</label>
                    <input defaultValue={value} type={type} placeholder={placeholder}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/15" />
                  </div>
                ))}
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-400">Bio / Headline</label>
                <textarea rows={3} placeholder="Tell recruiters about yourself…"
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/15" />
              </div>
              <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-500 transition-all">
                <Save className="h-4 w-4" /> Save Changes
              </button>
            </div>
          )}

          {/* Security */}
          {tab === "security" && (
            <div className="space-y-6">
              <h2 className="font-semibold text-white">Security Settings</h2>
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-slate-300">Change Password</h3>
                {["Current Password", "New Password", "Confirm New Password"].map((l) => (
                  <div key={l} className="relative">
                    <label className="mb-1.5 block text-xs text-slate-400">{l}</label>
                    <input type={showPw ? "text" : "password"} placeholder="••••••••"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 pr-10 text-sm text-white placeholder-slate-600 outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/15" />
                    <button onClick={() => setShowPw(!showPw)} className="absolute right-3 top-8 text-slate-500 hover:text-white">
                      {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                ))}
                <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-500 transition-all">
                  <Lock className="h-4 w-4" /> Update Password
                </button>
              </div>
              <div className="border-t border-white/[0.05] pt-6">
                <h3 className="mb-4 text-sm font-medium text-slate-300">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                  <div className="flex items-center gap-3">
                    <Smartphone className="h-5 w-5 text-slate-400" />
                    <div>
                      <p className="text-sm font-medium text-white">Authenticator App</p>
                      <p className="text-xs text-slate-500">Add an extra layer of security</p>
                    </div>
                  </div>
                  <Toggle checked={privacy.show2fa} onChange={(v) => setPrivacy({ ...privacy, show2fa: v })} />
                </div>
              </div>
              <div className="border-t border-white/[0.05] pt-6">
                <h3 className="mb-4 text-sm font-medium text-red-400">Danger Zone</h3>
                <button className="rounded-xl border border-red-500/25 px-5 py-2.5 text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all">
                  Delete Account
                </button>
              </div>
            </div>
          )}

          {/* Notifications */}
          {tab === "notif" && (
            <div className="space-y-6">
              <h2 className="font-semibold text-white">Notification Preferences</h2>
              {[
                { key: "applications", label: "Application Updates", desc: "Status changes, shortlists, offers" },
                { key: "recommendations", label: "New Recommendations", desc: "Internships matching your profile" },
                { key: "reminders", label: "Deadline Reminders", desc: "Upcoming application deadlines" },
                { key: "email", label: "Email Notifications", desc: "Receive notifications via email" },
                { key: "sms", label: "SMS Notifications", desc: "Receive alerts via SMS" },
              ].map(({ key, label, desc }) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">{label}</p>
                    <p className="text-xs text-slate-500">{desc}</p>
                  </div>
                  <Toggle checked={notifs[key]} onChange={(v) => setNotifs({ ...notifs, [key]: v })} />
                </div>
              ))}
            </div>
          )}

          {/* Privacy */}
          {tab === "privacy" && (
            <div className="space-y-6">
              <h2 className="font-semibold text-white">Privacy Settings</h2>
              {[
                { key: "profileVisible", label: "Public Profile", desc: "Allow recruiters to find and view your profile" },
                { key: "showEmail", label: "Show Email", desc: "Display your email on your public profile" },
              ].map(({ key, label, desc }) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">{label}</p>
                    <p className="text-xs text-slate-500">{desc}</p>
                  </div>
                  <Toggle checked={privacy[key]} onChange={(v) => setPrivacy({ ...privacy, [key]: v })} />
                </div>
              ))}
            </div>
          )}

          {/* Appearance */}
          {tab === "appear" && (
            <div className="space-y-6">
              <h2 className="font-semibold text-white">Appearance</h2>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "dark", label: "Dark", icon: Moon },
                  { id: "light", label: "Light", icon: Sun },
                  { id: "system", label: "System", icon: Monitor },
                ].map(({ id, label, icon: Icon }) => (
                  <button key={id} onClick={() => setTheme(id)}
                    className={`flex flex-col items-center gap-2 rounded-xl border p-4 transition-all ${theme === id ? "border-blue-500/40 bg-blue-500/10 text-blue-400" : "border-white/[0.06] text-slate-400 hover:border-white/20 hover:text-white"}`}>
                    <Icon className="h-5 w-5" />
                    <span className="text-xs font-medium">{label}</span>
                    {theme === id && <CheckCircle2 className="h-3 w-3 text-blue-400" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
