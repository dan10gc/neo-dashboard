import { BookOpen, Github, Home } from "lucide-react";
import { usePostHog } from "posthog-js/react";
import { Link, useLocation } from "react-router";

export const Footer = () => {
  const location = useLocation();
  const isInfoPage = location.pathname === "/close-approach-info";
  const posthog = usePostHog();

  return (
    <footer className="mt-16 py-8 border-t-2 border-zinc-800">
      <div className="max-w-7xl mx-auto px-6">
        {/* Navigation Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-6 pb-6 border-b border-zinc-800">
          {isInfoPage ? (
            <Link
              to="/"
              onClick={() => {
                posthog?.capture('back_to_dashboard_clicked', {
                  source: 'footer',
                  from_page: 'close_approach_info'
                });
              }}
              className="flex items-center gap-2 text-zinc-400 hover:text-sky-400 transition-colors group"
            >
              <Home className="h-4 w-4 group-hover:scale-110 transition-transform" />
              <span className="text-sm uppercase tracking-wider font-bold">
                Back to Dashboard
              </span>
            </Link>
          ) : (
            <Link
              to="/close-approach-info"
              onClick={() => {
                posthog?.capture('understanding_alerts_clicked', {
                  source: 'footer',
                  from_page: 'dashboard'
                });
              }}
              className="flex items-center gap-2 text-zinc-400 hover:text-sky-400 transition-colors group"
            >
              <BookOpen className="h-4 w-4 group-hover:scale-110 transition-transform" />
              <span className="text-sm uppercase tracking-wider font-bold">
                Understanding Alerts
              </span>
            </Link>
          )}
        </div>

        {/* Footer Info */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-zinc-400 text-sm text-center md:text-left">
            <p>
              Built by{" "}
              <a
                href="https://danielgc.design"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 hover:text-sky-300 transition-colors underline"
              >
                Daniel Gonzalez
              </a>{" "}
              © {new Date().getFullYear()}
            </p>
            <p className="text-xs text-zinc-500 mt-1">
              Data provided by NASA's NeoWs API
            </p>
          </div>

          <a
            href="https://github.com/dan10gc/neo-dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-zinc-400 hover:text-sky-400 transition-colors group"
          >
            <Github className="h-5 w-5 group-hover:scale-110 transition-transform" />
            <span className="text-sm uppercase tracking-wider font-bold">
              View on GitHub
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
};