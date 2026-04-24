import { useApi } from '../hooks/useApi';
import { api } from '../utils/api';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { Banner } from '../types';

function isWithinTimeRange(startTime?: string | null, endTime?: string | null): boolean {
  if (!startTime || !endTime) return true;
  const now = new Date();
  const h = now.getUTCHours();
  const m = now.getUTCMinutes();
  const current = h * 60 + m;
  const [sh, sm] = startTime.split(':').map(Number);
  const [eh, em] = endTime.split(':').map(Number);
  const start = sh * 60 + sm;
  const end = eh * 60 + em;
  if (start <= end) return current >= start && current <= end;
  return current >= start || current <= end;
}

export function BannerTicker() {
  const { data: banners } = useApi<Banner[]>(() => api.banners.list());
  const [dismissed, setDismissed] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const activeBanners = (banners || []).filter(
    (b) => b.active && isWithinTimeRange(b.startTime, b.endTime)
  );

  useEffect(() => {
    if (activeBanners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [activeBanners.length]);

  if (dismissed || activeBanners.length === 0) return null;

  const banner = activeBanners[currentIndex % activeBanners.length];
  if (!banner) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={banner.id}
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{ backgroundColor: banner.bgColor, color: banner.textColor }}
        className="relative overflow-hidden"
      >
        <div className="relative flex items-center h-10">
          <div className="ticker-wrapper w-full overflow-hidden">
            <motion.div
              key={`ticker-${banner.id}`}
              className="ticker-content whitespace-nowrap flex items-center gap-8 text-sm font-medium"
              animate={{ x: ['100%', '-100%'] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              {banner.image && (
                <img src={banner.image} alt="" className="h-6 w-auto inline-block" />
              )}
              {banner.link ? (
                <a href={banner.link} className="hover:underline" style={{ color: banner.textColor }}>
                  {banner.text}
                </a>
              ) : (
                <span>{banner.text}</span>
              )}
              <span className="mx-8">•</span>
              {banner.image && (
                <img src={banner.image} alt="" className="h-6 w-auto inline-block" />
              )}
              {banner.link ? (
                <a href={banner.link} className="hover:underline" style={{ color: banner.textColor }}>
                  {banner.text}
                </a>
              ) : (
                <span>{banner.text}</span>
              )}
            </motion.div>
          </div>
          <button
            onClick={() => setDismissed(true)}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/20 transition-colors z-10"
            style={{ color: banner.textColor }}
          >
            <X className="size-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
