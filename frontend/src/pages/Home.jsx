import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  ChevronDown,
  Clock3,
  Compass,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import Button from "@/components/ui/Button";

const featuredInternships = [
  {
    title: "Product Design Intern",
    company: "Northstar Labs",
    location: "Remote • 3 months",
    stipend: "$1,200/mo",
    tags: ["UI/UX", "Figma", "Remote"],
  },
  {
    title: "Data Science Fellow",
    company: "Quantify AI",
    location: "New York, NY",
    stipend: "$1,800/mo",
    tags: ["Python", "ML", "Hybrid"],
  },
  {
    title: "Software Engineering Intern",
    company: "BrightLoop",
    location: "San Francisco, CA",
    stipend: "$2,000/mo",
    tags: ["React", "Node", "On-site"],
  },
];

const companies = ["Stripe", "Notion", "Vercel", "Linear", "Dropbox", "Figma"];

const features = [
  {
    title: "Smart matches",
    description:
      "Find internships aligned with your skills, interests, and career goals in seconds.",
    icon: Compass,
  },
  {
    title: "Verified opportunities",
    description:
      "Every listing is reviewed so students can apply with confidence and recruiters get real talent.",
    icon: ShieldCheck,
  },
  {
    title: "Fast applications",
    description:
      "One-click applications, tailored resumes, and progress tracking keep momentum high.",
    icon: TrendingUp,
  },
];

const steps = [
  {
    title: "Create your profile",
    description:
      "Share your experience, skills, and interests so InternConnect can understand what you want.",
  },
  {
    title: "Discover curated roles",
    description:
      "Browse high-signal internships tailored to your goals and preferred work style.",
  },
  {
    title: "Apply and grow",
    description:
      "Track your applications, receive insights, and move confidently toward your first opportunity.",
  },
];

const stats = [
  { value: "10k+", label: "Internship Listings" },
  { value: "48k+", label: "Students Connected" },
  { value: "92%", label: "Placement Match Rate" },
];

const testimonials = [
  {
    quote:
      "I landed my first product internship within two weeks thanks to the quality of the matches.",
    name: "Aisha Patel",
    role: "UX Design Student",
  },
  {
    quote:
      "The recruiter dashboard helped us shortlist finalists in a fraction of the usual time.",
    name: "Marcus Lee",
    role: "Talent Lead, BrightLoop",
  },
];

const faqs = [
  {
    question: "Who is InternConnect built for?",
    answer:
      "It is designed for students looking for internships and companies that want to hire emerging talent faster.",
  },
  {
    question: "Can I use it for remote internships?",
    answer:
      "Yes. You can filter by remote, hybrid, or on-site roles and discover opportunities across locations.",
  },
  {
    question: "Do recruiters get access to applicant insights?",
    answer:
      "Recruiters can review applications, manage pipelines, and prioritize candidates with clear engagement data.",
  },
];

