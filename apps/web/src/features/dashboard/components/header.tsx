import { Satellite } from "lucide-react"

interface HeaderProps {
  dateRange?: {
    startDate: string | null;
    endDate: string | null;
  };
  isConnected?: boolean;
  reconnectAttempts?: number;
}

export const Header=({ dateRange, isConnected = true, reconnectAttempts = 0 }:HeaderProps)=>{
    return (
        <header className="text-left mb-12">
        <div className="flex items-center gap-3 mb-2">
          <Satellite className="h-8 w-8 sm:h-10 sm:w-10 text-sky-400 flex-shrink-0" />
          <h1 className="text-zinc-100 text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight">
            Near-Earth Objects Monitor
          </h1>
        </div>
        <p className="text-zinc-400 text-sm uppercase tracking-wider">
          Real-time asteroid tracking powered by NASA API
        </p>
        <div className="mt-4 flex gap-3 flex-wrap">
          <div className="inline-block bg-zinc-800/50 px-4 py-2 rounded-sm border-2 border-zinc-700 text-zinc-400 uppercase text-xs tracking-wider font-bold">
            TRACKING:{" "}
            {dateRange && dateRange.startDate &&
              new Date(dateRange.startDate)
                .toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
                .replace(",", "")
                .toUpperCase()}{" "}
            {dateRange && dateRange.startDate && dateRange.endDate && "- "}
            {dateRange && dateRange.endDate &&
              new Date(dateRange.endDate)
                .toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
                .replace(",", "")
                .toUpperCase()}
            {!dateRange && <span className="animate-pulse">...</span>}
          </div>
          <div className="inline-block bg-zinc-800/50 px-4 py-2 rounded-sm border-2 border-cyan-700/50 text-cyan-400 uppercase text-xs tracking-wider font-bold">
            UPCOMING APPROACHES
          </div>
          <div className={`inline-block bg-zinc-800/50 px-4 py-2 rounded-sm border-2 ${
            isConnected
              ? 'border-green-700/50 text-green-400'
              : 'border-yellow-700/50 text-yellow-400'
          } uppercase text-xs tracking-wider font-bold transition-colors duration-300`}>
            <span className={isConnected ? 'animate-pulse' : ''}>●</span> {isConnected ? 'LIVE' : 'OFFLINE'}
            {!isConnected && reconnectAttempts > 0 && (
              <span className="ml-1 text-[10px]">({reconnectAttempts})</span>
            )}
          </div>
        </div>
      </header>
    )
}