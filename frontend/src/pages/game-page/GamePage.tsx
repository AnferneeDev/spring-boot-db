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
import { simulateMatch, generateAITeam } from "@/utils/matchSimulator";
import type { MatchResult } from "@/utils/matchSimulator";
import { cn } from "@/lib/utils";
import { FORMATIONS, createEmptyTeam } from "@/utils/formations";
import type { Formation } from "@/utils/formations";

export default function GamePage() {
  const { data: players, isLoading } = usePlayers();
  const navigate = useNavigate();
  const [formation, setFormation] = useState<Formation>(FORMATIONS[0]);
  const [team, setTeam] = useState<FantasyTeam>(() => createEmptyTeam(FORMATIONS[0]));
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null);
  const [showMatchResult, setShowMatchResult] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getValidPositionsForSlot = (slotId: string): string[] => {
    const slot = formation.slots.find((s) => s.id === slotId);
    return slot?.validPositions || [];
  };

  const handleFormationChange = (newFormation: Formation) => {
    setFormation(newFormation);
    setTeam(createEmptyTeam(newFormation));
    setSelectedPosition(null);
    toast("Formation changed", {
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
        toast("Player already selected", {
          description: `${player.playerName} is already in your team`,
        });
        return;
      }

      const validPositions = getValidPositionsForSlot(selectedPosition);
      if (!validPositions.includes(player.position)) {
        toast("Invalid position", {
          description: `${player.playerName} plays ${player.position}, not valid for this slot`,
        });
        return;
      }

      setTeam((prev) => ({ ...prev, [selectedPosition]: player }));
      setIsSheetOpen(false);
      setSelectedPosition(null);
      toast("Player added", {
        description: `${player.playerName} added to the team`,
      });
    },
    [selectedPosition, team, getValidPositionsForSlot]
  );

  const handleRemovePlayer = (positionId: string) => {
    const player = team[positionId];
    setTeam((prev) => ({ ...prev, [positionId]: null }));
    if (player) {
      toast("Player removed", {
        description: `${player.playerName} removed from team`,
      });
    }
  };

  const handleResetTeam = () => {
    setTeam(createEmptyTeam(formation));
    toast("Team reset", {
      description: "All players have been removed",
    });
  };

  const handleRandomTeam = () => {
    if (!players) return;
    const randomTeam = generateAITeam(players, formation);
    setTeam(randomTeam);
    toast("Random team generated!", {
      description: "Your squad is ready to play",
    });
  };

  const handlePlayMatch = () => {
    if (teamCount < 11) {
      toast("Incomplete team", {
        description: `You need 11 players to play. Currently have ${teamCount}/11`,
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
    // Loading screen
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="relative">
            <Loader2 className="w-16 h-16 animate-spin text-emerald-500 mx-auto mb-4" />
            <div className="absolute inset-0 w-16 h-16 mx-auto rounded-full bg-emerald-500/20 animate-ping" />
          </div>
          <p className="text-zinc-400 animate-pulse">Loading players...</p>
        </div>
      </div>
    );
  }

  return (
    // Root container
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50 animate-slide-up">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate("/")} className="text-zinc-400 hover:bg-zinc-800 hover:text-white">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-3 group">
                {/* Trophy Icon */}
                <div className="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center transition-all group-hover:scale-110 group-hover:shadow-glow group-hover:rotate-3">
                  <Trophy className="w-6 h-6 text-white transition-transform group-hover:scale-110" />
                </div>
                <div>
                  <h1 className="font-display text-2xl tracking-wider text-white group-hover:text-emerald-400 transition-colors">VS AI</h1>
                  <p className="text-xs text-zinc-500">Build your dream team</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className={cn("hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all", teamCount === 11 ? "bg-emerald-600/20 border border-emerald-500/30 animate-pulse-glow" : "bg-zinc-800 text-zinc-400")}>
                <Users className={cn("w-4 h-4 transition-colors", teamCount === 11 ? "text-emerald-400" : "text-zinc-500")} />
                <span className={cn("font-display text-lg transition-colors", teamCount === 11 && "text-emerald-400")}>{teamCount}/11</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleResetTeam} className="bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700 transition-all hover:scale-105 active:scale-95">
                <RotateCcw className="w-4 h-4 mr-2 transition-transform hover:rotate-180" />
                Reset
              </Button>
              <Button variant="secondary" size="sm" onClick={handleRandomTeam} className="bg-indigo-600 text-white hover:bg-indigo-700 transition-all hover:scale-105 active:scale-95">
                <Shuffle className="w-4 h-4 mr-2" />
                Random
              </Button>
              <Button
                size="sm"
                onClick={handlePlayMatch}
                disabled={teamCount < 11}
                className={cn("transition-all hover:scale-105 active:scale-95", teamCount === 11 ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20 animate-pulse-glow" : "bg-zinc-600 text-zinc-300 hover:bg-zinc-500")}
              >
                <Swords className="w-4 h-4 mr-2" />
                Play vs AI
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-[1fr_380px] gap-6">
          {/* Pitch Section */}
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h2 className="font-display text-xl tracking-wide text-white">Your Formation</h2>
              <FormationSelector selected={formation.name} onChange={handleFormationChange} />
            </div>

            {/* PITCH BACKGROUND FIX: Green background added */}
            <div className="rounded-xl overflow-hidden bg-[rgb(49,122,76)] border border-zinc-700">
              <FootballPitch team={team} formation={formation.slots} selectedPosition={selectedPosition} onPositionClick={handlePositionClick} onRemovePlayer={handleRemovePlayer} />
            </div>

            {/* Mobile: Team Stats below pitch */}
            <div className="lg:hidden">
              {/* TeamStats wrapper for black text legibility */}
              <TeamStats team={team} />
            </div>
          </div>

          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block space-y-4 animate-slide-in-right">
            {/* TeamStats wrapper for black text legibility */}
            <TeamStats team={team} />

            {/* CONDITIONAL RENDERING: ONLY show Player Search if a position is selected */}
            {selectedPosition && (
              // Player Search container: White background and black text enforced for legibility
              <div className="bg-white p-4 rounded-lg border border-zinc-200 flex flex-col shadow-lg h-[500px] text-black">
                <h3 className="font-display text-lg tracking-wide mb-4 text-black">
                  Available Players for <span className="text-emerald-600">{selectedPosition}</span>
                </h3>
                {/* Player Search: Added scroll control */}
                <div className="flex-1 overflow-y-auto pr-2">{players && <PlayerSearch players={players} onSelectPlayer={handleSelectPlayer} filterPosition={selectedPosition ? getValidPositionsForSlot(selectedPosition)[0] : undefined} />}</div>
              </div>
            )}

            {/* Removed the "Click a slot..." message block completely. */}
          </aside>
        </div>
      </main>

      {/* Mobile: Player Selection Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="bottom" className="h-[80vh] rounded-t-2xl bg-zinc-900 border-zinc-800">
          <SheetHeader>
            {/* Text Legibility: Ensure sheet title is white */}
            <SheetTitle className="font-display text-xl tracking-wide text-white">
              Select Player for <span className="text-emerald-400">{selectedPosition}</span>
            </SheetTitle>
          </SheetHeader>
          {/* Added overflow-y-auto for the sheet content */}
          <div className="mt-4 h-[calc(100%-60px)] overflow-y-auto">
            {/* PlayerSearch content inside sheet remains white text, as sheet background is dark */}
            {players && <PlayerSearch players={players} onSelectPlayer={handleSelectPlayer} filterPosition={selectedPosition ? getValidPositionsForSlot(selectedPosition)[0] : undefined} />}
          </div>
        </SheetContent>
      </Sheet>

      {/* Match Result Dialog */}
      <MatchResultDialog open={showMatchResult} onOpenChange={setShowMatchResult} result={matchResult} onPlayAgain={handlePlayAgain} />
    </div>
  );
}
