import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import {
  PhoneCall,
  Mail,
  MapPin,
  CheckCircle2,
  ArrowRight,
  HeartPulse,
  Syringe,
  Activity,
  ClipboardList,
  Baby,
  UserCheck,
  Clock,
  ShieldCheck,
  Ambulance,
  Menu,
  X,
  Facebook,
  MessageCircle,
  ArrowUp,
  Bandage,
  Stethoscope,
  Pill,
  HeartHandshake,
  Phone,
  Loader2
} from "lucide-react";

import sHomeCare from "@/assets/hinh dieu duong.jpg";

export const Route = createFileRoute("/dieu-duong-tai-nha")({
  head: () => ({
    meta: [
      { title: "Dịch vụ Điều dưỡng tại nhà — Cấp cứu 115 Hồng Hải" },
      { name: "description", content: "Dịch vụ chăm sóc y tế, điều dưỡng tại nhà chuyên nghiệp, tận tâm. Tiêm truyền, thay băng, chăm sóc người bệnh 24/7." },
    ],
  }),
  component: HomeNursing,
});

const NAV = [
  { label: "Trang chủ", href: "/" },
  { label: "Dịch vụ", href: "#services" },
  { label: "Quy trình", href: "#howitworks" },
  { label: "Liên hệ", href: "#contact" },
];

function HomeNursing() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [initialService, setInitialService] = useState<string | null>(null);

  const openBooking = (service?: string) => {
    setInitialService(service || null);
    setBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar onOpenBooking={openBooking} />
      <main>
        <Hero onOpenBooking={openBooking} />
        <WhyUs />
        <Services onOpenBooking={openBooking} />
        <HowItWorks />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
      <BackToTop />
      
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        initialService={initialService || "homecare"}
      />
    </div>
  );
}

