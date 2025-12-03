/**
 * @fileoverview Navigation Bar Component
 * @description Responsive navigation bar with smooth scroll, active section tracking,
 * animated mobile menu, and theme toggle. Uses Intersection Observer for active section detection.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

/**
 * Navigation link interface
 */
interface NavLink {
  /** Section ID to scroll to */
  id: string;
  /** Display label */
  label: string;
}

/**
 * Navigation links configuration
 */
const links: NavLink[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

/** Scroll threshold for navbar background change */
const SCROLL_THRESHOLD = 20;

/**
 * Navbar Component
 * Provides navigation with smooth scrolling and responsive mobile menu
 *
 * @returns The rendered navigation bar
 */
const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  // Optimized scroll listener for navbar background styling
  useEffect(() => {
    let ticking = false;

    const handleScroll = (): void => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * Scrolls to a specific section and closes mobile menu
   * @param id - The section ID to scroll to
   */
  const scrollToSection = useCallback((id: string): void => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Intersection Observer to track active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.2, rootMargin: '-20% 0px -35% 0px' }
    );

    links.forEach((link) => {
      const element = document.getElementById(link.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Animation variants for mobile menu
  const menuVariants: Variants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1], when: 'afterChildren' },
    },
    open: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
        when: 'beforeChildren',
        staggerChildren: 0.05,
      },
    },
  };

  const mobileLinkVariants: Variants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0 },
  };

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-500 border-b ${
        isScrolled
          ? 'bg-theme-navbar-scrolled backdrop-blur-xl border-theme-navbar py-2'
          : 'bg-transparent border-transparent py-4'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <div
            className="flex-shrink-0 flex items-center cursor-pointer"
            onClick={() => scrollToSection('home')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && scrollToSection('home')}
            aria-label="Go to home section"
          >
            <div className="text-lg font-bold tracking-tight text-theme-primary flex items-center gap-2.5 group">
              <motion.span
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                className="btn-theme-primary w-9 h-9 flex items-center justify-center rounded-lg text-xs font-bold shadow-md"
              >
                JC
              </motion.span>
              <span className="group-hover:text-theme-secondary transition-colors tracking-tighter uppercase text-sm font-bold">
                Dalupang.
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1" role="menubar">
            {links.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  role="menuitem"
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-colors duration-300 outline-none ${
                    isActive ? 'text-theme-primary' : 'text-theme-tertiary hover:text-theme-primary'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active"
                      className="absolute inset-0 bg-theme-tertiary rounded-full -z-10"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              );
            })}

            {/* Theme Toggle - Desktop */}
            <div className="ml-4 pl-4 border-l border-theme-primary">
              <ThemeToggle size="sm" />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Theme Toggle - Mobile */}
            <ThemeToggle size="sm" />

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-theme-primary hover:bg-theme-tertiary focus:outline-none transition-colors"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                  >
                    <X size={24} strokeWidth={1.5} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                  >
                    <Menu size={24} strokeWidth={1.5} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            className="md:hidden bg-theme-navbar-scrolled backdrop-blur-xl border-b border-theme-primary overflow-hidden absolute w-full left-0 shadow-theme-xl z-40"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            role="menu"
            aria-label="Mobile navigation menu"
          >
            <div className="px-6 py-8 space-y-2">
              {links.map((link) => (
                <motion.div key={link.id} variants={mobileLinkVariants}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    role="menuitem"
                    aria-current={activeSection === link.id ? 'page' : undefined}
                    className={`block w-full text-left px-5 py-4 rounded-2xl text-lg font-bold tracking-tight transition-all duration-300 ${
                      activeSection === link.id
                        ? 'btn-theme-primary shadow-lg pl-7'
                        : 'text-theme-tertiary hover:bg-theme-tertiary hover:text-theme-primary hover:pl-7'
                    }`}
                  >
                    {link.label}
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
