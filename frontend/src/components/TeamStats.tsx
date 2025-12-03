import type { FantasyTeam } from "@/types/player";
import { Target, Footprints, AlertTriangle, TrendingUp, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";

// Defines the props for the TeamStats component
interface TeamStatsProps {
  team: FantasyTeam;
}

// Defines the props for the StatItem component
function StatItem({ icon, label, value, delay = 0 }: { icon: React.ReactNode; label: string; value: number | string; delay?: number }) {
  // Determine color based on stat type
  const isDestructive = label === "Yellow Cards";

  return (
    // Inner stat card: light background (white) for black text legibility
    <div className="bg-white text-black rounded-lg p-3 transition-all hover:bg-zinc-100 hover:scale-[1.03] animate-slide-up shadow-md" style={{ animationDelay: `${delay}ms` }}>
      {/* Stat label and icon container */}
      <div className="flex items-center gap-2 text-zinc-500 mb-1">
        {icon}
        <span className="text-xs uppercase tracking-wider">{label}</span>
      </div>
      {/* Stat value: Primary value text is black */}
      <span
        className={cn(
          "font-display text-2xl",
          isDestructive && "text-red-600" // Destructive color for cards
        )}
      >
        {value}
      </span>
    </div>
  );
}

// TeamStats component definition
export function TeamStats({ team }: TeamStatsProps) {
  const players = Object.values(team).filter(Boolean);
  const playerCount = players.length;
  const isComplete = playerCount === 11;

  // Calculate core statistics
  const stats = {
    goals: players.reduce((sum, p) => sum + (p?.goals || 0), 0),
    assists: players.reduce((sum, p) => sum + (p?.assists || 0), 0),
    minutes: players.reduce((sum, p) => sum + (p?.minutesPlayed || 0), 0),
    yellowCards: players.reduce((sum, p) => sum + (p?.yellowCards || 0), 0),
    xG: players.reduce((sum, p) => sum + (p?.expectedGoals || 0), 0),
    xA: players.reduce((sum, p) => sum + (p?.expectedAssists || 0), 0),
  };

  // Calculate team power score
  const powerScore = Math.round(stats.goals * 3 + stats.assists * 2 + stats.xG * 2.5 + stats.xA * 1.5);

  return (
    // Outer card wrapper: Dark background matching the landing page theme
    <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4 animate-fade-in shadow-xl">
      <h3 className="font-display text-lg tracking-wide mb-4 flex items-center gap-2 text-white">
        <Star className={cn("w-5 h-5 transition-all", isComplete ? "text-emerald-400 animate-pulse" : "text-zinc-500")} />
        Team Stats
        <span className={cn("text-sm font-sans font-normal transition-colors", isComplete ? "text-emerald-400" : "text-zinc-500")}>({playerCount}/11 players)</span>
      </h3>

      {/* Power Score */}
      <div className={cn("mb-4 p-3 rounded-lg border transition-all", isComplete ? "bg-emerald-600/20 border-emerald-500/30 animate-pulse-glow" : "bg-zinc-800 border-zinc-700")}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Text: Team Power label should be white */}
            <TrendingUp className={cn("w-5 h-5", isComplete ? "text-white" : "text-zinc-400")} />
            <span className="text-sm font-medium text-white">Team Power</span>
          </div>
          {/* Number: Power score value should be white */}
          <span className="font-display text-2xl text-white">{powerScore}</span>
        </div>
        {/* Power Bar */}
        <div className="mt-2 h-2 bg-zinc-700 rounded-full overflow-hidden">
          {/* Using emerald for the progress color */}
          <div className={cn("h-full transition-all duration-500 rounded-full bg-emerald-600")} style={{ width: `${Math.min(100, powerScore / 5)}%` }} />
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-2 gap-3 ">
        <StatItem icon={<Target className="w-4 h-4 text-zinc-500" />} label="Total Goals" value={stats.goals} delay={0} />
        <StatItem icon={<Footprints className="w-4 h-4 text-zinc-500" />} label="Total Assists" value={stats.assists} delay={50} />
        <StatItem icon={<span className="text-xs font-bold text-zinc-500">xG</span>} label="Expected Goals" value={stats.xG.toFixed(1)} delay={100} />
        <StatItem icon={<AlertTriangle className="w-4 h-4 text-zinc-500" />} label="Yellow Cards" value={stats.yellowCards} delay={150} />
      </div>
    </div>
  );
}
