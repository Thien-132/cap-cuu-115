import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { BookingModal } from '@/components/common/BookingModal';
import { FloatingActions } from '@/components/common/FloatingActions';
import { BackToTop } from '@/components/common/BackToTop';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Ambulance, CheckCircle2 } from 'lucide-react';
import imgService from '@/assets/service-emergency.jpg';

export const Route = createFileRoute('/cap-cuu-khan-cap')({
  head: () => ({
    meta: [
      { title: 'Cấp cứu khẩn cấp — Cấp cứu 115 Hồng Hải' },
      { name: 'description', content: 'Dịch vụ cấp cứu 24/7, phản ứng nhanh với xe cứu thương hiện đại.' },
    ],
  }),
  component: PageComponent,
});

const NAV = [
  { label: 'Trang chủ', href: '/' },
  { label: 'Dịch vụ', href: '/#services' },
  { label: 'Về chúng tôi', href: '/ve-chung-toi' },
  { label: 'Bảng giá', href: '/bang-gia' },
  { label: 'Liên hệ', href: '/#contact' },
];

function PageComponent() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar onOpenBooking={() => setBookingOpen(true)} subtitle="Cấp cứu khẩn cấp" navItems={NAV} />
      <main className="pt-32 pb-16 min-h-[80vh]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading eyebrow="Dịch vụ" title="Cấp cứu khẩn cấp" subtitle="Dịch vụ cấp cứu 24/7, phản ứng nhanh với xe cứu thương hiện đại." />
              <ul className="mt-8 space-y-4">
                {[
                  'Đội ngũ y tế chuyên nghiệp, tận tâm',
                  'Trang thiết bị hiện đại, chuẩn quốc tế',
                  'Phục vụ 24/7 không ngày nghỉ',
                  'Chi phí minh bạch, hợp lý'
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
              <img src={imgService} alt="Cấp cứu khẩn cấp" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </main>
      <Footer navItems={NAV} />
      <FloatingActions />
      <BackToTop />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}
