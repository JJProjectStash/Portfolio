/**
 * @fileoverview Error Boundary Component
 * @description Provides graceful error handling for React components
 * Catches JavaScript errors anywhere in the child component tree,
 * logs them, and displays a fallback UI instead of crashing.
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorBoundaryProps {
  /** Child components to be wrapped by the error boundary */
  children: ReactNode;
  /** Optional custom fallback component to render on error */
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  /** Whether an error has been caught */
  hasError: boolean;
  /** The error that was caught */
  error: Error | null;
}

/**
 * Error Boundary Component
 * Catches JavaScript errors in child components and displays fallback UI
 *
 * @example
 * <ErrorBoundary>
 *   <MyComponent />
 * </ErrorBoundary>
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  /**
   * Updates state when an error is caught
   * @param error - The error that was thrown
   */
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  /**
   * Logs error information for debugging
   * @param error - The error that was thrown
   * @param errorInfo - Additional error information from React
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error to console in development
    console.error('ErrorBoundary caught an error:', error);
    console.error('Component stack:', errorInfo.componentStack);

    // In production, you could send this to an error reporting service
    // Example: errorReportingService.log({ error, errorInfo });
  }

  /**
   * Resets the error state and attempts to re-render children
   */
  handleReset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  /**
   * Reloads the entire page
   */
  handleReload = (): void => {
    window.location.reload();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Render custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="max-w-md w-full bg-white rounded-3xl shadow-lg border border-gray-100 p-10 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-10 h-10 text-gray-600" strokeWidth={1.5} />
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">
              Something went wrong
            </h1>

            <p className="text-gray-500 mb-8 leading-relaxed">
              An unexpected error occurred. Please try refreshing the page or click the button below
              to try again.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={this.handleReset}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
              >
                Try Again
              </button>

              <button
                onClick={this.handleReload}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-black text-white font-semibold rounded-xl hover:bg-gray-900 transition-colors"
              >
                <RefreshCw size={18} />
                Reload Page
              </button>
            </div>

            {/* Show error details in development */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-8 text-left">
                <summary className="text-sm font-medium text-gray-500 cursor-pointer hover:text-gray-700">
                  Error Details (Development Only)
                </summary>
                <pre className="mt-3 p-4 bg-gray-50 rounded-xl text-xs text-red-600 overflow-auto max-h-40 border border-gray-200">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
