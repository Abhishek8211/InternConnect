import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { User, Lock, Bell, Shield, Save, Eye, EyeOff, LogOut, Building2, Smartphone, CheckCircle2 } from "lucide-react";

const Toggle = ({ checked, onChange }) => (
  <button onClick={() => onChange(!checked)}
    className={`relative inline-flex h-6 w-10 items-center rounded-full transition-colors duration-200 ${checked ? "bg-violet-600" : "bg-white/10"}`}>
    <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${checked ? "translate-x-5" : "translate-x-1"}`} />
  </button>
);

const RecruiterSettings = () => {
  const { user, logout } = useAuth();
  const [tab, setTab] = useState("account");
  const [showPw, setShowPw] = useState(false);
  const [notifs, setNotifs] = useState({ newApplicants: true, shortlist: true, deadline: true, email: true, sms: false });
  const [privacy, setPrivacy] = useState({ publicProfile: true, showContact: false, twofa: false });

  const TABS = [
    { id: "account",  label: "Account",  icon: User },
    { id: "company",  label: "Company",  icon: Building2 },
    { id: "security", label: "Security", icon: Lock },
    { id: "notif",    label: "Notifications", icon: Bell },
    { id: "privacy",  label: "Privacy",  icon: Shield },
  ];

  return (
    <div className="min-h-full p-4 sm:p-6 lg:p-8 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="mt-1 text-sm text-slate-400">Manage recruiter account preferences</p>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="lg:w-56 flex flex-col gap-1">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setTab(id)}
              className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-left transition-all ${tab === id ? "bg-violet-600/15 text-violet-400 ring-1 ring-violet-500/20" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}>
              <Icon className="h-4 w-4 flex-shrink-0" />{label}
            </button>
          ))}
          <div className="mt-4 pt-4 border-t border-white/[0.05]">
            <button onClick={logout} className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all">
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </div>
        </div>

        <div className="flex-1 rounded-2xl border border-white/[0.06] bg-[#111827] p-6">
          {tab === "account" && (
            <div className="space-y-5">
              <h2 className="font-semibold text-white">Account Information</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {[{ l:"Full Name",v:user?.name,t:"text" },{ l:"Email",v:user?.email,t:"email" },{ l:"Phone",v:"",t:"tel",p:"+91 98765 43210" },{ l:"Designation",v:"",t:"text",p:"HR Manager" }].map(({ l, v, t, p }) => (
                  <div key={l}>
                    <label className="mb-1.5 block text-xs text-slate-400">{l}</label>
                    <input type={t} defaultValue={v} placeholder={p}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/15" />
                  </div>
                ))}
              </div>
              <button className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-500 transition-all">
                <Save className="h-4 w-4" /> Save Changes
              </button>
            </div>
          )}

          {tab === "company" && (
            <div className="space-y-5">
              <h2 className="font-semibold text-white">Company Details</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {[{ l:"Company Name",p:"Your Company" },{ l:"Industry",p:"Technology" },{ l:"Website",p:"https://yourcompany.com" },{ l:"Company Size",p:"50-200" }].map(({ l, p }) => (
                  <div key={l}>
                    <label className="mb-1.5 block text-xs text-slate-400">{l}</label>
                    <input placeholder={p} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/15" />
                  </div>
                ))}
              </div>
              <button className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-500 transition-all">
                <Save className="h-4 w-4" /> Save
              </button>
            </div>
          )}

          {tab === "security" && (
            <div className="space-y-6">
              <h2 className="font-semibold text-white">Security</h2>
              {["Current Password","New Password","Confirm New Password"].map((l) => (
                <div key={l} className="relative">
                  <label className="mb-1.5 block text-xs text-slate-400">{l}</label>
                  <input type={showPw ? "text" : "password"} placeholder="••••••••"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 pr-10 text-sm text-white placeholder-slate-600 outline-none focus:border-violet-500/50" />
                  <button onClick={() => setShowPw(!showPw)} className="absolute right-3 top-8 text-slate-500">
                    {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              ))}
              <button className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-500 transition-all">
                <Lock className="h-4 w-4" /> Update Password
              </button>
              <div className="border-t border-white/[0.05] pt-5">
                <div className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                  <div className="flex items-center gap-3">
                    <Smartphone className="h-5 w-5 text-slate-400" />
                    <div>
                      <p className="text-sm font-medium text-white">Two-Factor Authentication</p>
                      <p className="text-xs text-slate-500">Secure your account with 2FA</p>
                    </div>
                  </div>
                  <Toggle checked={privacy.twofa} onChange={(v) => setPrivacy({ ...privacy, twofa: v })} />
                </div>
              </div>
            </div>
          )}

          {tab === "notif" && (
            <div className="space-y-5">
              <h2 className="font-semibold text-white">Notification Preferences</h2>
              {[
                { k:"newApplicants",l:"New Applications",d:"Get notified when someone applies" },
                { k:"shortlist",    l:"Shortlist Updates",d:"When applicants respond to shortlisting" },
                { k:"deadline",     l:"Deadline Reminders",d:"Reminders before posting deadlines" },
                { k:"email",        l:"Email Notifications",d:"Receive all notifications via email" },
                { k:"sms",          l:"SMS Notifications",d:"Receive alerts via SMS" },
              ].map(({ k, l, d }) => (
                <div key={k} className="flex items-center justify-between">
                  <div><p className="text-sm font-medium text-white">{l}</p><p className="text-xs text-slate-500">{d}</p></div>
                  <Toggle checked={notifs[k]} onChange={(v) => setNotifs({ ...notifs, [k]: v })} />
                </div>
              ))}
            </div>
          )}

          {tab === "privacy" && (
            <div className="space-y-5">
              <h2 className="font-semibold text-white">Privacy</h2>
              {[
                { k:"publicProfile",l:"Public Company Profile",d:"Students can discover your company" },
                { k:"showContact",  l:"Show Contact Details",d:"Display phone and email on profile" },
              ].map(({ k, l, d }) => (
                <div key={k} className="flex items-center justify-between">
                  <div><p className="text-sm font-medium text-white">{l}</p><p className="text-xs text-slate-500">{d}</p></div>
                  <Toggle checked={privacy[k]} onChange={(v) => setPrivacy({ ...privacy, [k]: v })} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecruiterSettings;
