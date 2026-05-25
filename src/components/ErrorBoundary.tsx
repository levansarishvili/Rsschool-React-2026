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
        <div className="min-h-screen w-full bg-background-secondary text-foreground flex items-center justify-center p-4 font-mono select-none">
          <div className="w-full max-w-lg bg-card border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(43,41,39,1)] dark:shadow-[8px_8px_0px_0px_rgba(244,239,226,1)] overflow-hidden">
            <div className="bg-danger text-background px-4 py-2 border-b-4 border-foreground flex items-center justify-between">
              <span className="font-black tracking-wider uppercase text-sm">
                ⚠️ CRITICAL_SYSTEM_ERROR
              </span>
              <div className="flex gap-1">
                <span className="w-3 h-3 bg-background border border-foreground inline-block"></span>
                <span className="w-3 h-3 bg-background border border-foreground inline-block"></span>
              </div>
            </div>

            <div className="p-6 flex flex-col items-center gap-6 text-center">
              <div className="relative p-2 bg-surface border-2 border-foreground bg-grid-pattern">
                <img
                  className="w-56 max-w-full opacity-80 grayscale contrast-125 dark:invert"
                  src="/assets/page-not-found.svg"
                  alt="Page error"
                />
                <span className="absolute bottom-1 right-2 text-[10px] font-black text-text-muted">
                  DUMP_IDX_0x00F
                </span>
              </div>

              <div className="space-y-2 w-full">
                <h2 className="text-xl font-black uppercase tracking-tight text-danger">
                  Oops! Something went wrong.
                </h2>

                <div className="bg-background border-2 border-foreground p-3 text-left overflow-x-auto rounded-sm max-h-24">
                  <p className="text-xs md:text-sm text-text-secondary font-bold font-mono break-all">
                    <span className="text-danger font-black">
                      &gt; EXCEPTION:
                    </span>{' '}
                    {this.state.error.message || 'Unknown error occurred'}
                  </p>
                </div>
              </div>

              <div className="w-full border-t-2 border-dashed border-foreground/20 my-1" />

              <button
                className="w-full sm:w-auto min-w-40 cursor-pointer bg-primary text-foreground font-black text-sm uppercase tracking-wider 
                px-6 py-3 border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(43,41,39,1)] dark:shadow-[4px_4px_0px_0px_rgba(244,239,226,1)] active:translate-x-0.75 active:translate-y-0.75 active:shadow-[1px_1px_0px_0px_rgba(43,41,39,1)] dark:active:shadow-[1px_1px_0px_0px_rgba(244,239,226,1)] transition-all"
                onClick={this.handleReset}
              >
                Reboot System
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
