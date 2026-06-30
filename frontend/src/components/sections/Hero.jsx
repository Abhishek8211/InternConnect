import { Link } from "react-router-dom";
import { Search, ArrowRight, Sparkles, Users, Briefcase, TrendingUp } from "lucide-react";
import Button from "@/components/ui/Button";

const STATS = [
  { icon: Briefcase, label: "Internships",  value: "10,000+" },
  { icon: Users,     label: "Students",     value: "50,000+" },
  { icon: TrendingUp, label: "Placed",      value: "8,500+" },
];

const Hero = () => {
  return (
    <section className="relative overflow-hidden py-24 md:py-32" style={{ background: "var(--gradient-hero)" }}>
      {/* ── Background blobs ───────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 h-80 w-80 rounded-full bg-brand-500/20 blur-[100px]" />
        <div className="absolute -bottom-20 right-1/4 h-64 w-64 rounded-full bg-accent-500/20 blur-[100px]" />
      </div>

      <div className="container-page relative z-10">
        {/* ── Eyebrow ────────────────────────────────────────────── */}
        <div className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-2">
          <Sparkles className="h-4 w-4 text-brand-400 animate-float" />
          <span className="text-sm font-medium text-brand-300">AI-Powered Matching</span>
        </div>

        {/* ── Heading ────────────────────────────────────────────── */}
        <h1 className="mx-auto mb-6 max-w-4xl text-center text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Find Your{" "}
          <span className="gradient-text">Dream Internship</span>{" "}
          with AI
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-center text-lg text-surface-muted md:text-xl">
          InternConnect uses intelligent matching to connect students with the right opportunities and helps recruiters discover top talent — faster than ever.
        </p>

        {/* ── CTA ────────────────────────────────────────────────── */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button as={Link} to="/internships" variant="gradient" size="lg" className="gap-2">
            <Search className="h-5 w-5" />
            Explore Internships
          </Button>
          <Button as={Link} to="/register?role=recruiter" variant="secondary" size="lg" className="gap-2">
            Post an Internship
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* ── Stats ──────────────────────────────────────────────── */}
        <div className="mt-16 flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-16">
          {STATS.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-2">
                <Icon className="h-5 w-5 text-brand-400" />
                <span className="text-2xl font-extrabold text-white">{value}</span>
              </div>
              <span className="text-sm text-surface-muted">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
