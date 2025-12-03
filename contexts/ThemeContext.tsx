/**
 * @fileoverview Theme Context Provider
 * @description Manages theme state (light/dark) with system preference detection,
 * localStorage persistence, and proper browser override prevention.
 * Follows best practices from major websites like YouTube, GitHub, and Facebook.
 */

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  /** Current active theme */
  theme: Theme;
  /** Toggle between light and dark themes */
  toggleTheme: () => void;
  /** Set a specific theme */
  setTheme: (theme: Theme) => void;
  /** Whether system preference is being used */
  isSystemPreference: boolean;
  /** Reset to system preference */
  resetToSystemPreference: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'portfolio-theme';
const SYSTEM_PREFERENCE_KEY = 'portfolio-use-system';

/**
 * Gets the user's system color scheme preference
 */
const getSystemTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

/**
 * Gets the initial theme from localStorage or system preference
 */
const getInitialTheme = (): { theme: Theme; isSystem: boolean } => {
  if (typeof window === 'undefined') {
    return { theme: 'light', isSystem: true };
  }

  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
  const useSystem = localStorage.getItem(SYSTEM_PREFERENCE_KEY);

  // If user has explicitly set a theme preference
  if (storedTheme && useSystem !== 'true') {
    return { theme: storedTheme, isSystem: false };
  }

  // Otherwise, use system preference
  return { theme: getSystemTheme(), isSystem: true };
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

/**
 * Theme Provider Component
 * Wraps the application and provides theme context
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('light');
  const [isSystemPreference, setIsSystemPreference] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize theme on mount
  useEffect(() => {
    const { theme: initialTheme, isSystem } = getInitialTheme();
    setThemeState(initialTheme);
    setIsSystemPreference(isSystem);
    setIsInitialized(true);
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (!isInitialized) return;

    const root = document.documentElement;
    root.setAttribute('data-theme', theme);

    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'dark' ? '#0a0a0a' : '#fafafa');
    }
  }, [theme, isInitialized]);

  // Listen for system preference changes
  useEffect(() => {
    if (!isSystemPreference) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      setThemeState(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [isSystemPreference]);

  /**
   * Set a specific theme
   */
  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    setIsSystemPreference(false);
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    localStorage.setItem(SYSTEM_PREFERENCE_KEY, 'false');
  }, []);

  /**
   * Toggle between light and dark themes
   */
  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  }, [theme, setTheme]);

  /**
   * Reset to system preference
   */
  const resetToSystemPreference = useCallback(() => {
    const systemTheme = getSystemTheme();
    setThemeState(systemTheme);
    setIsSystemPreference(true);
    localStorage.removeItem(THEME_STORAGE_KEY);
    localStorage.setItem(SYSTEM_PREFERENCE_KEY, 'true');
  }, []);

  // Prevent flash of wrong theme
  if (!isInitialized) {
    return null;
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        setTheme,
        isSystemPreference,
        resetToSystemPreference,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Hook to access theme context
 * @throws Error if used outside ThemeProvider
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;
