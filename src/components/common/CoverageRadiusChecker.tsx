import { useState, useRef } from "react";
import {
  MapPin,
  Navigation,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Loader2,
  Ambulance,
  HeartPulse,
  Truck,
  Compass,
} from "lucide-react";
import {
  validateGpsRequest,
  geocodeAddressSmart,
  DISPATCH_CENTER,
  SERVICE_LIMITS_KM,
  FREE_PICKUP_RADIUS_KM,
  ServiceType,
} from "@/lib/gpsValidation";

const SERVICE_OPTIONS: { id: ServiceType; label: string; limitKm: number; icon: any }[] = [
  { id: "emergency", label: "Cấp cứu khẩn cấp", limitKm: 30, icon: Ambulance },
  { id: "homecare", label: "Điều dưỡng tại nhà", limitKm: 200, icon: HeartPulse },
  { id: "transfer", label: "Chuyển viện toàn quốc", limitKm: 1000, icon: Truck },
];

export function CoverageRadiusChecker({ onSelectService }: { onSelectService?: (type: ServiceType) => void }) {
  const [selectedService, setSelectedService] = useState<ServiceType>("emergency");
  const [addressInput, setAddressInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    distance?: number;
    limit?: number;
    message: string;
    coords?: { lat: number; lng: number };
    address?: string;
  } | null>(null);

  const handleCheckLocation = (lat: number, lng: number, formattedAddr?: string) => {
    const valResult = validateGpsRequest(lng, lat, selectedService);
    const limit = SERVICE_LIMITS_KM[selectedService];

    if (valResult.success) {
      setResult({
        success: true,
        distance: valResult.distance,
        limit,
        message: `Vị trí của bạn nằm TRONG bán kính phục vụ (${valResult.distance} km / Tối đa ${limit} km từ Trung tâm 115 Hồng Hải tại TP. Đồng Xoài). Đội ngũ y tế sẵn sàng xuất phát!`,
        coords: { lat, lng },
        address: formattedAddr || addressInput || `${lat.toFixed(4)}, ${lng.toFixed(4)}`,
      });
    } else {
      let customMsg = valResult.message;
      if (valResult.distance && valResult.distance > limit) {
        if (selectedService === "emergency") {
          customMsg = `Vị trí của bạn cách Trung tâm Cấp cứu 115 Hồng Hải (TP. Đồng Xoài) ${valResult.distance} km. Vượt quá bán kính Cấp cứu khẩn cấp xuất phát trong 30 km. Vui lòng chuyển sang tab 'Điều dưỡng tại nhà' (200 km) hoặc 'Chuyển viện toàn quốc' (1000 km).`;
        } else {
          customMsg = `Khoảng cách thực tế là ${valResult.distance} km từ Trung tâm 115 Hồng Hải (TP. Đồng Xoài), vượt quá bán kính quy định ${limit} km của dịch vụ này.`;
        }
      }
      setResult({
        success: false,
        distance: valResult.distance,
        limit: valResult.limit || limit,
        message: customMsg,
        coords: { lat, lng },
        address: formattedAddr || addressInput || `${lat.toFixed(4)}, ${lng.toFixed(4)}`,
      });
    }
  };

  const handleGetGps = () => {
    if (!navigator.geolocation) {
      alert("Trình duyệt của bạn không hỗ trợ định vị GPS.");
      return;
    }
    setLoading(true);
    setResult(null);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        let addressStr = `Tọa độ GPS: ${lat.toFixed(4)}, ${lng.toFixed(4)}`;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
          );
          const data = await res.json();
          if (data && data.display_name) {
            addressStr = data.display_name;
          }
        } catch {
          // fallback to coordinates string
        } finally {
          setAddressInput(addressStr);
          setLoading(false);
          handleCheckLocation(lat, lng, addressStr);
        }
      },
      (err) => {
        setLoading(false);
        alert("Không thể lấy vị trí tự động. Vui lòng gõ tên địa chỉ hoặc quận/huyện vào ô tìm kiếm.");
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  };

  const handleGeocodeAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addressInput.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const geoRes = await geocodeAddressSmart(addressInput);
      handleCheckLocation(geoRes.lat, geoRes.lng, geoRes.displayName);
    } catch {
      setResult({
        success: false,
        message: "Lỗi kết nối khi định vị. Vui lòng kiểm tra kết nối mạng và thử lại.",
      });
    } finally {
      setLoading(false);
    }
  };

  const currentLimit = SERVICE_LIMITS_KM[selectedService];
  const percentUsed = result?.distance ? Math.min(100, Math.round((result.distance / currentLimit) * 100)) : 0;

  return (
    <div className="w-full max-w-4xl mx-auto rounded-3xl bg-card border border-border p-6 sm:p-8 shadow-xl relative overflow-hidden backdrop-blur-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
              <Compass className="h-4 w-4" />
              Kiểm tra Vùng Phủ Sóng 24/7
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
              Chính sách 0đ cước đón bệnh nhân trong 6 km
            </div>
          </div>
          <h3 className="text-2xl font-extrabold tracking-tight">
            Tra cứu Bán kính & Phạm vi Phục vụ
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Nhập địa chỉ hoặc bật vị trí GPS để kiểm tra cước phí & khả năng đáp ứng cấp cứu tức thì
          </p>
        </div>

        <div className="flex items-center gap-2 bg-secondary/60 p-1.5 rounded-2xl border border-border w-full sm:w-auto">
          {SERVICE_OPTIONS.map((s) => {
            const Icon = s.icon;
            const active = selectedService === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  setSelectedService(s.id);
                  if (result?.coords) {
                    handleCheckLocation(result.coords.lat, result.coords.lng, result.address);
                  }
                }}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  active
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{s.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Form Input */}
      <form onSubmit={handleGeocodeAddress} className="mt-6 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            value={addressInput}
            onChange={(e) => setAddressInput(e.target.value)}
            placeholder="Nhập địa chỉ (ví dụ: 123 Nguyễn Thị Minh Khai, Quận 1, TP.HCM)..."
            className="w-full rounded-2xl border border-input bg-background pl-11 pr-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleGetGps}
            disabled={loading}
            title="Sử dụng GPS hiện tại"
            className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-secondary hover:bg-secondary/80 px-4 py-3.5 text-sm font-semibold transition disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                <Navigation className="h-5 w-5 text-primary" />
                <span className="hidden sm:inline">Vị trí của tôi</span>
              </>
            )}
          </button>

          <button
            type="submit"
            disabled={loading || !addressInput.trim()}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 rounded-2xl gradient-sky px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-soft hover:opacity-95 transition disabled:opacity-50"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Kiểm tra ngay"}
          </button>
        </div>
      </form>

      {/* Result Display */}
      {result && (
        <div className="mt-6 animate-in fade-in zoom-in-95 duration-200">
          <div
            className={`rounded-2xl p-5 border ${
              result.success
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-950 dark:text-emerald-200"
                : "bg-destructive/10 border-destructive/30 text-destructive"
            }`}
          >
            <div className="flex items-start gap-3">
              {result.success ? (
                <CheckCircle2 className="h-6 w-6 text-emerald-500 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="h-6 w-6 text-destructive shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="font-bold text-base">
                    {result.success ? "✅ Trong phạm vi phục vụ" : "⚠️ Vượt quá bán kính quy định"}
                  </h4>
                  {result.distance !== undefined && result.distance <= FREE_PICKUP_RADIUS_KM && (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white font-bold text-xs shadow-sm">
                      Miễn 100% cước đón (Dưới 6 km)
                    </span>
                  )}
                </div>
                <p className="text-sm mt-1 opacity-90">{result.message}</p>

                {result.distance !== undefined && (
                  <div className="mt-4 pt-4 border-t border-border/50 grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div>
                      <span className="text-xs text-muted-foreground block">Khoảng cách thực tế</span>
                      <span className="text-lg font-black">{result.distance} km</span>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground block">Bán kính tối đa</span>
                      <span className="text-lg font-bold">{result.limit} km</span>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <span className="text-xs text-muted-foreground block">Thời gian tiếp cận ước tính</span>
                      <span className="text-lg font-bold text-primary">
                        {result.distance <= 10
                          ? "~8 - 12 phút"
                          : result.distance <= 30
                          ? "~15 - 25 phút"
                          : "~30 - 60 phút"}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Gauge Progress Bar */}
            {result.distance !== undefined && (
              <div className="mt-4">
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>0 km (Trung tâm 115 Hồng Hải - TP. Đồng Xoài)</span>
                  <span>{percentUsed}% hạn mức bán kính</span>
                  <span>{result.limit} km</span>
                </div>
                <div className="h-3 w-full bg-background/60 rounded-full overflow-hidden p-0.5 border border-border">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      result.success
                        ? percentUsed < 75
                          ? "bg-emerald-500"
                          : "bg-amber-500"
                        : "bg-destructive"
                    }`}
                    style={{ width: `${percentUsed}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Info Legend */}
      <div className="mt-6 pt-4 border-t border-border grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shrink-0 animate-ping" />
          <span className="text-emerald-600 dark:text-emerald-400 font-bold">🎁 Miễn phí đón: <strong>0 - 6 km</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
          <span>Bán kính Cấp cứu: <strong>30 km</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-sky-500 shrink-0" />
          <span>Bán kính Điều dưỡng: <strong>200 km</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-indigo-500 shrink-0" />
          <span>Bán kính Chuyển viện: <strong>1000 km</strong></span>
        </div>
      </div>
    </div>
  );
}
