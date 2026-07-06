import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { sendEmailAction } from "@/lib/actions";
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
} from "lucide-react";

import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { BookingModal } from '@/components/common/BookingModal';
import { FloatingActions } from '@/components/common/FloatingActions';
import { BackToTop } from '@/components/common/BackToTop';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Field } from '@/components/common/Field';
import { InfoCard } from '@/components/common/InfoCard';

import { getAmbulances, getNurses } from "@/lib/adminStore";

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
        <Hero onOpenBooking={() => openBooking("emergency")} />
        <WhyUs />
        <Services onOpenBooking={openBooking} />
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

/* ---------- Hero ---------- */
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
    window.addEventListener('admin_store_update', updateStats);
    return () => window.removeEventListener('admin_store_update', updateStats);
  }, []);

  return (
    <section id="home" className="relative isolate overflow-hidden pt-32 pb-8 sm:pt-40 sm:pb-12 bg-slate-950">
      <div className="absolute inset-0 -z-10">
        <img
          src={heroImg}
          alt="Xe cấp cứu đời mới cùng đội ngũ y tế chuyên nghiệp"
          className="h-full w-full object-cover"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-slate-950/30" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl animate-fade-in relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs sm:text-sm font-semibold text-primary backdrop-blur-md">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emergency opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emergency" />
            </span>
            Phục vụ 24/7 – Thời gian phản hồi trung bình 8 phút
          </div>

          <h1 className="mt-6 sm:mt-8 font-bold leading-[1.1] tracking-tight text-white text-5xl sm:text-6xl lg:text-[72px]">
            <span className="block">Dịch vụ</span>
            <span className="block text-gradient-sky drop-shadow-lg">
              Cấp cứu Hồng Hải
            </span>
            <span className="block">nhanh chóng, an toàn</span>
            <span className="block">và chuyên nghiệp</span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-white/70 max-w-2xl leading-relaxed">
            Đội ngũ bác sĩ, điều dưỡng giàu kinh nghiệm cùng hệ thống xe cấp cứu hiện đại, sẵn sàng phục vụ mọi lúc – mọi nơi.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <a
              href="tel:0915205115"
              className="inline-flex items-center justify-center gap-3 rounded-2xl bg-emergency px-8 py-4 text-base font-bold text-emergency-foreground shadow-[0_4px_20px_rgba(239,68,68,0.4)] hover:opacity-90 hover:-translate-y-1 transition-all"
            >
              <Ambulance className="h-6 w-6" />
              <div className="text-left leading-tight">
                <div className="block">Gọi xe cấp cứu ngay</div>
                <div className="text-[11px] font-medium text-white/90">Phục vụ 24/7</div>
              </div>
            </a>
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center justify-center gap-3 rounded-2xl gradient-sky px-8 py-4 text-base font-bold text-primary-foreground shadow-[0_4px_20px_rgba(14,165,233,0.3)] hover:opacity-90 hover:-translate-y-1 transition-all"
            >
              <CalendarDays className="h-6 w-6" />
              <div className="text-left leading-tight">
                <div className="block">Đặt lịch trước</div>
                <div className="text-[11px] font-medium text-white/80">Chủ động thời gian</div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Embedded Stats & Features Bottom Bar */}
      <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-16 sm:mt-24">
        <div className="rounded-[2rem] border border-white/10 bg-slate-950/60 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 border-b border-white/10 pb-6">
            {[
              { icon: ShieldCheck, title: "Phục vụ 24/7", desc: "Luôn sẵn sàng mọi lúc" },
              { icon: Users, title: "Đội ngũ chuyên nghiệp", desc: "Bác sĩ, điều dưỡng giỏi" },
              { icon: Truck, title: "Xe hiện đại", desc: "Trang thiết bị tiên tiến" },
              { icon: Zap, title: "Phản hồi nhanh", desc: "Phản hồi tới 8 phút" },
              { icon: CheckCircle2, title: "An toàn tuyệt đối", desc: "Quy trình chuẩn - an toàn" },
            ].map((f) => (
              <div key={f.title} className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/20 text-primary">
                  <f.icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">{f.title}</h4>
                  <p className="text-[11px] text-white/60 mt-0.5">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-bold text-white flex items-center justify-center gap-1">
                  <Counter target={s.v} suffix={s.suffix} />
                </div>
                <div className="text-sm font-medium text-white/60 mt-1">{s.label}</div>
              </div>
            ))}
            <div className="text-center flex flex-col items-center justify-center">
              <div className="flex gap-1 text-yellow-500 mb-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="h-6 w-6 fill-current" />
                ))}
              </div>
              <div className="text-sm font-medium text-white/60">Đánh giá từ khách hàng</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Why Choose Us ---------- */
