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
      { title: "Dịch vụ Xe cấp cứu Hồng Hải 115 — Nhanh chóng, An toàn & Chuyên nghiệp" },
      { name: "description", content: "Dịch vụ xe cấp cứu 24/7 phản hồi nhanh, đội ngũ y tế chuyên nghiệp và xe đời mới. Gọi 115 hoặc đặt trực tuyến." },
      { property: "og:title", content: "Dịch vụ Xe cấp cứu 115" },
      { property: "og:description", content: "Hoạt động 24/7. Phản hồi nhanh. Đội ngũ y tế chuyên nghiệp." },
    ],
  }),
  component: Index,
});

const NAV = [
  { label: "Trang chủ", href: "#home" },
  { label: "Dịch vụ", href: "#services" },
  { label: "Điều dưỡng tại nhà", href: "/dieu-duong-tai-nha" },
  { label: "Đánh giá", href: "#reviews" },
  { label: "Liên hệ", href: "#contact" },
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
        <p className="text-sm font-medium text-muted-foreground">Đang tải...</p>
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
              <div className="font-display text-lg font-bold">Cấp cứu - 115 -<span className="text-primary whitespace-nowrap">Hồng Hải</span></div>
              <div className="text-[10px] text-muted-foreground -mt-0.5">Dịch vụ xe cấp cứu</div>
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
              href="tel:0915205115"
              className="inline-flex items-center gap-2 rounded-full bg-emergency px-4 py-2 text-sm font-semibold text-emergency-foreground shadow-soft hover:opacity-90 transition"
            >
              <PhoneCall className="h-4 w-4 animate-pulse" />
              0915205115
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full gradient-sky px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft hover:opacity-95 transition"
            >
              Đặt lịch ngay
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
              href="tel:0915205115"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-emergency px-4 py-3 text-sm font-semibold text-emergency-foreground"
            >
              <PhoneCall className="h-4 w-4" /> 0915205115
            </a>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center gap-2 rounded-full gradient-sky px-4 py-3 text-sm font-semibold text-primary-foreground"
            >
              Đặt lịch ngay
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
          alt="Xe cấp cứu đời mới cùng đội ngũ y tế chuyên nghiệp luôn sẵn sàng"
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
            🚑 Điều phối xe cấp cứu 24/7 • Thời gian phản hồi trung bình 8 phút
          </div>

          <h1 className="mt-5 font-bold leading-[1.05] tracking-tight text-4xl sm:text-5xl lg:text-6xl">

  <span className="block whitespace-nowrap">
    Dịch vụ
    <span className="text-gradient-sky">
      {" "}cấp cứu Hồng Hải
    </span>
  </span>

  <span className="block">
    nhanh chóng, an toàn
  </span>

  <span className="block">
    và chuyên nghiệp
  </span>

</h1>
          <p className="mt-5 text-base sm:text-lg text-muted-foreground max-w-xl">
            Hoạt động 24/7, sẵn sàng phục vụ mọi lúc.

Đội ngũ bác sĩ, điều dưỡng và nhân viên cấp cứu chuyên nghiệp, đáp ứng nhanh mọi nhu cầu vận chuyển cấp cứu và chuyển viện.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href="tel:0915205115"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-emergency px-6 py-3.5 text-base font-semibold text-emergency-foreground shadow-soft hover:scale-[1.02] transition-transform"
            >
              <Ambulance className="h-5 w-5" />
              Gọi xe cấp cứu ngay
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full gradient-sky px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-soft hover:scale-[1.02] transition-transform"
            >
              <CalendarDays className="h-5 w-5" />
              Đặt xe cấp cứu
            </a>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
            {[
              { v: "10K+", l: "Khách hàng" },
              { v: "50+", l: "Xe cấp cứu" },
              { v: "8 min", l: "Phản hồi TB" },
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
  {
    icon: Clock,
    title: "Trực cấp cứu 24/7",
    desc: "Tiếp nhận cuộc gọi và điều phối xe cấp cứu nhanh chóng mọi lúc, mọi nơi."
  },
  {
    icon: Stethoscope,
    title: "Đội ngũ bác sĩ & điều dưỡng",
    desc: "Nhân viên y tế nhiều kinh nghiệm, hỗ trợ sơ cứu và chăm sóc bệnh nhân trên xe."
  },
  {
    icon: Truck,
    title: "Xe cấp cứu đời mới",
    desc: "Trang bị đầy đủ máy thở, monitor, bình oxy và các thiết bị cấp cứu cần thiết."
  },
  {
    icon: MapPin,
    title: "Điều phối thông minh",
    desc: "Lựa chọn xe gần nhất để rút ngắn thời gian tiếp cận bệnh nhân."
  },
  {
    icon: Zap,
    title: "Có mặt nhanh",
    desc: "Ưu tiên điều xe ngay sau khi tiếp nhận yêu cầu cấp cứu."
  },
  {
    icon: ShieldCheck,
    title: "An toàn - Uy tín",
    desc: "Đảm bảo an toàn tuyệt đối trong suốt quá trình vận chuyển bệnh nhân."
  },
];
  return (
    <section className="py-20 sm:py-24 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Vì sao chọn chúng tôi"
          title="Chăm sóc tận tâm, đáng tin cậy từng phút giây"
          subtitle="Sáu lý do các gia đình, bệnh viện và phòng khám trên toàn thành phố tin tưởng giao phó việc vận chuyển cấp cứu cho chúng tôi."
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
    { img: sEmergency, icon: Ambulance, title: "Xe cấp cứu khẩn cấp 115", desc: "Điều phối xe ngay lập tức cho các trường hợp khẩn cấp, 24/7." },
    { img: sHospital, icon: Building2, title: "Chuyển viện", desc: "Vận chuyển an toàn giữa các cơ sở y tế với hệ thống theo dõi đầy đủ." },
    { img: sHospital, icon: Home, title: "Vận chuyển từ nhà đến bệnh viện", desc: "Đón tận nhà với đội ngũ y tế chuyên nghiệp và dịch vụ cáng cứu thương." },
    { img: sIcu, icon: HeartPulse, title: "Xe ICU", desc: "Hỗ trợ sự sống nâng cao với máy thở và thiết bị theo dõi chuyên sâu." },
    { img: sIntercity, icon: RouteIcon, title: "Xe liên tỉnh", desc: "Vận chuyển đường dài giữa các tỉnh thành kèm chăm sóc y tế trên xe." },
    { img: sEmergency, icon: CalendarCheck, title: "Trực y tế sự kiện", desc: "Trực y tế tại chỗ cho các sự kiện, buổi hòa nhạc và hội thao." },
    { img: sHospital, icon: Users, title: "Vận chuyển giữa các bệnh viện", desc: "Bàn giao phối hợp với hồ sơ bệnh án, đảm bảo quá trình chăm sóc liên tục." },
    { img: sIntercity, icon: RouteIcon, title: "Thuê xe đường dài", desc: "Thuê xe đường dài theo lịch trình với đội ngũ y tế giàu kinh nghiệm." },
  ];
  return (
    <section id="services" className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Dịch vụ của chúng tôi"
          title="Vận chuyển y tế và cấp cứu toàn diện"
          subtitle="Từ các ca cấp cứu khẩn cấp đến vận chuyển theo lịch trình — một đội ngũ đáng tin cậy cùng đội xe hiện đại."
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
                  Đặt ngay <ArrowRight className="h-4 w-4" />
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
    { icon: PhoneCall, title: "Liên hệ", desc: "Gọi 115 hoặc đặt xe qua biểu mẫu trực tuyến của chúng tôi bất cứ lúc nào." },
    { icon: CheckCircle2, title: "Xác nhận thông tin", desc: "Cung cấp thông tin bệnh nhân, tình trạng và địa điểm đón cho tổng đài viên." },
    { icon: Ambulance, title: "Điều phối xe", desc: "Xe cấp cứu gần nhất sẽ được điều động trong vài giây." },
    { icon: ShieldCheck, title: "Vận chuyển an toàn", desc: "Đội ngũ y tế chuyên nghiệp đưa bệnh nhân đến nơi an toàn." },
  ];
  return (
    <section className="py-20 sm:py-24 bg-gradient-to-b from-secondary/40 to-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Quy trình làm việc"
          title="4 bước để vận chuyển an toàn"
          subtitle="Quy trình đơn giản, minh bạch được thiết kế cho cả trường hợp khẩn cấp và theo lịch trình."
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
    { v: 10000, suffix: "+", label: "Bệnh nhân đã phục vụ" },
    { v: 50, suffix: "+", label: "Xe cấp cứu" },
    { v: 200, suffix: "+", label: "Nhân viên y tế" },
    { v: 24, suffix: "/7", label: "Phục vụ" },
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
      name: "Nguyễn Thị Hoa",
      role: "Người nhà bệnh nhân",
      text: "Dịch vụ tuyệt vời. Xe đến trong vòng 10 phút và đội y tế rất chuyên nghiệp, giúp chúng tôi an tâm hơn nhiều.",
      avatar: "https://i.pravatar.cc/120?img=47",
    },
    {
      name: "BS. Trần Văn Hùng",
      role: "Điều phối viên bệnh viện",
      text: "Chúng tôi luôn tin tưởng dịch vụ chuyển viện của 115. Đúng giờ, trang thiết bị đầy đủ và nhân viên rất xuất sắc.",
      avatar: "https://i.pravatar.cc/120?img=12",
    },
    {
      name: "Lê Văn Tùng",
      role: "Người nhà bệnh nhân",
      text: "Nhanh nhẹn và chu đáo. Các bác sĩ đã chăm sóc mẹ tôi rất cẩn thận trong một đêm vô cùng căng thẳng.",
      avatar: "https://i.pravatar.cc/120?img=32",
    },
    {
      name: "Phạm Minh Đức",
      role: "Ban tổ chức sự kiện",
      text: "Chúng tôi đã đặt dịch vụ trực y tế cho giải marathon. Tác phong chuyên nghiệp, phân loại y tế thông minh và liên lạc rất tốt.",
      avatar: "https://i.pravatar.cc/120?img=15",
    },
    {
      name: "Hoàng Thanh Mai",
      role: "Quản lý phòng khám",
      text: "Lựa chọn hàng đầu của chúng tôi cho chuyển viện ICU. Xe ICU của họ thực sự là một phòng chăm sóc tích cực di động.",
      avatar: "https://i.pravatar.cc/120?img=45",
    },
    {
      name: "Vũ Đình Trường",
      role: "Bệnh nhân",
      text: "Sau khi tôi gặp tai nạn, đội ngũ y tế đã có mặt trong vài phút. Sự bình tĩnh và chuyên nghiệp của họ đã cứu sống tôi.",
      avatar: "https://i.pravatar.cc/120?img=68",
    },
  ];
  return (
    <section id="reviews" className="py-20 sm:py-24 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Đánh giá từ khách hàng"
          title="Được tin tưởng bởi các gia đình và đội ngũ y tế"
          subtitle="Những câu chuyện chân thực từ những người đã tin cậy chúng tôi vào những lúc quan trọng nhất."
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
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    try {
      const response = await fetch("https://formsubmit.co/ajax/Hoangphihai1984bp@gmail.com", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      if (response.ok) {
        setSent(true);
        setTimeout(() => setSent(false), 4000);
        form.reset();
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <section id="contact" className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Liên hệ"
          title="Yêu cầu xe cấp cứu"
          subtitle="Điền vào biểu mẫu và tổng đài viên của chúng tôi sẽ gọi lại cho bạn sau vài phút. Trong trường hợp khẩn cấp, vui lòng gọi 115."
        />
        <div className="mt-12 grid lg:grid-cols-5 gap-6">
          <form
            onSubmit={onSubmit}
            className="lg:col-span-3 rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-card"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Họ và Tên" name="name" placeholder="Nguyễn Văn A" required />
              <Field label="Số điện thoại" name="phone" type="tel" placeholder="090 123 4567" required />
              <Field label="Email" name="email" type="email" placeholder="nguyenvana@example.com" />
              <Field label="Địa chỉ đón" name="pickup" placeholder="123 Đường Lê Lợi" required />
              <div className="sm:col-span-2">
                <Field label="Bệnh viện đến" name="destination" placeholder="Bệnh viện Chợ Rẫy" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium mb-1.5">Tin nhắn</label>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Tình trạng bệnh nhân hoặc bất kỳ yêu cầu đặc biệt nào..."
                  className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                />
              </div>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full gradient-sky px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft hover:scale-[1.02] transition-transform"
              >
                Gửi yêu cầu <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href="tel:0915205115"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-emergency px-6 py-3 text-sm font-semibold text-emergency-foreground shadow-soft hover:scale-[1.02] transition-transform"
              >
                <PhoneCall className="h-4 w-4" /> Gọi khẩn cấp
              </a>
            </div>
            {sent && (
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-3 text-sm text-primary animate-fade-in">
                <CheckCircle2 className="h-4 w-4" /> Đã gửi yêu cầu. Tổng đài viên của chúng tôi sẽ sớm liên hệ với bạn.
              </div>
            )}
          </form>

          <div className="lg:col-span-2 flex flex-col gap-4">
            <InfoCard icon={PhoneCall} title="Đường dây nóng" lines={["115 (Khẩn cấp)", "090 123 4567"]} />
            <InfoCard icon={Mail} title="Email" lines={["dispatch@rescue115.com", "info@rescue115.com"]} />
            <InfoCard icon={MapPin}title="Địa chỉ"lines={["11 Hẻm 922", "Đồng Xoài", "Đồng Nai"]}/>
            <div className="rounded-2xl overflow-hidden border border-border shadow-card aspect-[4/3] bg-secondary">
              <iframe
                title="map"
                src="https://maps.google.com/maps?q=11%20h%E1%BA%BBm%20922%20ph%C6%B0%E1%BB%9Dng%20%C4%91%E1%BB%93ng%20xo%C3%A0i%20%C4%91%E1%BB%93ng%20nai&t=&z=15&ie=UTF8&iwloc=&output=embed"
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
              <div className="font-display text-lg font-bold">Cấp cứu 115 <span className="text-primary whitespace-nowrap">Hồng Hải</span></div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Dịch vụ xe cấp cứu Hồng&nbsp;Hải khẩn cấp nhanh chóng, an toàn và chuyên nghiệp, hoạt động 24/7 trên toàn thành phố.
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
            <h4 className="text-sm font-semibold">Liên kết nhanh</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {NAV.map((n) => (
                <li key={n.href}><a href={n.href} className="hover:text-primary transition">{n.label}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Dịch vụ</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>Xe cấp cứu 115</li>
              <li>Chuyển viện</li>
              <li>Xe Cứu Thương chuyên dụng</li>
              <li>Vận chuyển liên tỉnh</li>
              <li>Trực y tế sự kiện</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Liên hệ</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><PhoneCall className="h-4 w-4 text-primary" /> 0915205115</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> Hoangphihai1984bp@gmail.com </li>
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> 11 Hẻm 922 Phường, Đồng Xoài, Tp.Đồng Nai</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row gap-3 items-center justify-between text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Dịch vụ Cấp cứu 115 Hồng Hải. Đã đăng ký bản quyền.</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary">Bảo mật</a>
            <a href="#" className="hover:text-primary">Điều khoản</a>
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
      href="tel:0915205115"
      aria-label="Gọi cấp cứu 115"
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
      aria-label="Trở lên đầu trang"
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
