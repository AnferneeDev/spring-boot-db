import { useState, useEffect } from "react";
import { Loader2, AlertCircle, CheckCircle2, User, Users, Goal, Flag, Calendar, Hash, Zap } from "lucide-react";

interface Player {
  id: number;
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

// Mock Button Component (as it's imported from Shadcn in the main component)
const Button = ({ children, onClick, className = "", disabled = false }: { children: React.ReactNode; onClick: () => void; className?: string; disabled?: boolean }) => (
  <button className={`inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 transition-colors ${className} ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`} onClick={onClick} disabled={disabled}>
    {children}
  </button>
);

// Mock Select component for dynamic filtering
const FilterSelect = ({ label, icon: Icon, value, onChange, options, filterHandler, fetchDisabled }) => (
  <div className="flex flex-col space-y-2">
    <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
      <Icon className="w-4 h-4" /> {label}
    </label>
    <div className="flex gap-2">
      <select className="flex-grow bg-zinc-800 text-zinc-100 border border-zinc-700 rounded-md h-10 px-3 text-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 appearance-none" value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="" disabled>{`Select ${label}`}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <Button onClick={filterHandler} className={`bg-emerald-600 hover:bg-emerald-700 text-white ${value === "" || fetchDisabled ? "opacity-50" : ""}`} disabled={value === "" || fetchDisabled}>
        Filter
      </Button>
    </div>
  </div>
);

export function GamePage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastFilter, setLastFilter] = useState("All Players");

  // --- New State for Filters ---
  const [selectedTeam, setSelectedTeam] = useState<string>("");
  const [selectedPosition, setSelectedPosition] = useState<string>("");
  const [selectedNation, setSelectedNation] = useState<string>("");
  const [selectedAge, setSelectedAge] = useState<string>("");

  // Hardcoded Options for the Selects (Based on your CSV data)
  const teamOptions = ["Arsenal", "Man-Utd", "Liverpool", "Wolverhampton-Wanderers", "Chelsea"];
  const positionOptions = ["FW", "MF", "DF", "GK"];
  const nationOptions = ["BRA", "ENG", "FRA", "SUI", "MEX"];
  const ageOptions = ["21", "24", "25", "30", "31"]; // Using strings for select simplicity

  // Initial Fetch: Load all players on mount (used for total count)
  useEffect(() => {
    handleFetch("All Players", "http://localhost:8080/api/v1/player");
  }, []);

  const handleFetch = async (filterName: string, url: string) => {
    setLoading(true);
    setLastFilter(filterName);
    setError("");

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Server error");

      const data: Player[] = await response.json();

      if (filterName === "All Players") {
        setPlayers(data); // Store all players for total count display
      }

      // Console Log for Debugging Filters
      console.groupCollapsed(`✅ Filter Results: ${filterName} (${data.length} players)`);
      if (data.length > 0) {
        console.table(data.slice(0, 5), ["playerName", "teamName", "position", "age"]);
      } else {
        console.log("No players found for this filter.");
      }
      console.groupEnd();
    } catch (err) {
      console.error(`Error fetching ${filterName}:`, err);
      setError(`Failed to fetch ${filterName}. Check Java Console.`);
    } finally {
      setLoading(false);
    }
  };

  // --- Filter Handlers using State ---

  const handleFetchByTeam = () => {
    handleFetch(`Team: ${selectedTeam}`, `http://localhost:8080/api/v1/player?teamName=${selectedTeam}`);
  };

  const handleFetchByPosition = () => {
    handleFetch(`Position: ${selectedPosition}`, `http://localhost:8080/api/v1/player?position=${selectedPosition}`);
  };

  const handleFetchByNation = () => {
    handleFetch(`Nation: ${selectedNation}`, `http://localhost:8080/api/v1/player?nation=${selectedNation}`);
  };

  const handleFetchByAge = () => {
    handleFetch(`Age: ${selectedAge}`, `http://localhost:8080/api/v1/player?age=${selectedAge}`);
  };

  // Combine Filter
  const handleFetchByTeamAndPos = () => {
    handleFetch(`Team: ${selectedTeam} & Pos: ${selectedPosition}`, `http://localhost:8080/api/v1/player?teamName=${selectedTeam}&position=${selectedPosition}`);
  };

  const samplePlayer = players[0];

  return (
    <div className="relative min-h-screen w-full bg-emerald-950 flex flex-col items-center pt-20 pb-10 overflow-hidden font-sans text-zinc-100">
      {/* --- BACKGROUND FUTBOL --- */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none">
        <div className="text-[40rem] leading-none animate-pulse">⚽</div>
      </div>

      {/* --- CONNECTION STATUS CARD --- */}
      <div className="relative z-10 bg-black/40 backdrop-blur-md border border-white/10 p-8 rounded-2xl max-w-lg w-full text-center shadow-2xl mb-8">
        <h1 className="text-3xl font-bold mb-6 text-white tracking-tight">Match Lobby & Data Check</h1>

        {loading && (
          <div className="flex flex-col items-center gap-3 text-emerald-400">
            <Loader2 className="w-10 h-10 animate-spin" />
            <p>
              Loading Data for: <span className="font-semibold">{lastFilter}</span>...
            </p>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center gap-3 text-red-400">
            <AlertCircle className="w-10 h-10" />
            <p>{error}</p>
            <p className="text-xs text-zinc-500">Ensure Java backend is running on :8080 and CORS is enabled.</p>
          </div>
        )}

        {!loading && !error && (
          <div className="flex flex-col items-center gap-3 text-emerald-400">
            <CheckCircle2 className="w-12 h-12" />
            <p className="text-xl font-semibold">Ready to Play</p>

            {/* Database Stats Debug Info */}
            <div className="mt-4 p-4 bg-white/5 rounded-lg border border-white/10 w-full text-left space-y-2">
              <div className="flex justify-between items-center border-b border-white/10 pb-2 mb-2">
                <span className="text-xs text-zinc-400 uppercase tracking-widest">Database Stats</span>
                <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">Total: {players.length}</span>
              </div>

              <p className="text-sm text-zinc-200 flex justify-between">
                <span>Last Filter Run:</span>
                <span className="font-mono text-emerald-400">{lastFilter}</span>
              </p>

              <p className="text-sm text-zinc-200 flex justify-between">
                <span>Sample Player:</span>
                <span className="font-mono text-emerald-400">
                  {samplePlayer?.playerName || "N/A"} ({samplePlayer?.teamName})
                </span>
              </p>

              {/* Verify stats mapping is correct */}
              <p className="text-sm text-zinc-200 flex justify-between flex-wrap">
                <span>Stats Check:</span>
                <span className="font-mono text-zinc-400 text-xs">
                  {samplePlayer?.goals} Goals / {samplePlayer?.expectedGoals} xG |{samplePlayer?.assists} Assists / {samplePlayer?.expectedAssists} xA
                </span>
              </p>
            </div>
          </div>
        )}
      </div>

      {/* --- FILTER SELECTS SECTION --- */}
      <div className="relative z-10 p-6 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl max-w-lg w-full shadow-2xl space-y-4">
        <h2 className="text-lg font-semibold text-white border-b border-white/10 pb-2">Test Player Filters (Select & Fetch)</h2>

        <div className="grid grid-cols-2 gap-4">
          {/* Team Filter */}
          <FilterSelect label="Team Name" icon={Users} value={selectedTeam} onChange={setSelectedTeam} options={teamOptions} filterHandler={handleFetchByTeam} fetchDisabled={loading} />

          {/* Position Filter */}
          <FilterSelect label="Position" icon={Goal} value={selectedPosition} onChange={setSelectedPosition} options={positionOptions} filterHandler={handleFetchByPosition} fetchDisabled={loading} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Nation Filter */}
          <FilterSelect label="Nation" icon={Flag} value={selectedNation} onChange={setSelectedNation} options={nationOptions} filterHandler={handleFetchByNation} fetchDisabled={loading} />

          {/* Age Filter */}
          <FilterSelect label="Age" icon={Calendar} value={selectedAge} onChange={setSelectedAge} options={ageOptions} filterHandler={handleFetchByAge} fetchDisabled={loading} />
        </div>

        {/* Combined Filter */}
        <div className="pt-2 border-t border-white/10">
          <h3 className="text-sm font-semibold text-zinc-300 flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-yellow-400" /> Combined Filter (Team & Position)
          </h3>
          <div className="flex gap-4">
            <select
              className="flex-grow bg-zinc-800 text-zinc-100 border border-zinc-700 rounded-md h-10 px-3 text-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 appearance-none"
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
            >
              <option value="" disabled>
                Select Team
              </option>
              {teamOptions.map((opt) => (
                <option key={`comb-${opt}`} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <select
              className="flex-grow bg-zinc-800 text-zinc-100 border border-zinc-700 rounded-md h-10 px-3 text-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 appearance-none"
              value={selectedPosition}
              onChange={(e) => setSelectedPosition(e.target.value)}
            >
              <option value="" disabled>
                Select Position
              </option>
              {positionOptions.map((opt) => (
                <option key={`comb-${opt}`} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          <Button
            onClick={handleFetchByTeamAndPos}
            className={`w-full mt-3 bg-indigo-600 hover:bg-indigo-700 text-white ${selectedTeam === "" || selectedPosition === "" || loading ? "opacity-50" : ""}`}
            disabled={selectedTeam === "" || selectedPosition === "" || loading}
          >
            Fetch Combined
          </Button>
        </div>

        <Button onClick={() => handleFetch("All Players", "http://localhost:8080/api/v1/player")} className="w-full bg-red-700 hover:bg-red-600 text-white mt-4">
          <Hash className="w-4 h-4 mr-2" /> Reset & Fetch All Players
        </Button>

        <p className="text-xs text-zinc-500 pt-2">* Check your browser console for detailed player data after clicking a filter.</p>
      </div>
    </div>
  );
}
