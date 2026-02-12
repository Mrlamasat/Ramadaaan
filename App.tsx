import React, { useState, useRef } from 'react';
import { Send } from 'lucide-react';
import Header from './Header'; // جلب الملف من نفس المجلد
import BrowserFrame from './BrowserFrame'; // جلب الملف من نفس المجلد

const TIKTOK_URL = "https://www.tiktok.com/@1118.8111?_r=1&_t=ZG-93qhRpdxK5Y";
const TG_URL = "https://t.me/RamadanSeries26";
const BASE_URL = "https://laroza.bond/category.php?cat=ramadan-2026";

export default function App() {
  const [url, setUrl] = useState(BASE_URL);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleHome = () => setUrl(`${BASE_URL}&v=${Date.now()}`);
  const handleRefresh = () => { if (iframeRef.current) iframeRef.current.src = iframeRef.current.src; };
  const handleShare = async () => { /* كود المشاركة الموجود مسبقاً */ };

  return (
    <div className="relative h-screen w-screen bg-[#020205] overflow-hidden font-['Cairo']" dir="rtl">
      {/* استخدام المكونات المستوردة */}
      <Header onHome={handleHome} onRefresh={handleRefresh} onShare={handleShare} />
      <BrowserFrame url={url} iframeRef={iframeRef} />

      {/* أزرار التواصل العائمة */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[500] flex items-center gap-3">
        <button onClick={() => window.open(TIKTOK_URL, '_blank')} className="bg-[#fe2c55] text-white px-5 py-3 rounded-full animate-float text-xs">تيك توك</button>
        <button onClick={() => window.open(TG_URL, '_blank')} className="bg-[#229ED9] text-white px-5 py-3 rounded-full animate-float text-xs"><Send size={16} /> تليجرام</button>
      </div>
    </div>
  );
}
