import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { BookingModal } from "@/components/common/BookingModal";
import { FloatingActions } from "@/components/common/FloatingActions";
import { BackToTop } from "@/components/common/BackToTop";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Wind, CheckCircle2 } from "lucide-react";
import imgService from "@/assets/dich-vu-oxy.jpg";

export const Route = createFileRoute("/dich-vu-oxy")({
  head: () => ({
    meta: [
      { title: "Dịch vụ Oxy tận nhà — Cấp cứu 115 Hồng Hải" },
      {
        name: "description",
        content:
          "Cung cấp, cho thuê bình oxy, máy tạo oxy tận nhà nhanh chóng, an toàn, phục vụ 24/7.",
      },
    ],
  }),
  component: PageComponent,
});

const NAV = [
  { label: "Trang chủ", href: "/" },
  { label: "Dịch vụ", href: "/#services" },
  { label: "Về chúng tôi", href: "/ve-chung-toi" },
  { label: "Bảng giá", href: "/bang-gia" },
  { label: "Liên hệ", href: "/#contact" },
];

function PageComponent() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar
        alwaysDark
        onOpenBooking={() => setBookingOpen(true)}
        subtitle="Dịch vụ Oxy tận nhà"
        navItems={NAV}
      />
      <main className="pt-32 pb-16 min-h-[80vh]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading
                eyebrow="Dịch vụ"
                title="Oxy tận nhà 24/7"
                subtitle="Cung cấp, cho thuê bình oxy, máy tạo oxy tận nhà nhanh chóng, an toàn."
              />
              <ul className="mt-8 space-y-4">
                {[
                  "Bình oxy sạch, kiểm định an toàn nghiêm ngặt",
                  "Đa dạng thể tích bình và máy tạo oxy",
                  "Giao hàng và lắp đặt tận nhà nhanh chóng",
                  "Hỗ trợ kỹ thuật và y tế 24/7",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setBookingOpen(true)}
                className="mt-10 inline-flex items-center justify-center gap-2 rounded-2xl gradient-sky px-8 py-4 text-base font-bold text-primary-foreground shadow-lg hover:opacity-90 transition-all"
              >
                Đặt lịch dịch vụ ngay
              </button>
            </div>
            <div className="bg-secondary/30 rounded-3xl flex items-center justify-center h-[400px] border border-border overflow-hidden">
              <img src={imgService} alt="Oxy tận nhà" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </main>
      <Footer navItems={NAV} />
      <FloatingActions />
      <BackToTop />
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        initialService="oxygen"
      />
    </div>
  );
}