function Navbar({ onOpenBooking }: { onOpenBooking: (service?: string) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/85 backdrop-blur-md shadow-[0_2px_20px_-10px_rgba(14,165,233,0.3)]" : "bg-transparent"}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a href="/" className="flex items-center gap-2 group">
            <div className="grid h-10 w-10 place-items-center rounded-xl gradient-sky text-primary-foreground shadow-soft transition-transform group-hover:scale-105">
              <HeartPulse className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <div className="font-display text-base sm:text-lg font-bold">Cấp cứu 115 <span className="text-primary whitespace-nowrap">Hồng Hải</span></div>
              <div className="text-[10px] text-muted-foreground -mt-0.5">Điều dưỡng tại nhà</div>
            </div>
          </a>
          
          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary rounded-lg transition-colors">{n.label}</a>
            ))}
          </nav>
          
          <div className="hidden md:flex items-center gap-3">
            <a href="tel:0915205115" className="inline-flex items-center gap-2 rounded-full bg-emergency px-4 py-2 text-sm font-semibold text-emergency-foreground shadow-soft hover:opacity-90 transition">
              <PhoneCall className="h-4 w-4 animate-pulse" />
              0915205115
            </a>
            <button onClick={() => onOpenBooking("homecare")} className="inline-flex items-center gap-2 rounded-full gradient-sky px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft hover:opacity-95 transition">
              Đặt lịch ngay
            </button>
          </div>
          
          <button onClick={() => setOpen(!open)} className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background" aria-label="Toggle menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      
      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md animate-fade-in">
          <div className="px-4 py-4 flex flex-col gap-2">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="px-3 py-2 rounded-lg text-sm font-medium hover:bg-secondary">{n.label}</a>
            ))}
            <a href="tel:0915205115" className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-emergency px-4 py-3 text-sm font-semibold text-emergency-foreground">
              <PhoneCall className="h-4 w-4" /> Gọi ngay
            </a>
            <button onClick={() => { setOpen(false); onOpenBooking("homecare"); }} className="mt-2 inline-flex items-center justify-center gap-2 rounded-full gradient-sky px-4 py-3 text-sm font-semibold text-primary-foreground">
              Đặt lịch
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero({ onOpenBooking }: { onOpenBooking: (service?: string) => void }) {
  return (
    <section id="home" className="relative isolate overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-24">
      <div className="absolute inset-0 -z-10">
        <img
          src={sHomeCare}
          alt="Dịch vụ chăm sóc điều dưỡng tại nhà chuyên nghiệp"
          className="h-full w-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-50" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl animate-fade-in">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              🩺 Chăm sóc y tế tận tâm tại ngôi nhà của bạn
            </div>

            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight">
              Dịch vụ <span className="text-gradient-sky whitespace-nowrap">Điều dưỡng tại nhà</span> chuyên nghiệp
            </h1>
            <p className="mt-5 text-base sm:text-lg text-muted-foreground max-w-xl">
              Mang đến sự an tâm tuyệt đối với đội ngũ điều dưỡng giàu kinh nghiệm. Chăm sóc bệnh nhân, thay băng, tiêm truyền và hỗ trợ y tế chuẩn xác ngay tại gia đình bạn.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a href="tel:0915205115" className="inline-flex items-center justify-center gap-2 rounded-full bg-emergency px-6 py-3.5 text-base font-semibold text-emergency-foreground shadow-soft hover:scale-[1.02] transition-transform">
                <PhoneCall className="h-5 w-5" />
                Tư vấn miễn phí
              </a>
              <button onClick={() => onOpenBooking("homecare")} className="inline-flex items-center justify-center gap-2 rounded-full gradient-sky px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-soft hover:scale-[1.02] transition-transform">
                <ClipboardList className="h-5 w-5" />
                Đặt lịch chăm sóc
              </button>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
              {[
                { v: "100%", l: "Tận tâm" },
                { v: "24/7", l: "Sẵn sàng" },
                { v: "5+", l: "Năm kinh nghiệm" },
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

function WhyUs() {
  const items = [
    { 
      icon: HeartHandshake, 
      title: "Chăm sóc cá nhân hóa", 
      desc: "Mỗi bệnh nhân đều có phác đồ chăm sóc riêng biệt phù hợp với tình trạng sức khỏe.",
      details: ["Đánh giá sức khỏe ban đầu kỹ lưỡng", "Phác đồ chuẩn xác theo bệnh lý", "Theo dõi tiến triển và điều chỉnh linh hoạt"]
    },
    { 
      icon: UserCheck, 
      title: "Đội ngũ chuyên nghiệp", 
      desc: "100% điều dưỡng viên có chứng chỉ hành nghề, được đào tạo bài bản và giàu kinh nghiệm.",
      details: ["100% có chứng chỉ hành nghề Y tế", "Nhiều năm kinh nghiệm lâm sàng", "Đào tạo y đức và kỹ năng giao tiếp tốt"]
    },
    { 
      icon: Clock, 
      title: "Tiết kiệm thời gian", 
      desc: "Không cần xếp hàng chờ đợi ở bệnh viện, dịch vụ đến tận nơi giúp bạn an tâm nghỉ ngơi.",
      details: ["Không mất thời gian di chuyển, chờ đợi", "Phục vụ ngay tại nhà nhanh chóng", "Linh hoạt sắp xếp theo lịch trình gia đình"]
    },
    { 
      icon: ShieldCheck, 
      title: "Đảm bảo an toàn", 
      desc: "Tuân thủ nghiêm ngặt quy trình vô khuẩn, kiểm soát nhiễm khuẩn theo tiêu chuẩn của Bộ Y tế.",
      details: ["Dụng cụ y tế được tiệt trùng 100%", "Quy trình chăm sóc vô khuẩn khép kín", "Xử lý rác thải y tế đúng quy định"]
    },
    { 
      icon: Activity, 
      title: "Cập nhật liên tục", 
      desc: "Theo dõi sát sao sinh hiệu và báo cáo tình trạng bệnh nhân thường xuyên cho bác sĩ/gia đình.",
      details: ["Ghi chép hồ sơ theo dõi chi tiết", "Báo cáo sinh hiệu hàng ngày cho bác sĩ", "Thông báo kịp thời cho người nhà"]
    },
    { 
      icon: Pill, 
      title: "Phục vụ mọi lúc", 
      desc: "Hỗ trợ linh hoạt theo giờ, theo ngày hoặc chăm sóc dài hạn 24/7 tùy nhu cầu của gia đình.",
      details: ["Tổng đài hỗ trợ trực 24/7 không ngày nghỉ", "Chăm sóc theo ca hoặc toàn thời gian", "Phản ứng nhanh trong tình huống khẩn cấp"]
    },
  ];
  return (
    <section className="py-20 sm:py-24 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Vì sao chọn chúng tôi" title="Sức khỏe của bạn là ưu tiên hàng đầu" subtitle="Lý do hàng ngàn gia đình tin tưởng giao phó người thân cho dịch vụ điều dưỡng tại nhà của chúng tôi." />
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it) => (
            <div key={it.title} className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card hover:shadow-soft hover:-translate-y-1 transition-all duration-300">
              <div className="grid h-12 w-12 place-items-center rounded-xl gradient-sky text-primary-foreground shadow-soft group-hover:scale-110 transition-transform">
                <it.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-bold">{it.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{it.desc}</p>
              
              <div className="mt-6 pt-6 border-t border-border/50 flex-1">
                <ul className="space-y-3">
                  {it.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-muted-foreground/90">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span className="leading-snug">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services({ onOpenBooking }: { onOpenBooking: (service?: string) => void }) {
  const services = [
    { icon: Syringe, title: "Tiêm thuốc, truyền dịch", desc: "Thực hiện tiêm bắp, tiêm tĩnh mạch, truyền nước biển, đạm theo chỉ định của bác sĩ." },
    { icon: Bandage, title: "Thay băng, cắt chỉ", desc: "Vệ sinh vết thương, thay băng gạc vô khuẩn, cắt chỉ vết mổ đúng kỹ thuật, mau lành." },
    { icon: Stethoscope, title: "Khám bệnh tại nhà", desc: "Bác sĩ đến tận nơi thăm khám, chẩn đoán, kê đơn thuốc và tư vấn điều trị hiệu quả." },
    { icon: Activity, title: "Chăm sóc người bệnh", desc: "Hỗ trợ vệ sinh cá nhân, ăn uống, xoay trở chống loét, vật lý trị liệu cơ bản." },
    { icon: Baby, title: "Chăm sóc mẹ và bé", desc: "Tắm bé chuẩn y khoa, massage cho mẹ, vệ sinh vết khâu/vết mổ sau sinh." },
    { icon: HeartPulse, title: "Đặt ống thông", desc: "Thực hiện các thủ thuật như đặt ống thông dạ dày, ống thông tiểu an toàn tại nhà." },
  ];
  return (
    <section id="services" className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Dịch vụ tiêu biểu" title="Chăm sóc y tế toàn diện tại nhà" subtitle="Chúng tôi cung cấp đa dạng các dịch vụ điều dưỡng, đáp ứng mọi nhu cầu y tế cho gia đình bạn." />
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <article key={i} className="group flex flex-col rounded-2xl overflow-hidden border border-border bg-card p-6 shadow-card hover:shadow-soft hover:-translate-y-1 transition-all duration-300">
              <div className="grid h-14 w-14 place-items-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <s.icon className="h-7 w-7" />
              </div>
              <div className="mt-6 flex-1 flex flex-col">
                <h3 className="text-xl font-semibold leading-snug">{s.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                <div className="mt-auto pt-6 flex items-center justify-between">
                  <a href="tel:0915205115" className="text-sm font-semibold text-primary flex items-center gap-1 hover:gap-2 transition-all">
                    Tư vấn ngay <ArrowRight className="h-4 w-4" />
                  </a>
                  <button onClick={() => onOpenBooking("homecare")} className="text-sm font-semibold text-primary flex items-center gap-1 hover:opacity-80 transition-opacity">
                    Đặt lịch ngay <ClipboardList className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { 
      icon: PhoneCall, 
      title: "Liên hệ & Tư vấn", 
      desc: "Gọi hotline hoặc để lại thông tin. Chúng tôi sẽ tư vấn dịch vụ phù hợp nhất.",
      details: ["Tiếp nhận yêu cầu 24/7", "Tư vấn gói dịch vụ phù hợp", "Giải đáp thắc mắc chuyên môn"]
    },
    { 
      icon: ClipboardList, 
      title: "Đánh giá tình trạng", 
      desc: "Đội ngũ y tế trao đổi chi tiết về bệnh lý, hồ sơ sức khỏe và nhu cầu chăm sóc.",
      details: ["Phân tích hồ sơ bệnh án", "Đánh giá nhu cầu người bệnh", "Lên phác đồ chăm sóc riêng"]
    },
    { 
      icon: Ambulance, 
      title: "Đến tận nhà", 
      desc: "Điều dưỡng viên mang theo trang thiết bị y tế đến đúng giờ, đúng địa điểm.",
      details: ["Có mặt đúng giờ hẹn", "Chuẩn bị đầy đủ dụng cụ vô trùng", "Tác phong chuyên nghiệp, chuẩn y khoa"]
    },
    { 
      icon: CheckCircle2, 
      title: "Tiến hành chăm sóc", 
      desc: "Thực hiện thủ thuật chuyên môn, theo dõi diễn biến và báo cáo cho gia đình.",
      details: ["Thực hiện thủ thuật nhẹ nhàng", "Theo dõi sinh hiệu liên tục", "Báo cáo chi tiết cho bác sĩ/người nhà"]
    },
  ];
  return (
    <section id="howitworks" className="py-20 sm:py-24 bg-gradient-to-b from-secondary/40 to-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Quy trình làm việc" title="4 bước tiếp nhận đơn giản" subtitle="Nhanh chóng, minh bạch và chuyên nghiệp để mang dịch vụ y tế đến tận cửa nhà bạn." />
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5 relative">
          {steps.map((s, i) => (
            <div key={i} className="relative rounded-2xl border border-border bg-card p-6 shadow-card hover:shadow-soft transition-all flex flex-col h-full">
              <div className="absolute -top-3 -right-3 grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground text-sm font-bold shadow-soft">
                {i + 1}
              </div>
              <div className="grid h-12 w-12 place-items-center rounded-xl gradient-sky text-primary-foreground shadow-soft">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground pb-4 border-b border-border/50">{s.desc}</p>
              
              <ul className="mt-4 space-y-2.5 flex-1">
                {s.details?.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    try {
      const response = await fetch("https://formsubmit.co/ajax/Hoangphihai1984bp@gmail.com", {
        method: "POST", body: formData, headers: { 'Accept': 'application/json' }
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
        <SectionHeading eyebrow="Liên hệ đặt lịch" title="Đăng ký dịch vụ điều dưỡng" subtitle="Điền thông tin vào biểu mẫu, bộ phận y tế của chúng tôi sẽ liên hệ lại ngay để xác nhận." />
        <div className="mt-12 grid lg:grid-cols-5 gap-6">
          <form onSubmit={onSubmit} className="lg:col-span-3 rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-card">
            <input type="hidden" name="_subject" value="Khách đặt lịch: Điều dưỡng tại nhà" />
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Họ và Tên người bệnh/người nhà" name="name" placeholder="Nguyễn Văn A" required />
              <Field label="Số điện thoại liên hệ" name="phone" type="tel" placeholder="0915..." required />
              <div className="sm:col-span-2">
                <Field label="Địa chỉ cần đến chăm sóc" name="address" placeholder="Số nhà, tên đường, khu vực..." required enableLocation />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium mb-1.5">Dịch vụ cần đăng ký</label>
                <select name="service_type" className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition">
                  <option value="Thay băng cắt chỉ">Thay băng, cắt chỉ</option>
                  <option value="Tiêm truyền">Tiêm thuốc, truyền dịch</option>
                  <option value="Chăm sóc người bệnh">Chăm sóc người bệnh dài ngày</option>
                  <option value="Đặt ống thông">Đặt ống thông / Chăm sóc sau mổ</option>
                  <option value="Khác">Dịch vụ khác (tư vấn thêm)</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium mb-1.5">Mô tả tình trạng bệnh (Tùy chọn)</label>
                <textarea name="message" rows={4} placeholder="Xin vui lòng mô tả chi tiết tình trạng hiện tại để chúng tôi chuẩn bị dụng cụ tốt nhất..." className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition" />
              </div>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-full gradient-sky px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft hover:scale-[1.02] transition-transform">
                Gửi đăng ký <ArrowRight className="h-4 w-4" />
              </button>
              <a href="tel:0915205115" className="inline-flex items-center justify-center gap-2 rounded-full bg-emergency px-6 py-3 text-sm font-semibold text-emergency-foreground shadow-soft hover:scale-[1.02] transition-transform">
                <PhoneCall className="h-4 w-4" /> Trực tiếp gọi hotline
              </a>
            </div>
            {sent && (
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-3 text-sm text-primary animate-fade-in">
                <CheckCircle2 className="h-4 w-4" /> Đã gửi yêu cầu. Y tá trưởng sẽ sớm gọi lại cho bạn.
              </div>
            )}
          </form>

          <div className="lg:col-span-2 flex flex-col gap-4">
            <InfoCard icon={PhoneCall} title="Đường dây nóng hỗ trợ" lines={["0915 205 115"]} />
            <InfoCard icon={Mail} title="Email" lines={["Hoangphihai1984bp@gmail.com"]} />
            <InfoCard icon={MapPin} title="Địa chỉ văn phòng" lines={["11 Hẻm 922 Phường", "Đồng Xoài, Tp.Đồng Nai"]} />
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

function InfoCard({ icon: Icon, title, lines }: { icon: any; title: string; lines: string[] }) {
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

function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2">
              <div className="grid h-10 w-10 place-items-center rounded-xl gradient-sky text-primary-foreground shadow-soft">
                <HeartPulse className="h-5 w-5" />
              </div>
              <div className="font-display text-lg font-bold">Cấp cứu 115 <span className="text-primary whitespace-nowrap">Hồng Hải</span></div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Dịch vụ chăm sóc y tế và điều dưỡng tại nhà chuyên nghiệp, tận tâm, phục vụ 24/7.
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
              <li><a href="/" className="hover:text-primary transition">Trở về trang chủ xe cấp cứu</a></li>
              <li>Thay băng, cắt chỉ</li>
              <li>Tiêm thuốc, truyền dịch</li>
              <li>Chăm sóc sau mổ</li>
              <li>Tư vấn sức khỏe</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Liên hệ</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><PhoneCall className="h-4 w-4 text-primary" /> 0915205115</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> Hoangphihai1984bp@gmail.com</li>
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> 11 Hẻm 922 Phường, Đồng Xoài, Tp.Đồng Nai</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row gap-3 items-center justify-between text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Dịch vụ Y tế Hồng Hải. Đã đăng ký bản quyền.</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary">Bảo mật</a>
            <a href="#" className="hover:text-primary">Điều khoản</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FloatingActions() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      <a
        href="tel:0915205115"
        aria-label="Gọi tư vấn"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-emergency text-emergency-foreground shadow-[0_4px_20px_rgba(239,68,68,0.4)] hover:opacity-90 transition-all hover:scale-110"
      >
        <span className="absolute inset-0 rounded-full bg-emergency animate-ping opacity-60" />
        <Phone className="h-6 w-6 relative z-10" />
        <span className="absolute right-full mr-3 whitespace-nowrap rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none">
          Gọi ngay
        </span>
      </a>

      <a
        href="https://zalo.me/0915205115"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Nhắn tin Zalo"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#0068FF] text-white shadow-[0_4px_20px_rgba(0,104,255,0.3)] hover:bg-[#0055D4] transition-all hover:scale-110"
      >
        <MessageCircle className="h-6 w-6 relative z-10" />
        <span className="absolute right-full mr-3 whitespace-nowrap rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none">
          Zalo
        </span>
      </a>

      <a
        href="https://maps.google.com/?q=11+Hẻm+922+Phường+Đồng+Xoài+Tp.Đồng+Nai"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chỉ đường"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-slate-800 text-white shadow-lg hover:bg-slate-700 transition-all hover:scale-110"
      >
        <MapPin className="h-6 w-6 relative z-10" />
        <span className="absolute right-full mr-3 whitespace-nowrap rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none">
          Chỉ đường
        </span>
      </a>
    </div>
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
    <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Trở lên đầu trang" className="fixed bottom-6 left-6 z-40 grid h-11 w-11 place-items-center rounded-full bg-card border border-border shadow-card hover:bg-primary hover:text-primary-foreground transition animate-fade-in">
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}

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

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
  enableLocation,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  enableLocation?: boolean;
}) {
  const [loadingLoc, setLoadingLoc] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Trình duyệt không hỗ trợ định vị.");
      return;
    }
    setLoadingLoc(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&zoom=18&addressdetails=1`);
          const data = await res.json();
          if (data && data.display_name && inputRef.current) {
            inputRef.current.value = data.display_name;
          } else if (inputRef.current) {
            inputRef.current.value = `${pos.coords.latitude}, ${pos.coords.longitude}`;
          }
        } catch (e) {
          if (inputRef.current) {
            inputRef.current.value = `${pos.coords.latitude}, ${pos.coords.longitude}`;
          }
        } finally {
          setLoadingLoc(false);
        }
      },
      (err) => {
        setLoadingLoc(false);
        alert("Không thể lấy vị trí. Vui lòng cho phép quyền truy cập vị trí.");
      }
    );
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-1.5">{label}</label>
      <div className="relative">
        <input
          ref={inputRef}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          className={`w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition ${enableLocation ? 'pr-12' : ''}`}
        />
        {enableLocation && (
          <button
            type="button"
            onClick={handleGetLocation}
            disabled={loadingLoc}
            title="Lấy vị trí hiện tại của tôi"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-primary hover:bg-primary/10 rounded-lg transition-colors disabled:opacity-50"
          >
            {loadingLoc ? <Loader2 className="h-5 w-5 animate-spin" /> : <MapPin className="h-5 w-5" />}
          </button>
        )}
      </div>
    </div>
  );
}

function BookingModal({
  isOpen,
  onClose,
  initialService,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}) {
  const [sent, setSent] = useState(false);

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
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formsubmit.co/ajax/Hoangphihai1984bp@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          "Loại form": "Yêu cầu dịch vụ",
          "Họ và tên": formData.get("Ho_Ten"),
          "Số điện thoại": formData.get("So_Dien_Thoai"),
          "Địa chỉ": formData.get("Dia_Chi"),
          "Tình trạng bệnh": formData.get("Tinh_Trang_Benh"),
          "Loại dịch vụ": formData.get("Loai_Dich_Vu"),

          _subject: "🚑 Yêu cầu dịch vụ mới từ website Hồng Hải",
          _captcha: "false",
          _template: "table",
        }),
      });

      if (!response.ok) throw new Error("Gửi thất bại");

      setSent(true);
      setTimeout(() => {
        setSent(false);
        onClose();
      }, 3000);
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra khi gửi yêu cầu. Vui lòng thử lại sau hoặc gọi trực tiếp Hotline.");
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
            <Ambulance className="h-5 w-5 text-primary" />
            Yêu cầu dịch vụ
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
              <h3 className="text-xl font-bold">Gửi thành công!</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Chúng tôi đã nhận được yêu cầu. Tổng đài viên sẽ gọi lại cho bạn ngay lập tức.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              <Field label="Họ và Tên" name="Ho_Ten" placeholder="Nguyễn Văn A" required />
              <Field label="Số điện thoại" name="So_Dien_Thoai" type="tel" placeholder="090 123 4567" required />
              <Field label="Địa chỉ" name="Dia_Chi" placeholder="123 Đường ABC, Quận X" required enableLocation />
              <Field label="Tình trạng bệnh" name="Tinh_Trang_Benh" placeholder="Mô tả ngắn gọn tình trạng bệnh nhân..." />

              <input type="hidden" name="Loai_Dich_Vu" value="Điều dưỡng tại nhà" />

              <div className="pt-4">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl gradient-sky px-6 py-3.5 text-base font-bold text-primary-foreground shadow-soft hover:opacity-95 transition-all duration-300"
                >
                  Gửi yêu cầu <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
