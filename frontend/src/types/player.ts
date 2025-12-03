export interface Player {
  playerName: string;
  position: string;
  nation: string;
  teamName: string;
  age: number;
  starts: number;
  matchesPlayed: number;
  minutesPlayed: number;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
  expectedGoals: number;
  expectedAssists: number;
  penaltiesScored: number;
}

export interface FantasyTeam {
  [key: string]: Player | null;
}
