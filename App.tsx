/**
 * @fileoverview Main Application Component
 * @description Root component that sets up routing and page layout
 * All sections are rendered as a single-page application with smooth scrolling
 */

import React from 'react';
import { HashRouter } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Contact from './pages/Contact';

/**
 * App Component
 * The root component that wraps all pages with routing and error handling
 *
 * @returns The rendered application
 */
const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <HashRouter>
          <Layout>
            <Home id="home" />
            <About id="about" />
            <Projects id="projects" />
            <Skills id="skills" />
            <Contact id="contact" />
          </Layout>
        </HashRouter>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
