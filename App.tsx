import React, { useState, useRef } from 'react';
import { Home, RefreshCw, Send, Share2 } from 'lucide-react';

const MY_TG_URL = "https://t.me/RamadanSeries26";
const TIKTOK_URL = "https://www.tiktok.com/@1118.8111?_r=1&_t=ZG-93qhRpdxK5Y";
const BASE_URL = "https://laroza.bond/category.php?cat=ramadan-2026";

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.13-1.39-.01 2.34.01 4.68-.01 7.02-.14 5.74-7.41 8.26-10.89 4.39-2.38-2.61-1.23-7.1 2.22-8.02.82-.21 1.69-.21 2.53-.08V11c-1.3-.17-2.66-.13-3.92.3-3.05 1.05-4.43 5.18-2.62 7.9 1.76 2.65 5.8 3.06 8 1 1.41-1.31 1.69-3.41 1.69-5.21V.02Z"/>
  </svg>
);

export default function App() {
  const [url, setUrl] = useState(BASE_URL);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleRefresh = () => {
    if (iframeRef.current) iframeRef.current.src = iframeRef.current.src;
  };

  return (
    <div className="relative h-screen w-screen bg-black flex flex-col overflow-hidden" dir="rtl">
      
      {/* هيدر التطبيق العلوي */}
      <header className="h-[65px] bg-[#0c0c16] flex items-center justify-around z-[100] border-b border-red-600/40">
        <button onClick={() => setUrl(`${BASE_URL}&v=${Date.now()}`)} className="text-gray-300 flex flex-col items-center active:scale-90 transition-transform">
          <Home size={20} className="text-red-500" />
          <span className="text-[10px] mt-1 font-bold">الرئيسية</span>
        </button>
        
        <button onClick={handleRefresh} className="text-gray-300 flex flex-col items-center active:scale-90 transition-transform">
          <RefreshCw size={20} className="text-green-500" />
          <span className="text-[10px] mt-1 font-bold">تحديث</span>
        </button>

        <a href={MY_TG_URL} target="_blank" rel="noreferrer" className="text-white flex flex-col items-center active:scale-90 transition-transform">
          <Send size={20} className="text-blue-400" />
          <span className="text-[10px] mt-1 font-bold">قناتنا</span>
        </a>

        <button onClick={() => navigator.share({url: window.location.href})} className="text-gray-300 flex flex-col items-center active:scale-90 transition-transform">
          <Share2 size={20} className="text-purple-500" />
          <span className="text-[10px] mt-1 font-bold">مشاركة</span>
        </button>
      </header>

      {/* منطقة المشغل الاحترافية */}
      <main className="flex-1 relative overflow-hidden bg-black">
        <iframe
          ref={iframeRef}
          src={url}
          className="w-full h-[calc(100%+275px)] absolute border-none"
          style={{ top: '-275px' }}
          referrerPolicy="no-referrer"
          /* تم إزالة الـ sandbox لضمان تشغيل المشغل 100% */
          allow="autoplay; fullscreen; encrypted-media"
          allowFullScreen
        />
        
        {/* الدرع البرمجي (Invisible Shield): يغطي المناطق التي تطلق الإعلانات 
            مع ترك وسط الشاشة متاحاً للضغط على زر تشغيل الفيديو */}
        <div className="absolute inset-0 pointer-events-none z-[50]">
            <div className="absolute top-0 left-0 w-full h-[350px] pointer-events-auto bg-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-[150px] pointer-events-auto bg-transparent"></div>
        </div>
      </main>

      {/* شريط الأزرار السفلي (أنيق ومدمج) */}
      <footer className="h-[75px] bg-[#0c0c16] flex items-center justify-center gap-6 z-[100] border-t border-white/10">
        <a 
          href={TIKTOK_URL} 
          target="_blank" 
          rel="noreferrer" 
          className="flex items-center gap-2 bg-[#fe2c55] text-white px-7 py-2.5 rounded-full font-black shadow-[0_0_15px_rgba(254,44,85,0.4)] active:scale-95 transition-all"
        >
          <TikTokIcon className="w-5 h-5" />
          <span className="text-sm">تيك توك</span>
        </a>

        <a 
          href={MY_TG_URL} 
          target="_blank" 
          rel="noreferrer" 
          className="flex items-center gap-2 bg-[#229ED9] text-white px-7 py-2.5 rounded-full font-black shadow-[0_0_15px_rgba(34,158,217,0.4)] active:scale-95 transition-all"
        >
          <Send size={18} />
          <span className="text-sm">تليجرام</span>
        </a>
      </footer>

    </div>
  );
}
        <a href={MY_TG_URL} target="_blank" rel="noreferrer" className="text-white flex flex-col items-center active:scale-90 transition-transform">
          <Send size={20} className="text-blue-400" />
          <span className="text-[10px] mt-1 font-bold">قناتنا</span>
        </a>

        <button onClick={() => navigator.share({url: window.location.href})} className="text-gray-300 flex flex-col items-center active:scale-90 transition-transform">
          <Share2 size={20} className="text-purple-500" />
          <span className="text-[10px] mt-1 font-bold">مشاركة</span>
        </button>
      </header>

      {/* منطقة المشغل الاحترافية */}
      <main className="flex-1 relative overflow-hidden bg-black">
        <iframe
          ref={iframeRef}
          src={url}
          className="w-full h-[calc(100%+275px)] absolute border-none"
          style={{ top: '-275px' }}
          referrerPolicy="no-referrer"
          /* تم إزالة الـ sandbox لضمان تشغيل المشغل 100% */
          allow="autoplay; fullscreen; encrypted-media"
          allowFullScreen
        />
        
        {/* الدرع البرمجي (Invisible Shield): يغطي المناطق التي تطلق الإعلانات 
            مع ترك وسط الشاشة متاحاً للضغط على زر تشغيل الفيديو */}
        <div className="absolute inset-0 pointer-events-none z-[50]">
            <div className="absolute top-0 left-0 w-full h-[350px] pointer-events-auto bg-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-[150px] pointer-events-auto bg-transparent"></div>
        </div>
      </main>

      {/* شريط الأزرار السفلي (أنيق ومدمج) */}
      <footer className="h-[75px] bg-[#0c0c16] flex items-center justify-center gap-6 z-[100] border-t border-white/10">
        <a 
          href={TIKTOK_URL} 
          target="_blank" 
          rel="noreferrer" 
          className="flex items-center gap-2 bg-[#fe2c55] text-white px-7 py-2.5 rounded-full font-black shadow-[0_0_15px_rgba(254,44,85,0.4)] active:scale-95 transition-all"
        >
          <TikTokIcon className="w-5 h-5" />
          <span className="text-sm">تيك توك</span>
        </a>

        <a 
          href={MY_TG_URL} 
          target="_blank" 
          rel="noreferrer" 
          className="flex items-center gap-2 bg-[#229ED9] text-white px-7 py-2.5 rounded-full font-black shadow-[0_0_15px_rgba(34,158,217,0.4)] active:scale-95 transition-all"
        >
          <Send size={18} />
          <span className="text-sm">تليجرام</span>
        </a>
      </footer>

    </div>
  );
}

        <a href={MY_TG_URL} target="_blank" rel="noreferrer" className="text-white flex flex-col items-center active:scale-90 transition-transform">
          <Send size={20} className="text-blue-400" />
          <span className="text-[10px] mt-1 font-bold">قناتنا</span>
        </a>

        <button onClick={() => navigator.share({url: window.location.href})} className="text-gray-300 flex flex-col items-center active:scale-90 transition-transform">
          <Share2 size={20} className="text-purple-500" />
          <span className="text-[10px] mt-1 font-bold">مشاركة</span>
        </button>
      </header>

      {/* 2. منطقة العرض (المشغل) */}
      <main className="flex-1 relative bg-black overflow-hidden">
        <iframe
          ref={iframeRef}
          src={url}
          className="w-full h-[140%] border-none absolute"
          style={{ 
            top: '-275px', // إزاحة احترافية لإخفاء الهيدر الأصلي للموقع
          }}
          referrerPolicy="no-referrer"
          /* الإعداد الاحترافي للـ Sandbox: يسمح بالتشغيل ويمنع المنبثقات */
          sandbox="allow-forms allow-scripts allow-same-origin allow-presentation allow-pointer-lock"
          allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      </main>

      {/* 3. شريط التواصل الاحترافي (بدلاً من الأزرار العشوائية) */}
      <footer className="h-[70px] bg-[#0c0c16] border-t border-white/5 flex items-center justify-center gap-4 z-[200]">
        <a 
          href={TIKTOK_URL} 
          target="_blank" 
          rel="noreferrer" 
          className="flex items-center gap-2 bg-[#fe2c55] text-white px-6 py-2 rounded-xl font-bold shadow-lg hover:brightness-110 active:scale-95 transition-all"
        >
          <TikTokIcon className="w-5 h-5" />
          <span className="text-sm font-black">تابعنا تيك توك</span>
        </a>

        <a 
          href={MY_TG_URL} 
          target="_blank" 
          rel="noreferrer" 
          className="flex items-center gap-2 bg-[#229ED9] text-white px-6 py-2 rounded-xl font-bold shadow-lg hover:brightness-110 active:scale-95 transition-all"
        >
          <Send size={18} />
          <span className="text-sm font-black">تليجرام</span>
        </a>
      </footer>

      {/* منع التفاعلات غير المرغوب فيها في الحواف */}
      <style dangerouslySetInnerHTML={{ __html: `
        iframe { pointer-events: auto !important; }
        ::-webkit-scrollbar { display: none; }
      `}} />
    </div>
  );
}
