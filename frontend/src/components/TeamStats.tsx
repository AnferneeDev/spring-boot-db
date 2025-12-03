import type { FantasyTeam } from "@/types/player";
import { Target, Footprints, AlertTriangle, TrendingUp, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface TeamStatsProps {
  team: FantasyTeam;
}

export function TeamStats({ team }: TeamStatsProps) {
  const players = Object.values(team).filter(Boolean);
  const playerCount = players.length;
  const isComplete = playerCount === 11;

  const stats = {
    goals: players.reduce((sum, p) => sum + (p?.goals || 0), 0),
    assists: players.reduce((sum, p) => sum + (p?.assists || 0), 0),
    minutes: players.reduce((sum, p) => sum + (p?.minutesPlayed || 0), 0),
    yellowCards: players.reduce((sum, p) => sum + (p?.yellowCards || 0), 0),
    xG: players.reduce((sum, p) => sum + (p?.expectedGoals || 0), 0),
    xA: players.reduce((sum, p) => sum + (p?.expectedAssists || 0), 0),
  };

  // Calculate team "power" score
  const powerScore = Math.round(stats.goals * 3 + stats.assists * 2 + stats.xG * 2.5 + stats.xA * 1.5);

  return (
    <div className="card-gradient rounded-xl border border-border p-4 animate-fade-in">
      <h3 className="font-display text-lg tracking-wide mb-4 flex items-center gap-2">
        <Star className={cn("w-5 h-5 transition-all", isComplete ? "text-gold animate-pulse" : "text-muted-foreground")} />
        Team Stats
        <span className={cn("text-sm font-sans font-normal transition-colors", isComplete ? "text-primary" : "text-muted-foreground")}>({playerCount}/11 players)</span>
      </h3>

      {/* Power Score */}
      <div className={cn("mb-4 p-3 rounded-lg border transition-all", isComplete ? "bg-primary/10 border-primary/30 animate-pulse-glow" : "bg-secondary/50 border-border")}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className={cn("w-5 h-5", isComplete ? "text-primary" : "text-muted-foreground")} />
            <span className="text-sm font-medium">Team Power</span>
          </div>
          <span className={cn("font-display text-2xl", isComplete ? "text-primary" : "text-foreground")}>{powerScore}</span>
        </div>
        {/* Power Bar */}
        <div className="mt-2 h-2 bg-secondary rounded-full overflow-hidden">
          <div className={cn("h-full transition-all duration-500 rounded-full", isComplete ? "bg-linear-to-r from-primary to-gold" : "bg-primary/50")} style={{ width: `${Math.min(100, powerScore / 10)}%` }} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <StatItem icon={<Target className="w-4 h-4" />} label="Total Goals" value={stats.goals} color="text-primary" delay={0} />
        <StatItem icon={<Footprints className="w-4 h-4" />} label="Total Assists" value={stats.assists} color="text-primary" delay={50} />
        <StatItem icon={<span className="text-xs font-bold">xG</span>} label="Expected Goals" value={stats.xG.toFixed(1)} color="text-muted-foreground" delay={100} />
        <StatItem icon={<AlertTriangle className="w-4 h-4" />} label="Yellow Cards" value={stats.yellowCards} color="text-gold" delay={150} />
      </div>
    </div>
  );
}

function StatItem({ icon, label, value, color, delay = 0 }: { icon: React.ReactNode; label: string; value: number | string; color: string; delay?: number }) {
  return (
    <div className="bg-secondary/50 rounded-lg p-3 transition-all hover:bg-secondary hover:scale-105 animate-slide-up" style={{ animationDelay: `${delay}ms` }}>
      <div className="flex items-center gap-2 text-muted-foreground mb-1">
        {icon}
        <span className="text-xs uppercase tracking-wider">{label}</span>
      </div>
      <span className={`font-display text-2xl ${color}`}>{value}</span>
    </div>
  );
}
