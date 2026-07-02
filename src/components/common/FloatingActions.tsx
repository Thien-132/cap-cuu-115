import { Phone, MessageCircle, MapPin } from 'lucide-react';

export function FloatingActions() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      <a
        href="tel:0915205115"
        aria-label="Gọi ngay"
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
