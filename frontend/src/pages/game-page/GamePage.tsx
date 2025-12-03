import { useState, useCallback } from "react";
import type { Player, FantasyTeam } from "@/types/player";
import { usePlayers } from "@/hooks/usePlayers";
import { FootballPitch } from "@/components/FootballPitch";
import { PlayerSearch } from "@/components/PlayerSearch";
import { TeamStats } from "@/components/TeamStats";
import { MatchResultDialog } from "@/components/MatchResultDialog";
import { FormationSelector } from "@/components/FormationSelector";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Loader2, Users, RotateCcw, Trophy, Swords, ArrowLeft, Shuffle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { simulateMatch, generateAITeam, MatchResult } from "@/utils/matchSimulator";
import { cn } from "@/lib/utils";
import { FORMATIONS, Formation, createEmptyTeam } from "@/utils/formations";

export default function Index() {
  const { data: players, isLoading } = usePlayers();
  const navigate = useNavigate();
  const [formation, setFormation] = useState<Formation>(FORMATIONS[0]);
  const [team, setTeam] = useState<FantasyTeam>(() => createEmptyTeam(FORMATIONS[0]));
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null);
  const [showMatchResult, setShowMatchResult] = useState(false);

  const getValidPositionsForSlot = (slotId: string): string[] => {
    const slot = formation.slots.find((s) => s.id === slotId);
    return slot?.validPositions || [];
  };

  const handleFormationChange = (newFormation: Formation) => {
    setFormation(newFormation);
    setTeam(createEmptyTeam(newFormation));
    setSelectedPosition(null);
    toast({
      title: "Formation changed",
      description: `Switched to ${newFormation.label}`,
    });
  };

  const handlePositionClick = (positionId: string) => {
    setSelectedPosition(positionId);
    setIsSheetOpen(true);
  };

  const handleSelectPlayer = useCallback(
    (player: Player) => {
      if (!selectedPosition) return;

      const isAlreadyInTeam = Object.values(team).some((p) => p?.playerName === player.playerName);
      if (isAlreadyInTeam) {
        toast({
          title: "Player already selected",
          description: `${player.playerName} is already in your team`,
          variant: "destructive",
        });
        return;
      }

      const validPositions = getValidPositionsForSlot(selectedPosition);
      if (!validPositions.includes(player.position)) {
        toast({
          title: "Invalid position",
          description: `${player.playerName} plays ${player.position}, not valid for this slot`,
          variant: "destructive",
        });
        return;
      }

      setTeam((prev) => ({ ...prev, [selectedPosition]: player }));
      setIsSheetOpen(false);
      setSelectedPosition(null);
      toast({
        title: "Player added",
        description: `${player.playerName} added to the team`,
      });
    },
    [selectedPosition, team, formation]
  );

  const handleRemovePlayer = (positionId: string) => {
    const player = team[positionId];
    setTeam((prev) => ({ ...prev, [positionId]: null }));
    if (player) {
      toast({
        title: "Player removed",
        description: `${player.playerName} removed from team`,
      });
    }
  };

  const handleResetTeam = () => {
    setTeam(createEmptyTeam(formation));
    toast({
      title: "Team reset",
      description: "All players have been removed",
    });
  };

  const handleRandomTeam = () => {
    if (!players) return;
    const randomTeam = generateAITeam(players, formation);
    setTeam(randomTeam);
    toast({
      title: "Random team generated!",
      description: "Your squad is ready to play",
    });
  };

  const handlePlayMatch = () => {
    if (teamCount < 11) {
      toast({
        title: "Incomplete team",
        description: `You need 11 players to play. Currently have ${teamCount}/11`,
        variant: "destructive",
      });
      return;
    }
    if (!players) return;

    const aiTeam = generateAITeam(players, formation);
    const result = simulateMatch(team, aiTeam);
    setMatchResult(result);
    setShowMatchResult(true);
  };

  const handlePlayAgain = () => {
    if (!players) return;
    const aiTeam = generateAITeam(players, formation);
    const result = simulateMatch(team, aiTeam);
    setMatchResult(result);
  };

  const teamCount = Object.values(team).filter(Boolean).length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="relative">
            <Loader2 className="w-16 h-16 animate-spin text-primary mx-auto mb-4" />
            <div className="absolute inset-0 w-16 h-16 mx-auto rounded-full bg-primary/20 animate-ping" />
          </div>
          <p className="text-muted-foreground animate-pulse">Loading players...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50 animate-slide-up">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate("/")} className="hover:bg-secondary">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center transition-all group-hover:scale-110 group-hover:shadow-glow group-hover:rotate-3">
                  <Trophy className="w-6 h-6 text-primary-foreground transition-transform group-hover:scale-110" />
                </div>
                <div>
                  <h1 className="font-display text-2xl tracking-wider group-hover:text-primary transition-colors">VS AI</h1>
                  <p className="text-xs text-muted-foreground">Build your dream team</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className={cn("hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all", teamCount === 11 ? "bg-primary/20 border border-primary/30 animate-pulse-glow" : "bg-secondary")}>
                <Users className={cn("w-4 h-4 transition-colors", teamCount === 11 ? "text-primary" : "text-muted-foreground")} />
                <span className={cn("font-display text-lg transition-colors", teamCount === 11 && "text-primary")}>{teamCount}/11</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleResetTeam} className="transition-all hover:scale-105 active:scale-95">
                <RotateCcw className="w-4 h-4 mr-2 transition-transform hover:rotate-180" />
                Reset
              </Button>
              <Button variant="secondary" size="sm" onClick={handleRandomTeam} className="transition-all hover:scale-105 active:scale-95">
                <Shuffle className="w-4 h-4 mr-2" />
                Random
              </Button>
              <Button size="sm" onClick={handlePlayMatch} disabled={teamCount < 11} className={cn("transition-all hover:scale-105 active:scale-95", teamCount === 11 && "animate-pulse-glow")}>
                <Swords className="w-4 h-4 mr-2" />
                Play vs AI
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-[1fr_380px] gap-6">
          {/* Pitch Section */}
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h2 className="font-display text-xl tracking-wide">Your Formation</h2>
              <FormationSelector selected={formation.name} onChange={handleFormationChange} />
            </div>

            <FootballPitch team={team} formation={formation.slots} selectedPosition={selectedPosition} onPositionClick={handlePositionClick} onRemovePlayer={handleRemovePlayer} />

            {/* Mobile: Team Stats below pitch */}
            <div className="lg:hidden">
              <TeamStats team={team} />
            </div>
          </div>

          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block space-y-4 animate-slide-in-right">
            <TeamStats team={team} />

            <div className="card-gradient rounded-xl border border-border p-4 h-[500px] flex flex-col">
              <h3 className="font-display text-lg tracking-wide mb-4">Available Players</h3>
              {players && (
                <PlayerSearch
                  players={players}
                  onSelectPlayer={(player) => {
                    if (!selectedPosition) {
                      toast({
                        title: "Select a position first",
                        description: "Click on an empty position on the pitch",
                      });
                      return;
                    }
                    handleSelectPlayer(player);
                  }}
                />
              )}
            </div>
          </aside>
        </div>
      </main>

      {/* Mobile: Player Selection Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="bottom" className="h-[80vh] rounded-t-2xl">
          <SheetHeader>
            <SheetTitle className="font-display text-xl tracking-wide">Select Player</SheetTitle>
          </SheetHeader>
          <div className="mt-4 h-[calc(100%-60px)]">{players && <PlayerSearch players={players} onSelectPlayer={handleSelectPlayer} filterPosition={selectedPosition ? getValidPositionsForSlot(selectedPosition)[0] : undefined} />}</div>
        </SheetContent>
      </Sheet>

      {/* Match Result Dialog */}
      <MatchResultDialog open={showMatchResult} onOpenChange={setShowMatchResult} result={matchResult} onPlayAgain={handlePlayAgain} />
    </div>
  );
}
