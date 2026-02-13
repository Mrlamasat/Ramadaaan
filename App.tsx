const toggleFullscreen = async () => {
  if (!isMaximized) {
    // دخول Fullscreen على الـ container
    if (appContainerRef.current?.requestFullscreen) {
      try { 
        await appContainerRef.current.requestFullscreen(); 
      } catch (err) {
        console.warn("Fullscreen not allowed:", err);
      }
    }

    // محاولة قفل الشاشة على Landscape (إن كان مدعوم)
    if (screen.orientation && screen.orientation.lock) {
      try { 
        await screen.orientation.lock('landscape'); 
      } catch (err) {
        console.warn("Orientation lock failed:", err);
      }
    }

    // فقط نغير حالة التكبير، لا نغيّر رابط الـ iframe
    setIsMaximized(true);
  } else {
    // الخروج من Fullscreen
    if (document.exitFullscreen) {
      try { 
        await document.exitFullscreen(); 
      } catch (err) {
        console.warn("Exit fullscreen failed:", err);
      }
    }

    // فك قفل orientation
    if (screen.orientation && screen.orientation.unlock) {
      try { screen.orientation.unlock(); } catch {}
    }

    setIsMaximized(false);
  }
};
