import { useState, useEffect } from "react";
import { Menu, X, PhoneCall, CalendarDays, Ambulance } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Navbar({
  alwaysDark = false,
  onOpenBooking,
  subtitle,
  navItems,
}: {
  alwaysDark?: boolean;
  onOpenBooking?: () => void;
  subtitle?: string;
  navItems: { label: string; href: string }[];
}) {
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || alwaysDark
          ? "bg-slate-950/90 backdrop-blur-md border-b border-slate-800 shadow-md py-3"
          : "bg-slate-950/40 backdrop-blur-sm border-b border-white/10 py-4"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-sky-600 text-white shadow-md transition-transform group-hover:scale-105">
              <Ambulance className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <div className="font-display text-lg sm:text-xl font-bold text-white tracking-tight">
                Cấp cứu 115 <span className="text-sky-400">Hồng Hải</span>
              </div>
              <div className="text-[11px] sm:text-xs text-slate-300 font-medium">
                {subtitle || "Dịch vụ cấp cứu & vận chuyển y tế 24/7"}
              </div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="px-3.5 py-2 text-sm font-medium text-slate-200 hover:text-white rounded-lg transition-colors hover:bg-white/10"
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:0915205115"
              className="inline-flex items-center gap-2 rounded-xl bg-red-600 hover:bg-red-700 px-4.5 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:shadow-red-600/30"
            >
              <PhoneCall className="h-4 w-4" />
              0915 205 115
            </a>
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 rounded-xl bg-sky-600 hover:bg-sky-700 px-4.5 py-2.5 text-sm font-semibold text-white shadow-md transition-all"
            >
              <CalendarDays className="h-4 w-4" />
              Đặt lịch trước
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
        <div className="lg:hidden border-t border-slate-800 bg-slate-950/95 backdrop-blur-xl animate-fade-in shadow-xl">
          <div className="px-4 py-5 flex flex-col gap-2.5">
            {navItems.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-200 hover:bg-white/10"
              >
                {n.label}
              </a>
            ))}
            <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
              <a
                href="tel:0915205115"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-bold text-white shadow-md"
              >
                <PhoneCall className="h-4 w-4" /> Hotline: 0915 205 115 (24/7)
              </a>
              <button
                onClick={() => {
                  setOpen(false);
                  onOpenBooking?.();
                }}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white shadow-md"
              >
                <CalendarDays className="h-4 w-4" /> Đặt Lịch Trước Ngay
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
