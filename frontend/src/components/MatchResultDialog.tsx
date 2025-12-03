import { MatchResult } from "@/utils/matchSimulator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trophy, Star, Swords, Frown, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface MatchResultDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  result: MatchResult | null;
  onPlayAgain: () => void;
}

export function MatchResultDialog({ open, onOpenChange, result, onPlayAgain }: MatchResultDialogProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (open && result?.winner === "home") {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [open, result?.winner]);

  if (!result) return null;

  const isWin = result.winner === "home";
  const isLoss = result.winner === "away";
  const isDraw = result.winner === "draw";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md overflow-hidden">
        {/* Confetti Effect */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <Sparkles
                key={i}
                className={cn("absolute text-gold animate-bounce-in", i % 2 === 0 ? "text-primary" : "text-gold")}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 500}ms`,
                  width: `${12 + Math.random() * 12}px`,
                  height: `${12 + Math.random() * 12}px`,
                }}
              />
            ))}
          </div>
        )}

        <DialogHeader>
          <DialogTitle className="font-display text-2xl tracking-wider text-center flex items-center justify-center gap-2 animate-scale-in">
            {isWin && <Trophy className="w-6 h-6 text-gold animate-bounce-in" />}
            {isLoss && <Frown className="w-6 h-6 text-destructive animate-wiggle" />}
            {isDraw && <Swords className="w-6 h-6 text-primary" />}
            Match Result
          </DialogTitle>
          <DialogDescription className="text-center animate-fade-in">
            {isWin && "Congratulations! Your team won!"}
            {isLoss && "Better luck next time!"}
            {isDraw && "It's a draw!"}
          </DialogDescription>
        </DialogHeader>

        <div className="py-6">
          {/* Score Display */}
          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Your Team</p>
              <span className={cn("font-display text-5xl", isWin && "text-primary", isLoss && "text-destructive", isDraw && "text-gold")}>{result.homeGoals}</span>
            </div>
            <span className="text-2xl text-muted-foreground">-</span>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">AI Team</p>
              <span className={cn("font-display text-5xl", isLoss && "text-primary", isWin && "text-destructive", isDraw && "text-gold")}>{result.awayGoals}</span>
            </div>
          </div>

          {/* Result Banner */}
          <div className={cn("text-center py-3 rounded-lg mb-6", isWin && "bg-primary/20 text-primary", isLoss && "bg-destructive/20 text-destructive", isDraw && "bg-gold/20 text-gold")}>
            <div className="flex items-center justify-center gap-2">
              {isWin && <Trophy className="w-5 h-5" />}
              <span className="font-display text-xl tracking-wider">
                {isWin && "VICTORY!"}
                {isLoss && "DEFEAT"}
                {isDraw && "DRAW"}
              </span>
            </div>
          </div>

          {/* Scorers */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-secondary/50 rounded-lg p-3">
              <p className="text-xs text-muted-foreground mb-2">Your Scorers</p>
              {result.homeScorers.length > 0 ? (
                <ul className="space-y-1">
                  {result.homeScorers.map((scorer, i) => (
                    <li key={i} className="text-sm font-medium">
                      ⚽ {scorer}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">No goals</p>
              )}
            </div>
            <div className="bg-secondary/50 rounded-lg p-3">
              <p className="text-xs text-muted-foreground mb-2">AI Scorers</p>
              {result.awayScorers.length > 0 ? (
                <ul className="space-y-1">
                  {result.awayScorers.map((scorer, i) => (
                    <li key={i} className="text-sm font-medium">
                      ⚽ {scorer}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">No goals</p>
              )}
            </div>
          </div>

          {/* Man of the Match */}
          <div className="bg-gold/10 border border-gold/30 rounded-lg p-3 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Star className="w-4 h-4 text-gold" />
              <span className="text-xs text-gold uppercase tracking-wider">Man of the Match</span>
            </div>
            <p className="font-display text-lg">{result.motm}</p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
            Close
          </Button>
          <Button onClick={onPlayAgain} className="flex-1">
            Play Again
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
