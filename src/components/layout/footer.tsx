import { Github } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="mt-16 py-8 border-t-2 border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-zinc-400 text-sm">
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
    </footer>
  );
};