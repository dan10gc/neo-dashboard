import { Satellite } from "lucide-react";

export function LoaderScreen() {
  const messages = [
    "CONNECTING TO NASA NEO NETWORK",
    "SCANNING NEAR-EARTH OBJECT DATABASE",
    "COMPUTING ORBITAL TRAJECTORIES",
    "ANALYZING CLOSE APPROACH DATA",
    "SYSTEMS READY - DISPLAY ONLINE",
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Satellite className="h-20 w-20 text-sky-400 animate-pulse" />
          </div>
          <h1 className="text-4xl font-bold mb-2 tracking-tight">
            NEAR-EARTH OBJECT DASHBOARD
          </h1>
          <p className="text-zinc-500 text-sm tracking-wider font-mono">
            INITIALIZING SYSTEMS...
          </p>
        </div>

        {/* Loading Messages */}
        <div className="space-y-4 font-mono">
          {messages.map((message, index) => (
            <div
              key={index}
              className="loader-item flex items-center gap-3 text-cyan-400 opacity-0"
              style={{ animationDelay: `${index * 500}ms` }}
            >
              <span className="text-xl">■</span>
              <span className="text-sm tracking-wide">{message}</span>
            </div>
          ))}
        </div>

        {/* Optional: Loading bar or pulse indicator */}
        <div className="mt-12 flex justify-center">
          <div className="h-1 w-48 bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full bg-cyan-400 animate-pulse" style={{ width: "100%" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
