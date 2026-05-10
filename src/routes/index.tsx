import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
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
  Menu,
  X,
  Zap,
  Code2,
  TrendingUp,
  Play,
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

/* ================== Reusable ================== */

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

function Reveal({
  children,
  delay = 0,
  y = 28,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function WordReveal({ text, className = "" }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.1 + i * 0.07 }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
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
          const dur = 1800;
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

/* ================== Tech Logos (simpleicons CDN — accurate brand marks) ================== */

const TECHS = [
  { name: "TypeScript", slug: "typescript", color: "3178C6" },
  { name: "React", slug: "react", color: "61DAFB" },
  { name: "Next.js", slug: "nextdotjs", color: "000000" },
  { name: "Node.js", slug: "nodedotjs", color: "5FA04E" },
  { name: "Python", slug: "python", color: "3776AB" },
  { name: "Java", slug: "openjdk", color: "437291" },
  { name: "Go", slug: "go", color: "00ADD8" },
  { name: "PostgreSQL", slug: "postgresql", color: "4169E1" },
  { name: "MongoDB", slug: "mongodb", color: "47A248" },
  { name: "MySQL", slug: "mysql", color: "4479A1" },
  { name: "Redis", slug: "redis", color: "FF4438" },
  { name: "GraphQL", slug: "graphql", color: "E10098" },
  { name: "AWS", slug: "amazonwebservices", color: "FF9900" },
  { name: "Azure", slug: "microsoftazure", color: "0078D4" },
  { name: "Google Cloud", slug: "googlecloud", color: "4285F4" },
  { name: "Docker", slug: "docker", color: "2496ED" },
  { name: "Kubernetes", slug: "kubernetes", color: "326CE5" },
  { name: "Tailwind CSS", slug: "tailwindcss", color: "06B6D4" },
  { name: "GitHub", slug: "github", color: "181717" },
  { name: "Figma", slug: "figma", color: "F24E1E" },
  { name: "Vercel", slug: "vercel", color: "000000" },
  { name: "Spring", slug: "spring", color: "6DB33F" },
  { name: "TensorFlow", slug: "tensorflow", color: "FF6F00" },
  { name: "Flutter", slug: "flutter", color: "02569B" },
];

function TechLogo({ slug, color, name, size = 36 }: { slug: string; color: string; name: string; size?: number }) {
  return (
    <img
      src={`https://cdn.simpleicons.org/${slug}/${color}`}
      alt={name}
      width={size}
      height={size}
      loading="lazy"
      className="object-contain"
      style={{ width: size, height: size }}
    />
  );
}

/* ================== Navbar ================== */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
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
      transition={{ duration: 0.6, ease }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div
          className={`flex items-center justify-between rounded-2xl px-4 md:px-6 py-3 transition-all duration-500 ${
            scrolled ? "glass-strong shadow-soft" : "bg-transparent"
          }`}
        >
          <a href="#top" className="flex items-center gap-2.5">
            <img src={logo} alt="Pixelwind" className="h-9 w-auto" />
            <span className="hidden sm:block font-display font-semibold text-foreground tracking-tight">
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
          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="hidden sm:inline-flex btn-glow items-center gap-2 rounded-full gradient-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:scale-[1.03] transition-transform"
            >
              Get Started <ArrowRight className="h-4 w-4" />
            </a>
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden h-10 w-10 rounded-full glass flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden mt-2 glass-strong rounded-2xl p-4 shadow-soft"
            >
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-2.5 text-sm font-medium text-foreground/80"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full gradient-primary w-full py-3 text-sm font-semibold text-primary-foreground"
              >
                Get Started <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}

/* ================== Hero (cinematic + mouse reactive) ================== */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 18 });
  const sy = useSpring(my, { stiffness: 80, damping: 18 });

  const tiltX = useTransform(sy, (v) => v * -8);
  const tiltY = useTransform(sx, (v) => v * 8);
  const lightX = useTransform(sx, (v) => 50 + v * 30);
  const lightY = useTransform(sy, (v) => 50 + v * 30);

  function onMove(e: React.MouseEvent) {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  // Featured logos for floating chips around hero mock
  const floats = [
    { tech: TECHS[1], pos: "top-6 -left-6", delay: 0.6 },
    { tech: TECHS[6], pos: "top-16 -right-10", delay: 0.75 },
    { tech: TECHS[12], pos: "bottom-24 -left-10", delay: 0.9 },
    { tech: TECHS[15], pos: "bottom-6 right-8", delay: 1.05 },
    { tech: TECHS[7], pos: "top-1/2 -right-12", delay: 1.2 },
  ];

  return (
    <section
      id="top"
      ref={ref}
      onMouseMove={onMove}
      className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute inset-0 -z-10 bg-grid" />
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -left-32 w-[520px] h-[520px] rounded-full bg-mesh animate-float" />
        <div
          className="absolute top-1/3 -right-40 w-[560px] h-[560px] rounded-full bg-mesh animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div className="absolute bottom-0 left-1/3 w-[420px] h-[420px] rounded-full bg-mesh animate-float-slow" />
      </div>

      {/* Mouse-reactive spotlight */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: useTransform(
            [lightX, lightY],
            ([x, y]) =>
              `radial-gradient(600px circle at ${x}% ${y}%, oklch(0.7 0.2 255 / 0.18), transparent 60%)`
          ),
        }}
      />

      {/* Particles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full gradient-primary opacity-50"
          style={{ left: `${(i * 11 + 8) % 92}%`, top: `${(i * 17 + 12) % 82}%` }}
          animate={{ y: [0, -36, 0], opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: 5 + (i % 5), repeat: Infinity, delay: i * 0.35 }}
        />
      ))}

      <motion.div
        style={{ y, opacity }}
        className="relative mx-auto max-w-7xl px-4 grid lg:grid-cols-12 gap-12 items-center"
      >
        {/* Copy */}
        <div className="lg:col-span-7">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-primary mb-6 shadow-soft">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full gradient-primary opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 gradient-primary" />
              </span>
              ISO 9001:2015 Certified · Now hiring tech mentors
            </div>
          </Reveal>

          <h1 className="font-display text-[clamp(2.4rem,6.5vw,5.25rem)] font-bold leading-[1.02] tracking-tight mb-6">
            <WordReveal text="Build the future" className="block" />
            <WordReveal text="with engineers" className="block" />
            <span className="block">
              <span className="inline-block overflow-hidden align-bottom">
                <motion.span
                  className="inline-block gradient-text"
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease, delay: 0.55 }}
                >
                  who actually ship.
                </motion.span>
              </span>
            </span>
          </h1>

          <Reveal delay={0.7}>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-8 leading-relaxed">
              Pixelwind Technologies trains world-class developers, staffs ambitious teams,
              and ships premium software for companies that move fast.
            </p>
          </Reveal>

          <Reveal delay={0.85}>
            <div className="flex flex-wrap gap-4">
              <a
                href="#contact"
                className="btn-glow inline-flex items-center gap-2 rounded-full gradient-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground hover:scale-[1.03] transition-transform"
              >
                Start a project <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 rounded-full glass px-7 py-3.5 text-sm font-semibold text-foreground hover:bg-white transition-all group"
              >
                <span className="h-7 w-7 rounded-full gradient-primary flex items-center justify-center">
                  <Play className="h-3 w-3 text-white fill-white ml-0.5" />
                </span>
                See how it works
              </a>
            </div>
          </Reveal>

          <Reveal delay={1}>
            <div className="mt-12 flex flex-wrap items-center gap-8">
              <div className="flex items-center -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-9 w-9 rounded-full border-2 border-background gradient-primary flex items-center justify-center text-[11px] font-bold text-white shadow-soft"
                    style={{ background: `linear-gradient(135deg, oklch(0.55 0.22 ${230 + i * 15}), oklch(0.7 0.18 ${260 + i * 12}))` }}
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex gap-0.5 mb-1">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <div className="text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">5,000+</span> learners & teams trust Pixelwind
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Hero visual: 3D tilted dashboard mock w/ floating tech chips */}
        <div className="lg:col-span-5 relative">
          <Reveal delay={0.4}>
            <motion.div
              style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 1200 }}
              className="relative aspect-[4/5] max-w-md mx-auto"
            >
              {/* Glow halo */}
              <div className="absolute -inset-10 gradient-primary opacity-25 blur-3xl rounded-[3rem]" />

              {/* Card surface */}
              <div className="absolute inset-0 rounded-[2rem] glass-strong shadow-elegant overflow-hidden border border-white/60">
                {/* Top bar */}
                <div className="flex items-center gap-2 px-5 py-4 border-b border-border/60">
                  <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                    <div className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                    <div className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                  </div>
                  <div className="flex-1 text-center text-[10px] text-muted-foreground font-mono">
                    pixelwind.app/dashboard
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  {/* Hero stat */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Engineering velocity</div>
                      <div className="text-2xl font-bold gradient-text mt-1">+184%</div>
                    </div>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
                      className="h-12 w-12 rounded-2xl gradient-primary flex items-center justify-center shadow-glow"
                    >
                      <Zap className="h-5 w-5 text-white" />
                    </motion.div>
                  </div>

                  {/* Bar chart */}
                  <div className="flex items-end gap-2 h-24 pt-2">
                    {[40, 62, 35, 78, 55, 92, 70].map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: 0.9 + i * 0.07, duration: 0.7, ease }}
                        className="flex-1 rounded-md gradient-primary opacity-80"
                      />
                    ))}
                  </div>

                  {/* List */}
                  <div className="space-y-2">
                    {[
                      { t: "Cloud migration shipped", d: "2m ago" },
                      { t: "12 engineers onboarded", d: "1h ago" },
                      { t: "Training cohort started", d: "Today" },
                    ].map((r, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.2 + i * 0.12 }}
                        className="flex items-center justify-between rounded-xl bg-secondary/60 px-3 py-2"
                      >
                        <div className="flex items-center gap-2 text-xs">
                          <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                          <span className="font-medium">{r.t}</span>
                        </div>
                        <span className="text-[10px] text-muted-foreground">{r.d}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating tech chips */}
              {floats.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.6, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: f.delay, duration: 0.7, ease }}
                  className={`absolute ${f.pos} z-10`}
                >
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
                    className="glass-strong rounded-2xl p-3 shadow-card flex items-center gap-2"
                  >
                    <TechLogo {...f.tech} size={28} />
                    <span className="text-xs font-semibold pr-1">{f.tech.name}</span>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </Reveal>
        </div>
      </motion.div>
    </section>
  );
}

