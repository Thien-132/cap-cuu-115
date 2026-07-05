import { createFileRoute } from '@tanstack/react-router';
import { getBookingRequests, updateBookingStatus, deleteBookingRequest, BookingRequest } from '@/lib/adminStore';
import { useState, useEffect } from 'react';
import { Trash2, Edit, Eye, X } from 'lucide-react';

export const Route = createFileRoute('/admin/yeu-cau')({
  component: RequestsPage,
});

const STATUS_COLORS = {
  new: 'bg-emergency/10 text-emergency border-emergency/20',
  processing: 'bg-blue-50 text-blue-600 border-blue-200',
  completed: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  cancelled: 'bg-slate-100 text-slate-600 border-slate-200',
  fake: 'bg-red-50 text-red-600 border-red-200'
};

function RequestsPage() {
  const [requests, setRequests] = useState<BookingRequest[]>([]);
  const [viewReq, setViewReq] = useState<BookingRequest | null>(null);

  useEffect(() => {
    const fetchReqs = () => setRequests(getBookingRequests());
    fetchReqs();
    window.addEventListener('admin_store_update', fetchReqs);
    return () => window.removeEventListener('admin_store_update', fetchReqs);
  }, []);

  const handleStatus = (id: string, st: any) => {
    // If completing, maybe ask for price
    let price = undefined;
    if (st === 'completed') {
      const p = prompt("Nhập số tiền thu được (VNĐ):", "1500000");
      if (p !== null) {
        price = parseInt(p.replace(/\D/g, '')) || 0;
      } else {
        return; // Cancelled
      }
    }
    updateBookingStatus(id, st, price);
  };

  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa yêu cầu này?')) {
      deleteBookingRequest(id);
      if (viewReq?.id === id) setViewReq(null);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-display tracking-tight">Yêu cầu dịch vụ</h1>
      
      <div className="bg-card rounded-[2rem] border border-border shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-secondary/40 text-muted-foreground border-b border-border">
              <tr>
                <th className="px-6 py-4 font-semibold">Khách hàng</th>
                <th className="px-6 py-4 font-semibold">Dịch vụ</th>
                <th className="px-6 py-4 font-semibold">Ngày tạo</th>
                <th className="px-6 py-4 font-semibold">Trạng thái</th>
                <th className="px-6 py-4 font-semibold text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {requests.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">Chưa có yêu cầu nào.</td></tr>
              ) : requests.map((req) => (
                <tr key={req.id} className="hover:bg-secondary/20 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-foreground">{req.name}</div>
                    <div className="text-muted-foreground">{req.phone}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-xs border border-primary/20">
                      {req.serviceType}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {new Date(req.createdAt).toLocaleString('vi-VN')}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      className={`border rounded-xl text-xs px-3 py-1.5 outline-none focus:ring-2 focus:ring-primary/20 transition-colors font-medium ${STATUS_COLORS[req.status as keyof typeof STATUS_COLORS]} ${req.status === 'completed' ? 'opacity-90 cursor-not-allowed appearance-none pr-4' : ''}`}
                      value={req.status}
                      disabled={req.status === 'completed'}
                      onChange={(e) => handleStatus(req.id, e.target.value)}
                    >
                      <option value="new">Mới</option>
                      <option value="processing">Đang xử lý</option>
                      <option value="completed">Hoàn thành</option>
                      <option value="cancelled">Hủy</option>
                      <option value="fake">Báo giả</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button onClick={() => setViewReq(req)} className="p-2 rounded-xl hover:bg-secondary text-primary transition-colors" title="Xem chi tiết">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button onClick={() => handleDelete(req.id)} className="p-2 rounded-xl hover:bg-emergency/10 text-emergency transition-colors" title="Xóa">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {viewReq && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="bg-card w-full max-w-lg rounded-3xl border border-border shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between p-6 border-b border-border bg-secondary/30">
              <h3 className="text-xl font-bold font-display">Chi tiết yêu cầu</h3>
              <button onClick={() => setViewReq(null)} className="p-2 rounded-full hover:bg-secondary text-muted-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 space-y-4 text-sm">
              <div className="grid grid-cols-3 gap-4 border-b border-border pb-4">
                <div className="text-muted-foreground">Khách hàng</div>
                <div className="col-span-2 font-medium">{viewReq.name}</div>
              </div>
              <div className="grid grid-cols-3 gap-4 border-b border-border pb-4">
                <div className="text-muted-foreground">Điện thoại</div>
                <div className="col-span-2 font-medium">{viewReq.phone}</div>
              </div>
              <div className="grid grid-cols-3 gap-4 border-b border-border pb-4">
                <div className="text-muted-foreground">Dịch vụ</div>
                <div className="col-span-2 font-medium">{viewReq.serviceType}</div>
              </div>
              <div className="grid grid-cols-3 gap-4 border-b border-border pb-4">
                <div className="text-muted-foreground">Địa chỉ</div>
                <div className="col-span-2 font-medium">{viewReq.address}</div>
              </div>
              <div className="grid grid-cols-3 gap-4 border-b border-border pb-4">
                <div className="text-muted-foreground">Chi tiết thêm</div>
                <div className="col-span-2">{viewReq.details || '-'}</div>
              </div>
              {viewReq.price && (
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-muted-foreground">Doanh thu</div>
                  <div className="col-span-2 font-bold text-emerald-600">{viewReq.price.toLocaleString('vi-VN')} VNĐ</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
