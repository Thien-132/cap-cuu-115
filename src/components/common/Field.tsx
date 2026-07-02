import { useState, useRef } from 'react';
import { MapPin, Loader2 } from 'lucide-react';

export function Field({
  label,
  name,
  type = 'text',
  placeholder,
  required,
  enableLocation,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  enableLocation?: boolean;
}) {
  const [loadingLoc, setLoadingLoc] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert('Trình duyệt không hỗ trợ định vị.');
      return;
    }
    setLoadingLoc(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&zoom=18&addressdetails=1`);
          const data = await res.json();
          if (data && data.display_name && inputRef.current) {
            inputRef.current.value = data.display_name;
          } else if (inputRef.current) {
            inputRef.current.value = `${pos.coords.latitude}, ${pos.coords.longitude}`;
          }
        } catch (e) {
          if (inputRef.current) {
            inputRef.current.value = `${pos.coords.latitude}, ${pos.coords.longitude}`;
          }
        } finally {
          setLoadingLoc(false);
        }
      },
      (err) => {
        setLoadingLoc(false);
        alert('Không thể lấy vị trí. Vui lòng cho phép quyền truy cập vị trí.');
      }
    );
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-1.5">{label}</label>
      <div className="relative">
        <input
          ref={inputRef}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          className={`w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition ${enableLocation ? 'pr-12' : ''}`}
        />
        {enableLocation && (
          <button
            type="button"
            onClick={handleGetLocation}
            disabled={loadingLoc}
            title="Lấy vị trí hiện tại của tôi"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-primary hover:bg-primary/10 rounded-lg transition-colors disabled:opacity-50"
          >
            {loadingLoc ? <Loader2 className="h-5 w-5 animate-spin" /> : <MapPin className="h-5 w-5" />}
          </button>
        )}
      </div>
    </div>
  );
}