/* ================== Logo Marquee (real brand logos) ================== */

function LogoMarquee() {
  const row = [...TECHS, ...TECHS];
  return (
    <section className="relative py-10 border-y border-border/60 overflow-hidden bg-background">
      <div className="mx-auto max-w-7xl px-4 mb-6">
        <p className="text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Trusted technologies we teach, hire for, and ship in production
        </p>
      </div>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
        <div className="flex gap-12 animate-marquee w-max items-center">
          {row.map((t, i) => (
            <div key={i} className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity">
              <TechLogo {...t} size={32} />
              <span className="text-sm font-semibold whitespace-nowrap text-foreground/80">{t.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================== About / Stats ================== */

function About() {
  return (
    <section id="about" className="relative py-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-primary mb-5">
              About Pixelwind
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
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
              { icon: Target, title: "Our Mission", text: "Equip professionals and businesses with the skills, talent, and technology to thrive in a digital world." },
              { icon: Eye, title: "Our Vision", text: "Be the most trusted partner for IT excellence — empowering careers and powering enterprises." },
              { icon: ShieldCheck, title: "Quality First", text: "Certified processes, premium curriculum, and measurable outcomes for every engagement." },
              { icon: Rocket, title: "Future Ready", text: "We focus on emerging tech, in-demand skills, and the workforce of tomorrow." },
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

        <div className="mt-24">
          <Reveal>
            <h3 className="text-3xl md:text-5xl font-bold text-center mb-14 tracking-tight">
              Our impact <span className="gradient-text">by the numbers</span>
            </h3>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-border rounded-3xl overflow-hidden glass">
            {[
              { v: 3, s: "+", l: "Years of Business" },
              { v: 5000, s: "+", l: "Students Trained" },
              { v: 200, s: "+", l: "Placements" },
              { v: 50, s: "+", l: "Corporate Clients" },
              { v: 98, s: "%", l: "Satisfaction" },
              { v: 20, s: "+", l: "Programs" },
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

/* ================== Services (Bento) ================== */

function Services() {
  return (
    <section id="services" className="relative py-28 bg-secondary/40">
      <div className="absolute inset-0 -z-10 bg-grid opacity-40" />
      <div className="mx-auto max-w-7xl px-4">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-primary mb-5">
              What we offer
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-5 tracking-tight">
              Premium services, <span className="gradient-text">delivered with care</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Three core pillars designed to power your people, your hiring, and your product.
            </p>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-6 gap-5">
          {/* Big card */}
          <Reveal className="lg:col-span-4">
            <motion.div
              whileHover={{ y: -8 }}
              className="group relative h-full rounded-3xl glass-strong p-8 md:p-10 shadow-card overflow-hidden"
            >
              <div className="absolute -top-32 -right-32 w-72 h-72 rounded-full gradient-primary opacity-20 blur-3xl group-hover:opacity-40 transition-opacity duration-500" />
              <div className="relative z-10 flex flex-col h-full">
                <div className="h-14 w-14 rounded-2xl gradient-primary flex items-center justify-center mb-6 shadow-glow">
                  <GraduationCap className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-3xl font-bold mb-3 tracking-tight">IT Training</h3>
                <p className="text-muted-foreground leading-relaxed mb-6 max-w-md">
                  Live mentor-led cohorts across the modern stack. Hands-on projects, certifications, and a placement engine that actually delivers.
                </p>
                <div className="grid grid-cols-4 gap-3 mt-auto">
                  {[TECHS[1], TECHS[3], TECHS[4], TECHS[7]].map((t) => (
                    <div key={t.slug} className="glass rounded-xl p-3 flex flex-col items-center gap-1.5">
                      <TechLogo {...t} size={26} />
                      <span className="text-[10px] font-medium text-muted-foreground">{t.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-2">
            <motion.div
              whileHover={{ y: -8 }}
              className="group relative h-full rounded-3xl glass-strong p-8 shadow-card overflow-hidden"
            >
              <div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full gradient-primary opacity-10 blur-3xl group-hover:opacity-30 transition-opacity duration-500" />
              <div className="h-14 w-14 rounded-2xl gradient-primary flex items-center justify-center mb-6 shadow-glow">
                <Users className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 tracking-tight">Staffing</h3>
              <p className="text-muted-foreground leading-relaxed mb-6 text-sm">
                Pre-vetted engineers for contract, contract-to-hire, and full-time roles.
              </p>
              <ul className="space-y-2.5">
                {["Pre-screened candidates", "48hr turnaround", "Flexible engagement"].map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-3">
            <motion.div
              whileHover={{ y: -8 }}
              className="group relative h-full rounded-3xl glass-strong p-8 shadow-card overflow-hidden"
            >
              <div className="h-14 w-14 rounded-2xl gradient-primary flex items-center justify-center mb-6 shadow-glow">
                <Cpu className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 tracking-tight">Tech Solutions</h3>
              <p className="text-muted-foreground leading-relaxed mb-5">
                End-to-end product engineering — web, mobile, cloud, AI. Built by senior engineers, shipped on schedule.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Web & Mobile", "Cloud & DevOps", "AI / ML", "Data Engineering"].map((t) => (
                  <span key={t} className="text-xs px-3 py-1.5 rounded-full bg-secondary/80 text-foreground/80 font-medium">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </Reveal>

          <Reveal delay={0.2} className="lg:col-span-3">
            <motion.div
              whileHover={{ y: -8 }}
              className="group relative h-full rounded-3xl gradient-primary p-8 shadow-elegant overflow-hidden text-white"
            >
              <div className="absolute inset-0 opacity-30"
                style={{ background: "radial-gradient(circle at 30% 20%, white 0%, transparent 40%)" }}
              />
              <div className="relative z-10">
                <div className="h-14 w-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center mb-6">
                  <TrendingUp className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 tracking-tight">Corporate Programs</h3>
                <p className="leading-relaxed mb-6 text-white/90">
                  Custom training built around your team's stack, goals, and timeline.
                </p>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full bg-white text-primary px-5 py-2.5 text-sm font-semibold hover:scale-[1.03] transition-transform"
                >
                  Talk to us <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ================== Why Us ================== */

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
            <h2 className="text-4xl md:text-5xl font-bold mb-5 tracking-tight">
              Built on <span className="gradient-text">trust, talent & tech</span>
            </h2>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <Reveal key={f.t} delay={i * 0.06}>
              <motion.div whileHover={{ y: -6 }} className="rounded-2xl glass p-6 shadow-card h-full">
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

/* ================== Tech Stack Grid (with real logos) ================== */

function TechStackGrid() {
  return (
    <section id="tech" className="relative py-28 bg-secondary/40 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-primary mb-5">
              Technologies
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-5 tracking-tight">
              The stacks we <span className="gradient-text">teach & ship</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              From frontend to infra — accurate, modern, production-ready.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
          {TECHS.map((t, i) => (
            <Reveal key={t.slug} delay={(i % 8) * 0.04}>
              <motion.div
                whileHover={{ y: -6, scale: 1.05 }}
                className="glass-strong rounded-2xl p-4 aspect-square flex flex-col items-center justify-center gap-2 shadow-card hover:shadow-glow transition-all"
              >
                <TechLogo {...t} size={36} />
                <span className="text-[11px] font-semibold text-center text-foreground/80">{t.name}</span>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================== Testimonials Slider ================== */

function Testimonials() {
  const items = [
    { name: "Ananya R.", role: "Software Engineer @ Fintech", text: "The training was hands-on and modern. I cracked my first dev role within weeks of completing the program. Mentors actually cared." },
    { name: "Karthik M.", role: "HR Director, SaaS Co.", text: "Pixelwind staffed our team with pre-vetted engineers in record time. Quality, communication, and follow-through were excellent." },
    { name: "Rohan S.", role: "Founder, FinTech Startup", text: "Their tech team rebuilt our platform on a modern stack. Fast, reliable, and a true partner — not a vendor." },
    { name: "Priya V.", role: "Engineering Manager", text: "Best training partner we've worked with. Custom curriculum, senior mentors, and real outcomes for every cohort." },
  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % items.length), 5500);
    return () => clearInterval(t);
  }, [items.length]);
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-5xl px-4">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-primary mb-5">
              Testimonials
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-5 tracking-tight">
              Loved by <span className="gradient-text">students & teams</span>
            </h2>
          </div>
        </Reveal>

        <div className="relative">
          <div className="absolute -inset-6 bg-mesh opacity-50 -z-10 rounded-3xl" />
          <div className="glass-strong rounded-3xl p-8 md:p-12 shadow-elegant min-h-[280px] relative overflow-hidden">
            <Quote className="absolute top-6 right-6 h-16 w-16 text-primary/10" />
            <AnimatePresence mode="wait">
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease }}
              >
                <div className="flex gap-0.5 mb-5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-xl md:text-2xl font-medium text-foreground/90 leading-relaxed mb-8">
                  "{items[i].text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full gradient-primary flex items-center justify-center text-white font-semibold">
                    {items[i].name[0]}
                  </div>
                  <div>
                    <div className="font-semibold">{items[i].name}</div>
                    <div className="text-sm text-muted-foreground">{items[i].role}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex justify-center gap-2 mt-6">
            {items.map((_, j) => (
              <button
                key={j}
                onClick={() => setI(j)}
                aria-label={`Testimonial ${j + 1}`}
                className={`h-2 rounded-full transition-all ${j === i ? "w-8 gradient-primary" : "w-2 bg-border"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================== FAQ ================== */

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
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Have questions? <span className="gradient-text">We have answers.</span>
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

/* ================== Big CTA ================== */

function CtaBanner() {
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <div className="relative rounded-[2.5rem] overflow-hidden gradient-primary p-10 md:p-16 text-white shadow-elegant">
            <div className="absolute inset-0 opacity-30"
              style={{ background: "radial-gradient(circle at 20% 20%, white 0%, transparent 40%), radial-gradient(circle at 80% 80%, white 0%, transparent 40%)" }}
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute -top-20 -right-20 w-80 h-80 rounded-full border border-white/20"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full border border-white/10"
            />
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-bold mb-5 tracking-tight leading-[1.05]">
                Ready to ship something <em className="not-italic underline decoration-white/40">remarkable?</em>
              </h2>
              <p className="text-white/85 text-lg mb-8">
                Whether you're learning, hiring, or building — Pixelwind is the team that gets it done.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full bg-white text-primary px-7 py-3.5 text-sm font-semibold hover:scale-[1.03] transition-transform shadow-soft"
                >
                  Start now <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur border border-white/30 px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/25 transition-all"
                >
                  Explore services
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================== Contact ================== */

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
            <h2 className="text-4xl md:text-5xl font-bold mb-5 tracking-tight">
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
                  lines: ["Castel, 4th Floor, Potluri Towers,", "Beside Boylondon, Dwaraka Nagar,", "Visakhapatnam, AP 530016"],
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

/* ================== Footer ================== */

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

/* ================== Page ================== */

function Landing() {
  return (
    <div className="relative">
      <Navbar />
      <main>
        <Hero />
        <LogoMarquee />
        <About />
        <Services />
        <WhyUs />
        <TechStackGrid />
        <Testimonials />
        <Faq />
        <CtaBanner />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
