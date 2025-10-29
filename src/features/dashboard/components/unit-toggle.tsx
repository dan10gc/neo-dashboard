import { ArrowLeftRight } from 'lucide-react';

interface UnitToggleProps {
  currentUnit: string;
  onToggle: () => void;
  ariaLabel?: string;
}

/**
 * Toggle button for cycling through unit options
 * Displays current unit and arrow icon
 */
export const UnitToggle = ({
  currentUnit,
  onToggle,
  ariaLabel
}: UnitToggleProps) => (
  <button
    onClick={onToggle}
    className="text-xs px-2 py-1 rounded bg-zinc-700/50 hover:bg-zinc-600/50
               text-zinc-400 hover:text-zinc-300 transition-colors
               border border-zinc-600 font-mono uppercase tracking-wider
               flex items-center gap-1"
    aria-label={ariaLabel || `Toggle unit from ${currentUnit}`}
  >
    {currentUnit}
    <ArrowLeftRight className="h-3 w-3" />
  </button>
);
