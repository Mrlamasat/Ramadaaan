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

/* 🔧 عدل هذه القيم حسب ارتفاع الهيدر والفوتر الحقيقي */
const TOP_CROP_NORMAL = 120;
const BOTTOM_CROP_NORMAL = 120;

const TOP_CROP_FULLSCREEN = 120;
const BOTTOM_CROP_FULLSCREEN = 80;

export default function App() {
  const [url, setUrl] = useState(BASE_URL);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loading, setLoading] = useState(true);

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleRefresh = () => {
    iframeRef.current?.contentWindow?.location.reload();
  };

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        await containerRef.current?.requestFullscreen?.();
      } else {
        await document.exitFullscreen?.();
      }
    } catch {}
  }, []);

  useEffect(() => {
    const handler = () =>
      setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () =>
      document.removeEventListener("fullscreenchange", handler);
  }, []);

  const clipStyle = {
    clipPath: isFullscreen
      ? `inset(${TOP_CROP_FULLSCREEN}px 0px ${BOTTOM_CROP_FULLSCREEN}px 0px)`
      : `inset(${TOP_CROP_NORMAL}px 0px ${BOTTOM_CROP_NORMAL}px 0px)`,
  };

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
            onClick={() => {
              setLoading(true);
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
            className="text-white flex flex-col items-center active:scale-90"
          >
            <Send size={22} className="text-blue-400" />
            <span className="text-xs mt-1 font-bold">
              قناتنا
            </span>
          </a>

          <button
            onClick={() => navigator.share?.({ url })}
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
          isFullscreen
            ? "h-screen"
            : "h-[calc(100vh-64px)] mt-16"
        }`}
      >
        <div className="relative w-full h-full overflow-hidden bg-black">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center text-white z-20">
              جاري التحميل...
            </div>
          )}

          <iframe
            ref={iframeRef}
            src={url}
            onLoad={() => setLoading(false)}
            className="w-full h-full border-none"
            style={clipStyle}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            allow="autoplay; fullscreen"
            referrerPolicy="no-referrer"
          />
        </div>
      </main>

      {/* FLOAT BUTTONS */}
      <div className="absolute bottom-6 left-0 w-full flex justify-between px-6 z-50">
        <div className="flex gap-4">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-lg active:scale-90"
          >
            <MessageCircle size={26} />
          </a>

          <a
            href={MY_TG_URL}
            target="_blank"
            rel="noopener noreferrer"
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
            className="w-14 h-14 rounded-full bg-black border border-white/20 flex items-center justify-center text-white shadow-lg active:scale-90"
          >
            تيك
          </a>

          <button
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
