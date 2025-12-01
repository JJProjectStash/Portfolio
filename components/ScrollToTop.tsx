/**
 * @fileoverview Scroll To Top Component
 * @description Utility component that scrolls to the top of the page on route changes
 * Note: This component is currently not actively used since the portfolio
 * uses hash-based single-page navigation, but is kept for potential future use
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop Component
 * Automatically scrolls to the top of the page when the route changes
 * 
 * @returns null - This component doesn't render any visible UI
 */
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;