function WhyUs() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const items = [
    {
      icon: Clock,
      title: "Trực cấp cứu 24/7",
      desc: "Tiếp nhận cuộc gọi và điều phối xe cấp cứu nhanh chóng mọi lúc, mọi nơi.",
      details: "Đường dây nóng của chúng tôi luôn có tổng đài viên túc trực 24 giờ mỗi ngày, 7 ngày một tuần, kể cả ngày lễ Tết. Hệ thống luân phiên trực ban đảm bảo không có cuộc gọi nào bị bỏ lỡ, giúp bệnh nhân nhận được sự hỗ trợ y tế khẩn cấp vào bất kỳ thời điểm nào trong ngày."
    },
    {
      icon: Stethoscope,
      title: "Đội ngũ y bác sĩ & điều dưỡng",
      desc: "Nhân viên y tế nhiều kinh nghiệm, hỗ trợ sơ cứu và chăm sóc bệnh nhân trên xe.",
      details: "Đội ngũ chuyên môn gồm các bác sĩ chuyên khoa cấp cứu và điều dưỡng viên được đào tạo bài bản, có chứng chỉ hành nghề và nhiều năm kinh nghiệm lâm sàng. Chúng tôi có khả năng xử lý các tình huống nguy kịch, hồi sức tim phổi và duy trì sinh tồn cho bệnh nhân ngay trên đường chuyển viện."
    },
    {
      icon: Truck,
      title: "Xe cấp cứu đời mới",
      desc: "Trang bị đầy đủ máy thở, monitor, bình oxy và các thiết bị cấp cứu cần thiết.",
      details: "100% xe vận chuyển là các dòng xe đời mới, được thiết kế chống xóc ưu việt. Không gian xe rộng rãi, tiệt trùng định kỳ, được trang bị như một phòng ICU thu nhỏ với máy thở xách tay, máy sốc tim, monitor theo dõi sinh tồn, bơm tiêm điện và hệ thống oxy trung tâm."
    },
    {
      icon: MapPin,
      title: "Điều phối thông minh",
      desc: "Lựa chọn xe gần nhất để rút ngắn thời gian tiếp cận bệnh nhân.",
      details: "Ứng dụng hệ thống định vị GPS và phần mềm quản lý đội xe hiện đại, tổng đài luôn biết chính xác vị trí của từng xe cứu thương. Ngay khi có cuộc gọi, hệ thống sẽ tự động tính toán và điều động chiếc xe có khoảng cách gần nhất, tránh kẹt xe để đến hiện trường trong thời gian vàng."
    },
    {
      icon: Zap,
      title: "Có mặt nhanh chóng",
      desc: "Ưu tiên điều xe ngay sau khi tiếp nhận yêu cầu cấp cứu.",
      details: "Với mạng lưới xe cứu thương phủ rộng khắp các quận huyện và các tỉnh lân cận, kết hợp với đội ngũ tài xế thông thuộc đường xá, chúng tôi cam kết thời gian tiếp cận bệnh nhân luôn ở mức thấp nhất. Quy trình xuất phát khẩn cấp được tính bằng giây ngay khi chốt thông tin."
    },
    {
      icon: ShieldCheck,
      title: "An toàn - Uy tín",
      desc: "Đảm bảo an toàn tuyệt đối trong suốt quá trình vận chuyển bệnh nhân.",
      details: "Sự an toàn của người bệnh là ưu tiên tối thượng. Chúng tôi tuân thủ nghiêm ngặt các quy trình kiểm soát nhiễm khuẩn, lái xe an toàn và phác đồ cấp cứu của Bộ Y tế. Mức chi phí luôn được thông báo minh bạch, rõ ràng ngay từ đầu, tuyệt đối không có phụ phí phát sinh ẩn."
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
          {items.map((it, i) => {
            const isExpanded = expandedIndex === i;
            return (
              <div
                key={it.title}
                onClick={() => setExpandedIndex(isExpanded ? null : i)}
                className={`group rounded-2xl border ${isExpanded ? 'border-primary ring-1 ring-primary/20 bg-card/80' : 'border-border bg-card'} p-6 shadow-card hover:shadow-soft transition-all duration-300 cursor-pointer`}
              >
                <div className="flex justify-between items-start">
                  <div className="grid h-12 w-12 place-items-center rounded-xl gradient-sky text-primary-foreground shadow-soft group-hover:scale-110 transition-transform">
                    <it.icon className="h-6 w-6" />
                  </div>
                  <div className={`shrink-0 rounded-full p-1 transition-colors ${isExpanded ? 'bg-primary/10 text-primary' : 'bg-secondary text-muted-foreground'}`}>
                    <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                  </div>
                </div>
                <h3 className="mt-5 text-lg font-semibold">{it.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground font-medium">{it.desc}</p>

                <div className={`grid transition-all duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
                  <div className="overflow-hidden">
                    <div className="pt-4 border-t border-border">
                      <p className="text-sm text-foreground/80 leading-relaxed">
                        {it.details}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
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
      features: [
        "Xe ICU",
        "Monitor",
        "Máy thở",
        "Bơm tiêm điện",
        "Máy hút đàm",
        "Bác sĩ hồi sức",
      ],
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
              <article
                className="w-full group relative flex flex-col rounded-[2rem] overflow-hidden border border-border/60 bg-card shadow-lg hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 transition-all duration-500"
              >
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
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {s.desc}
                </p>

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
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  const steps = [
    {
      icon: PhoneCall,
      title: "Liên hệ",
      desc: "Gọi 115 hoặc đặt xe qua biểu mẫu trực tuyến của chúng tôi bất cứ lúc nào.",
      details: "Hệ thống tổng đài 24/7 luôn sẵn sàng tiếp nhận cuộc gọi. Tổng đài viên sẽ nhanh chóng ghi nhận thông tin cơ bản về người bệnh, tình trạng sơ bộ và địa chỉ đón để xác định mức độ ưu tiên."
    },
    {
      icon: CheckCircle2,
      title: "Xác nhận thông tin",
      desc: "Cung cấp thông tin bệnh nhân, tình trạng và địa điểm đón cho tổng đài viên.",
      details: "Sau khi nắm thông tin, chúng tôi sẽ tư vấn phương án vận chuyển phù hợp nhất (loại xe, thiết bị y tế đi kèm như máy thở, máy sốc tim...). Bạn sẽ được thông báo ngay lập tức về chi phí và thời gian xe đến."
    },
    {
      icon: Ambulance,
      title: "Điều phối xe",
      desc: "Xe cấp cứu gần nhất sẽ được điều động trong vài giây.",
      details: "Hệ thống định vị GPS thông minh sẽ xác định và điều động ngay chiếc xe cấp cứu gần vị trí của bạn nhất. Đội ngũ y bác sĩ và tài xế nhận lệnh xuất phát chỉ trong chưa tới 3 phút."
    },
    {
      icon: ShieldCheck,
      title: "Vận chuyển an toàn",
      desc: "Đội ngũ y tế chuyên nghiệp đưa bệnh nhân đến nơi an toàn.",
      details: "Bệnh nhân được theo dõi liên tục các chỉ số sinh tồn trong suốt hành trình. Bác sĩ/điều dưỡng sẽ can thiệp y tế kịp thời nếu có bất thường, đảm bảo an toàn tuyệt đối cho đến khi nhập viện."
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-gradient-to-b from-secondary/40 to-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Quy trình làm việc"
          title="4 bước để vận chuyển an toàn"
          subtitle="Quy trình đơn giản, minh bạch được thiết kế cho cả trường hợp khẩn cấp và theo lịch trình. (Bấm vào từng bước để xem chi tiết)"
        />
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5 relative">
          {steps.map((s, i) => {
            const isExpanded = expandedStep === i;
            return (
              <div
                key={i}
                onClick={() => setExpandedStep(isExpanded ? null : i)}
                className={`relative rounded-2xl border ${isExpanded ? 'border-primary ring-1 ring-primary/20 bg-card/80' : 'border-border bg-card'} p-6 shadow-card hover:shadow-soft transition-all duration-300 cursor-pointer group`}
              >
                <div className="absolute -top-3 -right-3 grid h-9 w-9 place-items-center rounded-full bg-emergency text-emergency-foreground text-sm font-bold shadow-soft">
                  {i + 1}
                </div>
                <div className="grid h-12 w-12 place-items-center rounded-xl gradient-sky text-primary-foreground shadow-soft transition-transform duration-300 group-hover:scale-110">
                  <s.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-bold flex justify-between items-start gap-2">
                  {s.title}
                  <div className={`shrink-0 mt-1 rounded-full p-1 transition-colors ${isExpanded ? 'bg-primary/10 text-primary' : 'bg-secondary text-muted-foreground'}`}>
                    <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                  </div>
                </h3>
                <p className="mt-2 text-sm text-foreground/85 leading-relaxed font-medium">{s.desc}</p>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 mt-0'}`}
                >
                  <div className="overflow-hidden">
                    <div className="pt-4 border-t border-border">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {s.details}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
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
  const initialReviews = [
    {
      name: "Nguyễn Thị Hoa",
      role: "Người nhà bệnh nhân",
      text: "Dịch vụ tuyệt vời. Xe đến trong vòng 10 phút và đội y tế rất chuyên nghiệp, giúp chúng tôi an tâm hơn nhiều.",
      avatar: "https://i.pravatar.cc/120?img=47",
      rating: 5,
    },
    {
      name: "BS. Trần Văn Hùng",
      role: "Điều phối viên bệnh viện",
      text: "Chúng tôi luôn tin tưởng dịch vụ chuyển viện của 115. Đúng giờ, trang thiết bị đầy đủ và nhân viên rất xuất sắc.",
      avatar: "https://i.pravatar.cc/120?img=12",
      rating: 5,
    },
    {
      name: "Lê Văn Tùng",
      role: "Người nhà bệnh nhân",
      text: "Nhanh nhẹn và chu đáo. Các bác sĩ đã chăm sóc mẹ tôi rất cẩn thận trong một đêm vô cùng căng thẳng.",
      avatar: "https://i.pravatar.cc/120?img=32",
      rating: 5,
    },
    {
      name: "Phạm Minh Đức",
      role: "Ban tổ chức sự kiện",
      text: "Chúng tôi đã đặt dịch vụ trực y tế cho giải marathon. Tác phong chuyên nghiệp, phân loại y tế thông minh và liên lạc rất tốt.",
      avatar: "https://i.pravatar.cc/120?img=15",
      rating: 5,
    },
    {
      name: "Hoàng Thanh Mai",
      role: "Quản lý phòng khám",
      text: "Lựa chọn hàng đầu của chúng tôi cho chuyển viện ICU. Xe ICU của họ thực sự là một phòng chăm sóc tích cực di động.",
      avatar: "https://i.pravatar.cc/120?img=45",
      rating: 5,
    },
    {
      name: "Vũ Đình Trường",
      role: "Bệnh nhân",
      text: "Sau khi tôi gặp tai nạn, đội ngũ y tế đã có mặt trong vài phút. Sự bình tĩnh và chuyên nghiệp của họ đã cứu sống tôi.",
      avatar: "https://i.pravatar.cc/120?img=68",
      rating: 5,
    },
  ];

  const [reviews, setReviews] = useState(initialReviews);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = (reviewToDelete: any) => {
    if (window.confirm("Bạn có chắc muốn xóa đánh giá này không?")) {
      setReviews(reviews.filter(r => r !== reviewToDelete));
    }
  };

  return (
    <section id="reviews" className="py-20 sm:py-24 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Đánh giá từ khách hàng"
            title="Trải nghiệm dịch vụ 115"
            subtitle="Cảm ơn quý khách hàng đã tin tưởng và đồng hành cùng Cấp Cứu 115 Hồng Hải."
          />
          <button
            onClick={() => setIsModalOpen(true)}
            className="shrink-0 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft hover:scale-[1.02] transition-transform"
          >
            <Star className="h-4 w-4 fill-current" /> Viết đánh giá
          </button>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((r, idx) => (
            <div
              key={r.name + idx}
              className="relative rounded-2xl border border-border bg-card p-6 shadow-card hover:shadow-soft hover:-translate-y-1 transition-all group"
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
              <div className="flex gap-1 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < (r.rating || 5) ? 'fill-current' : 'text-gray-300'}`} />
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
  onReviewAdded
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
        }
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
                Đánh giá của bạn đã được ghi nhận. Ý kiến của bạn giúp chúng tôi cải thiện dịch vụ tốt hơn mỗi ngày.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="flex flex-col items-center justify-center py-4">
                <span className="text-sm font-medium mb-3">Bạn đánh giá dịch vụ bao nhiêu sao?</span>
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
                        className={`h-10 w-10 transition-colors duration-200 ${star <= (hoverRating || rating)
                          ? "text-yellow-500 fill-current"
                          : "text-muted-foreground/30"
                          }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <Field label="Họ và Tên" name="Ho_Ten" placeholder="Nhập tên của bạn" required />
              <Field label="Số điện thoại" name="So_Dien_Thoai" type="tel" placeholder="090 123 4567" required />

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
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response: any = await sendEmailAction({
        data: {
          name: (formData.get("Ho_Ten") as string) || "",
          phone: (formData.get("So_Dien_Thoai") as string) || "",
          address: (formData.get("Dia_Chi_Don") as string) || "",
          hospital: (formData.get("Benh_Vien_Den") as string) || "",
          note: formData.get("Ghi_Chu") as string,
          type: "contact",
        }
      });




      setSent(true);
      setTimeout(() => setSent(false), 4000);
      form.reset();
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra khi gửi yêu cầu. Vui lòng thử lại sau.");
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
              <Field label="Số điện thoại" name="So_Dien_Thoai" type="tel" placeholder="090 123 4567" required />
              <Field label="Email (Không bắt buộc)" name="Email" type="email" placeholder="nguyenvana@example.com" />
              <Field label="Địa chỉ đón" name="Dia_Chi_Don" placeholder="123 Đường Lê Lợi" required enableLocation />
              <div className="sm:col-span-2">
                <Field label="Bệnh viện đến" name="Benh_Vien_Den" placeholder="Bệnh viện Chợ Rẫy" />
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
            <InfoCard icon={PhoneCall} title="Đường dây nóng" lines={["115 (Khẩn cấp)", "0915 205 115"]} />
            <InfoCard icon={Mail} title="Email" lines={["Hoangphihai1984bp@gmail.com"]} />
            <InfoCard icon={MapPin} title="Địa chỉ" lines={["11 Hẻm 922", "Đồng Xoài", "Đồng Nai"]} />
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
                { title: "Chăm sóc toàn diện", desc: "Thay băng, cắt chỉ, rửa vết thương, chăm sóc vết loét, ống thông." },
                { title: "Thực hiện y lệnh", desc: "Tiêm truyền dịch, tiêm thuốc tĩnh mạch/bắp/dưới da an toàn, chính xác." },
                { title: "Kiểm tra sinh tồn", desc: "Đo huyết áp, đường huyết, SpO2, theo dõi nhịp tim và nhịp thở." },
                { title: "Lấy mẫu xét nghiệm", desc: "Lấy máu, nước tiểu tại nhà và trả kết quả nhanh chóng, chuẩn xác." },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 group/item">
                  <div className="mt-1 grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary group-hover/item:bg-primary group-hover/item:text-primary-foreground transition-colors duration-300 shadow-sm">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-lg group-hover/item:text-primary transition-colors">{item.title}</h4>
                    <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
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
                { title: "Bình oxy tiêu chuẩn y tế", desc: "Đầy đủ các loại bình từ nhỏ đến lớn, được kiểm định an toàn nghiêm ngặt." },
                { title: "Máy tạo oxy hiện đại", desc: "Cung cấp các dòng máy tạo oxy tiên tiến, hoạt động êm ái và ổn định." },
                { title: "Giao hàng và lắp đặt tận nơi", desc: "Phục vụ 24/7, có mặt nhanh chóng để lắp đặt và hướng dẫn sử dụng chi tiết." },
                { title: "Hỗ trợ kỹ thuật 24/24", desc: "Đội ngũ chuyên môn luôn sẵn sàng giải đáp và xử lý mọi vấn đề ngay lập tức." },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 group/item">
                  <div className="mt-1 grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary group-hover/item:bg-primary group-hover/item:text-primary-foreground transition-colors duration-300 shadow-sm">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-lg group-hover/item:text-primary transition-colors">{item.title}</h4>
                    <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
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
