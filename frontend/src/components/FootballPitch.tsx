import type { FantasyTeam } from "@/types/player";
import type { FormationSlot } from "@/utils/formations";
import { cn } from "@/lib/utils";
import { User, X, Sparkles } from "lucide-react";
import { getFlagUrl, getTeamBadge } from "@/utils/teamUtils";

interface FootballPitchProps {
  team: FantasyTeam;
  formation: FormationSlot[];
  selectedPosition: string | null;
  onPositionClick: (positionId: string) => void;
  onRemovePlayer: (positionId: string) => void;
}

export function FootballPitch({ team, formation, selectedPosition, onPositionClick, onRemovePlayer }: FootballPitchProps) {
  return (
    <div className="relative w-full aspect-3/4 max-w-lg mx-auto pitch-gradient rounded-2xl overflow-hidden shadow-card animate-fade-in">
      {/* Pitch Lines */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 133" preserveAspectRatio="none">
        {/* Outer boundary */}
        <rect x="5" y="5" width="90" height="123" fill="none" stroke="hsl(142, 76%, 45%)" strokeWidth="0.5" opacity="0.6" />

        {/* Center line */}
        <line x1="5" y1="66.5" x2="95" y2="66.5" stroke="hsl(142, 76%, 45%)" strokeWidth="0.5" opacity="0.6" />

        {/* Center circle */}
        <circle cx="50" cy="66.5" r="12" fill="none" stroke="hsl(142, 76%, 45%)" strokeWidth="0.5" opacity="0.6" />
        <circle cx="50" cy="66.5" r="1" fill="hsl(142, 76%, 45%)" opacity="0.6" />

        {/* Top penalty area */}
        <rect x="25" y="5" width="50" height="22" fill="none" stroke="hsl(142, 76%, 45%)" strokeWidth="0.5" opacity="0.6" />
        <rect x="35" y="5" width="30" height="8" fill="none" stroke="hsl(142, 76%, 45%)" strokeWidth="0.5" opacity="0.6" />
        <path d="M 35 27 Q 50 35 65 27" fill="none" stroke="hsl(142, 76%, 45%)" strokeWidth="0.5" opacity="0.6" />

        {/* Bottom penalty area */}
        <rect x="25" y="106" width="50" height="22" fill="none" stroke="hsl(142, 76%, 45%)" strokeWidth="0.5" opacity="0.6" />
        <rect x="35" y="120" width="30" height="8" fill="none" stroke="hsl(142, 76%, 45%)" strokeWidth="0.5" opacity="0.6" />
        <path d="M 35 106 Q 50 98 65 106" fill="none" stroke="hsl(142, 76%, 45%)" strokeWidth="0.5" opacity="0.6" />
      </svg>

      {/* Position Markers */}
      {formation.map((slot, index) => {
        const player = team[slot.id];
        const isSelected = selectedPosition === slot.id;
        const flagUrl = player ? getFlagUrl(player.nation) : null;
        const teamBadge = player ? getTeamBadge(player.teamName) : null;

        return (
          <div
            key={slot.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
            style={{
              top: slot.top,
              left: slot.left,
              animationDelay: `${index * 50}ms`,
            }}
          >
            {player ? (
              <div className={cn("group relative flex flex-col items-center animate-bounce-in")}>
                {/* Remove Button */}
                <button
                  onClick={() => onRemovePlayer(slot.id)}
                  className="absolute -top-1 -right-1 z-20 w-5 h-5 bg-destructive rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all group-hover:scale-110 hover:bg-destructive/80"
                >
                  <X className="w-3 h-3 text-destructive-foreground" />
                </button>

                {/* Player Circle */}
                <div className="relative">
                  <div className={cn("w-12 h-12 rounded-full bg-card border-2 border-primary shadow-glow flex items-center justify-center transition-all", "group-hover:scale-110 group-hover:border-gold")}>
                    <User className="w-6 h-6 text-primary group-hover:text-gold transition-colors" />
                  </div>

                  {/* Flag Badge */}
                  {flagUrl && <img src={flagUrl} alt="" className="absolute -top-1 -left-1 h-4 rounded-sm shadow-md border border-border/50" onError={(e) => (e.currentTarget.style.display = "none")} />}

                  {/* Team Badge */}
                  {teamBadge && <div className={cn("absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[7px] font-bold shadow-md border border-border/50", teamBadge.bg, teamBadge.text)}>{teamBadge.initials}</div>}
                </div>

                {/* Player Name */}
                <div className=" mt-1 px-2 py-0.5 bg-black rounded text-[10px] font-medium max-w-20 truncate text-center backdrop-blur-sm shadow-sm group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {player.playerName.split(" ").pop()}
                </div>
              </div>
            ) : (
              <button
                onClick={() => onPositionClick(slot.id)}
                className={cn(
                  "w-12 h-12 rounded-full border-2 border-dashed flex items-center justify-center transition-all duration-300 animate-fade-in",
                  isSelected ? "border-primary bg-primary/20 scale-110 animate-pulse-glow" : "border-foreground/30 bg-card/50 hover:border-primary/50 hover:bg-primary/10 hover:scale-105"
                )}
              >
                {isSelected ? <Sparkles className="w-4 h-4 text-primary animate-pulse" /> : <span className="text-xs font-semibold text-foreground/70">{slot.label}</span>}
              </button>
            )}
          </div>
        );
      })}

      {/* Floating Decoration */}
      <div className="absolute top-4 right-4 opacity-20 animate-float">
        <Sparkles className="w-8 h-8 text-primary" />
      </div>
    </div>
  );
}
