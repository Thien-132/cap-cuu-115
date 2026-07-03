import { useState, useEffect } from 'react';
import { Download } from 'lucide-react';

export function InstallAppButton({ className, textClassName }: { className?: string; textClassName?: string }) {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true) {
      setIsStandalone(true);
      return;
    }

    // Check if iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  if (isStandalone) return null; // Hide if already installed

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    } else if (isIOS) {
      alert('Để cài đặt App trên iPhone:\n\n1. Mở trang này bằng trình duyệt Safari.\n2. Nhấn vào nút "Chia sẻ" (Share) ở dưới cùng màn hình.\n3. Chọn "Thêm vào MH chính" (Add to Home Screen).');
    } else {
      alert('Vui lòng mở trang web này bằng Chrome/Safari và chọn "Thêm vào màn hình chính" từ menu của trình duyệt.');
    }
  };

  // Only show the button if there is a prompt or it's iOS
  if (!deferredPrompt && !isIOS) return null;

  return (
    <button
      onClick={handleInstallClick}
      className={`inline-flex items-center justify-center gap-2 rounded-xl transition-all ${className}`}
    >
      <Download className="h-5 w-5" /> 
      <span className={textClassName}>{isIOS ? 'Tải App (iOS)' : 'Tải App'}</span>
    </button>
  );
}
