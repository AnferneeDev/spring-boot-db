import { useState, useMemo } from "react";
import { Player } from "@/types/player";
import { PlayerCard } from "./PlayerCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Sparkles } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { getTeamBadge } from "@/utils/teamUtils";

interface PlayerSearchProps {
  players: Player[];
  onSelectPlayer: (player: Player) => void;
  selectedPlayerName?: string;
  filterPosition?: string;
}

export function PlayerSearch({ players, onSelectPlayer, selectedPlayerName, filterPosition }: PlayerSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [teamFilter, setTeamFilter] = useState<string>("all");
  const [positionFilter, setPositionFilter] = useState<string>(filterPosition || "all");
  const [isFocused, setIsFocused] = useState(false);

  const teams = useMemo(() => {
    const uniqueTeams = [...new Set(players.map((p) => p.teamName))].sort();
    return uniqueTeams;
  }, [players]);

  const positions = ["GK", "DF", "MF", "FW"];

  const filteredPlayers = useMemo(() => {
    return players
      .filter((player) => {
        const matchesSearch = player.playerName.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTeam = teamFilter === "all" || player.teamName === teamFilter;
        const matchesPosition = positionFilter === "all" || player.position === positionFilter;
        return matchesSearch && matchesTeam && matchesPosition;
      })
      .slice(0, 50);
  }, [players, searchQuery, teamFilter, positionFilter]);

  return (
    <div className="flex flex-col h-full animate-fade-in">
      {/* Search Header */}
      <div className="space-y-3 mb-4">
        <div className={cn("relative transition-all duration-300", isFocused && "scale-[1.02]")}>
          <Search className={cn("absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors", isFocused ? "text-primary" : "text-muted-foreground")} />
          <Input
            placeholder="Search players..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={cn("pl-10 bg-secondary border-border transition-all", isFocused && "border-primary shadow-glow")}
          />
          {searchQuery && <Sparkles className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary animate-pulse" />}
        </div>

        <div className="flex gap-2">
          <Select value={teamFilter} onValueChange={setTeamFilter}>
            <SelectTrigger className="flex-1 bg-secondary border-border hover:border-primary/50 transition-colors">
              <SelectValue placeholder="Team" />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              <SelectItem value="all">All Teams</SelectItem>
              {teams.map((team) => {
                const badge = getTeamBadge(team);
                return (
                  <SelectItem key={team} value={team}>
                    <div className="flex items-center gap-2">
                      <div className={cn("w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold", badge.bg, badge.text)}>{badge.initials}</div>
                      <span>{team}</span>
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>

          <Select value={positionFilter} onValueChange={setPositionFilter}>
            <SelectTrigger className="w-28 bg-secondary border-border hover:border-primary/50 transition-colors">
              <SelectValue placeholder="Position" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {positions.map((pos) => (
                <SelectItem key={pos} value={pos}>
                  {pos}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground animate-slide-in-left">
        <Filter className="w-4 h-4" />
        <span>{filteredPlayers.length} players found</span>
      </div>

      {/* Player List */}
      <ScrollArea className="flex-1 -mr-4 pr-4">
        <div className="grid gap-3">
          {filteredPlayers.map((player, index) => (
            <PlayerCard key={player.playerName} player={player} onSelect={onSelectPlayer} isSelected={player.playerName === selectedPlayerName} compact animationDelay={index * 30} />
          ))}
          {filteredPlayers.length === 0 && (
            <div className="text-center py-8 text-muted-foreground animate-fade-in">
              <Search className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>No players found</p>
              <p className="text-sm mt-1">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
