import { useState, useEffect } from 'react';
import { Menu, X, PhoneCall, CalendarDays, Ambulance } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export function Navbar({ alwaysDark = false, onOpenBooking, subtitle, navItems }: { alwaysDark?: boolean; onOpenBooking?: () => void; subtitle?: string; navItems: { label: string, href: string }[] }) {
  const [scrolled, setScrolled] = useState(alwaysDark || false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (alwaysDark) return;
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [alwaysDark]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || alwaysDark ? "bg-slate-950/90 backdrop-blur-xl border-b border-white/10 shadow-2xl" : "bg-transparent"}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-20 items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="grid h-11 w-11 place-items-center rounded-xl gradient-sky text-white shadow-soft transition-transform group-hover:scale-105">
              <Ambulance className="h-6 w-6" />
            </div>
            <div className="leading-tight">
              <div className="font-display text-lg sm:text-xl font-bold text-white">Cấp cứu 115 <span className="text-primary whitespace-nowrap">Hồng Hải</span></div>
              <div className="text-[11px] sm:text-xs text-white/60 -mt-0.5">{subtitle || 'Dịch vụ cấp cứu chuyên nghiệp 24/7'}</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="px-4 py-2 text-sm font-semibold text-white/80 hover:text-white rounded-lg transition-colors relative group"
              >
                {n.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-4/5" />
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:0915205115"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-bold text-white shadow-soft hover:bg-white/10 transition-colors"
            >
              <PhoneCall className="h-4 w-4 text-primary animate-pulse" />
              0915 205 115
            </a>
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 rounded-full gradient-sky px-6 py-2.5 text-sm font-bold text-white shadow-soft hover:opacity-90 transition-all hover:-translate-y-0.5"
            >
              <CalendarDays className="h-4 w-4" />
              Đặt lịch ngay
            </button>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-white/10 bg-slate-950/95 backdrop-blur-xl animate-fade-in shadow-2xl">
          <div className="px-4 py-6 flex flex-col gap-3">
            {navItems.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="px-4 py-3 rounded-xl text-base font-semibold text-white/90 hover:bg-white/10 transition-colors"
              >
                {n.label}
              </a>
            ))}
            <a
              href="tel:0915205115"
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 border border-white/20 px-4 py-4 text-base font-bold text-white"
            >
              <PhoneCall className="h-5 w-5 text-primary" /> 0915 205 115
            </a>
            <button
              onClick={() => {
                setOpen(false);
                onOpenBooking?.();
              }}
              className="inline-flex items-center justify-center gap-2 rounded-xl gradient-sky px-4 py-4 text-base font-bold text-white shadow-lg"
            >
              <CalendarDays className="h-5 w-5" /> Đặt lịch ngay
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
