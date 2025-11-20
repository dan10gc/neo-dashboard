import { Component, type ErrorInfo, type ReactNode } from "react";
import { Card } from "./ui/card";
import { AlertTriangle, RotateCw } from "lucide-react";
import posthog from "posthog-js";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    posthog.captureException(error, { errorInfo });
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-zinc-950 text-zinc-50 p-6 flex items-center justify-center font-mono">
          <Card className="bg-zinc-800/50 border-2 border-red-800/50 p-8 max-w-lg rounded-sm">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="h-10 w-10 text-red-500 flex-shrink-0" />
              <div>
                <h2 className="text-xl font-bold text-red-400 uppercase tracking-wider">
                  System Error
                </h2>
                <p className="text-xs text-red-500/70 uppercase tracking-wide mt-0.5">
                  Critical Failure Detected
                </p>
              </div>
            </div>

            {/* Message */}
            <div className="mb-6 p-4 bg-zinc-900/50 border-l-4 border-red-700 rounded-sm">
              <p className="text-zinc-300 text-sm leading-relaxed">
                A critical error has occurred in the monitoring system. This
                could be due to data corruption, network failure, or API
                unavailability.
              </p>
            </div>

            {/* Error Details */}
            {this.state.error && (
              <details className="mb-6 group">
                <summary className="cursor-pointer text-zinc-400 hover:text-zinc-300 text-xs uppercase tracking-wider font-bold transition-colors flex items-center gap-2">
                  <span className="inline-block w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  Technical Diagnostics
                </summary>
                <div className="mt-3 p-4 bg-zinc-950/80 border border-zinc-700 rounded-sm">
                  <div className="text-xs text-zinc-500 uppercase tracking-wider mb-2">
                    Error Log:
                  </div>
                  <pre className="text-xs text-red-400 font-mono overflow-auto max-h-32">
                    {this.state.error.message}
                  </pre>
                  {this.state.error.stack && (
                    <>
                      <div className="text-xs text-zinc-500 uppercase tracking-wider mb-2 mt-4">
                        Stack Trace:
                      </div>
                      <pre className="text-xs text-zinc-500 font-mono overflow-auto max-h-32">
                        {this.state.error.stack}
                      </pre>
                    </>
                  )}
                </div>
              </details>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => window.location.reload()}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-sm transition-colors uppercase text-xs tracking-wider font-bold border-2 border-red-700"
              >
                <RotateCw className="h-4 w-4" />
                Restart System
              </button>
              <button
                onClick={() => window.history.back()}
                className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 rounded-sm transition-colors uppercase text-xs tracking-wider font-bold border-2 border-zinc-600"
              >
                Go Back
              </button>
            </div>

            {/* Status Footer */}
            <div className="mt-6 pt-4 border-t-2 border-zinc-700">
              <div className="text-xs text-zinc-500 uppercase tracking-wider">
                <span className="text-red-500">●</span> System Status: OFFLINE
              </div>
            </div>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}