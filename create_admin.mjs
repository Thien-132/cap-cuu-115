import fs from 'fs';
import path from 'path';

const adminDir = 'd:/cap-cuu-115/src/routes/admin';
if (!fs.existsSync(adminDir)) {
  fs.mkdirSync(adminDir, { recursive: true });
}

// 1. admin.tsx (Layout)
const adminLayout = `import { createFileRoute, Outlet, Link, useLocation } from '@tanstack/react-router';
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
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col hidden md:flex fixed inset-y-0 z-10">
        <div className="p-6">
          <Link to="/" className="text-xl font-bold flex items-center gap-2 text-primary">
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
                className={\`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors \${
                  active ? 'bg-primary text-white font-medium shadow-soft' : 'text-slate-400 hover:bg-white/10 hover:text-white'
                }\`}
              >
                <Icon className="h-5 w-5" />
                {m.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white transition-colors">
            <LogOut className="h-5 w-5" /> Về trang chủ
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 bg-slate-50 min-h-screen">
        <div className="md:hidden bg-slate-900 text-white p-4 flex items-center justify-between">
          <div className="font-bold">Admin Panel</div>
          <Link to="/" className="text-sm">Về trang chủ</Link>
        </div>
        <div className="p-6 md:p-10 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
`;
fs.writeFileSync('d:/cap-cuu-115/src/routes/admin.tsx', adminLayout);

// 2. admin/index.tsx (Dashboard)
const adminIndex = `import { createFileRoute } from '@tanstack/react-router';
import { Users, Ambulance, Inbox, TrendingUp } from 'lucide-react';
import { getBookingRequests } from '@/lib/adminStore';
import { useState, useEffect } from 'react';

export const Route = createFileRoute('/admin/')({
  component: Dashboard,
});

function StatCard({ title, value, icon: Icon, colorClass }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
      <div className={\`h-12 w-12 rounded-xl flex items-center justify-center \${colorClass}\`}>
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <p className="text-sm text-slate-500 font-medium">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
      </div>
    </div>
  );
}

function Dashboard() {
  const [stats, setStats] = useState({ totalReq: 0, newReq: 0 });

  useEffect(() => {
    const update = () => {
      const reqs = getBookingRequests();
      setStats({
        totalReq: reqs.length,
        newReq: reqs.filter(r => r.status === 'new').length
      });
    };
    update();
    window.addEventListener('new_booking_request', update);
    return () => window.removeEventListener('new_booking_request', update);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-8">Tổng quan</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Tổng yêu cầu" value={stats.totalReq} icon={Inbox} colorClass="bg-blue-50 text-blue-600" />
        <StatCard title="Yêu cầu mới" value={stats.newReq} icon={TrendingUp} colorClass="bg-emerald-50 text-emerald-600" />
        <StatCard title="Xe đang trực" value="5" icon={Ambulance} colorClass="bg-purple-50 text-purple-600" />
        <StatCard title="Nhân viên" value="12" icon={Users} colorClass="bg-orange-50 text-orange-600" />
      </div>
      
      <div className="mt-10 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-lg font-bold mb-4 text-slate-800">Biểu đồ giả định</h2>
        <div className="h-64 bg-slate-50 rounded-xl flex items-center justify-center border border-dashed border-slate-200">
          <p className="text-slate-400">Tích hợp Chart.js hoặc Recharts ở đây</p>
        </div>
      </div>
    </div>
  );
}
`;
fs.writeFileSync(path.join(adminDir, 'index.tsx'), adminIndex);

