// Country code mapping for flags
export const nationToCode: Record<string, string> = {
  England: "gb-eng",
  Spain: "es",
  France: "fr",
  Germany: "de",
  Italy: "it",
  Portugal: "pt",
  Brazil: "br",
  Argentina: "ar",
  Netherlands: "nl",
  Belgium: "be",
  Croatia: "hr",
  Uruguay: "uy",
  Colombia: "co",
  Mexico: "mx",
  USA: "us",
  Canada: "ca",
  Japan: "jp",
  "South Korea": "kr",
  Australia: "au",
  Nigeria: "ng",
  Senegal: "sn",
  Morocco: "ma",
  Egypt: "eg",
  Ghana: "gh",
  Cameroon: "cm",
  "Ivory Coast": "ci",
  Norway: "no",
  Sweden: "se",
  Denmark: "dk",
  Poland: "pl",
  Switzerland: "ch",
  Austria: "at",
  Scotland: "gb-sct",
  Wales: "gb-wls",
  Ireland: "ie",
  Ukraine: "ua",
  Serbia: "rs",
  Algeria: "dz",
  Tunisia: "tn",
  Chile: "cl",
  Ecuador: "ec",
  Paraguay: "py",
  Peru: "pe",
  Venezuela: "ve",
  Jamaica: "jm",
  "Costa Rica": "cr",
  Honduras: "hn",
  Panama: "pa",
  China: "cn",
  Iran: "ir",
  "Saudi Arabia": "sa",
  Qatar: "qa",
  Turkey: "tr",
  Greece: "gr",
  "Czech Republic": "cz",
  Slovakia: "sk",
  Hungary: "hu",
  Romania: "ro",
  Bulgaria: "bg",
  Slovenia: "si",
  "Bosnia and Herzegovina": "ba",
  Montenegro: "me",
  "North Macedonia": "mk",
  Albania: "al",
  Kosovo: "xk",
  Finland: "fi",
  Iceland: "is",
  Mali: "ml",
  "Burkina Faso": "bf",
  "DR Congo": "cd",
  Guinea: "gn",
  Zimbabwe: "zw",
  Zambia: "zm",
  "South Africa": "za",
};

export function getFlagUrl(nation: string | null | undefined): string | null {
  if (!nation) return null;

  // Try direct mapping first
  const code = nationToCode[nation];
  if (code) {
    return `https://flagcdn.com/24x18/${code}.png`;
  }

  // Try extracting country code from nation string (e.g., "eng England")
  const parts = nation.split(" ");
  if (parts.length > 1) {
    const potentialCode = parts[0].toLowerCase();
    if (potentialCode.length === 2 || potentialCode.length === 3) {
      return `https://flagcdn.com/24x18/${potentialCode === "eng" ? "gb-eng" : potentialCode}.png`;
    }
  }

  return null;
}

// Team colors for badges (Premier League teams)
export const teamColors: Record<string, { bg: string; text: string }> = {
  Arsenal: { bg: "bg-red-600", text: "text-white" },
  "Aston Villa": { bg: "bg-purple-800", text: "text-cyan-300" },
  Bournemouth: { bg: "bg-red-700", text: "text-black" },
  Brentford: { bg: "bg-red-600", text: "text-white" },
  Brighton: { bg: "bg-blue-600", text: "text-white" },
  Chelsea: { bg: "bg-blue-700", text: "text-white" },
  "Crystal Palace": { bg: "bg-blue-800", text: "text-red-500" },
  Everton: { bg: "bg-blue-700", text: "text-white" },
  Fulham: { bg: "bg-white", text: "text-black" },
  Liverpool: { bg: "bg-red-600", text: "text-white" },
  "Manchester City": { bg: "bg-sky-400", text: "text-white" },
  "Manchester United": { bg: "bg-red-600", text: "text-yellow-400" },
  "Newcastle United": { bg: "bg-black", text: "text-white" },
  "Nottingham Forest": { bg: "bg-red-700", text: "text-white" },
  "Sheffield United": { bg: "bg-red-600", text: "text-white" },
  Tottenham: { bg: "bg-white", text: "text-blue-900" },
  "West Ham": { bg: "bg-purple-900", text: "text-cyan-300" },
  "Wolverhampton Wanderers": { bg: "bg-amber-500", text: "text-black" },
  Wolves: { bg: "bg-amber-500", text: "text-black" },
  Burnley: { bg: "bg-purple-900", text: "text-cyan-300" },
  "Luton Town": { bg: "bg-orange-500", text: "text-white" },
  "Leicester City": { bg: "bg-blue-600", text: "text-white" },
  "Ipswich Town": { bg: "bg-blue-600", text: "text-white" },
  Southampton: { bg: "bg-red-600", text: "text-white" },
};

export function getTeamBadge(teamName: string | null | undefined): { initials: string; bg: string; text: string } {
  if (!teamName) {
    return { initials: "?", bg: "bg-secondary", text: "text-foreground" };
  }

  const colors = teamColors[teamName] || { bg: "bg-secondary", text: "text-foreground" };
  const initials = teamName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();

  return { initials, ...colors };
}
