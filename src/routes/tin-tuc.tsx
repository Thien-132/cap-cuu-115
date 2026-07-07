import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { BookingModal } from '@/components/common/BookingModal';
import { FloatingActions } from '@/components/common/FloatingActions';
import { BackToTop } from '@/components/common/BackToTop';
import { SectionHeading } from '@/components/common/SectionHeading';
import { CheckCircle2 } from 'lucide-react';

export const Route = createFileRoute('/tin-tuc')({
  head: () => ({
    meta: [
      { title: 'Tin tức & Sơ cứu — Cấp cứu 115 Hồng Hải' },
      { name: 'description', content: 'Cẩm nang sơ cứu và tin tức y khoa hữu ích.' },
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
      <Navbar alwaysDark onOpenBooking={() => setBookingOpen(true)} subtitle="Tin tức & Sơ cứu" navItems={NAV} />
      <main className="pt-32 pb-16 min-h-[80vh]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading eyebrow="Dịch vụ" title="Tin tức & Sơ cứu" subtitle="Cẩm nang sơ cứu và tin tức y khoa hữu ích." />
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
            <div className="bg-secondary/30 rounded-3xl p-10 flex items-center justify-center min-h-[400px] border border-border">
              <CheckCircle2 className="w-48 h-48 text-primary/20" />
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
