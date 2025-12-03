import { Player, FantasyTeam } from "@/types/player";
import { Formation, FormationSlot } from "@/utils/formations";

export interface MatchResult {
  homeGoals: number;
  awayGoals: number;
  winner: "home" | "away" | "draw";
  homeScorers: string[];
  awayScorers: string[];
  motm: string; // Man of the Match
}

function calculateTeamStrength(team: FantasyTeam): number {
  const players = Object.values(team).filter(Boolean) as Player[];
  if (players.length === 0) return 0;

  // Weight different stats
  const goalWeight = 3;
  const assistWeight = 2;
  const xGWeight = 2.5;
  const xAWeight = 1.5;
  const minutesWeight = 0.001;

  const totalStrength = players.reduce((sum, player) => {
    return sum + player.goals * goalWeight + player.assists * assistWeight + player.expectedGoals * xGWeight + player.expectedAssists * xAWeight + player.minutesPlayed * minutesWeight - player.yellowCards * 0.5 - player.redCards * 2;
  }, 0);

  // Normalize by team size (bonus for full team)
  const completionBonus = players.length / 11;
  return totalStrength * completionBonus;
}

function getRandomScorers(team: FantasyTeam, goals: number): string[] {
  const players = Object.values(team).filter(Boolean) as Player[];
  if (players.length === 0 || goals === 0) return [];

  // Weight by goals + assists for scoring probability
  const weighted = players.map((p) => ({
    name: p.playerName,
    weight: (p.goals || 1) + p.assists * 0.5 + (p.expectedGoals || 1),
  }));

  const totalWeight = weighted.reduce((sum, p) => sum + p.weight, 0);
  const scorers: string[] = [];

  for (let i = 0; i < goals; i++) {
    let random = Math.random() * totalWeight;
    for (const player of weighted) {
      random -= player.weight;
      if (random <= 0) {
        scorers.push(player.name.split(" ").pop() || player.name);
        break;
      }
    }
  }

  return scorers;
}

export function simulateMatch(homeTeam: FantasyTeam, awayTeam: FantasyTeam): MatchResult {
  const homeStrength = calculateTeamStrength(homeTeam);
  const awayStrength = calculateTeamStrength(awayTeam);

  const totalStrength = homeStrength + awayStrength;
  const homeAdvantage = 1.1; // 10% home advantage

  // Calculate goal expectancy based on relative strength
  const baseGoals = 2.5;
  const homeExpected = totalStrength > 0 ? baseGoals * ((homeStrength * homeAdvantage) / totalStrength) : 1;
  const awayExpected = totalStrength > 0 ? baseGoals * (awayStrength / totalStrength) : 1;

  // Poisson-like random goals (simplified)
  const homeGoals = Math.round(Math.max(0, homeExpected + (Math.random() - 0.5) * 3));
  const awayGoals = Math.round(Math.max(0, awayExpected + (Math.random() - 0.5) * 3));

  const winner = homeGoals > awayGoals ? "home" : awayGoals > homeGoals ? "away" : "draw";

  // Get scorers
  const homeScorers = getRandomScorers(homeTeam, homeGoals);
  const awayScorers = getRandomScorers(awayTeam, awayGoals);

  // Man of the Match (highest xG+xA from winning team, or random if draw)
  const winningTeam = winner === "home" ? homeTeam : winner === "away" ? awayTeam : homeTeam;
  const winningPlayers = Object.values(winningTeam).filter(Boolean) as Player[];
  const motm = winningPlayers.length > 0 ? winningPlayers.reduce((best, p) => (p.expectedGoals + p.expectedAssists > best.expectedGoals + best.expectedAssists ? p : best)).playerName : "N/A";

  return {
    homeGoals,
    awayGoals,
    winner,
    homeScorers,
    awayScorers,
    motm,
  };
}

export function generateAITeam(players: Player[], formation: Formation): FantasyTeam {
  const team: FantasyTeam = {};
  const usedPlayers = new Set<string>();

  const pickBestForPosition = (validPositions: string[]): Player | null => {
    const available = players.filter((p) => validPositions.includes(p.position) && !usedPlayers.has(p.playerName));

    if (available.length === 0) return null;

    // Sort by performance score and pick top player with some randomness
    const sorted = available.sort((a, b) => {
      const scoreA = a.goals * 3 + a.assists * 2 + a.expectedGoals * 2;
      const scoreB = b.goals * 3 + b.assists * 2 + b.expectedGoals * 2;
      return scoreB - scoreA;
    });

    // Pick from top 5 with some randomness
    const topN = sorted.slice(0, Math.min(5, sorted.length));
    const picked = topN[Math.floor(Math.random() * topN.length)];
    usedPlayers.add(picked.playerName);
    return picked;
  };

  // Fill positions based on formation
  formation.slots.forEach((slot) => {
    team[slot.id] = pickBestForPosition(slot.validPositions);
  });

  return team;
}
