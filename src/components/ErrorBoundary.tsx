import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

type PropsType = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
  error: Error | null;
};

class ErrorBoundary extends Component<PropsType, State> {
  state: State = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      return (
        <div className="min-h-screen w-full bg-background-secondary/40 text-foreground flex items-center justify-center p-4 font-sans select-none antialiased">
          <div className="w-full max-w-md bg-card border border-border/80 rounded-2xl shadow-xl overflow-hidden p-6 md:p-8 flex flex-col items-center gap-6 text-center transition-all duration-300">
            <div className="w-14 h-14 rounded-full bg-danger/10 text-danger flex items-center justify-center shadow-xs">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>

            <div className="space-y-2">
              <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
                Oops! something went wrong
              </h1>
              <p className="text-sm text-text-secondary max-w-xs mx-auto leading-relaxed">
                An unexpected error occurred while loading this page layout. You
                can try reloading your session.
              </p>
            </div>

            <div className="w-full bg-background-secondary border border-border rounded-xl p-3 text-left overflow-x-auto max-h-24 shadow-inner">
              <p className="text-xs text-text-muted font-mono break-all leading-normal flex items-start gap-1.5">
                <span className="text-danger font-semibold tracking-wider select-none shrink-0">
                  [Error]
                </span>
                <span>
                  {this.state.error.name || 'RuntimeError'}:{' '}
                  {this.state.error.message || 'Unknown exception.'}
                </span>
              </p>
            </div>

            <div className="w-full border-t border-border/60 my-1" />

            <div className="w-full flex flex-col sm:flex-row items-center gap-3 justify-center">
              <button
                onClick={this.handleReset}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-primary text-white font-medium text-sm transition-all duration-200 cursor-pointer shadow-sm shadow-primary/20 hover:bg-primary-hover active:scale-98"
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
