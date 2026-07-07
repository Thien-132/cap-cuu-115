import { createFileRoute, Outlet, Link, useLocation } from '@tanstack/react-router';
import { LayoutDashboard, Inbox, Ambulance, Users, BadgeDollarSign, LogOut, Phone } from 'lucide-react';
import { NotificationBell } from '@/components/admin/NotificationBell';

export const Route = createFileRoute('/admin')({
  component: AdminLayout,
});

const MENU = [
  { label: 'Tổng quan', href: '/admin', icon: LayoutDashboard },
  { label: 'Yêu cầu', href: '/admin/yeu-cau', icon: Inbox },
  { label: 'Khách hàng', href: '/admin/khach-hang', icon: Phone },
  { label: 'Quản lý xe', href: '/admin/quan-ly-xe', icon: Ambulance },
  { label: 'Điều dưỡng', href: '/admin/dieu-duong', icon: Users },
  { label: 'Doanh thu', href: '/admin/doanh-thu', icon: BadgeDollarSign },
];

function AdminLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center">
      <div className="w-full max-w-[480px] min-h-screen bg-secondary/40 text-foreground font-sans flex flex-col shadow-2xl relative bg-background">
        
        {/* Header */}
        <div className="bg-slate-950 text-white p-4 flex items-center justify-between border-b border-white/10 shadow-md sticky top-0 z-20">
          <div className="font-bold font-display flex items-center gap-2 text-primary">
            <Ambulance className="h-5 w-5" /> Admin Panel
          </div>
          <div className="flex items-center gap-4">
            <NotificationBell />
            <Link to="/" className="text-sm text-white/60 hover:text-white">Thoát</Link>
          </div>
        </div>
        
        {/* Navigation */}
        <div className="bg-card border-b border-border p-2 overflow-x-auto flex gap-2 shadow-sm sticky top-[60px] z-20 no-scrollbar">
           {MENU.map((m) => {
            const Icon = m.icon;
            const active = location.pathname === m.href;
            return (
              <Link
                key={m.href}
                to={m.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all whitespace-nowrap text-sm font-medium ${
                  active 
                    ? 'gradient-sky text-primary-foreground shadow-sm' 
                    : 'text-muted-foreground hover:bg-secondary'
                }`}
              >
                <Icon className="h-4 w-4" />
                {m.label}
              </Link>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 pb-12 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
