import { Component, ErrorInfo, ReactNode } from "react";
import { Card } from "./ui/card";
import { AlertCircle } from "lucide-react";

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
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-zinc-950 text-zinc-50 p-6 flex items-center justify-center">
          <Card className="bg-zinc-900 border-red-900 p-8 max-w-lg">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="h-8 w-8 text-red-500" />
              <h2 className="text-2xl font-bold text-red-500">
                Something went wrong
              </h2>
            </div>
            <p className="text-zinc-300 mb-4">
              We encountered an error while loading the asteroid data. This
              could be due to API issues or network problems.
            </p>
            {this.state.error && (
              <details className="mb-4">
                <summary className="cursor-pointer text-zinc-400 hover:text-zinc-300">
                  Error details
                </summary>
                <pre className="mt-2 p-4 bg-zinc-950 rounded text-sm overflow-auto">
                  {this.state.error.message}
                </pre>
              </details>
            )}
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors"
            >
              Reload page
            </button>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}