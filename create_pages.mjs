import fs from 'fs';
import path from 'path';

const routesDir = 'd:/cap-cuu-115/src/routes';

const genericPageTemplate = (routeName, title, desc, icon) => `import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { BookingModal } from '@/components/common/BookingModal';
import { FloatingActions } from '@/components/common/FloatingActions';
import { BackToTop } from '@/components/common/BackToTop';
import { SectionHeading } from '@/components/common/SectionHeading';
import { ${icon}, CheckCircle2 } from 'lucide-react';

export const Route = createFileRoute('/${routeName}')({
  head: () => ({
    meta: [
      { title: '${title} — Cấp cứu 115 Hồng Hải' },
      { name: 'description', content: '${desc}' },
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
      <Navbar onOpenBooking={() => setBookingOpen(true)} subtitle="${title}" navItems={NAV} />
      <main className="pt-32 pb-16 min-h-[80vh]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading eyebrow="Dịch vụ" title="${title}" subtitle="${desc}" />
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
              <${icon} className="w-48 h-48 text-primary/20" />
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
`;

// 1. /cap-cuu-khan-cap
fs.writeFileSync(path.join(routesDir, 'cap-cuu-khan-cap.tsx'), genericPageTemplate('cap-cuu-khan-cap', 'Cấp cứu khẩn cấp', 'Dịch vụ cấp cứu 24/7, phản ứng nhanh với xe cứu thương hiện đại.', 'Ambulance'));

// 2. /van-chuyen-y-te
fs.writeFileSync(path.join(routesDir, 'van-chuyen-y-te.tsx'), genericPageTemplate('van-chuyen-y-te', 'Vận chuyển y tế', 'Đưa đón bệnh nhân chuyển tuyến, ra viện, đi khám bệnh an toàn.', 'Ambulance'));

// 3. /icu-hoi-suc
fs.writeFileSync(path.join(routesDir, 'icu-hoi-suc.tsx'), genericPageTemplate('icu-hoi-suc', 'Xe Cứu Thương ICU', 'Xe cứu thương trang bị máy thở, monitor chuẩn hồi sức tích cực.', 'Ambulance'));

// 4. /ve-chung-toi
fs.writeFileSync(path.join(routesDir, 've-chung-toi.tsx'), genericPageTemplate('ve-chung-toi', 'Về chúng tôi', 'Giới thiệu về trung tâm Cấp cứu 115 Hồng Hải.', 'CheckCircle2'));

// 5. /bang-gia
fs.writeFileSync(path.join(routesDir, 'bang-gia.tsx'), genericPageTemplate('bang-gia', 'Bảng giá dịch vụ', 'Bảng giá cước vận chuyển và dịch vụ y tế minh bạch.', 'CheckCircle2'));

// 6. /tin-tuc
fs.writeFileSync(path.join(routesDir, 'tin-tuc.tsx'), genericPageTemplate('tin-tuc', 'Tin tức & Sơ cứu', 'Cẩm nang sơ cứu và tin tức y khoa hữu ích.', 'CheckCircle2'));

// 7. /lien-he
fs.writeFileSync(path.join(routesDir, 'lien-he.tsx'), genericPageTemplate('lien-he', 'Liên hệ', 'Thông tin liên hệ của trung tâm Cấp cứu 115 Hồng Hải.', 'CheckCircle2'));

console.log('Successfully created all static pages.');
