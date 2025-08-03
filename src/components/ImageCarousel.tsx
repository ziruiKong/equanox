import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MediaItem {
  type: 'image' | 'video';
  url: string;
  alt?: string;
}

interface ImageCarouselProps {
  mediaItems: MediaItem[];
  stayTime?: number; // 图片停留时间(ms)
  transitionTime?: number; // 切换动画时间(ms)
}

const ImageCarousel = ({ mediaItems, stayTime = 3000, transitionTime = 1000 }: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(true);
  const timerRef = useRef<number | null>(null);
  const progressIntervalRef = useRef<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Reset autoplay timer
  const pauseTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    setProgress(0);
  };

  const resetTimer = () => {
    pauseTimer();
    
    // 显示进度条并开始动画
    setShowProgress(true);
    setProgress(0);
    const startTime = Date.now();
    const duration = stayTime;
    
    progressIntervalRef.current = window.setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);
      
      if (newProgress >= 100) {
        nextSlide();
      }
    }, 30); // 每30ms更新一次进度
  };

  // Initialize autoplay
  useEffect(() => {
    resetTimer();
    
    return () => {
      pauseTimer(); // 组件卸载时清除所有定时器
    };
  }, []);

  const nextSlide = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setShowProgress(false); // 切换时隐藏进度条
    
    // 隐藏当前图片的动画
    setCurrentIndex((prevIndex) => 
      prevIndex === mediaItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Reset transition flag after animation completes
  useEffect(() => {
    setIsTransitioning(false);
    resetTimer(); // 当前图片显示后，重置并启动定时器
  }, [currentIndex]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
           exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: transitionTime / 1000, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full relative overflow-hidden"
          onMouseEnter={pauseTimer}
          onMouseLeave={resetTimer}
        >
            {mediaItems[currentIndex].type === 'image' ? (
              <img
                src={mediaItems[currentIndex].url}
                alt={mediaItems[currentIndex].alt || `Slide ${currentIndex + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <video
                ref={videoRef}
                src={mediaItems[currentIndex].url}
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                onLoadedData={() => {
                  // 视频加载完成后开始播放
                  videoRef.current?.play().catch(e => console.log("Video play error:", e));
                }}
              />
            )}
           {/* 黑金主题渐变叠加层 */}
           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
           {/* 金色光晕效果 */}
           <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-gold/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
         </motion.div>
         
          {/* 进度条容器 - 仅在不切换时显示 */}
          {showProgress && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30 z-20">
              <motion.div
                className="h-full bg-gold transition-all duration-300 ease-linear"
                style={{ width: `${progress}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "linear" }}
              />
            </div>
          )}
       </AnimatePresence>
     </div>
  );
};

export default ImageCarousel;