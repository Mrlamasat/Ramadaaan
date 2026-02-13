import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Home, RefreshCw, Send, Share2, MessageCircle, Maximize, Minimize } from 'lucide-react';

const MY_TG_URL = "https://t.me/RamadanSeries26";
const TIKTOK_URL = "https://www.tiktok.com/@1118.8111?_r=1&_t=ZG-93qhRpdxK5Y";
const WHATSAPP_URL = "https://whatsapp.com/channel/0029VbCPDBw4tRs210hx2D3a"; 
const BASE_URL = "https://laroza.bond/category.php?cat=ramadan-2026";

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.13-1.39-.01 2.34.01 4.68-.01 7.02-.14 5.74-7.41 8.26-10.89 4.39-2.38-2.61-1.23-7.1 2.22-8.02.82-.21 1.69-.21 2.53-.08V11c-1.3-.17-2.66-.13-3.92.3-3.05 1.05-4.43 5.18-2.62 7.9 1.76 2.65 5.8 3.06 8 1 1.41-1.31 1.69-3.41 1.69-5.21V.02Z"/>
  </svg>
);

export default function App() {
  const [url, setUrl] = useState(BASE_URL);
  const [isMaximized, setIsMaximized] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const appContainerRef = useRef<HTMLDivElement>(null);

  const handleRefresh = () => {
    setUrl(`${BASE_URL}&v=${Date.now()}`);
  };

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await appContainerRef.current?.requestFullscreen();
        setIsMaximized(true);

        if ('orientation' in screen && 'lock' in screen.orientation) {
          screen.orientation.lock('landscape').catch(() => {});
        }
      } else {
        await document.exitFullscreen();
        setIsMaximized(false);

        if ('orientation' in screen && 'unlock' in screen.orientation) {
          screen.orientation.unlock();
        }
      }
    } catch {}
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) setIsMaximized(false);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () =>
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const iframeStyle = useMemo(() => {
    return isMaximized
      ? {
          width: '100%',
          height: '180%',
          marginTop: '-15%',
          transform: 'scale(1.1)',
          transformOrigin: 'top center'
        }
      : {
          width: '102%',
          height: '150%',
          marginTop: '-275px',
          marginLeft: '-1%',
          transform: 'scale(1.02)',
          transformOrigin: 'top center'
        };
  }, [isMaximized]);

  return (
    <div
      ref={appContainerRef}
      className="relative h-screen w-screen bg-black overflow-hidden"
      dir="rtl"
    >
      {/* Header */}
      <header
        className={`fixed top-0 left-0 w-full h-[65px] bg-[#0c0c16] flex items-center justify-between px-8 z-[100] border-b border-red-600/40 transition-transform duration-500 ${
          isMaximized ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <button
          onClick={() => setUrl(`${BASE_URL}&v=${Date.now()}`)}
          className="text-gray-300 flex flex-col items-center active:scale-90"
        >
          <Home size={22} className="text-red-500" />
          <span className="text-[9px] mt-1 font-bold">الرئيسية</span>
        </button>

        <button
          onClick={handleRefresh}
          className="text-gray-300 flex flex-col items-center active:scale-90"
        >
          <RefreshCw size={22} className="text-green-500" />
          <span className="text-[9px] mt-1 font-bold">تحديث</span>
        </button>

        <a
          href={MY_TG_URL}
          target="_blank"
          rel="noreferrer"
          className="text-white flex flex-col items-center"
        >
          <Send size={22} className="text-blue-400" />
          <span className="text-[9px] mt-1 font-bold">قناتنا</span>
        </a>

        <button
          onClick={() =>
            navigator.share?.({
              title: document.title,
              text: "شاهد مسلسلات رمضان 2026",
              url: window.location.href
            })
          }
          className="text-gray-300 flex flex-col items-center active:scale-90"
        >
          <Share2 size={22} className="text-purple-500" />
          <span className="text-[9px] mt-1 font-bold">مشاركة</span>
        </button>
      </header>

      {/* Player Area */}
      <main
        className={`relative w-full transition-all duration-700 ${
          isMaximized ? 'h-screen' : 'h-[calc(100vh-65px)] mt-[65px]'
        }`}
      >
        <iframe
          ref={iframeRef}
          src={url}
          className="border-none transition-all duration-700"
          style={iframeStyle}
          referrerPolicy="no-referrer"
          sandbox="allow-scripts allow-same-origin allow-forms allow-presentation"
          allow="autoplay; fullscreen"
          allowFullScreen
        />
      </main>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        iframe { pointer-events: auto !important; }
      `
        }}
      />
    </div>
  );
        }