// 3. admin/yeu-cau.tsx
const adminYeuCau = `import { createFileRoute } from '@tanstack/react-router';
import { getBookingRequests, updateBookingStatus, BookingRequest } from '@/lib/adminStore';
import { useState, useEffect } from 'react';

export const Route = createFileRoute('/admin/yeu-cau')({
  component: RequestsPage,
});

const STATUS_COLORS = {
  new: 'bg-emerald-100 text-emerald-700',
  processing: 'bg-blue-100 text-blue-700',
  completed: 'bg-slate-100 text-slate-700',
  cancelled: 'bg-red-100 text-red-700'
};

function RequestsPage() {
  const [requests, setRequests] = useState<BookingRequest[]>([]);

  useEffect(() => {
    const fetchReqs = () => setRequests(getBookingRequests());
    fetchReqs();
    window.addEventListener('new_booking_request', fetchReqs);
    return () => window.removeEventListener('new_booking_request', fetchReqs);
  }, []);

  const handleStatus = (id: string, st: any) => {
    updateBookingStatus(id, st);
    setRequests(getBookingRequests());
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-8">Quản lý Yêu cầu dịch vụ</h1>
      
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 font-medium">Khách hàng</th>
                <th className="px-6 py-4 font-medium">Dịch vụ</th>
                <th className="px-6 py-4 font-medium">Chi tiết</th>
                <th className="px-6 py-4 font-medium">Ngày tạo</th>
                <th className="px-6 py-4 font-medium">Trạng thái</th>
                <th className="px-6 py-4 font-medium">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {requests.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-8 text-center text-slate-500">Chưa có yêu cầu nào</td></tr>
              ) : requests.map((req) => (
                <tr key={req.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-900">{req.name}</div>
                    <div className="text-slate-500">{req.phone}</div>
                    <div className="text-slate-400 text-xs mt-1">{req.address}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-md bg-sky-50 text-sky-700 font-medium">{req.serviceType}</span>
                  </td>
                  <td className="px-6 py-4 text-slate-600 max-w-xs truncate">{req.details || '-'}</td>
                  <td className="px-6 py-4 text-slate-500">{new Date(req.createdAt).toLocaleString('vi-VN')}</td>
                  <td className="px-6 py-4">
                    <span className={\`px-2.5 py-1 rounded-full text-xs font-semibold \${STATUS_COLORS[req.status as keyof typeof STATUS_COLORS]}\`}>
                      {req.status === 'new' ? 'Mới' : req.status === 'processing' ? 'Đang xử lý' : req.status === 'completed' ? 'Hoàn thành' : 'Đã hủy'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      className="border border-slate-200 rounded-lg text-sm px-2 py-1 outline-none focus:border-primary"
                      value={req.status}
                      onChange={(e) => handleStatus(req.id, e.target.value)}
                    >
                      <option value="new">Mới</option>
                      <option value="processing">Đang xử lý</option>
                      <option value="completed">Hoàn thành</option>
                      <option value="cancelled">Hủy</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
`;
fs.writeFileSync(path.join(adminDir, 'yeu-cau.tsx'), adminYeuCau);

// 4. admin/quan-ly-xe.tsx
const adminQuanLyXe = `import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/quan-ly-xe')({
  component: VehiclesPage,
});

function VehiclesPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Quản lý Xe cấp cứu</h1>
        <button className="bg-primary text-white px-4 py-2 rounded-xl font-medium hover:opacity-90">Thêm xe mới</button>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 text-center text-slate-500">
        Tính năng đang được phát triển...
      </div>
    </div>
  );
}
`;
fs.writeFileSync(path.join(adminDir, 'quan-ly-xe.tsx'), adminQuanLyXe);

// 5. admin/dieu-duong.tsx
const adminDieuDuong = `import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/dieu-duong')({
  component: NursesPage,
});

function NursesPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Quản lý Điều dưỡng</h1>
        <button className="bg-primary text-white px-4 py-2 rounded-xl font-medium hover:opacity-90">Thêm nhân sự</button>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 text-center text-slate-500">
        Tính năng đang được phát triển...
      </div>
    </div>
  );
}
`;
fs.writeFileSync(path.join(adminDir, 'dieu-duong.tsx'), adminDieuDuong);

// 6. admin/doanh-thu.tsx
const adminDoanhThu = `import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/doanh-thu')({
  component: RevenuePage,
});

function RevenuePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-8">Báo cáo Doanh thu</h1>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 text-center text-slate-500">
        Tính năng đang được phát triển...
      </div>
    </div>
  );
}
`;
fs.writeFileSync(path.join(adminDir, 'doanh-thu.tsx'), adminDoanhThu);

console.log('Successfully created Admin pages.');
