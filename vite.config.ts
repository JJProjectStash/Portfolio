/**
 * @fileoverview Vite Configuration
 * @description Build configuration for the portfolio application
 * Includes optimizations for production builds, code splitting, and development server settings
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
    plugins: [
      react({
        // Enable Fast Refresh for development
        fastRefresh: true,
      }),
    ],
    
    // Environment variable definitions
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.NODE_ENV': JSON.stringify(mode),
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
      
      // Generate source maps for debugging (disable in production for smaller bundles)
      sourcemap: mode === 'development',
      
      // Minification settings
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: mode === 'production', // Remove console.logs in production
          drop_debugger: true,
        },
      },
      
      // Code splitting configuration
      rollupOptions: {
        output: {
          // Manual chunk splitting for better caching
          manualChunks: {
            // Separate vendor chunks for better caching
            'react-vendor': ['react', 'react-dom'],
            'router': ['react-router-dom'],
            'animation': ['framer-motion'],
            'icons': ['lucide-react'],
          },
          // Asset file naming
          assetFileNames: (assetInfo) => {
            const extType = assetInfo.name?.split('.').pop() || '';
            if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp/i.test(extType)) {
              return 'assets/images/[name]-[hash][extname]';
            }
            if (/woff2?|eot|ttf|otf/i.test(extType)) {
              return 'assets/fonts/[name]-[hash][extname]';
            }
            return 'assets/[name]-[hash][extname]';
          },
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
        },
      },
      
      // Chunk size warning limit (in kB)
      chunkSizeWarningLimit: 500,
      
      // CSS code splitting
      cssCodeSplit: true,
    },
    
    // Optimization settings
    optimizeDeps: {
      // Pre-bundle these dependencies for faster dev server startup
      include: ['react', 'react-dom', 'react-router-dom', 'framer-motion', 'lucide-react'],
    },
  };
});
