import { Link } from "react-router-dom";
import { Briefcase, Github, Linkedin, Twitter, Heart } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  const links = {
    Platform: [
      { label: "Browse Internships", href: "/internships" },
      { label: "For Students", href: "/register" },
      { label: "For Recruiters", href: "/register?role=recruiter" },
    ],
    Company: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
    ],
    Legal: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Use", href: "#" },
    ],
  };

  return (
    <footer className="border-t border-slate-200 bg-slate-50/80">
      <div className="container-page py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="mb-4 flex items-center gap-2 text-lg font-bold group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 shadow-glow-sm">
                <Briefcase className="h-4 w-4 text-white" />
              </div>
              <span className="gradient-text">InternConnect</span>
            </Link>
            <p className="max-w-[220px] text-sm leading-relaxed text-slate-600">
              Curated internship experiences that help ambitious students make the next move with confidence.
            </p>
            <div className="mt-4 flex gap-3">
              {[
                { icon: Github, href: "#", label: "GitHub" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
                { icon: Twitter, href: "#", label: "Twitter" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-all hover:border-brand-500/50 hover:text-brand-600"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(links).map(([heading, items]) => (
            <div key={heading}>
              <h3 className="mb-3 text-sm font-semibold text-slate-900">{heading}</h3>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link to={item.href} className="text-sm text-slate-600 transition-colors hover:text-brand-600">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-6 sm:flex-row">
          <p className="text-xs text-slate-500">© {year} InternConnect. All rights reserved.</p>
          <p className="flex items-center gap-1 text-xs text-slate-500">
            Made with <Heart className="h-3 w-3 fill-amber-400 text-amber-400" /> for students and recruiters
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
