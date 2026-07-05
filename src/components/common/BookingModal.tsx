import { useState, useEffect } from 'react';
import { sendEmailAction } from "@/lib/actions";
import { Ambulance, X, CheckCircle2, ArrowRight } from 'lucide-react';
import { Field } from './Field';
import { addBookingRequest } from '@/lib/adminStore';

export function BookingModal({
  isOpen,
  onClose,
  initialService,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string | null;
}) {
  const [sent, setSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: formData.get("Ho_Ten") as string,
      phone: formData.get("So_Dien_Thoai") as string,
      address: formData.get("Dia_Chi") as string,
      details: formData.get("Tinh_Trang_Benh") as string,
      serviceType: formData.get("Loai_Dich_Vu") as string || initialService || 'Chưa rõ',
    };

    setErrorMsg(null);
    
    try {
      // Save to local store for Admin Dashboard
      await addBookingRequest(data);
      console.log('Saved request to adminStore', data);
    } catch (e: any) {
      if (e.message === 'BLOCKED_PHONE') {
        setErrorMsg("Số điện thoại của bạn đã bị hạn chế do có nhiều báo cáo ảo. Vui lòng liên hệ Hotline 0915 205 115 để được hỗ trợ.");
        return;
      }
    }

    try {
      await sendEmailAction({
        data: {
          name: data.name,
          phone: data.phone,
          address: data.address,
          condition: data.details || "",
          serviceType: data.serviceType,
          type: "booking",
        }
      });

      setSent(true);
      setTimeout(() => {
        setSent(false);
        onClose();
      }, 3000);
    } catch (error) {
      console.error(error);
      // Still show success since it saved to admin store locally
      setSent(true);
      setTimeout(() => {
        setSent(false);
        onClose();
      }, 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg rounded-3xl bg-card border border-border shadow-card overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-secondary/30">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Ambulance className="h-5 w-5 text-primary" />
            Yêu cầu dịch vụ
          </h2>
          <button
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-full bg-background border border-border hover:bg-secondary transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-6">
          {sent ? (
            <div className="flex flex-col items-center justify-center py-10 text-center animate-in fade-in">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Gửi thành công!</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Chúng tôi đã nhận được yêu cầu. Tổng đài viên sẽ gọi lại cho bạn ngay lập tức.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              {errorMsg && (
                <div className="rounded-xl bg-destructive/10 p-4 text-sm text-destructive border border-destructive/20 flex gap-2 items-start">
                  <X className="h-5 w-5 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}
              <Field label="Họ và Tên" name="Ho_Ten" placeholder="Nguyễn Văn A" required />
              <Field label="Số điện thoại" name="So_Dien_Thoai" type="tel" placeholder="090 123 4567" required />
              <Field label="Địa chỉ" name="Dia_Chi" placeholder="123 Đường ABC, Quận X" required enableLocation />
              <Field label="Tình trạng bệnh" name="Tinh_Trang_Benh" placeholder="Mô tả ngắn gọn tình trạng bệnh nhân..." />

              <div className="pt-2">
                <label className="block text-sm font-medium mb-3">Loại dịch vụ</label>
                <div className="grid grid-cols-3 gap-3">
                  {["Khẩn cấp", "Chuyển viện", "Điều dưỡng"].map((type) => (
                    <label
                      key={type}
                      className="flex cursor-pointer items-center justify-center text-center rounded-xl border border-border bg-secondary/50 px-2 py-2.5 text-sm font-medium hover:bg-secondary transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5 has-[:checked]:text-primary"
                    >
                      <input
                        type="radio"
                        name="Loai_Dich_Vu"
                        value={type}
                        className="sr-only"
                        defaultChecked={
                          (!initialService && type === "Khẩn cấp") ||
                          (initialService === "emergency" && type === "Khẩn cấp") ||
                          (initialService === "transport" && type === "Chuyển viện") ||
                          (initialService === "homecare" && type === "Điều dưỡng") ||
                          (initialService === "icu" && type === "Khẩn cấp")
                        }
                      />
                      {type}
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl gradient-sky px-6 py-3.5 text-base font-bold text-primary-foreground shadow-soft hover:opacity-95 transition-all duration-300"
                >
                  Gửi yêu cầu <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
