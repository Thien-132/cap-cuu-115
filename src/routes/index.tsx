import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Phone,
  CalendarDays,
  Clock,
  Stethoscope,
  Truck,
  MapPin,
  Zap,
  ShieldCheck,
  Ambulance,
  Building2,
  Home,
  HeartPulse,
  Route as RouteIcon,
  CalendarCheck,
  Users,
  ArrowRight,
  PhoneCall,
  Mail,
  Star,
  ArrowUp,
  Menu,
  X,
  Facebook,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";

import heroImg from "@/assets/hero-ambulance.jpg";
import sEmergency from "@/assets/service-emergency.jpg";
import sHospital from "@/assets/service-hospital.jpg";
import sIcu from "@/assets/service-icu.jpg";
import sIntercity from "@/assets/service-intercity.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Emergency Ambulance Service 115 — Fast, Safe & Professional" },
      { name: "description", content: "24/7 ambulance service with quick response, professional medical staff and modern fleet. Call 115 or book online." },
      { property: "og:title", content: "Emergency Ambulance Service 115" },
      { property: "og:description", content: "Available 24/7. Quick response. Professional medical staff." },
    ],
  }),
  component: Index,
});

const NAV = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Loader />
      <Navbar />
      <main>
        <Hero />
        <WhyUs />
        <Services />
        <HowItWorks />
        <Stats />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <FloatingCall />
      <BackToTop />
    </div>
  );
}

/* ---------- Loader ---------- */
function Loader() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 600);
    return () => clearTimeout(t);
  }, []);
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background animate-fade-out">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="h-14 w-14 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
          <Ambulance className="absolute inset-0 m-auto h-6 w-6 text-primary" />
        </div>
        <p className="text-sm font-medium text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}

