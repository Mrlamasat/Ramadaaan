import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Home,
  RefreshCw,
  Send,
  Share2,
  MessageCircle,
  Maximize,
  Minimize,
} from "lucide-react";

const MY_TG_URL = "https://t.me/RamadanSeries26";
const TIKTOK_URL =
  "https://www.tiktok.com/@1118.8111?_r=1&_t=ZG-93qhRpdxK5Y";
const WHATSAPP_URL =
  "https://whatsapp.com/channel/0029VbCPDBw4tRs210hx2D3a";
const BASE_URL =
  "https://laroza.bond/category.php?cat=ramadan-2026";

const TikTokIcon = React.memo(
  ({ className }: { className?: string }) => (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.13-1.39-.01 2.34.01 4.68-.01 7.02-.14 5.74-7.41 8.26-10.89 4.39-2.38-2.61-1.23-7.1 2.22-8.02.82-.21 1.69-.21 2.53-.08V11c-1.3-.17-2.66-.13-3.92.3-3.05 1.05-4.43 5.18-2.62 7.9 1.76 2.65 5.8 3.06 8 1 1.41-1.31 1.69-3.41 1.69-5.21V.02Z" />
    </svg>
  )
);

export default function App() {
  const [url, setUrl] = useState(BASE_URL);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Refresh
  const handleRefresh = () => {
    iframeRef.current?.contentWindow?.location.reload();
  };

  // Share fallback
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ url: window.location.href });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("تم نسخ الرابط");
      }
    } catch {}
  };

  // Fullscreen Toggle
  const toggleFullscreen = useCallback(async () => {
    if (busy) return;
    setBusy(true);

    try {
      if (!document.fullscreenElement) {
        await containerRef.current?.requestFullscreen?.();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen?.();
        setIsFullscreen(false);
      }
    } catch {}
    setBusy(false);
  }, [busy]);

  // Sync fullscreen state
  useEffect(() => {
    const handler = () =>
      setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () =>
      document.removeEventListener("fullscreenchange", handler);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-screen bg-black overflow-hidden"
      dir="rtl"
    >
      {/* HEADER */}
      {!isFullscreen && (
        <header className="fixed top-0 left-0 w-full h-16 bg-[#0c0c16] flex items-center justify-between px-6 z-50 border-b border-red-600/40">
          <button
            aria-label="الرئيسية"
            onClick={() => {
              setLoading(true);
              setError(false);
              setUrl(BASE_URL);
            }}
            className="text-gray-300 flex flex-col items-center active:scale-90"
          >
            <Home size={22} className="text-red-500" />
            <span className="text-xs mt-1 font-bold">
              الرئيسية
            </span>
          </button>

          <button
            aria-label="تحديث"
            onClick={handleRefresh}
            className="text-gray-300 flex flex-col items-center active:scale-90"
          >
            <RefreshCw
              size={22}
              className="text-green-500"
            />
            <span className="text-xs mt-1 font-bold">
              تحديث
            </span>
          </button>

          <a
            href={MY_TG_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="قناتنا"
            className="text-white flex flex-col items-center active:scale-90"
          >
            <Send size={22} className="text-blue-400" />
            <span className="text-xs mt-1 font-bold">
              قناتنا
            </span>
          </a>

          <button
            aria-label="مشاركة"
            onClick={handleShare}
            className="text-gray-300 flex flex-col items-center active:scale-90"
          >
            <Share2
              size={22}
              className="text-purple-500"
            />
            <span className="text-xs mt-1 font-bold">
              مشاركة
            </span>
          </button>
        </header>
      )}

      {/* PLAYER */}
      <main
        className={`w-full ${
          isFullscreen ? "h-screen" : "h-[calc(100vh-64px)] mt-16"
        }`}
      >
        <div className="relative w-full h-full bg-black">
          {loading && !error && (
            <div className="absolute inset-0 flex items-center justify-center text-white z-20">
              جاري التحميل...
            </div>
          )}

          {error && (
            <div className="absolute inset-0 flex items-center justify-center text-red-500 z-20">
              حدث خطأ في تحميل الصفحة
            </div>
          )}

          <iframe
            ref={iframeRef}
            src={url}
            className="w-full h-full border-none"
            onLoad={() => setLoading(false)}
            onError={() => {
              setLoading(false);
              setError(true);
            }}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            allow="autoplay; fullscreen"
            referrerPolicy="no-referrer"
          />
        </div>
      </main>

      {/* FLOATING BUTTONS */}
      <div className="absolute bottom-6 left-0 w-full flex justify-between px-6 z-50">
        <div className="flex gap-4">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="واتساب"
            className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-lg active:scale-90"
          >
            <MessageCircle size={26} />
          </a>

          <a
            href={MY_TG_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="تيليجرام"
            className="w-14 h-14 rounded-full bg-[#229ED9] flex items-center justify-center text-white shadow-lg active:scale-90"
          >
            <Send size={26} />
          </a>
        </div>

        <div className="flex gap-4">
          <a
            href={TIKTOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="تيك توك"
            className="w-14 h-14 rounded-full bg-black border border-white/20 flex items-center justify-center text-white shadow-lg active:scale-90"
          >
            <TikTokIcon className="w-6 h-6" />
          </a>

          <button
            aria-label="تكبير الشاشة"
            onClick={toggleFullscreen}
            className="w-14 h-14 rounded-full bg-yellow-500 flex items-center justify-center text-black shadow-lg active:scale-90"
          >
            {isFullscreen ? (
              <Minimize size={26} />
            ) : (
              <Maximize size={26} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
