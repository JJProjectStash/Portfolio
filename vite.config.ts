/**
 * @fileoverview Vite Configuration
 * @description Build configuration for the portfolio application
 * Includes optimizations for production builds and development server settings
 */

import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load environment variables based on mode (development/production)
  const env = loadEnv(mode, '.', '');

  return {
    // Development server configuration
    server: {
      port: 3000,
      host: '0.0.0.0',
      open: true, // Automatically open browser on start
    },

    // Preview server (for testing production builds locally)
    preview: {
      port: 4173,
      host: '0.0.0.0',
    },

    // Plugins
    plugins: [react()],

    // Environment variable definitions
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },

    // Path alias resolution
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
        '@components': path.resolve(__dirname, './components'),
        '@pages': path.resolve(__dirname, './pages'),
      },
    },

    // Build configuration
    build: {
      // Output directory
      outDir: 'dist',

      // Generate source maps for debugging
      sourcemap: mode === 'development',

      // Code splitting configuration
      rollupOptions: {
        output: {
          // Manual chunk splitting for better caching
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            router: ['react-router-dom'],
            animation: ['framer-motion'],
            icons: ['lucide-react'],
          },
        },
      },

      // Chunk size warning limit (in kB)
      chunkSizeWarningLimit: 500,
    },

    // Optimization settings
    optimizeDeps: {
      // Pre-bundle these dependencies for faster dev server startup
      include: ['react', 'react-dom', 'react-router-dom', 'framer-motion', 'lucide-react'],
    },
  };
});
