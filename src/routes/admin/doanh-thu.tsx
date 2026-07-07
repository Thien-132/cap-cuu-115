import { createFileRoute } from '@tanstack/react-router';
import { getBookingRequests } from '@/lib/adminStore';
import { useState, useEffect, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Wallet, CheckCircle2 } from 'lucide-react';

export const Route = createFileRoute('/admin/doanh-thu')({
  component: RevenuePage,
});

function RevenuePage() {
  const [requests, setRequests] = useState(getBookingRequests());
  const [timeFilter, setTimeFilter] = useState<'all' | 'today' | 'month' | 'year' | 'custom'>('all');
  const [customDate, setCustomDate] = useState('');

  useEffect(() => {
    const fetchR = () => setRequests(getBookingRequests());
    window.addEventListener('admin_store_update', fetchR);
    return () => window.removeEventListener('admin_store_update', fetchR);
  }, []);

  const { totalRevenue, completedCount, chartData } = useMemo(() => {
    let rev = 0;
    let completed = 0;
    const dailyMap: Record<string, number> = {};

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    const currentDate = now.getDate();

    requests.forEach(req => {
      if (req.status === 'completed' && req.price) {
        const reqDate = new Date(req.createdAt);
        
        let include = true;
        if (timeFilter === 'today') {
          include = reqDate.getFullYear() === currentYear && reqDate.getMonth() === currentMonth && reqDate.getDate() === currentDate;
        } else if (timeFilter === 'month') {
          include = reqDate.getFullYear() === currentYear && reqDate.getMonth() === currentMonth;
        } else if (timeFilter === 'year') {
          include = reqDate.getFullYear() === currentYear;
        } else if (timeFilter === 'custom' && customDate) {
          const cDate = new Date(customDate);
          include = reqDate.getFullYear() === cDate.getFullYear() && reqDate.getMonth() === cDate.getMonth() && reqDate.getDate() === cDate.getDate();
        } else if (timeFilter === 'custom' && !customDate) {
          include = true; // Show all if no date selected yet
        }

        if (include) {
          rev += req.price;
          completed += 1;
          
          // aggregate by day
          const day = reqDate.toLocaleDateString('vi-VN', { month: '2-digit', day: '2-digit' });
          dailyMap[day] = (dailyMap[day] || 0) + req.price;
        }
      }
    });

    const cData = Object.keys(dailyMap).sort().map(k => ({
      name: k,
      total: dailyMap[k]
    }));

    // Fill dummy data if empty for demo, but only if we haven't filtered to a specific time that intentionally has no data
    if (cData.length === 0 && timeFilter === 'all' && requests.length === 0) {
      cData.push(
        { name: '10/10', total: 1500000 },
        { name: '11/10', total: 3200000 },
        { name: '12/10', total: 2000000 },
        { name: '13/10', total: 4500000 }
      );
    }

    return { 
      totalRevenue: rev || ((timeFilter === 'all' || (timeFilter === 'custom' && !customDate)) && requests.length === 0 ? 11200000 : 0), 
      completedCount: completed || ((timeFilter === 'all' || (timeFilter === 'custom' && !customDate)) && requests.length === 0 ? 4 : 0), 
      chartData: cData 
    };
  }, [requests, timeFilter, customDate]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold font-display tracking-tight">Báo cáo Doanh thu</h1>
        <div className="flex items-center gap-3">
          {timeFilter === 'custom' && (
            <input 
              type="date"
              value={customDate}
              onChange={(e) => setCustomDate(e.target.value)}
              className="border border-border bg-card rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-medium text-foreground"
            />
          )}
          <select 
            value={timeFilter} 
            onChange={(e) => setTimeFilter(e.target.value as any)}
            className="border border-border bg-card rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-medium"
          >
            <option value="all">Tất cả thời gian</option>
            <option value="today">Hôm nay</option>
            <option value="month">Tháng này</option>
            <option value="year">Năm nay</option>
            <option value="custom">Tùy chọn ngày</option>
          </select>
        </div>
      </div>
      
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="bg-card rounded-[2rem] border border-border shadow-card p-8 flex items-center gap-6">
          <div className="h-16 w-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 shadow-sm border border-emerald-100">
            <Wallet className="h-8 w-8" />
          </div>
          <div>
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Tổng Doanh Thu</p>
            <h2 className="text-3xl font-bold font-display text-foreground mt-1">{totalRevenue.toLocaleString('vi-VN')} đ</h2>
          </div>
        </div>

        <div className="bg-card rounded-[2rem] border border-border shadow-card p-8 flex items-center gap-6">
          <div className="h-16 w-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 shadow-sm border border-primary/20">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <div>
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Hoàn Thành</p>
            <h2 className="text-3xl font-bold font-display text-foreground mt-1">{completedCount} <span className="whitespace-nowrap text-lg font-medium text-muted-foreground lowercase tracking-normal">Chuyến xe</span></h2>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-[2rem] border border-border shadow-card p-6 mt-8 h-96">
        <h3 className="text-lg font-bold font-display flex items-center gap-2 mb-6">
          <TrendingUp className="h-5 w-5 text-primary" /> Biểu đồ Doanh thu (Theo ngày)
        </h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
            <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{fill: 'hsl(var(--muted-foreground))', fontSize: 12}} dy={10} />
            <YAxis 
              tickFormatter={(value) => `${value / 1000000}M`}
              tickLine={false} 
              axisLine={false} 
              tick={{fill: 'hsl(var(--muted-foreground))', fontSize: 12}} 
              dx={-10}
            />
            <Tooltip 
              cursor={{fill: 'hsl(var(--secondary))'}}
              contentStyle={{ borderRadius: '1rem', border: '1px solid hsl(var(--border))', boxShadow: 'var(--shadow-card)' }}
              formatter={(value: number) => [`${value.toLocaleString('vi-VN')} VNĐ`, 'Doanh thu']}
            />
            <Bar dataKey="total" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
