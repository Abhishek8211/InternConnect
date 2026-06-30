import { Link } from "react-router-dom";
import { Briefcase, Github, Linkedin, Twitter, Heart } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  const links = {
    Platform: [
      { label: "Browse Internships", href: "/internships" },
      { label: "For Students",       href: "/register" },
      { label: "For Recruiters",     href: "/register?role=recruiter" },
    ],
    Company: [
      { label: "About",   href: "#" },
      { label: "Blog",    href: "#" },
      { label: "Careers", href: "#" },
    ],
    Legal: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Use",   href: "#" },
    ],
  };

  return (
    <footer className="border-t border-surface-border bg-surface-card/40 backdrop-blur-sm">
      <div className="container-page py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12">
          {/* ── Brand ─────────────────────────────────────── */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 font-bold text-lg group mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 shadow-glow-sm">
                <Briefcase className="h-4 w-4 text-white" />
              </div>
              <span className="gradient-text">InternConnect</span>
            </Link>
            <p className="text-sm text-surface-muted leading-relaxed max-w-[200px]">
              AI-powered internship matching that connects talent with opportunity.
            </p>
            <div className="mt-4 flex gap-3">
              {[
                { icon: Github,   href: "#", label: "GitHub" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
                { icon: Twitter,  href: "#", label: "Twitter" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-surface-border text-surface-muted transition-all hover:border-brand-500/50 hover:text-brand-400"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* ── Link Columns ──────────────────────────────── */}
          {Object.entries(links).map(([heading, items]) => (
            <div key={heading}>
              <h3 className="mb-3 text-sm font-semibold text-white">{heading}</h3>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.href}
                      className="text-sm text-surface-muted transition-colors hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom bar ────────────────────────────────── */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-surface-border pt-6 sm:flex-row">
          <p className="text-xs text-surface-muted">
            © {year} InternConnect. All rights reserved.
          </p>
          <p className="flex items-center gap-1 text-xs text-surface-muted">
            Made with <Heart className="h-3 w-3 text-accent-500 fill-accent-500" /> for students & recruiters
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
