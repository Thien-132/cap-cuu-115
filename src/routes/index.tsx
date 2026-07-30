import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { sendEmailAction } from "@/lib/actions";
import { toast } from "sonner";
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
  Trash2,
  ChevronDown,
  Loader2,
  Wind,
  Newspaper,
  Send,
  Sparkles,
} from "lucide-react";

import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { BookingModal } from "@/components/common/BookingModal";
import { FloatingActions } from "@/components/common/FloatingActions";
import { BackToTop } from "@/components/common/BackToTop";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Field } from "@/components/common/Field";
import { InfoCard } from "@/components/common/InfoCard";
import { CoverageRadiusChecker } from "@/components/common/CoverageRadiusChecker";

import { getAmbulances, getNurses, addBookingRequest } from "@/lib/adminStore";

import heroImg from "@/assets/hero-ambulance.jpg";
import sEmergency from "@/assets/service-emergency.jpg";
import sHospital from "@/assets/service-hospital.jpg";
import sIcu from "@/assets/service-icu.jpg";
import sIntercity from "@/assets/service-intercity.jpg";
import sHomeCare from "@/assets/hinh dieu duong.jpg";
import sOxygen from "@/assets/dich-vu-oxy.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dịch vụ Xe cấp cứu Hồng Hải 115 — Nhanh chóng, An toàn & Chuyên nghiệp" },
      {
        name: "description",
        content:
          "Dịch vụ xe cấp cứu 24/7 phản hồi nhanh, đội ngũ y tế chuyên nghiệp và xe đời mới. Gọi 115 hoặc đặt trực tuyến.",
      },
      { property: "og:title", content: "Dịch vụ Xe cấp cứu 115" },
      {
        property: "og:description",
        content: "Hoạt động 24/7. Phản hồi nhanh. Đội ngũ y tế chuyên nghiệp.",
      },
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
  const [bookingOpen, setBookingOpen] = useState(false);
  const [initialService, setInitialService] = useState("");

  const openBooking = (serviceId = "") => {
    setInitialService(serviceId);
    setBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Loader />
      <Navbar navItems={NAV} onOpenBooking={() => openBooking()} />
      <main>
        <Hero onOpenBooking={() => openBooking("")} />
        <WhyUs />
        <Services onOpenBooking={openBooking} />
        <section id="coverage" className="py-16 bg-secondary/20 border-y border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <CoverageRadiusChecker />
          </div>
        </section>
        <HomeCare />
        <OxygenService />
        <HowItWorks />
        <Reviews />
        <Contact />
      </main>
      <Footer navItems={NAV} />
      <FloatingActions />
      <BackToTop />
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        initialService={initialService}
      />
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

/* ---------- Hero (Clean, Authentic Medical Style) ---------- */
function Hero({ onOpenBooking }: { onOpenBooking?: () => void }) {
  const [stats, setStats] = useState([
    { v: 10000, suffix: "+", label: "Khách hàng tin tưởng" },
    { v: 50, suffix: "+", label: "Xe cấp cứu hiện đại" },
    { v: 8, suffix: " phút", label: "Thời gian phản hồi TB" },
  ]);

  useEffect(() => {
    const updateStats = () => {
      const ambulancesCount = getAmbulances().length;
      const nursesCount = getNurses().length;

      setStats([
        { v: 10000, suffix: "+", label: "Khách hàng tin tưởng" },
        { v: ambulancesCount || 50, suffix: "+", label: "Xe cấp cứu hiện đại" },
        { v: nursesCount || 20, suffix: "+", label: "Điều dưỡng & Y bác sĩ" },
      ]);
    };

    updateStats();
    window.addEventListener("admin_store_update", updateStats);
    return () => window.removeEventListener("admin_store_update", updateStats);
  }, []);

  return (
    <section
      id="home"
      className="relative isolate overflow-hidden pt-28 pb-12 sm:pt-36 sm:pb-16 bg-slate-950 text-white"
    >
      {/* Real Background Ambulance Photo with clean subtle gradient overlay */}
      <div className="absolute inset-0 -z-10">
        <img
          src={heroImg}
          alt="Xe cấp cứu đời mới cùng đội ngũ y tế chuyên nghiệp"
          className="h-full w-full object-cover opacity-50"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/70" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          
          {/* Main Hero Left */}
          <div className="lg:col-span-7 animate-fade-in">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/30 bg-emerald-950/50 px-4 py-1.5 text-xs sm:text-sm font-semibold text-emerald-300 backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              Phục vụ 24/7 – Miễn 100% cước đón bệnh nhân trong bán kính 6 km
            </div>

            <h1 className="mt-6 sm:mt-8 font-bold leading-[1.15] tracking-tight text-white text-4xl sm:text-5xl lg:text-6xl">
              <span className="block">Dịch vụ Cấp cứu 115</span>
              <span className="block text-sky-400 mt-1">Hồng Hải</span>
              <span className="block text-2xl sm:text-4xl text-slate-200 font-semibold mt-3">
                Nhanh chóng – An toàn – Đạt chuẩn y tế
              </span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Đội ngũ bác sĩ, điều dưỡng giàu kinh nghiệm cùng hệ thống xe cấp cứu hiện đại, túc trực 24/7 sẵn sàng phản ứng nhanh khẩn cấp khi người bệnh cần.
            </p>

            {/* Reassuring Medical Checklist */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl">
              <div className="flex items-center gap-2.5 text-sm text-slate-200 bg-slate-900/60 border border-slate-700/60 px-3.5 py-2.5 rounded-xl backdrop-blur-sm">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span><strong>Miễn 100% cước đón</strong> (Bán kính 6km)</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-200 bg-slate-900/60 border border-slate-700/60 px-3.5 py-2.5 rounded-xl backdrop-blur-sm">
                <CheckCircle2 className="h-4 w-4 text-sky-400 shrink-0" />
                <span>Phản hồi cấp cứu trong <strong>8-15 phút</strong></span>
              </div>
            </div>

            {/* Clear Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <a
                href="tel:0915205115"
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-red-600 hover:bg-red-700 px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-red-600/30 transition-all hover:-translate-y-0.5"
              >
                <Ambulance className="h-5 w-5" />
                <div className="text-left leading-tight">
                  <div className="block">Gọi xe cấp cứu ngay</div>
                  <div className="text-[11px] font-medium text-red-100">Hotline: 0915 205 115</div>
                </div>
              </a>

              <button
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-sky-600 hover:bg-sky-700 px-7 py-3.5 text-base font-semibold text-white shadow-md transition-all hover:-translate-y-0.5"
              >
                <CalendarDays className="h-5 w-5" />
                <div className="text-left leading-tight">
                  <div className="block">Đặt lịch trước</div>
                  <div className="text-[11px] font-medium text-sky-100">Chủ động thời gian</div>
                </div>
              </button>

              <a
                href="#coverage"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-200 text-sm font-medium transition"
              >
                <MapPin className="h-4 w-4 text-emerald-400" />
                Kiểm tra bán kính đón
              </a>
            </div>
          </div>

          {/* Right Clean Medical Stat Card */}
          <div className="lg:col-span-5 hidden lg:block animate-fade-in">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-md p-6 shadow-xl space-y-6">
              <div className="flex items-center gap-3.5 border-b border-slate-800 pb-4">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-sky-500/15 text-sky-400 border border-sky-500/20">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Cam kết chất lượng dịch vụ</h4>
                  <p className="text-xs text-slate-400">Trang thiết bị chuẩn y tế & Ê-kíp chuyên nghiệp</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                  <Counter target={10000} suffix="+" />
                  <p className="text-xs text-slate-400 font-medium mt-1">Bệnh nhân tin dùng</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                  <Counter target={50} suffix="+" />
                  <p className="text-xs text-slate-400 font-medium mt-1">Xe cấp cứu hiện đại</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-sky-950/40 border border-sky-500/20 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Clock className="h-4 w-4 text-sky-400" />
                  <span className="text-xs font-medium text-slate-200">Thời gian có mặt trung bình</span>
                </div>
                <span className="text-xs font-bold text-sky-400">8 - 15 phút</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Embedded Feature Dock */}
      <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-md p-6 shadow-xl">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 border-b border-slate-800 pb-6">
            {[
              { icon: ShieldCheck, title: "Tổng đài 24/7", desc: "Tiếp nhận cuộc gọi khẩn" },
              { icon: MapPin, title: "Đón bệnh tận nơi", desc: "Miễn cước bán kính 6km" },
              { icon: Users, title: "Y bác sĩ túc trực", desc: "Chuyên môn cấp cứu cao" },
              { icon: Truck, title: "Xe cứu thương ICU", desc: "Trang thiết bị chuẩn y tế" },
              { icon: Clock, title: "Phản hồi siêu tốc", desc: "Thời gian tới ~8-15 phút" },
            ].map((f) => (
              <div
                key={f.title}
                className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 group"
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-sky-500/15 text-sky-400 border border-sky-500/20">
                  <f.icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white tracking-tight">{f.title}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Operational Commitments */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-6">
            {[
              {
                icon: Clock,
                title: "Phản ứng khẩn cấp",
                desc: "Điều xe lập tức ngay khi nhận điện thoại",
              },
              {
                icon: Stethoscope,
                title: "Trang thiết bị chuẩn ICU",
                desc: "Bình oxy, máy đo sinh hiệu, máy hút đờm",
              },
              {
                icon: ShieldCheck,
                title: "Cước phí minh bạch",
                desc: "Báo giá rõ ràng, 0đ cước đón bán kính 6km",
              },
              {
                icon: HeartPulse,
                title: "Chăm sóc tận tâm",
                desc: "Ê-kíp y tế theo dõi bệnh nhân suốt lộ trình",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-center gap-3.5 p-3.5 rounded-xl bg-slate-950/50 border border-slate-800"
              >
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                  <item.icon className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h5 className="text-xs sm:text-sm font-bold text-white leading-tight">{item.title}</h5>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Why Choose Us & Press & Fast Contact ---------- */
function WhyUs() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [service, setService] = useState("Cấp cứu khẩn cấp");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const items = [
    {
      icon: Clock,
      title: "Trực 24/7",
      desc: "Tổng đài túc trực 24h, không bỏ lỡ cuộc gọi khẩn.",
      details: "Hệ thống tổng đài viên túc trực 24/7 kể cả ngày lễ Tết, đảm bảo tiếp nhận và xử lý cuộc gọi trong vài giây.",
    },
    {
      icon: Stethoscope,
      title: "Bác sĩ & Điều dưỡng",
      desc: "Đội ngũ chuyên khoa giàu kinh nghiệm cấp cứu.",
      details: "Bác sĩ chuyên khoa cấp cứu và điều dưỡng viên trình độ cao, sơ cứu và duy trì sinh tồn suốt quãng đường.",
    },
    {
      icon: Truck,
      title: "Xe đời mới & ICU",
      desc: "Trang bị máy thở, monitor, bình oxy trung tâm.",
      details: "Xe đời mới 100% chống xóc, tiệt trùng định kỳ, trang bị máy thở xách tay, máy sốc tim, monitor sinh tồn.",
    },
    {
      icon: MapPin,
      title: "Điều phối GPS",
      desc: "Định vị vị trí xe gần nhất đến tiếp cận ngay.",
      details: "Hệ thống định vị GPS thông minh tự động tìm chiếc xe gần vị trí bệnh nhân nhất để rút ngắn thời gian tiếp cận.",
    },
    {
      icon: Zap,
      title: "Đến trong 8-15p",
      desc: "Ưu tiên xuất phát khẩn cấp trong thời gian vàng.",
      details: "Mạng lưới xe phủ rộng các quận huyện và tỉnh lân cận, đội ngũ tài xế thông thuộc địa hình đường xá.",
    },
    {
      icon: ShieldCheck,
      title: "An toàn & Minh bạch",
      desc: "Bảo đảm an toàn tuyệt đối, chi phí công khai.",
      details: "Tuân thủ nghiêm ngặt phác đồ cấp cứu của Bộ Y tế. Báo giá công khai minh bạch, không phát sinh chi phí ẩn.",
    },
  ];

  const pressNews = [
    {
      source: "VTV1 - Truyền Hình Quốc Gia",
      badge: "VTV1",
      badgeBg: "bg-red-500/10 text-red-600 border-red-500/20 dark:bg-red-500/20 dark:text-red-400",
      title: "Mô hình vận chuyển cấp cứu 115 Hồng Hải: Đạt chuẩn quốc gia về trang thiết bị y tế",
      date: "15/05/2024",
      url: "https://vtv.vn",
    },
    {
      source: "Báo VnExpress",
      badge: "VnExpress",
      badgeBg: "bg-amber-500/10 text-amber-700 border-amber-500/20 dark:bg-amber-500/20 dark:text-amber-400",
      title: "Giải pháp điều phối xe cấp cứu định vị GPS rút ngắn thời gian vàng cấp cứu bệnh nhân",
      date: "02/08/2024",
      url: "https://vnexpress.net",
    },
    {
      source: "Báo Sức Khỏe & Đời Sống",
      badge: "Bộ Y Tế",
      badgeBg: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20 dark:bg-emerald-500/20 dark:text-emerald-400",
      title: "Cấp cứu 115 Hồng Hải: Miễn 100% cước đón bệnh nhân trong bán kính 6km hỗ trợ cộng đồng",
      date: "10/11/2024",
      url: "https://suckhoedoisong.vn",
    },
  ];

  const handleSubmitFastForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) {
      toast.error("Vui lòng nhập số điện thoại để chúng tôi liên hệ!");
      return;
    }
    setIsSubmitting(true);

    const requestData = {
      name: name.trim() || "Khách hàng gọi lại nhanh",
      phone: phone.trim(),
      address: "Yêu cầu qua Form gọi lại nhanh (60s)",
      details: `Khách hàng yêu cầu tư vấn nhanh dịch vụ: ${service}`,
      serviceType: service,
    };

    try {
      await addBookingRequest(requestData);
    } catch (err: any) {
      if (err.message === "BLOCKED_PHONE") {
        toast.error("Số điện thoại của bạn đã bị hạn chế do có nhiều báo cáo ảo. Vui lòng liên hệ Hotline 0915 205 115.");
        setIsSubmitting(false);
        return;
      }
    }

    try {
      await sendEmailAction({
        data: {
          name: requestData.name,
          phone: requestData.phone,
          address: requestData.address,
          serviceType: requestData.serviceType,
          condition: requestData.details,
          type: "booking",
        },
      });
      toast.success("Đã nhận yêu cầu! Tổng đài 115 Hồng Hải sẽ gọi lại cho bạn trong 60 giây.");
      setPhone("");
      setName("");
    } catch (err) {
      console.error(err);
      toast.success("Đã nhận yêu cầu! Tổng đài 115 Hồng Hải sẽ gọi lại cho bạn trong 60 giây.");
      setPhone("");
      setName("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-background border-y border-border/60 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* --- Section Header --- */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 mb-3.5 shadow-sm">
            <Sparkles className="h-3.5 w-3.5" /> Dịch Vụ Cấp Cứu Y Tế Hàng Đầu
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
            Vì Sao Chọn Cấp Cứu 115 Hồng Hải?
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-muted-foreground leading-relaxed">
            Chăm sóc tận tâm — Phản ứng khẩn cấp trong thời gian vàng — Đội ngũ y bác sĩ & xe đời mới
          </p>
        </div>

        {/* --- 6 Highlights (Thu gọn 6 tiêu chí) --- */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 mb-10">
          {items.map((it, i) => {
            const isExpanded = expandedIndex === i;
            return (
              <div
                key={it.title}
                onClick={() => setExpandedIndex(isExpanded ? null : i)}
                className={`relative rounded-2xl border p-4 transition-all duration-200 cursor-pointer text-left flex flex-col justify-between ${
                  isExpanded
                    ? "border-sky-500 bg-sky-500/5 shadow-md ring-1 ring-sky-500/30"
                    : "border-border/80 bg-card hover:border-sky-500/40 hover:shadow-soft"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="grid h-9 w-9 place-items-center rounded-xl gradient-sky text-primary-foreground shadow-soft">
                      <it.icon className="h-4 w-4" />
                    </div>
                    <ChevronDown
                      className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                        isExpanded ? "rotate-180 text-sky-500" : ""
                      }`}
                    />
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-foreground leading-snug">{it.title}</h4>
                  <p className="text-[11px] text-muted-foreground leading-snug mt-1 line-clamp-2">
                    {it.desc}
                  </p>
                </div>

                {isExpanded && (
                  <div className="mt-3 pt-2.5 border-t border-border/80 text-[11px] text-foreground/90 leading-relaxed animate-fade-in font-medium">
                    {it.details}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* --- Dual Column Layout (Báo Chí + Form Thu Nhận Thông Tin Nền Trắng) --- */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Báo Chí & Truyền Thông (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-6 sm:p-8 shadow-card">
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                    <Newspaper className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">Báo Chí & Truyền Thông Nói Về Chúng Tôi</h3>
                    <p className="text-xs text-muted-foreground">Tin tức & kiểm định chất lượng y tế công khai</p>
                  </div>
                </div>
                <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Đạt chuẩn kiểm định
                </span>
              </div>

              <div className="space-y-3.5">
                {pressNews.map((news, idx) => (
                  <a
                    key={idx}
                    href={news.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block p-4 rounded-xl border border-border/70 bg-secondary/30 hover:bg-secondary/70 hover:border-sky-500/30 transition-all duration-200 shadow-sm"
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className={`px-2.5 py-0.5 text-[10px] font-extrabold rounded-md border ${news.badgeBg}`}>
                        {news.badge}
                      </span>
                      <span className="text-[11px] font-medium text-muted-foreground">{news.date}</span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-foreground group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors leading-snug">
                      "{news.title}"
                    </h4>
                    <p className="text-[11px] text-muted-foreground mt-1.5 flex items-center gap-1.5 font-medium">
                      <span>Nguồn: {news.source}</span>
                      <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-sky-500" />
                    </p>
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-muted-foreground font-medium">
              <span>Đội ngũ trực ban 24/7 sẵn sàng tiếp nhận thông tin khẩn cấp</span>
              <a href="tel:0915205115" className="font-extrabold text-red-500 hover:underline flex items-center gap-1.5 text-sm">
                <PhoneCall className="h-4 w-4" /> 0915 205 115
              </a>
            </div>
          </div>

          {/* Right Column: Form Thu Nhận Thông Tin Nhanh - FORM NỀN TRẮNG SANG TRỌNG & TỰ NHIÊN (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl border border-slate-200 dark:border-border bg-white dark:bg-card p-6 sm:p-8 shadow-xl shadow-slate-200/50 dark:shadow-none relative overflow-hidden flex flex-col justify-between">
            {/* Ambient Background Accent */}
            <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="grid h-11 w-11 place-items-center rounded-xl gradient-sky text-primary-foreground shadow-soft">
                  <PhoneCall className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-foreground">Thu Thập Thông Tin Nhanh</h3>
                  <p className="text-xs text-muted-foreground">Tổng đài 115 Hồng Hải gọi lại tư vấn trong 60s</p>
                </div>
              </div>

              <form onSubmit={handleSubmitFastForm} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-foreground mb-1.5">
                    Số điện thoại liên hệ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Nhập số điện thoại của bạn..."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/50 px-4 py-3 text-sm font-semibold text-foreground placeholder:text-muted-foreground/60 focus:bg-background focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-foreground mb-1.5">
                    Họ và tên (Tùy chọn)
                  </label>
                  <input
                    type="text"
                    placeholder="Ví dụ: Nguyễn Văn A..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/50 px-4 py-3 text-sm font-medium text-foreground placeholder:text-muted-foreground/60 focus:bg-background focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-foreground mb-1.5">
                    Dịch vụ bạn cần hỗ trợ
                  </label>
                  <div className="relative">
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/50 px-4 py-3 text-sm font-semibold text-foreground focus:bg-background focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all appearance-none cursor-pointer pr-10"
                    >
                      <option value="Cấp cứu khẩn cấp">🚨 Cấp cứu khẩn cấp 24/7</option>
                      <option value="Vận chuyển y tế">🚑 Vận chuyển bệnh nhân / Chuyển viện</option>
                      <option value="Điều dưỡng tại nhà">👩‍⚕️ Điều dưỡng & Y tế tại nhà</option>
                      <option value="Thuê bình oxy / Thiết bị">🫁 Cho thuê bình oxy & Thiết bị y tế</option>
                    </select>
                    <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2.5 rounded-xl gradient-sky px-6 py-3.5 text-sm font-extrabold text-primary-foreground shadow-md hover:shadow-lg hover:opacity-95 active:scale-[0.99] transition-all disabled:opacity-50 mt-1 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Đang gửi thông tin...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" /> Yêu Cầu Gọi Lại Ngay (Trong 60s)
                    </>
                  )}
                </button>
              </form>
            </div>

            <p className="text-[11px] text-center text-muted-foreground mt-5 pt-3.5 border-t border-border/70 font-medium">
              🔒 Thông tin cá nhân được bảo mật 100% — Tổng đài cam kết không spam.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}

/* ---------- Services ---------- */
function Services({ onOpenBooking }: { onOpenBooking?: (id: string) => void }) {
  const serviceGroups = [
    {
      id: "emergency",
      href: "/cap-cuu-khan-cap",
      img: sEmergency,
      icon: Ambulance,
      title: "Cấp cứu khẩn cấp",
      desc: "Phản ứng nhanh chóng, chuyên nghiệp trong mọi tình huống khẩn cấp.",
      features: [
        "Xe cấp cứu 24/7",
        "Có bác sĩ đi cùng",
        "Có điều dưỡng đi cùng",
        "Hồi sức trên xe",
        "Có oxy, monitor, máy sốc tim",
      ],
    },
    {
      id: "transport",
      href: "/van-chuyen-y-te",
      img: sIntercity,
      icon: Truck,
      title: "Vận chuyển y tế",
      desc: "Vận chuyển bệnh nhân an toàn, thoải mái trên mọi hành trình.",
      features: [
        "Chuyển viện nội thành",
        "Chuyển viện liên tỉnh",
        "Xuất viện về nhà",
        "Đưa bệnh nhân tái khám",
        "Đưa bệnh nhân chạy thận",
      ],
    },
    {
      id: "homecare",
      href: "/dieu-duong-tai-nha",
      img: sHospital,
      icon: Home,
      title: "Chăm sóc tại nhà",
      desc: "Dịch vụ y tế tận nơi, mang lại sự tiện lợi và an tâm cho gia đình.",
      features: [
        "Điều dưỡng tại nhà",
        "Thay băng",
        "Tiêm truyền",
        "Chăm sóc sau mổ",
        "Chăm sóc người già",
      ],
    },
    {
      id: "icu",
      href: "/icu-hoi-suc",
      img: sIcu,
      icon: HeartPulse,
      title: "ICU - Hồi sức",
      desc: "Trang thiết bị hiện đại, đáp ứng yêu cầu hồi sức tích cực cao nhất.",
      features: ["Xe ICU", "Monitor", "Máy thở", "Bơm tiêm điện", "Máy hút đàm", "Bác sĩ hồi sức"],
    },
    {
      id: "oxygen",
      href: "/dich-vu-oxy",
      img: sOxygen,
      icon: Wind,
      title: "Dịch vụ oxy tận nhà",
      desc: "Cung cấp, cho thuê bình oxy, máy tạo oxy tận nhà nhanh chóng và an toàn.",
      features: [
        "Bình oxy sạch, an toàn",
        "Máy tạo oxy hiện đại",
        "Giao hàng 24/7",
        "Lắp đặt tận nơi",
        "Hỗ trợ kỹ thuật 24/7",
      ],
    },
  ];

  return (
    <section id="services" className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Dịch vụ của chúng tôi"
          title="Vận chuyển y tế và cấp cứu toàn diện"
          subtitle="Các dịch vụ được thiết kế chuyên biệt để đáp ứng tốt nhất mọi nhu cầu chăm sóc y tế của bạn."
        />
        <div className="mt-12 flex flex-wrap justify-center -mx-3 lg:-mx-4 gap-y-6 lg:gap-y-8">
          {serviceGroups.map((s, i) => (
            <div key={i} className="w-full sm:w-1/2 lg:w-1/3 px-3 lg:px-4 flex">
              <article className="w-full group relative flex flex-col rounded-[2rem] overflow-hidden border border-border/60 bg-card shadow-lg hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 transition-all duration-500">
                <a href={s.href} className="block relative aspect-[4/3] overflow-hidden shrink-0">
                  <img
                    src={s.img}
                    alt={s.title}
                    loading="lazy"
                    width={800}
                    height={600}
                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="absolute top-5 left-5 grid h-14 w-14 place-items-center rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-xl transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3">
                    <s.icon className="h-7 w-7 drop-shadow-md" />
                  </div>

                  <div className="absolute bottom-5 left-6 right-6">
                    <h3 className="text-2xl font-bold text-white leading-tight drop-shadow-lg transform transition-transform duration-500 group-hover:translate-x-1">
                      {s.title}
                    </h3>
                    <div className="mt-3 h-1 w-12 rounded-full bg-primary transition-all duration-500 group-hover:w-20" />
                  </div>
                </a>

                <div className="flex flex-col flex-1 p-6 sm:p-8">
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>

                  <div className="mt-6 pt-6 border-t border-border/40 flex-1">
                    <ul className="space-y-3.5">
                      {s.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 group/item">
                          <div className="mt-0.5 rounded-full bg-primary/10 p-1 group-hover/item:bg-primary/20 transition-colors">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                          </div>
                          <span className="text-sm font-medium text-foreground/80 group-hover/item:text-foreground transition-colors leading-tight pt-0.5">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 flex gap-3">
                    <a
                      href={s.href}
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-secondary/50 px-2 py-4 text-sm font-bold text-foreground hover:bg-secondary transition-colors"
                    >
                      Chi tiết
                    </a>
                    <button
                      onClick={() => onOpenBooking?.(s.id)}
                      className="flex-[2] relative inline-flex items-center justify-center gap-2 rounded-2xl overflow-hidden bg-primary/10 border border-primary/20 px-4 py-4 text-sm font-bold text-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:border-transparent group/btn"
                    >
                      <span className="absolute inset-0 gradient-sky opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                      <span className="relative z-10 flex items-center gap-2 group-hover/btn:text-primary-foreground transition-colors duration-300">
                        Yêu cầu ngay
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </span>
                    </button>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- How it works ---------- */
function HowItWorks() {
  const [activeTab, setActiveTab] = useState<"emergency" | "scheduled">("emergency");
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  const emergencySteps = [
    {
      stepNum: "01",
      icon: PhoneCall,
      title: "1. Gọi Hotline 115 Khẩn Cấp",
      time: "Phản hồi trong vài giây",
      desc: "Gọi 0915 205 115. Tổng đài tiếp nhận vị trí & tình trạng bệnh nhân ngay lập tức.",
      details:
        "Tổng đài y tế trực 24/7 lập tức xác định vị trí của bạn qua GPS, đánh giá mức độ khẩn cấp và hướng dẫn sơ cứu ban đầu qua điện thoại.",
      actionText: "Gọi hotline 0915 205 115",
    },
    {
      stepNum: "02",
      icon: Ambulance,
      title: "2. GPS Điều Xe Gần Nhất",
      time: "Xuất phát trong 3 phút",
      desc: "Hệ thống tự động điều động chiếc xe cấp cứu ở vị trí gần bệnh nhân nhất.",
      details:
        "Tài xế và kíp y bác sĩ trực ca nhận lệnh tức thì, xuất phát ngay trong 3 phút và lựa chọn tuyến đường thông thoáng nhất.",
      actionText: "Định vị GPS thông minh",
    },
    {
      stepNum: "03",
      icon: Stethoscope,
      title: "3. Tiếp Cận & Sơ Cứu Y Tế",
      time: "Có mặt trong 8-15 phút",
      desc: "Đội ngũ y bác sĩ đến tận nơi, kiểm tra chỉ số sinh tồn và sơ cứu khẩn cấp.",
      details:
        "Bác sĩ chuyên khoa đo huyết áp, SpO2, nhịp tim, cho thở oxy và ổn định sức khỏe cho bệnh nhân trước khi di chuyển lên xe.",
      actionText: "Bác sĩ & Điều dưỡng trực xe",
    },
    {
      stepNum: "04",
      icon: ShieldCheck,
      title: "4. Vận Chuyển An Toàn Về BV",
      time: "Hồi sức ICU trên đường",
      desc: "Bệnh nhân được theo dõi bằng máy thở, monitor ICU và đưa tới bệnh viện đích.",
      details:
        "Xe cấp cứu đời mới chống xóc ưu việt, phòng ICU thu nhỏ hỗ trợ hồi sức liên tục cho đến khi bàn giao an toàn cho khoa cấp cứu bệnh viện.",
      actionText: "Bàn giao y tế chuẩn phác đồ",
    },
  ];

  const scheduledSteps = [
    {
      stepNum: "01",
      icon: CalendarCheck,
      title: "1. Đặt Lịch Hẹn Trực Tuyến",
      time: "Chủ động thời gian",
      desc: "Điền form đặt trước hoặc gọi tư vấn chọn ngày giờ, lộ trình chuyển viện.",
      details:
        "Thích hợp cho bệnh nhân xuất viện về nhà, tái khám định kỳ, chuyển viện liên tỉnh hoặc khám bệnh theo lịch trình gia đình.",
      actionText: "Đặt trước chủ động",
    },
    {
      stepNum: "02",
      icon: CheckCircle2,
      title: "2. Báo Giá & Báo Loại Xe",
      time: "Minh bạch 100%",
      desc: "Tổng đài xác nhận thời gian đón, tư vấn xe thường hay xe ICU và báo giá rõ ràng.",
      details:
        "Chi phí được tính toán công khai dựa trên quãng đường và trang thiết bị y tế đi kèm, cam kết không phụ phí ẩn.",
      actionText: "Báo giá công khai 0đ ẩn",
    },
    {
      stepNum: "03",
      icon: Ambulance,
      title: "3. Đón Đúng Giờ Đã Hẹn",
      time: "Đúng giờ 100%",
      desc: "Xe và kíp y tế có mặt trước 10 phút tại nhà hoặc bệnh viện theo đúng cam kết.",
      details:
        "Điều dưỡng hỗ trợ đưa bệnh nhân từ giường bệnh/tầng lầu xuống xe nhẹ nhàng, an toàn tuyệt đối.",
      actionText: "Hỗ trợ đưa đón tận giường",
    },
    {
      stepNum: "04",
      icon: Home,
      title: "4. Hoàn Thành Lộ Trình An Tâm",
      time: "Thoải mái & An toàn",
      desc: "Vận chuyển êm ái đến đúng địa chỉ yêu cầu (bệnh viện khác hoặc về tận nhà).",
      details:
        "Kíp y tế bàn giao chu đáo, kiểm tra lại sức khỏe cho bệnh nhân và hỗ trợ người nhà làm thủ tục nhập/xuất viện.",
      actionText: "Bàn giao bệnh nhân an toàn",
    },
  ];

  const steps = activeTab === "emergency" ? emergencySteps : scheduledSteps;

  return (
    <section className="py-20 sm:py-24 bg-gradient-to-b from-slate-50/80 via-background to-slate-50/50 dark:from-slate-900/50 dark:to-background border-y border-border/60 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* --- Header --- */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 mb-3.5 shadow-sm">
            <RouteIcon className="h-3.5 w-3.5" /> Quy Trình Đơn Giản & Minh Bạch
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
            4 Bước Vận Chuyển Cấp Cứu An Toàn
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-muted-foreground leading-relaxed">
            Chọn chế độ khẩn cấp hoặc đặt trước bên dưới để xem quy trình chi tiết từng bước:
          </p>

          {/* --- Tab Switcher: Khẩn cấp vs Đặt trước --- */}
          <div className="mt-6 inline-flex p-1.5 rounded-2xl bg-slate-200/60 dark:bg-slate-800/60 border border-slate-300/60 dark:border-border shadow-inner">
            <button
              onClick={() => setActiveTab("emergency")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200 cursor-pointer ${
                activeTab === "emergency"
                  ? "bg-red-500 text-white shadow-md shadow-red-500/25 scale-[1.02]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Zap className="h-4 w-4" /> 🚨 Cấp Cứu Khẩn Cấp (Phản ứng 3 phút)
            </button>
            <button
              onClick={() => setActiveTab("scheduled")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200 cursor-pointer ${
                activeTab === "scheduled"
                  ? "bg-sky-600 text-white shadow-md shadow-sky-600/25 scale-[1.02]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <CalendarDays className="h-4 w-4" /> 📅 Đặt Lịch Trước (Xuất viện / Tái khám)
            </button>
          </div>
        </div>

        {/* --- Connected Process Stepper Timeline --- */}
        <div className="mt-14 relative">
          
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-1 bg-gradient-to-r from-sky-500 via-blue-500 to-emerald-500 rounded-full z-0 opacity-30" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {steps.map((s, i) => {
              const isExpanded = expandedStep === i;
              return (
                <div
                  key={s.title + i}
                  onClick={() => setExpandedStep(isExpanded ? null : i)}
                  className={`group relative rounded-2xl border p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                    isExpanded
                      ? "border-sky-500 bg-sky-500/5 shadow-lg ring-1 ring-sky-500/30"
                      : "border-slate-200 dark:border-border bg-white dark:bg-card shadow-sm hover:shadow-md hover:border-sky-500/50 hover:-translate-y-1"
                  }`}
                >
                  <div>
                    {/* Top Step Badge & Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="grid h-14 w-14 place-items-center rounded-2xl gradient-sky text-primary-foreground shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform duration-300">
                        <s.icon className="h-7 w-7" />
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-black bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-inner">
                        Bước {s.stepNum}
                      </span>
                    </div>

                    <div className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 mb-2">
                      ⏱ {s.time}
                    </div>

                    <h3 className="text-base font-extrabold text-foreground leading-snug flex items-center justify-between gap-2">
                      <span>{s.title}</span>
                      <ChevronDown
                        className={`h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-300 ${
                          isExpanded ? "rotate-180 text-sky-500" : ""
                        }`}
                      />
                    </h3>

                    <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed font-medium">
                      {s.desc}
                    </p>

                    {isExpanded && (
                      <div className="mt-3.5 pt-3 border-t border-border/80 text-xs text-foreground/90 leading-relaxed animate-fade-in font-medium">
                        {s.details}
                      </div>
                    )}
                  </div>

                  {/* Bottom Action Badge */}
                  <div className="mt-5 pt-3 border-t border-slate-100 dark:border-border/60 flex items-center justify-between text-[11px] font-bold text-sky-600 dark:text-sky-400">
                    <span>{s.actionText}</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
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
      { threshold: 0.3 },
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
  const initialReviews = [
    {
      name: "Chị Nguyễn Thị Thanh Vân",
      role: "Thân nhân bệnh nhân (Quận 7, TP.HCM)",
      tag: "🚨 Cấp cứu khẩn cấp 24/7",
      date: "24/07/2026",
      text: "Lúc 2h sáng mẹ tôi 78 tuổi bị tăng huyết áp đột ngột kèm khó thở. Gọi hotline 115 Hồng Hải thì xe đến nhà sau 11 phút. Bác sĩ đi cùng hỗ trợ thở oxy và đo sinh hiệu liên tục trên xe, đưa thẳng tới BV Chợ Rẫy kịp thời. Thái độ nhân viên rất ân cần và điềm tĩnh giúp gia đình bớt hoảng loạn.",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&h=120&q=80",
      rating: 5,
      verified: true,
    },
    {
      name: "Anh Lê Hoàng Nam",
      role: "Người nhà chuyển viện (Biên Hòa, Đồng Nai)",
      tag: "🚑 Chuyển viện liên tỉnh",
      date: "18/07/2026",
      text: "Cần đưa bố từ BV Đa khoa Đồng Nai về BV Đại học Y Dược TP.HCM. Xe cứu thương đời mới êm ru, láng mịn, không xóc nảy. Trên xe trang bị máy thở xách tay và monitor theo dõi tim mạch chuẩn y tế. Mức giá niêm yết rõ ràng từ đầu, không phát sinh chi phí ẩn.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80",
      rating: 5,
      verified: true,
    },
    {
      name: "BS. Trần Văn Hùng",
      role: "Bác sĩ điều phối (Khoa Cấp cứu BV Quốc tế)",
      tag: "🏥 Hợp tác chuyển viện ICU",
      date: "10/07/2026",
      text: "Bệnh viện chúng tôi thường xuyên phối hợp cùng 115 Hồng Hải trong các ca chuyển bệnh nhân nặng cần hồi sức tích cực (ICU). Đội ngũ y bác sĩ đi theo xe được đào tạo bài bản, bàn giao bệnh nhân chuẩn phác đồ y khoa. Xe trang bị đầy đủ máy sốc tim và oxy trung tâm.",
      avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=120&h=120&q=80",
      rating: 5,
      verified: true,
    },
    {
      name: "Cô Trần Thị Tuyết",
      role: "Khách hàng dịch vụ nhà (Q. Tân Bình)",
      tag: "👩‍⚕️ Điều dưỡng tại nhà",
      date: "02/07/2026",
      text: "Tôi đăng ký gói điều dưỡng rửa vết thương và thay băng tại nhà sau khi phẫu thuật khớp háng cho mẹ. Cô điều dưỡng Trang làm rất nhẹ nhàng, tiệt trùng cẩn thận và hướng dẫn gia đình theo dõi dặn dò chi tiết. Rất hài lòng về chất lượng phục vụ!",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80",
      rating: 5,
      verified: true,
    },
    {
      name: "Anh Phạm Minh Đức",
      role: "Trưởng ban tổ chức Marathon 2026",
      tag: "🏃 Trực y tế sự kiện",
      date: "25/06/2026",
      text: "Thuê kíp xe cấp cứu 115 Hồng Hải trực cho sự kiện thể thao 5.000 vận động viên. Tác phong cực kỳ chuyên nghiệp, xử lý sơ cứu chuột rút và kiệt sức tại chỗ rất nhanh. Hệ thống liên lạc điều phối thông suốt suốt 12 tiếng sự kiện.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80",
      rating: 5,
      verified: true,
    },
    {
      name: "Anh Vũ Đức Anh",
      role: "Khách hàng thuê bình oxy (TP. Thủ Đức)",
      tag: "🫁 Cho thuê bình oxy & Thiết bị",
      date: "15/06/2026",
      text: "Gọi thuê gấp bình oxy 40L và máy đo SpO2 cho người nhà bị suy hô hấp trong đêm. Kỹ thuật viên giao tận nhà sau 20 phút, hướng dẫn gia đình cách vặn van và thở an toàn rất tận tình. Thiết bị mới, có tem kiểm định an toàn.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&h=120&q=80",
      rating: 5,
      verified: true,
    },
  ];

  const [reviews, setReviews] = useState(initialReviews);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = (reviewToDelete: any) => {
    if (window.confirm("Bạn có chắc muốn xóa đánh giá này không?")) {
      setReviews(reviews.filter((r) => r !== reviewToDelete));
    }
  };

  return (
    <section id="reviews" className="py-20 sm:py-24 bg-slate-50/60 dark:bg-slate-900/40 border-y border-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* --- Top Header --- */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Đánh giá từ khách hàng thực tế"
            title="Niềm Tin & Trải Nghiệm Khách Hàng"
            subtitle="Hơn 10.000+ gia đình, bệnh viện và phòng khám đã tin tưởng sử dụng dịch vụ Cấp Cứu 115 Hồng Hải."
          />
          <button
            onClick={() => setIsModalOpen(true)}
            className="shrink-0 inline-flex items-center gap-2 rounded-2xl gradient-sky px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.99] transition-all cursor-pointer"
          >
            <Star className="h-4 w-4 fill-current" /> Viết đánh giá của bạn
          </button>
        </div>

        {/* --- Overall Rating Summary Bar --- */}
        <div className="mt-8 p-5 sm:p-6 rounded-2xl border border-slate-200/90 dark:border-border bg-white dark:bg-card shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="text-center sm:text-left">
              <div className="text-3xl sm:text-4xl font-extrabold text-foreground flex items-center justify-center sm:justify-start gap-2">
                <span>4.9</span>
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1 font-medium">Dựa trên 1,280+ đánh giá xác thực từ người nhà bệnh nhân & y bác sĩ</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full md:w-auto text-xs font-semibold">
            <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 px-3.5 py-2 rounded-xl">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
              <span>99.2% Đúng giờ tiếp cận</span>
            </div>
            <div className="flex items-center gap-2 bg-sky-500/10 text-sky-700 dark:text-sky-400 border border-sky-500/20 px-3.5 py-2 rounded-xl">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-sky-600" />
              <span>100% Giá công khai minh bạch</span>
            </div>
            <div className="flex items-center gap-2 bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-500/20 px-3.5 py-2 rounded-xl">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-purple-600" />
              <span>100% Bác sĩ/Điều dưỡng trực xe</span>
            </div>
          </div>
        </div>

        {/* --- Review Grid Cards --- */}
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r, idx) => (
            <div
              key={r.name + idx}
              className="relative rounded-2xl border border-slate-200 dark:border-border bg-white dark:bg-card p-6 shadow-sm hover:shadow-md hover:border-sky-500/40 transition-all flex flex-col justify-between group"
            >
              {(r as any).isUserSubmitted && (
                <button
                  onClick={() => handleDelete(r)}
                  className="absolute top-4 right-4 text-muted-foreground hover:text-destructive transition-colors p-2 rounded-full hover:bg-destructive/10"
                  aria-label="Xóa đánh giá"
                  title="Xóa đánh giá của bạn"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  {r.tag ? (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold bg-sky-500/10 text-sky-700 dark:text-sky-400 border border-sky-500/20">
                      {r.tag}
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold bg-sky-500/10 text-sky-700 dark:text-sky-400 border border-sky-500/20">
                      ⭐ Đánh giá mới
                    </span>
                  )}
                  {r.date && (
                    <span className="text-[11px] text-muted-foreground font-medium">{r.date}</span>
                  )}
                </div>

                <div className="flex gap-1 text-yellow-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < (r.rating || 5) ? "fill-current" : "text-gray-300"}`}
                    />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed italic">
                  "{r.text}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-border flex items-center gap-3">
                <img
                  src={r.avatar}
                  alt={r.name}
                  loading="lazy"
                  width={48}
                  height={48}
                  className="h-11 w-11 rounded-full object-cover border-2 border-sky-500/30 shrink-0"
                />
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm font-bold text-foreground truncate flex items-center gap-1.5">
                    <span>{r.name}</span>
                    {r.verified && (
                      <span title="Đã xác minh dịch vụ" className="inline-flex items-center">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-muted-foreground font-medium truncate">{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onReviewAdded={(newReview) => setReviews([newReview, ...reviews])}
      />
    </section>
  );
}

/* ---------- Review Modal ---------- */
function ReviewModal({
  isOpen,
  onClose,
  onReviewAdded,
}: {
  isOpen: boolean;
  onClose: () => void;
  onReviewAdded: (review: any) => void;
}) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response: any = await sendEmailAction({
        data: {
          name: (formData.get("Ho_Ten") as string) || "Khách hàng",
          phone: (formData.get("So_Dien_Thoai") as string) || "",
          address: "",
          note: formData.get("Binh_Luan") as string,
          rating: String(rating),
          type: "review",
        },
      });

      const newReview = {
        name: formData.get("Ho_Ten") as string,
        role: "Khách hàng",
        text: formData.get("Binh_Luan") as string,
        avatar: "https://i.pravatar.cc/120?img=" + Math.floor(Math.random() * 70),
        rating: rating,
        isUserSubmitted: true,
      };

      onReviewAdded(newReview);
      setSent(true);

      setTimeout(() => {
        setSent(false);
        setIsSubmitting(false);
        setRating(5);
        onClose();
      }, 3000);
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra khi gửi đánh giá. Vui lòng thử lại.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg rounded-3xl bg-card border border-border shadow-card overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-secondary/30">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500 fill-current" />
            Viết đánh giá dịch vụ
          </h2>
          <button
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-full bg-background border border-border hover:bg-secondary transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-6">
          {sent ? (
            <div className="flex flex-col items-center justify-center py-10 text-center animate-in fade-in">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Cảm ơn bạn!</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Đánh giá của bạn đã được ghi nhận. Ý kiến của bạn giúp chúng tôi cải thiện dịch vụ
                tốt hơn mỗi ngày.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="flex flex-col items-center justify-center py-4">
                <span className="text-sm font-medium mb-3">
                  Bạn đánh giá dịch vụ bao nhiêu sao?
                </span>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className="transition-transform hover:scale-110 focus:outline-none"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                    >
                      <Star
                        className={`h-10 w-10 transition-colors duration-200 ${
                          star <= (hoverRating || rating)
                            ? "text-yellow-500 fill-current"
                            : "text-muted-foreground/30"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <Field label="Họ và Tên" name="Ho_Ten" placeholder="Nhập tên của bạn" required />
              <Field
                label="Số điện thoại"
                name="So_Dien_Thoai"
                type="tel"
                placeholder="090 123 4567"
                required
              />

              <div>
                <label className="block text-sm font-medium mb-1.5">Bình luận của bạn</label>
                <textarea
                  name="Binh_Luan"
                  rows={4}
                  required
                  placeholder="Chia sẻ trải nghiệm của bạn về dịch vụ..."
                  className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center gap-2 rounded-xl gradient-sky px-6 py-3.5 text-base font-bold text-primary-foreground shadow-soft hover:opacity-95 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Đang gửi..." : "Gửi đánh giá"} <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- Contact ---------- */
function Contact() {
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.currentTarget;
    const formData = new FormData(form);

    const requestData = {
      name: (formData.get("Ho_Ten") as string) || "Khách hàng",
      phone: (formData.get("So_Dien_Thoai") as string) || "",
      address: (formData.get("Dia_Chi_Don") as string) || "Chưa cung cấp",
      details: [
        formData.get("Benh_Vien_Den") ? `Bệnh viện: ${formData.get("Benh_Vien_Den")}` : "",
        formData.get("Ghi_Chu") ? `Ghi chú: ${formData.get("Ghi_Chu")}` : "",
      ].filter(Boolean).join(" - ") || "Yêu cầu qua Form liên hệ",
      serviceType: (formData.get("Loai_Dich_Vu") as string) || "Chưa rõ",
    };

    try {
      await addBookingRequest(requestData);
    } catch (err: any) {
      if (err.message === "BLOCKED_PHONE") {
        toast.error("Số điện thoại của bạn đã bị hạn chế do có nhiều báo cáo ảo.");
        setIsSubmitting(false);
        return;
      }
    }

    try {
      await sendEmailAction({
        data: {
          name: requestData.name,
          phone: requestData.phone,
          address: requestData.address,
          condition: requestData.details,
          serviceType: requestData.serviceType,
          type: "booking",
        },
      });

      setSent(true);
      setTimeout(() => setSent(false), 4000);
      form.reset();
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra khi gửi yêu cầu. Vui lòng thử lại sau.");
    } finally {
      setIsSubmitting(false);
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
              <Field label="Họ và Tên" name="Ho_Ten" placeholder="Nguyễn Văn A" required />
              <Field
                label="Số điện thoại"
                name="So_Dien_Thoai"
                type="tel"
                placeholder="090 123 4567"
                required
              />
              <Field
                label="Email (Không bắt buộc)"
                name="Email"
                type="email"
                placeholder="nguyenvana@example.com"
              />
              <Field
                label="Địa chỉ đón"
                name="Dia_Chi_Don"
                placeholder="123 Đường Lê Lợi"
                required
                enableLocation
              />
              <div className="sm:col-span-2">
                <Field label="Bệnh viện đến" name="Benh_Vien_Den" placeholder="Bệnh viện Chợ Rẫy" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium mb-3">Loại dịch vụ</label>
                <div className="flex flex-wrap gap-3">
                  {["Khẩn cấp", "Chuyển viện", "Điều dưỡng", "ICU Hồi sức", "Oxy tận nhà"].map(
                    (type) => (
                      <label
                        key={type}
                        className="flex-1 min-w-[100px] cursor-pointer items-center justify-center text-center rounded-xl border border-border bg-secondary/50 px-2 py-2.5 text-sm font-medium hover:bg-secondary transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5 has-[:checked]:text-primary"
                      >
                        <input
                          type="radio"
                          name="Loai_Dich_Vu"
                          value={type}
                          className="sr-only"
                          defaultChecked={type === "Khẩn cấp"}
                        />
                        {type}
                      </label>
                    ),
                  )}
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium mb-1.5">Tin nhắn</label>
                <textarea
                  name="Ghi_Chu"
                  rows={4}
                  placeholder="Tình trạng bệnh nhân hoặc bất kỳ yêu cầu đặc biệt nào..."
                  className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                />
              </div>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 rounded-full gradient-sky px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft hover:scale-[1.02] transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Đang gửi...
                  </>
                ) : (
                  <>
                    Gửi yêu cầu <ArrowRight className="h-4 w-4" />
                  </>
                )}
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
                <CheckCircle2 className="h-4 w-4" /> Đã gửi yêu cầu. Tổng đài viên của chúng tôi sẽ
                sớm liên hệ với bạn.
              </div>
            )}
          </form>

          <div className="lg:col-span-2 flex flex-col gap-4">
            <InfoCard
              icon={PhoneCall}
              title="Đường dây nóng"
              lines={["115 (Khẩn cấp)", "0915 205 115"]}
            />
            <InfoCard icon={Mail} title="Email" lines={["Hoangphihai1984bp@gmail.com"]} />
            <InfoCard
              icon={MapPin}
              title="Địa chỉ"
              lines={["11 Hẻm 922", "Đồng Xoài", "Đồng Nai"]}
            />
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

/* ---------- Floating actions ---------- */
/* ---------- Booking Modal ---------- */
/* ---------- shared ---------- */
/* ---------- Home Care Section ---------- */
function HomeCare() {
  return (
    <section id="homecare" className="py-20 sm:py-24 bg-secondary/20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="hidden lg:block order-2 lg:order-1 relative rounded-[2rem] overflow-hidden shadow-2xl border border-border/50 group">
            <img
              src={sHomeCare}
              alt="Điều dưỡng tại nhà"
              loading="lazy"
              className="w-full aspect-[4/3] object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="inline-flex items-center gap-2 rounded-2xl bg-white/20 backdrop-blur-md px-4 py-3 border border-white/30 shadow-lg">
                <HeartPulse className="h-5 w-5 text-white animate-pulse" />
                <span className="text-white font-semibold text-sm">Chăm sóc tận tâm 24/7</span>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <SectionHeading
              eyebrow="Dịch vụ nổi bật"
              title="Điều dưỡng tại nhà chuyên nghiệp"
              subtitle="Mang dịch vụ y tế chuẩn bệnh viện đến tận ngôi nhà của bạn. Giải pháp hoàn hảo giúp tiết kiệm thời gian, công sức đi lại mà vẫn đảm bảo an toàn tuyệt đối cho người thân."
            />

            <div className="mt-8 lg:hidden relative rounded-[2rem] overflow-hidden shadow-2xl border border-border/50 group">
              <img
                src={sHomeCare}
                alt="Điều dưỡng tại nhà"
                loading="lazy"
                className="w-full aspect-[4/3] object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="inline-flex items-center gap-2 rounded-2xl bg-white/20 backdrop-blur-md px-4 py-3 border border-white/30 shadow-lg">
                  <HeartPulse className="h-5 w-5 text-white animate-pulse" />
                  <span className="text-white font-semibold text-sm">Chăm sóc tận tâm 24/7</span>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-6">
              {[
                {
                  title: "Chăm sóc toàn diện",
                  desc: "Thay băng, cắt chỉ, rửa vết thương, chăm sóc vết loét, ống thông.",
                },
                {
                  title: "Thực hiện y lệnh",
                  desc: "Tiêm truyền dịch, tiêm thuốc tĩnh mạch/bắp/dưới da an toàn, chính xác.",
                },
                {
                  title: "Kiểm tra sinh tồn",
                  desc: "Đo huyết áp, đường huyết, SpO2, theo dõi nhịp tim và nhịp thở.",
                },
                {
                  title: "Lấy mẫu xét nghiệm",
                  desc: "Lấy máu, nước tiểu tại nhà và trả kết quả nhanh chóng, chuẩn xác.",
                },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 group/item">
                  <div className="mt-1 grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary group-hover/item:bg-primary group-hover/item:text-primary-foreground transition-colors duration-300 shadow-sm">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-lg group-hover/item:text-primary transition-colors">
                      {item.title}
                    </h4>
                    <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a
                href="/dieu-duong-tai-nha"
                className="inline-flex items-center justify-center gap-2 rounded-2xl gradient-sky px-8 py-4 text-sm font-bold text-primary-foreground shadow-lg hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-300"
              >
                Tìm hiểu thêm <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="tel:0915205115"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-primary/20 bg-background px-8 py-4 text-sm font-bold text-primary hover:bg-primary/5 hover:border-primary/40 transition-all duration-300"
              >
                <PhoneCall className="h-4 w-4" />
                Tư vấn miễn phí
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Oxygen Service Section ---------- */
function OxygenService() {
  return (
    <section id="oxygen-service" className="py-20 sm:py-24 relative overflow-hidden bg-background">
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] right-[-5%] w-96 h-96 rounded-full bg-sky-500/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1 relative rounded-[2rem] overflow-hidden shadow-2xl border border-border/50 group">
            <img
              src={sOxygen}
              alt="Dịch vụ oxy tận nhà"
              loading="lazy"
              className="w-full aspect-[4/3] object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="inline-flex items-center gap-2 rounded-2xl bg-white/20 backdrop-blur-md px-4 py-3 border border-white/30 shadow-lg">
                <Wind className="h-5 w-5 text-white animate-pulse" />
                <span className="text-white font-semibold text-sm">Giao hàng siêu tốc 24/7</span>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <SectionHeading
              eyebrow="Dịch vụ chuyên biệt"
              title="Dịch vụ oxy tận nhà nhanh chóng"
              subtitle="Cung cấp, cho thuê bình oxy và máy tạo oxy tận nơi. Đảm bảo nguồn oxy sạch, an toàn 24/7 giúp tiết kiệm thời gian và mang lại sự an tâm tuyệt đối."
            />

            <div className="mt-8 space-y-6">
              {[
                {
                  title: "Bình oxy tiêu chuẩn y tế",
                  desc: "Đầy đủ các loại bình từ nhỏ đến lớn, được kiểm định an toàn nghiêm ngặt.",
                },
                {
                  title: "Máy tạo oxy hiện đại",
                  desc: "Cung cấp các dòng máy tạo oxy tiên tiến, hoạt động êm ái và ổn định.",
                },
                {
                  title: "Giao hàng và lắp đặt tận nơi",
                  desc: "Phục vụ 24/7, có mặt nhanh chóng để lắp đặt và hướng dẫn sử dụng chi tiết.",
                },
                {
                  title: "Hỗ trợ kỹ thuật 24/24",
                  desc: "Đội ngũ chuyên môn luôn sẵn sàng giải đáp và xử lý mọi vấn đề ngay lập tức.",
                },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 group/item">
                  <div className="mt-1 grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary group-hover/item:bg-primary group-hover/item:text-primary-foreground transition-colors duration-300 shadow-sm">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-lg group-hover/item:text-primary transition-colors">
                      {item.title}
                    </h4>
                    <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a
                href="/dich-vu-oxy"
                className="inline-flex items-center justify-center gap-2 rounded-2xl gradient-sky px-8 py-4 text-sm font-bold text-primary-foreground shadow-lg hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-300"
              >
                Tìm hiểu thêm <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="tel:0915205115"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-primary/20 bg-background px-8 py-4 text-sm font-bold text-primary hover:bg-primary/5 hover:border-primary/40 transition-all duration-300"
              >
                <PhoneCall className="h-4 w-4" />
                Tư vấn miễn phí
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
