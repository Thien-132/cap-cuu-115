import { createFileRoute } from '@tanstack/react-router';
import { getNurses, saveNurse, deleteNurse, Nurse } from '@/lib/adminStore';
import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, X, PhoneCall } from 'lucide-react';

export const Route = createFileRoute('/admin/dieu-duong')({
  component: NursesPage,
});

function NursesPage() {
  const [nurses, setNurses] = useState<Nurse[]>([]);
  const [editItem, setEditItem] = useState<Nurse | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchN = () => setNurses(getNurses());
    fetchN();
    window.addEventListener('admin_store_update', fetchN);
    return () => window.removeEventListener('admin_store_update', fetchN);
  }, []);

  const openNew = () => {
    setEditItem({ id: Math.random().toString(36).substring(2,9), name: '', role: 'Điều dưỡng', phone: '', status: 'active' });
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editItem) {
      saveNurse(editItem);
      setModalOpen(false);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Xóa nhân sự này?")) deleteNurse(id);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold font-display tracking-tight">Nhân sự Y tế</h1>
        <button onClick={openNew} className="whitespace-nowrap flex-shrink-0 gradient-sky text-primary-foreground px-5 py-2.5 rounded-2xl font-semibold shadow-soft hover:opacity-90 flex items-center gap-2">
          <Plus className="h-5 w-5" /> Thêm nhân sự
        </button>
      </div>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {nurses.map((n) => (
          <div key={n.id} className="bg-card rounded-[2rem] border border-border shadow-card p-6 flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg font-display text-foreground">{n.name}</h3>
                <p className="text-sm text-primary font-medium bg-primary/10 inline-block px-2 py-0.5 rounded-md mt-1">{n.role}</p>
              </div>
              <span className={`w-3 h-3 rounded-full ${n.status === 'active' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-slate-300'}`}></span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium bg-secondary/50 p-3 rounded-xl">
              <PhoneCall className="h-4 w-4" /> {n.phone}
            </div>
            <div className="flex justify-end gap-2 mt-2 pt-4 border-t border-border">
              <button onClick={() => { setEditItem(n); setModalOpen(true); }} className="text-sm font-semibold text-primary hover:bg-primary/10 px-4 py-2 rounded-xl transition-colors">Sửa</button>
              <button onClick={() => handleDelete(n.id)} className="text-sm font-semibold text-emergency hover:bg-emergency/10 px-4 py-2 rounded-xl transition-colors">Xóa</button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && editItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <form onSubmit={handleSave} className="bg-card w-full max-w-md rounded-3xl border border-border shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-border bg-secondary/30">
              <h3 className="text-xl font-bold font-display">Thông tin Nhân sự</h3>
              <button type="button" onClick={() => setModalOpen(false)} className="p-2 rounded-full hover:bg-secondary">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Họ và tên</label>
                <input required value={editItem.name} onChange={e => setEditItem({...editItem, name: e.target.value})} className="w-full border border-border bg-background rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Chức vụ</label>
                <select value={editItem.role} onChange={e => setEditItem({...editItem, role: e.target.value})} className="w-full border border-border bg-background rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                  <option>Điều dưỡng</option>
                  <option>Bác sĩ</option>
                  <option>Tài xế</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Số điện thoại</label>
                <input required value={editItem.phone} onChange={e => setEditItem({...editItem, phone: e.target.value})} className="w-full border border-border bg-background rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Trạng thái</label>
                <select value={editItem.status} onChange={e => setEditItem({...editItem, status: e.target.value as any})} className="w-full border border-border bg-background rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                  <option value="active">Đang làm việc</option>
                  <option value="inactive">Nghỉ phép/Nghỉ việc</option>
                </select>
              </div>
              <button type="submit" className="whitespace-nowrap flex-shrink-0 w-full mt-4 gradient-sky text-primary-foreground rounded-2xl py-3 font-bold hover:opacity-90">Lưu lại</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
