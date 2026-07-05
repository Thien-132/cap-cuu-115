import { useState, useEffect, useRef } from 'react';
import { Bell } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { getBookingRequests, BookingRequest } from '@/lib/adminStore';

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [newRequests, setNewRequests] = useState<BookingRequest[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchRequests = () => {
      const allReqs = getBookingRequests();
      const newOnly = allReqs.filter(r => r.status === 'new');
      setNewRequests(newOnly);
    };

    fetchRequests();
    window.addEventListener('admin_store_update', fetchRequests);
    return () => window.removeEventListener('admin_store_update', fetchRequests);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const timeAgo = (dateStr: string) => {
    const diff = Math.floor((new Date().getTime() - new Date(dateStr).getTime()) / 60000); // in minutes
    if (diff < 1) return 'Vừa xong';
    if (diff < 60) return `${diff} phút trước`;
    const hours = Math.floor(diff / 60);
    if (hours < 24) return `${hours} giờ trước`;
    return `${Math.floor(hours / 24)} ngày trước`;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setOpen(!open)}
        className="relative p-2.5 rounded-full hover:bg-secondary/80 transition-colors focus:outline-none"
        aria-label="Thông báo"
      >
        <Bell className="h-6 w-6 text-muted-foreground" />
        {newRequests.length > 0 && (
          <span className="absolute top-1.5 right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-emergency text-[10px] font-bold text-white shadow-sm ring-2 ring-background animate-pulse">
            {newRequests.length > 9 ? '9+' : newRequests.length}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 max-h-[80vh] overflow-y-auto rounded-2xl bg-card border border-border shadow-xl z-50 animate-in slide-in-from-top-2 fade-in">
          <div className="p-4 border-b border-border sticky top-0 bg-card/95 backdrop-blur z-10 flex items-center justify-between">
            <h3 className="font-bold text-foreground">Thông báo</h3>
            <span className="text-xs font-medium text-muted-foreground">{newRequests.length} tin mới</span>
          </div>
          
          <div className="flex flex-col">
            {newRequests.length === 0 ? (
              <div className="p-6 text-center text-sm text-muted-foreground">
                Không có thông báo mới.
              </div>
            ) : (
              newRequests.map(req => (
                <Link
                  key={req.id}
                  to="/admin/yeu-cau"
                  onClick={() => setOpen(false)}
                  className="p-4 border-b border-border hover:bg-secondary/50 transition-colors flex flex-col gap-1 last:border-0"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-foreground">{req.name}</span>
                    <span className="text-xs text-primary font-medium">{timeAgo(req.createdAt)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Vừa yêu cầu dịch vụ <span className="font-medium text-foreground">{req.serviceType}</span>
                  </p>
                </Link>
              ))
            )}
          </div>
          
          {newRequests.length > 0 && (
            <div className="p-2 border-t border-border sticky bottom-0 bg-card">
              <Link 
                to="/admin/yeu-cau" 
                onClick={() => setOpen(false)}
                className="block w-full text-center py-2 text-xs font-semibold text-primary hover:bg-primary/10 rounded-lg transition-colors"
              >
                Xem tất cả yêu cầu
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
