import { createFileRoute } from "@tanstack/react-router";
import { getAmbulances, saveAmbulance, deleteAmbulance, Ambulance } from "@/lib/adminStore";
import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, X } from "lucide-react";

export const Route = createFileRoute("/admin/quan-ly-xe")({
  component: VehiclesPage,
});

function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Ambulance[]>([]);
  const [editItem, setEditItem] = useState<Ambulance | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchV = () => setVehicles(getAmbulances());
    fetchV();
    window.addEventListener("admin_store_update", fetchV);
    return () => window.removeEventListener("admin_store_update", fetchV);
  }, []);

  const openNew = () => {
    setEditItem({
      id: Math.random().toString(36).substring(2, 9),
      licensePlate: "",
      type: "Xe cấp cứu tiêu chuẩn",
      status: "available",
    });
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editItem) {
      saveAmbulance(editItem);
      setModalOpen(false);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Xóa xe này?")) deleteAmbulance(id);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold font-display tracking-tight">Quản lý Xe cấp cứu</h1>
        <button
          onClick={openNew}
          className="whitespace-nowrap flex-shrink-0 gradient-sky text-primary-foreground px-5 py-2.5 rounded-2xl font-semibold shadow-soft hover:opacity-90 flex items-center gap-2"
        >
          <Plus className="h-5 w-5" /> Thêm xe
        </button>
      </div>

      <div className="bg-card rounded-[2rem] border border-border shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-secondary/40 text-muted-foreground border-b border-border">
              <tr>
                <th className="whitespace-nowrap px-6 py-4 font-semibold">Biển số xe</th>
                <th className="whitespace-nowrap px-6 py-4 font-semibold">Loại xe</th>
                <th className="whitespace-nowrap px-6 py-4 font-semibold">Trạng thái</th>
                <th className="whitespace-nowrap px-6 py-4 font-semibold text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {vehicles.map((v) => (
                <tr key={v.id} className="hover:bg-secondary/20 transition-colors">
                  <td className="whitespace-nowrap px-6 py-4 font-bold text-foreground text-base tracking-wider">
                    {v.licensePlate}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 font-medium">{v.type}</td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold border ${v.status === "available" ? "bg-emerald-50 text-emerald-600 border-emerald-200" : v.status === "in_use" ? "bg-blue-50 text-blue-600 border-blue-200" : "bg-red-50 text-red-600 border-red-200"}`}
                    >
                      {v.status === "available"
                        ? "Sẵn sàng"
                        : v.status === "in_use"
                          ? "Đang trực"
                          : "Bảo trì"}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setEditItem(v);
                          setModalOpen(true);
                        }}
                        className="p-2 rounded-xl hover:bg-secondary text-primary transition-colors"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(v.id)}
                        className="p-2 rounded-xl hover:bg-emergency/10 text-emergency transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && editItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <form
            onSubmit={handleSave}
            className="bg-card w-full max-w-md rounded-3xl border border-border shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between p-6 border-b border-border bg-secondary/30">
              <h3 className="text-xl font-bold font-display">Thông tin Xe</h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-full hover:bg-secondary"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Biển số xe</label>
                <input
                  required
                  value={editItem.licensePlate}
                  onChange={(e) => setEditItem({ ...editItem, licensePlate: e.target.value })}
                  className="w-full border border-border bg-background rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Loại xe</label>
                <select
                  value={editItem.type}
                  onChange={(e) => setEditItem({ ...editItem, type: e.target.value })}
                  className="w-full border border-border bg-background rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option>Xe cấp cứu tiêu chuẩn</option>
                  <option>Xe cứu thương ICU</option>
                  <option>Xe chuyển viện</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Trạng thái</label>
                <select
                  value={editItem.status}
                  onChange={(e) => setEditItem({ ...editItem, status: e.target.value as any })}
                  className="w-full border border-border bg-background rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="available">Sẵn sàng</option>
                  <option value="in_use">Đang trực</option>
                  <option value="maintenance">Bảo trì</option>
                </select>
              </div>
              <button
                type="submit"
                className="whitespace-nowrap flex-shrink-0 w-full mt-4 gradient-sky text-primary-foreground rounded-2xl py-3 font-bold hover:opacity-90"
              >
                Lưu lại
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
