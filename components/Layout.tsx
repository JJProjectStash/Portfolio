/**
 * @fileoverview Layout Component
 * @description Main layout wrapper that provides consistent structure across all pages
 * Includes the navigation bar, scroll progress indicator, and footer
 */

import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollProgress from './ScrollProgress';

interface LayoutProps {
  /** Child components to be rendered within the layout */
  children: React.ReactNode;
}

/**
 * Layout Component
 * Provides the main structure for the portfolio including navigation and footer
 *
 * @param props - Component props
 * @param props.children - Child components to render in the main content area
 * @returns The layout wrapper with navigation, content, and footer
 */
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      {/* Scroll progress indicator */}
      <ScrollProgress />

      {/* Navigation bar */}
      <Navbar />

      {/* Main content area - transparent background to show index.html pattern */}
      <main className="flex-grow w-full flex flex-col relative z-0">{children}</main>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Layout;
