import { createFileRoute, Outlet, Link, useLocation } from '@tanstack/react-router';
import { LayoutDashboard, Inbox, Ambulance, Users, BadgeDollarSign, LogOut } from 'lucide-react';

export const Route = createFileRoute('/admin')({
  component: AdminLayout,
});

const MENU = [
  { label: 'Tổng quan', href: '/admin', icon: LayoutDashboard },
  { label: 'Yêu cầu', href: '/admin/yeu-cau', icon: Inbox },
  { label: 'Quản lý xe', href: '/admin/quan-ly-xe', icon: Ambulance },
  { label: 'Điều dưỡng', href: '/admin/dieu-duong', icon: Users },
  { label: 'Doanh thu', href: '/admin/doanh-thu', icon: BadgeDollarSign },
];

function AdminLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-950 text-white flex-col hidden md:flex fixed inset-y-0 z-10 border-r border-white/10 shadow-2xl">
        <div className="p-6">
          <Link to="/" className="text-xl font-bold font-display flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
            <Ambulance className="h-6 w-6" />
            Admin Panel
          </Link>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          {MENU.map((m) => {
            const Icon = m.icon;
            const active = location.pathname === m.href;
            return (
              <Link
                key={m.href}
                to={m.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 font-medium ${
                  active 
                    ? 'gradient-sky text-primary-foreground shadow-[0_4px_20px_rgba(14,165,233,0.3)]' 
                    : 'text-white/60 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="h-5 w-5" />
                {m.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/10">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 text-white/60 hover:text-white hover:bg-white/10 rounded-2xl transition-all font-medium">
            <LogOut className="h-5 w-5" /> Về trang chủ
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 bg-secondary/40 min-h-screen">
        <div className="md:hidden bg-slate-950 text-white p-4 flex items-center justify-between border-b border-white/10 shadow-md sticky top-0 z-20">
          <div className="font-bold font-display flex items-center gap-2 text-primary">
            <Ambulance className="h-5 w-5" /> Admin Panel
          </div>
          <Link to="/" className="text-sm text-white/60 hover:text-white">Về trang chủ</Link>
        </div>
        
        {/* Mobile Navigation */}
        <div className="md:hidden bg-card border-b border-border p-2 overflow-x-auto flex gap-2 shadow-sm sticky top-[60px] z-20">
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

        <div className="p-4 sm:p-6 md:p-10 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
