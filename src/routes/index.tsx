import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  GraduationCap,
  Users,
  Cpu,
  CheckCircle2,
  Award,
  Rocket,
  Target,
  Eye,
  MapPin,
  Mail,
  Globe,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  Plus,
  Quote,
  Star,
} from "lucide-react";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pixelwind Technologies — IT Training, Staffing & Tech Solutions" },
      {
        name: "description",
        content:
          "ISO 9001:2015 certified Pixelwind Technologies empowers businesses with IT training, staffing solutions, and modern tech services.",
      },
      { property: "og:title", content: "Pixelwind Technologies" },
      {
        property: "og:description",
        content: "Empowering Businesses with IT Training, Staffing & Tech Solutions.",
      },
    ],
  }),
  component: Landing,
});

/* ---------- Reusable bits ---------- */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          const start = performance.now();
          const dur = 1600;
          const step = (t: number) => {
            const p = Math.min(1, (t - start) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(Math.floor(to * eased));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return (
    <span ref={ref}>
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ---------- Sections ---------- */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#why", label: "Why Us" },
    { href: "#tech", label: "Tech" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div
          className={`flex items-center justify-between rounded-2xl px-4 md:px-6 py-3 transition-all duration-500 ${
            scrolled ? "glass-strong shadow-soft" : "bg-transparent"
          }`}
        >
          <a href="#top" className="flex items-center gap-2.5">
            <img src={logo} alt="Pixelwind Technologies" className="h-9 w-auto" />
            <span className="hidden sm:block font-display font-semibold text-foreground">
              Pixelwind
            </span>
          </a>
          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 gradient-primary group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            className="btn-glow inline-flex items-center gap-2 rounded-full gradient-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:scale-[1.03] transition-transform"
          >
            Get Started <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </motion.header>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute inset-0 -z-10 bg-grid" />
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-mesh animate-float" />
        <div
          className="absolute top-1/3 -right-32 w-[520px] h-[520px] rounded-full bg-mesh animate-float"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full gradient-primary opacity-40"
          style={{
            left: `${(i * 13 + 10) % 90}%`,
            top: `${(i * 19 + 15) % 80}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.7, 0.2],
          }}
          transition={{
            duration: 4 + (i % 4),
            repeat: Infinity,
            delay: i * 0.4,
          }}
        />
      ))}

      <motion.div style={{ y, opacity }} className="mx-auto max-w-7xl px-4 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-primary mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              ISO 9001:2015 Certified Company
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6">
              Empowering Businesses with{" "}
              <span className="gradient-text">Tech that Matters</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-8 leading-relaxed">
              IT Training, Staffing & Tech Solutions — engineered for ambitious companies
              and the next generation of professionals.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="flex flex-wrap gap-4">
              <a
                href="#contact"
                className="btn-glow inline-flex items-center gap-2 rounded-full gradient-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground hover:scale-[1.03] transition-transform"
              >
                Book a Consultation <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 rounded-full glass px-7 py-3.5 text-sm font-semibold text-foreground hover:bg-white transition-all"
              >
                Explore Services
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
              {[
                { v: 5000, s: "+", l: "Students" },
                { v: 98, s: "%", l: "Placement" },
                { v: 50, s: "+", l: "Partners" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-2xl md:text-3xl font-bold gradient-text">
                    <Counter to={s.v} suffix={s.s} />
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Hero visual */}
        <Reveal delay={0.3}>
          <div className="relative">
            <motion.div
              animate={{ y: [0, -16, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative aspect-square max-w-lg mx-auto"
            >
              <div className="absolute inset-0 rounded-[2.5rem] gradient-primary shadow-elegant" />
              <div className="absolute inset-0 rounded-[2.5rem] opacity-30"
                style={{
                  background:
                    "radial-gradient(circle at 20% 20%, white 0%, transparent 40%), radial-gradient(circle at 80% 80%, white 0%, transparent 40%)",
                }}
              />

              {/* Floating cards inside */}
              <div className="absolute inset-0 p-8 flex flex-col justify-between">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="glass-strong rounded-2xl p-4 w-fit shadow-card"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center">
                      <ShieldCheck className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Certified</div>
                      <div className="text-sm font-semibold">ISO 9001:2015</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 }}
                  className="glass-strong rounded-2xl p-5 shadow-card self-end max-w-[230px]"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Rocket className="h-4 w-4 text-primary" />
                    <div className="text-sm font-semibold">Tech Excellence</div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Premium training programs designed by industry experts.
                  </div>
                  <div className="mt-3 h-1.5 rounded-full bg-secondary overflow-hidden">
                    <motion.div
                      className="h-full gradient-primary"
                      initial={{ width: 0 }}
                      animate={{ width: "82%" }}
                      transition={{ delay: 1.1, duration: 1.4 }}
                    />
                  </div>
                </motion.div>
              </div>

              {/* orbiting dot */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 h-6 w-6 rounded-full gradient-primary shadow-glow" />
              </motion.div>
            </motion.div>
          </div>
        </Reveal>
      </motion.div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="relative py-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-primary mb-5">
              About Pixelwind
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              A modern partner for{" "}
              <span className="gradient-text">tech-driven growth</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Pixelwind Technologies is an ISO 9001:2015 certified company delivering
              world-class IT training, staffing, and tech solutions. We bridge talent and
              technology — helping enterprises scale and individuals build careers that matter.
            </p>
            <div className="flex items-center gap-3 rounded-2xl glass p-4 w-fit">
              <Award className="h-6 w-6 text-primary" />
              <div>
                <div className="font-semibold text-sm">ISO 9001:2015 Certified</div>
                <div className="text-xs text-muted-foreground">Quality you can trust</div>
              </div>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-5">
            {[
              {
                icon: Target,
                title: "Our Mission",
                text: "Equip professionals and businesses with the skills, talent, and technology to thrive in a digital world.",
              },
              {
                icon: Eye,
                title: "Our Vision",
                text: "Be the most trusted partner for IT excellence — empowering careers and powering enterprises.",
              },
              {
                icon: ShieldCheck,
                title: "Quality First",
                text: "Certified processes, premium curriculum, and measurable outcomes for every engagement.",
              },
              {
                icon: Rocket,
                title: "Future Ready",
                text: "We focus on emerging tech, in-demand skills, and the workforce of tomorrow.",
              },
            ].map((c, i) => (
              <Reveal key={c.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="glass rounded-2xl p-6 shadow-card h-full transition-all"
                >
                  <div className="h-11 w-11 rounded-xl gradient-primary flex items-center justify-center mb-4 shadow-glow">
                    <c.icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{c.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{c.text}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-24">
          <Reveal>
            <h3 className="text-3xl md:text-5xl font-bold text-center mb-14">
              Our Impact by the Numbers
            </h3>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-border rounded-3xl overflow-hidden glass">
            {[
              { v: 3, s: "+", l: "Years of Business" },
              { v: 5000, s: "+", l: "Students Trained" },
              { v: 200, s: "+", l: "Placements" },
              { v: 50, s: "+", l: "Corporate Clients" },
              { v: 98, s: "%", l: "Satisfaction Rate" },
              { v: 20, s: "+", l: "Training Programs" },
            ].map((s, i) => (
              <Reveal key={s.l} delay={i * 0.05}>
                <div className="bg-card p-8 text-center h-full">
                  <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                    <Counter to={s.v} suffix={s.s} />
                  </div>
                  <div className="text-sm text-muted-foreground">{s.l}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const items = [
    {
      icon: GraduationCap,
      title: "IT Training",
      text: "Industry-grade training programs across modern tech stacks, taught by working professionals with placement support.",
      points: ["Live mentor-led classes", "Hands-on projects", "Certification & placement"],
    },
    {
      icon: Users,
      title: "Staffing Solutions",
      text: "Connect with pre-vetted talent for contract, contract-to-hire, and full-time roles across IT and tech functions.",
      points: ["Pre-screened candidates", "Fast turnaround", "Flexible engagement models"],
    },
    {
      icon: Cpu,
      title: "Tech Solutions",
      text: "End-to-end software, cloud, and digital transformation services tailored for ambitious enterprises.",
      points: ["Web & mobile development", "Cloud & DevOps", "AI & data engineering"],
    },
  ];
  return (
    <section id="services" className="relative py-28 bg-secondary/40">
      <div className="absolute inset-0 -z-10 bg-grid opacity-40" />
      <div className="mx-auto max-w-7xl px-4">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-primary mb-5">
              What we offer
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-5">
              Premium services, <span className="gradient-text">delivered with care</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Three core pillars designed to power your people, your hiring, and your product.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -10 }}
                className="group relative h-full rounded-3xl glass-strong p-8 shadow-card overflow-hidden transition-all hover:shadow-elegant"
              >
                <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full gradient-primary opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-500" />
                <div className="h-14 w-14 rounded-2xl gradient-primary flex items-center justify-center mb-6 shadow-glow group-hover:scale-110 transition-transform">
                  <s.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">{s.text}</p>
                <ul className="space-y-2.5">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 mt-7 text-sm font-semibold text-primary group-hover:gap-3 transition-all"
                >
                  Learn more <ArrowRight className="h-4 w-4" />
                </a>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  const features = [
    { icon: ShieldCheck, t: "Trusted & Certified", d: "ISO 9001:2015 quality processes across every engagement." },
    { icon: Users, t: "Expert Team", d: "Industry veterans, mentors, and engineers behind every program." },
    { icon: Rocket, t: "Outcome Focused", d: "Real placements, real deployments, measurable results." },
    { icon: Award, t: "Proven Track Record", d: "5000+ trained, 200+ placed, 50+ corporate partners." },
    { icon: Target, t: "Tailored Solutions", d: "Programs and services customized to your goals." },
    { icon: Sparkles, t: "Modern Approach", d: "Latest stacks, modern pedagogy, premium experience." },
  ];
  return (
    <section id="why" className="relative py-28">
      <div className="mx-auto max-w-7xl px-4">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-primary mb-5">
              Why choose us
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-5">
              Built on <span className="gradient-text">trust, talent & tech</span>
            </h2>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <Reveal key={f.t} delay={i * 0.06}>
              <motion.div
                whileHover={{ y: -6 }}
                className="rounded-2xl glass p-6 shadow-card h-full"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="h-11 w-11 rounded-xl gradient-primary flex items-center justify-center">
                    <f.icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-semibold">{f.t}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.d}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TechStack() {
  const stack = [
    "React", "Node.js", "Python", "AWS", "Azure", "Docker",
    "Kubernetes", "TypeScript", "Next.js", "PostgreSQL", "MongoDB",
    "GraphQL", "Java", "Spring", "Go", "Tailwind", "Figma", "GitHub",
  ];
  const row = [...stack, ...stack];
  return (
    <section id="tech" className="relative py-28 bg-secondary/40 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-primary mb-5">
              Technologies
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-5">
              The stacks we <span className="gradient-text">teach & ship</span>
            </h2>
          </div>
        </Reveal>
      </div>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-secondary/80 to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-secondary/80 to-transparent z-10" />
        <div className="flex gap-4 animate-marquee w-max">
          {row.map((t, i) => (
            <div
              key={i}
              className="glass-strong rounded-2xl px-7 py-4 text-sm font-semibold whitespace-nowrap shadow-card hover:shadow-glow transition-shadow"
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    {
      name: "Ananya R.",
      role: "Software Engineer",
      text: "The training was hands-on and modern. I cracked my first dev role within weeks of completing the program.",
    },
    {
      name: "Karthik M.",
      role: "HR Director",
      text: "Pixelwind staffed our team with pre-vetted engineers in record time. Quality and communication were excellent.",
    },
    {
      name: "Rohan S.",
      role: "Founder, FinTech",
      text: "Their tech team rebuilt our platform on a modern stack. Fast, reliable, and a true partner to our business.",
    },
  ];
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-7xl px-4">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-primary mb-5">
              Testimonials
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-5">
              Loved by <span className="gradient-text">students & teams</span>
            </h2>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                className="glass-strong rounded-3xl p-7 shadow-card h-full"
              >
                <Quote className="h-8 w-8 text-primary/40 mb-4" />
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-foreground/90 leading-relaxed mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-border/60">
                  <div className="h-11 w-11 rounded-full gradient-primary flex items-center justify-center text-white font-semibold">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const faqs = [
  { q: "What services does Pixelwind Technologies offer?", a: "We offer IT Training, Staffing Solutions, and end-to-end Tech Solutions including web, mobile, cloud, and AI." },
  { q: "Are your programs suitable for beginners?", a: "Yes. Our curriculum is designed to take learners from fundamentals to job-ready, with hands-on mentorship at every step." },
  { q: "How long does a typical training program last?", a: "Most programs run between 8 and 16 weeks depending on the track. Custom corporate programs can be tailored to any duration." },
  { q: "Do you provide placement assistance?", a: "Absolutely. With 200+ successful placements and 50+ partner companies, we provide active placement support." },
  { q: "Is Pixelwind Technologies certified?", a: "Yes — we are an ISO 9001:2015 certified company committed to quality across all engagements." },
  { q: "Can you design a custom training program for our company?", a: "Yes. We design custom corporate training tailored to your team's stack, goals, and timelines." },
];

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="relative py-28 bg-secondary/40">
      <div className="mx-auto max-w-3xl px-4">
        <Reveal>
          <div className="text-center mb-12">
            <div className="text-xs font-bold tracking-widest text-primary mb-2">FAQS</div>
            <h2 className="text-4xl md:text-5xl font-bold">
              Have Questions? <span className="gradient-text">We Have Answers.</span>
            </h2>
          </div>
        </Reveal>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.04}>
              <div className="glass rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-semibold">{f.q}</span>
                  <motion.div animate={{ rotate: open === i ? 45 : 0 }}>
                    <Plus className="h-5 w-5 text-primary" />
                  </motion.div>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: open === i ? "auto" : 0, opacity: open === i ? 1 : 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                    {f.a}
                  </div>
                </motion.div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative py-28 overflow-hidden">
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-mesh -z-10" />
      <div className="mx-auto max-w-7xl px-4">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-primary mb-5">
              Get in touch
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-5">
              Let's build something <span className="gradient-text">remarkable</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Tell us about your goals — training, hiring, or building. We'll get back within 24 hours.
            </p>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-5 gap-6">
          <Reveal className="lg:col-span-3">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="glass-strong rounded-3xl p-8 shadow-elegant space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Your Name</label>
                  <input
                    type="text"
                    placeholder="Jane Doe"
                    className="mt-1.5 w-full rounded-xl bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Email</label>
                  <input
                    type="email"
                    placeholder="you@company.com"
                    className="mt-1.5 w-full rounded-xl bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Subject</label>
                <input
                  type="text"
                  placeholder="How can we help?"
                  className="mt-1.5 w-full rounded-xl bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Message</label>
                <textarea
                  rows={5}
                  placeholder="Tell us a bit more..."
                  className="mt-1.5 w-full rounded-xl bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all resize-none"
                />
              </div>
              <button
                type="submit"
                className="btn-glow w-full inline-flex items-center justify-center gap-2 rounded-full gradient-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground hover:scale-[1.01] transition-transform"
              >
                Send Message <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-2">
            <div className="space-y-4 h-full flex flex-col">
              {[
                {
                  icon: MapPin,
                  title: "Visit us",
                  lines: [
                    "Castel, 4th Floor, Potluri Towers,",
                    "Beside Boylondon, Dwaraka Nagar,",
                    "Visakhapatnam, AP 530016",
                  ],
                },
                {
                  icon: Mail,
                  title: "Email us",
                  lines: ["email.pixelwindtechnogies@gmail.com"],
                  href: "mailto:email.pixelwindtechnogies@gmail.com",
                },
                {
                  icon: Globe,
                  title: "Website",
                  lines: ["www.pixelwindtechnologies.com"],
                  href: "https://www.pixelwindtechnologies.com/",
                },
              ].map((c) => (
                <a
                  key={c.title}
                  href={c.href || "#"}
                  className="block glass rounded-2xl p-5 shadow-card hover:shadow-glow transition-all hover:-translate-y-0.5"
                >
                  <div className="flex items-start gap-4">
                    <div className="h-11 w-11 rounded-xl gradient-primary flex items-center justify-center shrink-0">
                      <c.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">{c.title}</div>
                      {c.lines.map((l) => (
                        <div key={l} className="text-sm text-muted-foreground leading-relaxed break-all">
                          {l}
                        </div>
                      ))}
                    </div>
                  </div>
                </a>
              ))}
              <div className="rounded-2xl overflow-hidden glass shadow-card flex-1 min-h-[180px] relative">
                <iframe
                  title="Map"
                  src="https://www.google.com/maps?q=Dwaraka+Nagar,+Visakhapatnam&output=embed"
                  className="w-full h-full min-h-[180px] border-0"
                  loading="lazy"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative pt-20 pb-8 border-t border-border bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <img src={logo} alt="Pixelwind" className="h-9 w-auto" />
              <span className="font-display font-semibold">Pixelwind Technologies</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed mb-5">
              Empowering Businesses with IT Training, Staffing & Tech Solutions.
              ISO 9001:2015 certified.
            </p>
            <div className="flex gap-3">
              {[Linkedin, Twitter, Instagram, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="h-10 w-10 rounded-full glass flex items-center justify-center hover:gradient-primary hover:text-white transition-all"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <div className="font-semibold mb-4">Company</div>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {["About", "Services", "Why Us", "Contact"].map((l) => (
                <li key={l}>
                  <a href={`#${l.toLowerCase().replace(" ", "")}`} className="hover:text-foreground transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-4">Services</div>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {["IT Training", "Staffing", "Tech Solutions", "Corporate Programs"].map((l) => (
                <li key={l}>
                  <a href="#services" className="hover:text-foreground transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row gap-3 items-center justify-between text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Pixelwind Technologies. All rights reserved.</div>
          <div>Crafted with care · ISO 9001:2015 Certified</div>
        </div>
      </div>
    </footer>
  );
}

function Landing() {
  return (
    <div className="relative">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <WhyUs />
        <TechStack />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
