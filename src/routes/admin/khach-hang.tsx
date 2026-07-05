import { createFileRoute } from '@tanstack/react-router';
import { getPhoneHistory, togglePhoneBlock, PhoneHistory } from '@/lib/adminStore';
import { useState, useEffect } from 'react';
import { ShieldAlert, ShieldCheck } from 'lucide-react';

export const Route = createFileRoute('/admin/khach-hang')({
  component: CustomersPage,
});

function CustomersPage() {
  const [history, setHistory] = useState<PhoneHistory[]>([]);

  useEffect(() => {
    const fetchHistory = () => setHistory(getPhoneHistory());
    fetchHistory();
    window.addEventListener('admin_store_update', fetchHistory);
    return () => window.removeEventListener('admin_store_update', fetchHistory);
  }, []);

  const handleToggleBlock = (phone: string, currentStatus: boolean) => {
    const msg = currentStatus
      ? `Bạn muốn MỞ KHÓA số điện thoại ${phone}?`
      : `Bạn muốn CHẶN số điện thoại ${phone} (Sẽ không thể đặt lịch online)?`;
    if (confirm(msg)) {
      togglePhoneBlock(phone, !currentStatus);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-display tracking-tight">Khách hàng / Lịch sử SĐT</h1>
      
      <div className="bg-card rounded-[2rem] border border-border shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-secondary/40 text-muted-foreground border-b border-border">
              <tr>
                <th className="px-6 py-4 font-semibold">Số điện thoại</th>
                <th className="px-6 py-4 font-semibold text-center">Hoàn thành</th>
                <th className="px-6 py-4 font-semibold text-center">Đã hủy</th>
                <th className="px-6 py-4 font-semibold text-center">Báo giả</th>
                <th className="px-6 py-4 font-semibold text-center">Trạng thái chặn</th>
                <th className="px-6 py-4 font-semibold text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {history.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">Chưa có dữ liệu khách hàng.</td></tr>
              ) : history.map((record) => (
                <tr key={record.phone} className="hover:bg-secondary/20 transition-colors">
                  <td className="px-6 py-4 font-semibold text-foreground">
                    {record.phone}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 font-medium text-xs">
                      {record.totalBookings}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-medium text-xs">
                      {record.cancellations}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-full font-medium text-xs ${record.fakeReports > 0 ? 'bg-red-50 text-red-600' : 'bg-secondary/50 text-muted-foreground'}`}>
                      {record.fakeReports}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {record.isBlocked ? (
                      <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 font-bold text-xs">Đang bị chặn</span>
                    ) : (
                      <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs">Bình thường</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleToggleBlock(record.phone, record.isBlocked)} 
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${record.isBlocked ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' : 'bg-red-50 text-red-600 hover:bg-red-100'}`}
                    >
                      {record.isBlocked ? (
                        <><ShieldCheck className="w-3.5 h-3.5" /> Mở khóa</>
                      ) : (
                        <><ShieldAlert className="w-3.5 h-3.5" /> Chặn</>
                      )}
                    </button>
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