/* ---------- Navbar ---------- */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/85 backdrop-blur-md shadow-[0_2px_20px_-10px_rgba(14,165,233,0.3)]" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a href="#home" className="flex items-center gap-2 group">
            <div className="grid h-10 w-10 place-items-center rounded-xl gradient-sky text-primary-foreground shadow-soft transition-transform group-hover:scale-105">
              <Ambulance className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <div className="font-display text-lg font-bold">Rescue<span className="text-primary">115</span></div>
              <div className="text-[10px] text-muted-foreground -mt-0.5">Emergency Ambulance</div>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary rounded-lg transition-colors"
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:115"
              className="inline-flex items-center gap-2 rounded-full bg-emergency px-4 py-2 text-sm font-semibold text-emergency-foreground shadow-soft hover:opacity-90 transition"
            >
              <PhoneCall className="h-4 w-4 animate-pulse" />
              Call 115
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full gradient-sky px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft hover:opacity-95 transition"
            >
              Book Ambulance
            </a>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md animate-fade-in">
          <div className="px-4 py-4 flex flex-col gap-2">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-medium hover:bg-secondary"
              >
                {n.label}
              </a>
            ))}
            <a
              href="tel:115"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-emergency px-4 py-3 text-sm font-semibold text-emergency-foreground"
            >
              <PhoneCall className="h-4 w-4" /> Call 115
            </a>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center gap-2 rounded-full gradient-sky px-4 py-3 text-sm font-semibold text-primary-foreground"
            >
              Book Ambulance
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-24">
      <div className="absolute inset-0 -z-10">
        <img
          src={heroImg}
          alt="Modern ambulance with professional medical staff on standby"
          className="h-full w-full object-cover"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl animate-fade-in">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emergency opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emergency" />
            </span>
            24/7 Live Dispatch — Average response 8 minutes
          </div>

          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight">
            Fast, Safe & Professional{" "}
            <span className="text-gradient-sky">Emergency Ambulance</span> Service
          </h1>
          <p className="mt-5 text-base sm:text-lg text-muted-foreground max-w-xl">
            Available 24/7. Quick response. Professional medical staff. Serving hospitals,
            clinics, and patients across the city.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href="tel:115"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-emergency px-6 py-3.5 text-base font-semibold text-emergency-foreground shadow-soft hover:scale-[1.02] transition-transform"
            >
              <Ambulance className="h-5 w-5" />
              Call Ambulance Now
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full gradient-sky px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-soft hover:scale-[1.02] transition-transform"
            >
              <CalendarDays className="h-5 w-5" />
              Book an Ambulance
            </a>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
            {[
              { v: "10K+", l: "Patients" },
              { v: "50+", l: "Ambulances" },
              { v: "8 min", l: "Avg. response" },
            ].map((s) => (
              <div key={s.l}>
                <div className="text-2xl font-bold text-foreground">{s.v}</div>
                <div className="text-xs text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Why Choose Us ---------- */
function WhyUs() {
  const items = [
    { icon: Clock, title: "24/7 Emergency Support", desc: "Round-the-clock dispatch ready to respond instantly." },
    { icon: Stethoscope, title: "Experienced Medical Team", desc: "Certified paramedics and emergency physicians." },
    { icon: Truck, title: "Modern Ambulance Fleet", desc: "Fully equipped vehicles maintained to top standards." },
    { icon: MapPin, title: "GPS Real-Time Tracking", desc: "Track your ambulance live from dispatch to arrival." },
    { icon: Zap, title: "Fast Response Time", desc: "City-wide average response of under 10 minutes." },
    { icon: ShieldCheck, title: "Safe Patient Transport", desc: "Strict safety protocols on every single trip." },
  ];
  return (
    <section className="py-20 sm:py-24 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why choose us"
          title="Care you can count on, every minute"
          subtitle="Six reasons families, hospitals and clinics across the city trust us with critical transport."
        />
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it) => (
            <div
              key={it.title}
              className="group rounded-2xl border border-border bg-card p-6 shadow-card hover:shadow-soft hover:-translate-y-1 transition-all duration-300"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl gradient-sky text-primary-foreground shadow-soft group-hover:scale-110 transition-transform">
                <it.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{it.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Services ---------- */
function Services() {
  const services = [
    { img: sEmergency, icon: Ambulance, title: "Emergency Ambulance (115)", desc: "Immediate dispatch for life-threatening emergencies, 24/7." },
    { img: sHospital, icon: Building2, title: "Hospital Transfer", desc: "Safe transfer between healthcare facilities with full monitoring." },
    { img: sHospital, icon: Home, title: "Home-to-Hospital Transport", desc: "Door-to-door pickup with trained crew and stretcher service." },
    { img: sIcu, icon: HeartPulse, title: "ICU Ambulance", desc: "Advanced life support with ventilator and monitoring equipment." },
    { img: sIntercity, icon: RouteIcon, title: "Intercity Ambulance", desc: "Long-distance city-to-city transfers with onboard medical care." },
    { img: sEmergency, icon: CalendarCheck, title: "Medical Event Standby", desc: "On-site coverage for events, concerts and sports gatherings." },
    { img: sHospital, icon: Users, title: "Patient Transfer Between Hospitals", desc: "Coordinated handovers with patient records and care continuity." },
    { img: sIntercity, icon: RouteIcon, title: "Long Distance Rental", desc: "Scheduled long-distance rentals with experienced medical crew." },
  ];
  return (
    <section id="services" className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our services"
          title="Complete emergency and medical transport"
          subtitle="From critical emergencies to scheduled transfers — one trusted team, fully equipped fleet."
        />
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s, i) => (
            <article
              key={i}
              className="group flex flex-col rounded-2xl overflow-hidden border border-border bg-card shadow-card hover:shadow-soft hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={s.img}
                  alt={s.title}
                  loading="lazy"
                  width={800}
                  height={600}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 grid h-10 w-10 place-items-center rounded-xl gradient-sky text-primary-foreground shadow-soft">
                  <s.icon className="h-5 w-5" />
                </div>
              </div>
              <div className="flex flex-col flex-1 p-5">
                <h3 className="text-base font-semibold leading-snug">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground flex-1">{s.desc}</p>
                <a
                  href="#contact"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all"
                >
                  Book Now <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- How it works ---------- */
function HowItWorks() {
  const steps = [
    { icon: PhoneCall, title: "Contact Us", desc: "Call 115 or book through our online form anytime, day or night." },
    { icon: CheckCircle2, title: "Confirm Patient Info", desc: "Share patient details, condition and pickup location with our dispatcher." },
    { icon: Ambulance, title: "Ambulance Dispatched", desc: "Nearest available ambulance is dispatched within seconds." },
    { icon: ShieldCheck, title: "Safe Transportation", desc: "Trained medical crew transports the patient safely to the destination." },
  ];
  return (
    <section className="py-20 sm:py-24 bg-gradient-to-b from-secondary/40 to-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="How it works"
          title="Four steps to safe transport"
          subtitle="A simple, transparent process designed for emergencies and scheduled care alike."
        />
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5 relative">
          {steps.map((s, i) => (
            <div
              key={i}
              className="relative rounded-2xl border border-border bg-card p-6 shadow-card hover:shadow-soft transition-all"
            >
              <div className="absolute -top-3 -right-3 grid h-9 w-9 place-items-center rounded-full bg-emergency text-emergency-foreground text-sm font-bold shadow-soft">
                {i + 1}
              </div>
              <div className="grid h-12 w-12 place-items-center rounded-xl gradient-sky text-primary-foreground shadow-soft">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Stats ---------- */
function Stats() {
  const stats = [
    { v: 10000, suffix: "+", label: "Patients Served" },
    { v: 50, suffix: "+", label: "Ambulances" },
    { v: 200, suffix: "+", label: "Medical Staff" },
    { v: 24, suffix: "/7", label: "Service Available" },
  ];
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl gradient-sky text-primary-foreground p-10 sm:p-14 shadow-soft">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <Counter target={s.v} suffix={s.suffix} />
                <div className="mt-2 text-sm sm:text-base text-primary-foreground/85">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const duration = 1500;
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            setVal(Math.round(target * eased));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);
  return (
    <div ref={ref} className="text-4xl sm:text-5xl font-bold font-display">
      {val.toLocaleString()}
      <span>{suffix}</span>
    </div>
  );
}

/* ---------- Reviews ---------- */
function Reviews() {
  const reviews = [
    {
      name: "Linda Martinez",
      role: "Patient's daughter",
      text: "Excellent service. The ambulance arrived within 10 minutes and the medical staff were very professional and reassuring.",
      avatar: "https://i.pravatar.cc/120?img=47",
    },
    {
      name: "Dr. Samuel Chen",
      role: "Hospital coordinator",
      text: "We rely on Rescue115 for inter-hospital transfers. Punctual, well-equipped and the crew is consistently outstanding.",
      avatar: "https://i.pravatar.cc/120?img=12",
    },
    {
      name: "Aisha Rahman",
      role: "Family member",
      text: "Calm, fast and caring. They handled my mother with such respect during a very stressful night. Forever grateful.",
      avatar: "https://i.pravatar.cc/120?img=32",
    },
    {
      name: "Marco Bellini",
      role: "Event organizer",
      text: "Booked their standby team for a marathon. Professional setup, smart triage, and excellent communication throughout.",
      avatar: "https://i.pravatar.cc/120?img=15",
    },
    {
      name: "Priya Nair",
      role: "Clinic manager",
      text: "Our go-to for ICU transfers. Their ICU ambulance is genuinely a mobile critical-care unit.",
      avatar: "https://i.pravatar.cc/120?img=45",
    },
    {
      name: "Daniel Okafor",
      role: "Patient",
      text: "After my accident the crew was at my side in minutes. Their calm professionalism made all the difference.",
      avatar: "https://i.pravatar.cc/120?img=68",
    },
  ];
  return (
    <section id="reviews" className="py-20 sm:py-24 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Customer reviews"
          title="Trusted by families and healthcare teams"
          subtitle="Real stories from people who counted on us when it mattered most."
        />
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((r) => (
            <div
              key={r.name}
              className="rounded-2xl border border-border bg-card p-6 shadow-card hover:shadow-soft hover:-translate-y-1 transition-all"
            >
              <div className="flex gap-1 text-primary">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-4 text-sm text-foreground/85 leading-relaxed">"{r.text}"</p>
              <div className="mt-5 flex items-center gap-3">
                <img
                  src={r.avatar}
                  alt={r.name}
                  loading="lazy"
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full object-cover border-2 border-primary/20"
                />
                <div>
                  <div className="text-sm font-semibold">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */
function Contact() {
  const [sent, setSent] = useState(false);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    (e.target as HTMLFormElement).reset();
  };
  return (
    <section id="contact" className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contact"
          title="Request an ambulance"
          subtitle="Fill the form and our dispatcher will call you back in minutes. For immediate emergencies, please call 115."
        />
        <div className="mt-12 grid lg:grid-cols-5 gap-6">
          <form
            onSubmit={onSubmit}
            className="lg:col-span-3 rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-card"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Full Name" name="name" placeholder="Jane Doe" required />
              <Field label="Phone Number" name="phone" type="tel" placeholder="+1 555 0100" required />
              <Field label="Email" name="email" type="email" placeholder="jane@example.com" />
              <Field label="Pickup Address" name="pickup" placeholder="123 Main St" required />
              <div className="sm:col-span-2">
                <Field label="Destination Hospital" name="destination" placeholder="City General Hospital" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium mb-1.5">Message</label>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Patient condition or any special needs..."
                  className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                />
              </div>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full gradient-sky px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft hover:scale-[1.02] transition-transform"
              >
                Send Request <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href="tel:115"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-emergency px-6 py-3 text-sm font-semibold text-emergency-foreground shadow-soft hover:scale-[1.02] transition-transform"
              >
                <PhoneCall className="h-4 w-4" /> Emergency Call
              </a>
            </div>
            {sent && (
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-3 text-sm text-primary animate-fade-in">
                <CheckCircle2 className="h-4 w-4" /> Request sent. Our dispatcher will call you shortly.
              </div>
            )}
          </form>

          <div className="lg:col-span-2 flex flex-col gap-4">
            <InfoCard icon={PhoneCall} title="Hotline" lines={["115 (Emergency)", "+1 (555) 010-2050"]} />
            <InfoCard icon={Mail} title="Email" lines={["dispatch@rescue115.com", "info@rescue115.com"]} />
            <InfoCard icon={MapPin} title="Address" lines={["88 Medical Plaza", "Central District, City"]} />
            <div className="rounded-2xl overflow-hidden border border-border shadow-card aspect-[4/3] bg-secondary">
              <iframe
                title="map"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-74.02%2C40.70%2C-73.96%2C40.74&amp;layer=mapnik"
                className="h-full w-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5">{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
      />
    </div>
  );
}

function InfoCard({ icon: Icon, title, lines }: { icon: typeof Mail; title: string; lines: string[] }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card flex gap-4 items-start">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl gradient-sky text-primary-foreground shadow-soft">
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <div className="font-semibold">{title}</div>
        {lines.map((l) => (
          <div key={l} className="text-sm text-muted-foreground">{l}</div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2">
              <div className="grid h-10 w-10 place-items-center rounded-xl gradient-sky text-primary-foreground shadow-soft">
                <Ambulance className="h-5 w-5" />
              </div>
              <div className="font-display text-lg font-bold">Rescue<span className="text-primary">115</span></div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Fast, safe and professional emergency ambulance services, available 24/7 across the city.
            </p>
            <div className="mt-4 flex gap-2">
              <a href="#" aria-label="Facebook" className="grid h-9 w-9 place-items-center rounded-lg border border-border hover:bg-primary hover:text-primary-foreground transition">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Zalo" className="grid h-9 w-9 place-items-center rounded-lg border border-border hover:bg-primary hover:text-primary-foreground transition">
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Quick Links</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {NAV.map((n) => (
                <li key={n.href}><a href={n.href} className="hover:text-primary transition">{n.label}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Services</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>Emergency Ambulance</li>
              <li>Hospital Transfer</li>
              <li>ICU Ambulance</li>
              <li>Intercity Ambulance</li>
              <li>Event Standby</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Contact</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><PhoneCall className="h-4 w-4 text-primary" /> 115 — Emergency</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> dispatch@rescue115.com</li>
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> 88 Medical Plaza, City</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row gap-3 items-center justify-between text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Rescue115 Emergency Services. All rights reserved.</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary">Privacy</a>
            <a href="#" className="hover:text-primary">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Floating buttons ---------- */
function FloatingCall() {
  return (
    <a
      href="tel:115"
      aria-label="Call emergency 115"
      className="fixed bottom-6 right-6 z-40 group"
    >
      <span className="absolute inset-0 rounded-full bg-emergency animate-ping opacity-60" />
      <span className="relative grid h-14 w-14 place-items-center rounded-full bg-emergency text-emergency-foreground shadow-soft group-hover:scale-110 transition-transform">
        <Phone className="h-6 w-6" />
      </span>
    </a>
  );
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="fixed bottom-24 right-6 z-40 grid h-11 w-11 place-items-center rounded-full bg-card border border-border shadow-card hover:bg-primary hover:text-primary-foreground transition animate-fade-in"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}

/* ---------- shared ---------- */
function SectionHeading({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <div className="max-w-2xl">
      <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary uppercase tracking-wider">
        {eyebrow}
      </div>
      <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">{title}</h2>
      {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
