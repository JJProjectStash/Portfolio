/**
 * @fileoverview Scroll Progress Component
 * @description Displays scroll progress indicator and back-to-top button
 * Shows horizontal progress bar on mobile and vertical bar on desktop
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

/** Scroll threshold (in pixels) before showing back-to-top button */
const SCROLL_THRESHOLD = 400;

/**
 * ScrollProgress Component
 * Displays a scroll progress indicator and a back-to-top button
 *
 * @returns The scroll progress indicator and back-to-top button
 */
const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();

  // Apply spring physics for smooth filling animation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    // Throttled scroll handler using requestAnimationFrame for performance
    let ticking = false;

    const handleScroll = (): void => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setShowBackToTop(window.scrollY > SCROLL_THRESHOLD);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * Smoothly scrolls the page back to the top
   */
  const scrollToTop = useCallback((): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      {/* Mobile: Horizontal progress bar at the top */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 scroll-progress-bar origin-left z-60 md:hidden"
        style={{ scaleX: smoothProgress }}
        role="progressbar"
        aria-label="Page scroll progress"
      />

      {/* Desktop: Vertical progress bar on the right side */}
      <div className="fixed top-0 right-0 bottom-0 w-2.5 scroll-progress-track z-60 hidden md:block">
        <motion.div
          className="w-full scroll-progress-bar origin-top absolute top-0 left-0 right-0"
          style={{ scaleY: smoothProgress, height: '100%' }}
        />
      </div>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 p-3 btn-theme-primary rounded-full shadow-theme-lg hover:shadow-theme-xl transition-shadow"
            aria-label="Back to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default ScrollProgress;
