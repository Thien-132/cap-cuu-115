import { createFileRoute, Link } from '@tanstack/react-router';
import { Users, Ambulance, Inbox, TrendingUp, ArrowRight, Clock, MapPin, Activity, CheckCircle2 } from 'lucide-react';
import { getBookingRequests, getAmbulances, getNurses, BookingRequest, Ambulance as IAmbulance } from '@/lib/adminStore';
import { useState, useEffect } from 'react';

export const Route = createFileRoute('/admin/')({
  component: Dashboard,
});

function StatCard({ title, value, icon: Icon, colorClass, gradientClass }: any) {
  return (
    <div className="bg-card p-6 rounded-[2rem] shadow-card border border-border flex items-center gap-5 hover:-translate-y-1 transition-transform cursor-default">
      <div className={`h-14 w-14 rounded-2xl flex items-center justify-center text-white shadow-soft shrink-0 ${gradientClass}`}>
        <Icon className="h-7 w-7" />
      </div>
      <div>
        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{title}</p>
        <h3 className="text-3xl font-bold font-display text-foreground mt-1">{value}</h3>
      </div>
    </div>
  );
}

function Dashboard() {
  const [stats, setStats] = useState({ totalReq: 0, newReq: 0, amb: 0, nur: 0 });
  const [recentReqs, setRecentReqs] = useState<BookingRequest[]>([]);
  const [fleetStatus, setFleetStatus] = useState({ available: 0, inUse: 0, maintenance: 0 });

  useEffect(() => {
    const update = () => {
      const reqs = getBookingRequests();
      const ambs = getAmbulances();
      setStats({
        totalReq: reqs.length,
        newReq: reqs.filter(r => r.status === 'new').length,
        amb: ambs.length,
        nur: getNurses().length
      });
      setRecentReqs(reqs.slice(0, 5));
      setFleetStatus({
        available: ambs.filter(a => a.status === 'available').length,
        inUse: ambs.filter(a => a.status === 'in_use').length,
        maintenance: ambs.filter(a => a.status === 'maintenance').length,
      });
    };
    update();
    window.addEventListener('admin_store_update', update);
    return () => window.removeEventListener('admin_store_update', update);
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold font-display tracking-tight text-foreground mb-8">Bảng điều khiển</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Tổng yêu cầu" value={stats.totalReq} icon={Inbox} gradientClass="bg-gradient-to-br from-blue-400 to-blue-600" />
        <StatCard title="Yêu cầu mới" value={stats.newReq} icon={TrendingUp} gradientClass="bg-gradient-to-br from-emerald-400 to-emerald-600" />
        <StatCard title="Xe cấp cứu" value={stats.amb} icon={Ambulance} gradientClass="gradient-sky" />
        <StatCard title="Nhân viên" value={stats.nur} icon={Users} gradientClass="bg-gradient-to-br from-purple-400 to-purple-600" />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
        
        {/* Cột 1: Yêu cầu mới nhất (Chiếm 2 phần) */}
        <div className="lg:col-span-2 bg-card rounded-[2rem] shadow-card border border-border p-8 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold font-display flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" /> 
              Yêu cầu mới nhất
            </h2>
            <Link to="/admin/yeu-cau" className="text-sm font-semibold text-primary hover:text-primary/80 flex items-center gap-1 transition-colors">
              Xem tất cả <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="flex-1">
            {recentReqs.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-10 opacity-70">
                <Inbox className="h-10 w-10 text-muted-foreground mb-3 opacity-50" />
                <p className="text-muted-foreground">Chưa có yêu cầu nào gần đây.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentReqs.map(req => (
                  <div key={req.id} className="flex items-center justify-between p-4 rounded-2xl bg-secondary/30 border border-border/50 hover:bg-secondary/50 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className={`mt-1 h-2.5 w-2.5 rounded-full shrink-0 ${req.status === 'new' ? 'bg-emergency animate-pulse' : req.status === 'processing' ? 'bg-blue-500' : 'bg-emerald-500'}`} />
                      <div>
                        <p className="font-bold text-foreground">{req.name} <span className="text-muted-foreground font-normal ml-2">{req.phone}</span></p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-1">
                          <MapPin className="h-3.5 w-3.5" /> {req.address}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{new Date(req.createdAt).toLocaleDateString('vi-VN')}</span>
                      <p className="text-sm font-medium mt-1 text-primary">{req.serviceType}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Cột 2: Tình trạng đội xe (Chiếm 1 phần) */}
        <div className="bg-card rounded-[2rem] shadow-card border border-border p-8 flex flex-col">
          <h2 className="text-xl font-bold font-display flex items-center gap-2 mb-6">
            <Activity className="h-5 w-5 text-emerald-500" /> 
            Tình trạng Đội xe
          </h2>
          
          <div className="space-y-6 flex-1">
            <div className="p-5 rounded-2xl border border-emerald-200 bg-emerald-50/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <span className="font-semibold text-emerald-900">Sẵn sàng</span>
              </div>
              <span className="text-2xl font-bold font-display text-emerald-600">{fleetStatus.available}</span>
            </div>

            <div className="p-5 rounded-2xl border border-blue-200 bg-blue-50/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                  <Ambulance className="h-5 w-5" />
                </div>
                <span className="font-semibold text-blue-900">Đang làm nhiệm vụ</span>
              </div>
              <span className="text-2xl font-bold font-display text-blue-600">{fleetStatus.inUse}</span>
            </div>

            <div className="p-5 rounded-2xl border border-amber-200 bg-amber-50/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                  <Activity className="h-5 w-5" />
                </div>
                <span className="font-semibold text-amber-900">Bảo trì</span>
              </div>
              <span className="text-2xl font-bold font-display text-amber-600">{fleetStatus.maintenance}</span>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-border">
            <Link to="/admin/quan-ly-xe" className="w-full py-3 rounded-xl bg-secondary text-foreground font-semibold hover:bg-secondary/80 transition-colors flex items-center justify-center gap-2">
              Quản lý đội xe
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