const Home = () => {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="page-enter min-h-screen bg-[#F8FAFC] text-slate-900">
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-sky-50 to-blue-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.16),_transparent_45%)]" />
        <div className="container-page relative z-10 py-20 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/90 px-4 py-2 text-sm font-medium text-brand-700 shadow-sm">
                <Sparkles className="h-4 w-4" />
                AI-powered internship matching for ambitious students
              </div>
              <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                Launch your career with{" "}
                <span className="text-brand-600">high-impact internships</span>.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                Discover curated opportunities at fast-growing startups, global
                brands, and mission-driven teams—without the guesswork.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button as={Link} to="/internships" variant="primary" size="lg">
                  Browse internships
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button as={Link} to="/register" variant="outline" size="lg">
                  Join as a student
                </Button>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-slate-600">
                <span className="flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4 text-brand-500" /> Verified
                  roles
                </span>
                <span className="flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4 text-brand-500" /> Free to
                  explore
                </span>
                <span className="flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4 text-brand-500" /> Tailored
                  recommendations
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              <div className="rounded-[28px] border border-slate-200 bg-white/90 p-5 shadow-[0_20px_80px_rgba(15,23,42,0.12)] backdrop-blur">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        Your next opportunity
                      </p>
                      <p className="text-sm text-slate-500">
                        Recommended for you
                      </p>
                    </div>
                    <div className="rounded-full bg-brand-50 p-2 text-brand-600">
                      <BriefcaseBusiness className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="rounded-2xl border border-brand-100 bg-white p-4 shadow-sm">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-slate-900">
                          Growth Marketing Intern
                        </p>
                        <p className="mt-1 text-sm text-slate-600">
                          Northstar Labs • Remote
                        </p>
                      </div>
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                        High fit
                      </span>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {["SEO", "Analytics", "Remote"].map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-slate-200 bg-white p-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                        Fast application
                      </p>
                      <p className="mt-1 text-sm text-slate-700">
                        One-click apply with tailored materials.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                        Career support
                      </p>
                      <p className="mt-1 text-sm text-slate-700">
                        Get advice from mentors and hiring teams.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="search" className="relative z-20 -mt-8 px-4 sm:px-6 lg:px-8">
        <div className="container-page">
          <div className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_16px_60px_rgba(15,23,42,0.08)] sm:p-6">
            <div className="grid gap-3 lg:grid-cols-[1.3fr_0.7fr_0.6fr_auto]">
              <label className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                <Search className="h-4 w-4 text-brand-500" />
                <input
                  className="w-full border-none bg-transparent outline-none"
                  placeholder="Search internships, skills, or companies"
                />
              </label>
              <label className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                <Building2 className="h-4 w-4 text-brand-500" />
                <select className="w-full border-none bg-transparent outline-none">
                  <option>Any industry</option>
                  <option>Software</option>
                  <option>Design</option>
                  <option>Marketing</option>
                </select>
              </label>
              <label className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                <Clock3 className="h-4 w-4 text-brand-500" />
                <select className="w-full border-none bg-transparent outline-none">
                  <option>Any duration</option>
                  <option>3 months</option>
                  <option>6 months</option>
                  <option>Summer</option>
                </select>
              </label>
              <Button variant="primary" size="lg" className="justify-center">
                Find matches
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-page">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-600">
              Trusted by teams building the future
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
              {companies.map((company) => (
                <div
                  key={company}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-5 text-center text-sm font-semibold text-slate-600 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-md"
                >
                  {company}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="featured" className="py-16 sm:py-20">
        <div className="container-page">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-600">
                Featured internships
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Opportunities that move your career forward
              </h2>
            </div>
            <Link
              to="/internships"
              className="text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
            >
              View all roles →
            </Link>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {featuredInternships.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.3, delay: index * 0.06 }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">
                    Popular
                  </span>
                  <span className="text-sm font-medium text-slate-500">
                    {item.stipend}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{item.company}</p>
                <p className="mt-3 text-sm text-slate-500">{item.location}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Button
                  as={Link}
                  to="/register"
                  variant="outline"
                  size="sm"
                  className="mt-6"
                >
                  Apply now
                </Button>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="bg-white py-16 sm:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-600">
              Why students choose InternConnect
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Everything you need to land your first great role
            </h2>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.3, delay: index * 0.08 }}
                  className="rounded-[24px] border border-slate-200 bg-slate-50 p-7 shadow-sm"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-slate-900">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-16 sm:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-600">
              How it works
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              A smoother path from curiosity to career
            </h2>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-[24px] border border-slate-200 bg-white p-7 shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 text-sm font-semibold text-white">
                  0{index + 1}
                </div>
                <h3 className="mt-5 text-xl font-semibold text-slate-900">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="stats"
        className="bg-gradient-to-r from-[#2563EB] to-[#38BDF8] py-16 text-white sm:py-20"
      >
        <div className="container-page">
          <div className="grid gap-6 md:grid-cols-3">
            {stats.map((item) => (
              <div
                key={item.label}
                className="rounded-[24px] border border-white/20 bg-white/10 p-6 backdrop-blur-sm"
              >
                <p className="text-4xl font-black">{item.value}</p>
                <p className="mt-2 text-sm text-blue-50">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="bg-slate-50 py-16 sm:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-600">
              Success stories
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Students and recruiters love the experience
            </h2>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="rounded-[24px] border border-slate-200 bg-white p-7 shadow-sm"
              >
                <div className="flex items-center gap-1 text-brand-500">
                  {[...Array(5)].map((_, index) => (
                    <Star key={index} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-5 text-lg leading-8 text-slate-700">
                  “{testimonial.quote}”
                </p>
                <div className="mt-6">
                  <p className="font-semibold text-slate-900">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="py-16 sm:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-600">
                Frequently asked questions
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Everything you need to know before you start
              </h2>
            </div>
            <div className="mt-10 space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={faq.question}
                    className="rounded-[20px] border border-slate-200 bg-white shadow-sm"
                  >
                    <button
                      className="flex w-full items-center justify-between px-5 py-4 text-left"
                      onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    >
                      <span className="font-semibold text-slate-900">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 text-slate-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    {isOpen && (
                      <p className="px-5 pb-5 text-sm leading-7 text-slate-600">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="container-page">
          <div className="rounded-[32px] border border-brand-100 bg-gradient-to-r from-brand-600 to-sky-500 p-8 text-white shadow-[0_20px_80px_rgba(37,99,235,0.22)] sm:p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-100">
                  Ready when you are
                </p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                  Find your next internship and build momentum.
                </h2>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  as={Link}
                  to="/register"
                  variant="secondary"
                  size="lg"
                  className="bg-white text-brand-700 hover:bg-slate-100"
                >
                  Create free account
                </Button>
                <Button
                  as={Link}
                  to="/internships"
                  variant="outline"
                  size="lg"
                  className="border-white/40 text-white hover:bg-white/10"
                >
                  Explore roles
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
