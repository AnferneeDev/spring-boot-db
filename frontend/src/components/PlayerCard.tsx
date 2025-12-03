import type { Player } from "@/types/player";
import { cn } from "@/lib/utils";
import { Target, Footprints, Calendar } from "lucide-react";
import { getFlagUrl, getTeamBadge } from "@/utils/teamUtils";

interface PlayerCardProps {
  player: Player;
  onSelect?: (player: Player) => void;
  isSelected?: boolean;
  compact?: boolean;
  animationDelay?: number;
}

const positionColors: Record<string, string> = {
  GK: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  DF: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  MF: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  FW: "bg-red-500/20 text-red-400 border-red-500/30",
};

export function PlayerCard({ player, onSelect, isSelected, compact, animationDelay = 0 }: PlayerCardProps) {
  const positionClass = positionColors[player.position] || positionColors.MF;
  const flagUrl = getFlagUrl(player.nation);
  const teamBadge = getTeamBadge(player.teamName);

  if (compact) {
    return (
      <button
        onClick={() => onSelect?.(player)}
        style={{ animationDelay: `${animationDelay}ms` }}
        className={cn(
          "w-full p-3 rounded-lg card-gradient border transition-all duration-200 animate-fade-in",
          "hover:border-primary/50 hover:shadow-glow hover:scale-[1.02] active:scale-[0.98]",
          isSelected ? "border-primary shadow-glow" : "border-border"
        )}
      >
        <div className="flex items-center gap-3">
          {/* Position Badge */}
          <div className={cn("px-2 py-0.5 rounded text-xs font-semibold border transition-transform hover:scale-110", positionClass)}>{player.position}</div>

          {/* Flag */}
          {flagUrl && <img src={flagUrl} alt={player.nation} className="h-4 rounded-sm shadow-sm transition-transform hover:scale-125" onError={(e) => (e.currentTarget.style.display = "none")} />}

          {/* Player Name */}
          <span className="font-medium truncate flex-1 text-left">{player.playerName}</span>

          {/* Team Badge */}
          <div className={cn("w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 transition-all hover:scale-110 shadow-sm", teamBadge.bg, teamBadge.text)}>{teamBadge.initials}</div>
        </div>
      </button>
    );
  }

  return (
    <div
      onClick={() => onSelect?.(player)}
      style={{ animationDelay: `${animationDelay}ms` }}
      className={cn(
        "group relative overflow-hidden rounded-xl card-gradient border p-4 transition-all duration-300 cursor-pointer animate-scale-in",
        "hover:border-primary/50 hover:shadow-glow hover:-translate-y-1 active:scale-[0.98]",
        isSelected ? "border-primary shadow-glow animate-pulse-glow" : "border-border"
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={cn("px-2 py-1 rounded text-xs font-bold border transition-all group-hover:scale-110", positionClass)}>{player.position}</div>
          {flagUrl && <img src={flagUrl} alt={player.nation} className="h-4 rounded-sm opacity-80 transition-all group-hover:opacity-100 group-hover:scale-110 shadow-sm" onError={(e) => (e.currentTarget.style.display = "none")} />}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {player.age}
          </span>
        </div>
      </div>

      {/* Player Info */}
      <div className="mb-4">
        <h3 className="font-display text-xl tracking-wide truncate group-hover:text-primary transition-colors">{player.playerName}</h3>
        <div className="flex items-center gap-2 mt-1">
          <div className={cn("w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-bold transition-transform group-hover:scale-110 shadow-sm", teamBadge.bg, teamBadge.text)}>{teamBadge.initials}</div>
          <p className="text-sm text-muted-foreground">{player.teamName}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-2">
        <StatBox icon={<Target className="w-3 h-3" />} label="Goals" value={player.goals} delay={100} />
        <StatBox icon={<Footprints className="w-3 h-3" />} label="Assists" value={player.assists} delay={150} />
        <StatBox icon={<span className="text-[10px]">xG</span>} label="Expected" value={player.expectedGoals.toFixed(1)} delay={200} />
      </div>

      {/* Hover Effect Gradient */}
      <div className="absolute inset-0 bg-linear-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      {/* Shimmer Effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/5 to-transparent pointer-events-none" />
    </div>
  );
}

function StatBox({ icon, label, value }: { icon: React.ReactNode; label: string; value: number | string; delay?: number }) {
  return (
    <div className="bg-secondary/50 rounded-lg p-2 text-center transition-all hover:bg-secondary hover:scale-105">
      <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
        {icon}
        <span className="text-[10px] uppercase tracking-wider">{label}</span>
      </div>
      <span className="font-display text-lg text-gold">{value}</span>
    </div>
  );
}
