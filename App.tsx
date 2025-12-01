/**
 * @fileoverview Main Application Component
 * @description Root component that sets up routing and page layout
 * All sections are rendered as a single-page application with smooth scrolling
 */

import React, { Suspense, lazy } from 'react';
import { HashRouter } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Layout from './components/Layout';

// Lazy load page components for better initial load performance
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const Skills = lazy(() => import('./pages/Skills'));
const Contact = lazy(() => import('./pages/Contact'));

/**
 * Loading fallback component displayed while lazy-loaded components are loading
 */
const PageLoader: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-3 border-gray-200 border-t-black rounded-full animate-spin" />
      <span className="text-sm text-gray-500 font-medium">Loading...</span>
    </div>
  </div>
);

/**
 * App Component
 * The root component that wraps all pages with routing and error handling
 * 
 * @returns The rendered application
 */
const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <HashRouter>
        <Layout>
          <Suspense fallback={<PageLoader />}>
            <Home id="home" />
            <About id="about" />
            <Projects id="projects" />
            <Skills id="skills" />
            <Contact id="contact" />
          </Suspense>
        </Layout>
      </HashRouter>
    </ErrorBoundary>
  );
};

export default App;