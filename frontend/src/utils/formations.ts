export interface FormationSlot {
  id: string;
  position: string; // GK, DF, MF, FW
  top: string;
  left: string;
  label: string;
  validPositions: string[];
}

export interface Formation {
  name: string;
  label: string;
  slots: FormationSlot[];
}

export const FORMATIONS: Formation[] = [
  {
    name: "4-3-3",
    label: "4-3-3",
    slots: [
      { id: "GK", position: "GK", top: "85%", left: "50%", label: "GK", validPositions: ["GK"] },
      { id: "LB", position: "DF", top: "65%", left: "15%", label: "LB", validPositions: ["DF"] },
      { id: "CB1", position: "DF", top: "68%", left: "35%", label: "CB", validPositions: ["DF"] },
      { id: "CB2", position: "DF", top: "68%", left: "65%", label: "CB", validPositions: ["DF"] },
      { id: "RB", position: "DF", top: "65%", left: "85%", label: "RB", validPositions: ["DF"] },
      { id: "CM1", position: "MF", top: "45%", left: "25%", label: "CM", validPositions: ["MF"] },
      { id: "CM2", position: "MF", top: "42%", left: "50%", label: "CM", validPositions: ["MF"] },
      { id: "CM3", position: "MF", top: "45%", left: "75%", label: "CM", validPositions: ["MF"] },
      { id: "LW", position: "FW", top: "18%", left: "20%", label: "LW", validPositions: ["FW", "MF"] },
      { id: "ST", position: "FW", top: "12%", left: "50%", label: "ST", validPositions: ["FW"] },
      { id: "RW", position: "FW", top: "18%", left: "80%", label: "RW", validPositions: ["FW", "MF"] },
    ],
  },
  {
    name: "4-4-2",
    label: "4-4-2",
    slots: [
      { id: "GK", position: "GK", top: "85%", left: "50%", label: "GK", validPositions: ["GK"] },
      { id: "LB", position: "DF", top: "65%", left: "15%", label: "LB", validPositions: ["DF"] },
      { id: "CB1", position: "DF", top: "68%", left: "35%", label: "CB", validPositions: ["DF"] },
      { id: "CB2", position: "DF", top: "68%", left: "65%", label: "CB", validPositions: ["DF"] },
      { id: "RB", position: "DF", top: "65%", left: "85%", label: "RB", validPositions: ["DF"] },
      { id: "LM", position: "MF", top: "42%", left: "15%", label: "LM", validPositions: ["MF"] },
      { id: "CM1", position: "MF", top: "45%", left: "35%", label: "CM", validPositions: ["MF"] },
      { id: "CM2", position: "MF", top: "45%", left: "65%", label: "CM", validPositions: ["MF"] },
      { id: "RM", position: "MF", top: "42%", left: "85%", label: "RM", validPositions: ["MF"] },
      { id: "ST1", position: "FW", top: "15%", left: "35%", label: "ST", validPositions: ["FW"] },
      { id: "ST2", position: "FW", top: "15%", left: "65%", label: "ST", validPositions: ["FW"] },
    ],
  },
  {
    name: "3-5-2",
    label: "3-5-2",
    slots: [
      { id: "GK", position: "GK", top: "85%", left: "50%", label: "GK", validPositions: ["GK"] },
      { id: "CB1", position: "DF", top: "68%", left: "25%", label: "CB", validPositions: ["DF"] },
      { id: "CB2", position: "DF", top: "70%", left: "50%", label: "CB", validPositions: ["DF"] },
      { id: "CB3", position: "DF", top: "68%", left: "75%", label: "CB", validPositions: ["DF"] },
      { id: "LWB", position: "MF", top: "48%", left: "10%", label: "LWB", validPositions: ["MF", "DF"] },
      { id: "CM1", position: "MF", top: "45%", left: "30%", label: "CM", validPositions: ["MF"] },
      { id: "CM2", position: "MF", top: "42%", left: "50%", label: "CM", validPositions: ["MF"] },
      { id: "CM3", position: "MF", top: "45%", left: "70%", label: "CM", validPositions: ["MF"] },
      { id: "RWB", position: "MF", top: "48%", left: "90%", label: "RWB", validPositions: ["MF", "DF"] },
      { id: "ST1", position: "FW", top: "15%", left: "35%", label: "ST", validPositions: ["FW"] },
      { id: "ST2", position: "FW", top: "15%", left: "65%", label: "ST", validPositions: ["FW"] },
    ],
  },
  {
    name: "4-2-3-1",
    label: "4-2-3-1",
    slots: [
      { id: "GK", position: "GK", top: "85%", left: "50%", label: "GK", validPositions: ["GK"] },
      { id: "LB", position: "DF", top: "65%", left: "15%", label: "LB", validPositions: ["DF"] },
      { id: "CB1", position: "DF", top: "68%", left: "35%", label: "CB", validPositions: ["DF"] },
      { id: "CB2", position: "DF", top: "68%", left: "65%", label: "CB", validPositions: ["DF"] },
      { id: "RB", position: "DF", top: "65%", left: "85%", label: "RB", validPositions: ["DF"] },
      { id: "CDM1", position: "MF", top: "52%", left: "35%", label: "CDM", validPositions: ["MF"] },
      { id: "CDM2", position: "MF", top: "52%", left: "65%", label: "CDM", validPositions: ["MF"] },
      { id: "LW", position: "MF", top: "32%", left: "20%", label: "LW", validPositions: ["MF", "FW"] },
      { id: "CAM", position: "MF", top: "35%", left: "50%", label: "CAM", validPositions: ["MF"] },
      { id: "RW", position: "MF", top: "32%", left: "80%", label: "RW", validPositions: ["MF", "FW"] },
      { id: "ST", position: "FW", top: "12%", left: "50%", label: "ST", validPositions: ["FW"] },
    ],
  },
  {
    name: "5-3-2",
    label: "5-3-2",
    slots: [
      { id: "GK", position: "GK", top: "85%", left: "50%", label: "GK", validPositions: ["GK"] },
      { id: "LWB", position: "DF", top: "60%", left: "10%", label: "LWB", validPositions: ["DF", "MF"] },
      { id: "CB1", position: "DF", top: "68%", left: "28%", label: "CB", validPositions: ["DF"] },
      { id: "CB2", position: "DF", top: "70%", left: "50%", label: "CB", validPositions: ["DF"] },
      { id: "CB3", position: "DF", top: "68%", left: "72%", label: "CB", validPositions: ["DF"] },
      { id: "RWB", position: "DF", top: "60%", left: "90%", label: "RWB", validPositions: ["DF", "MF"] },
      { id: "CM1", position: "MF", top: "42%", left: "25%", label: "CM", validPositions: ["MF"] },
      { id: "CM2", position: "MF", top: "40%", left: "50%", label: "CM", validPositions: ["MF"] },
      { id: "CM3", position: "MF", top: "42%", left: "75%", label: "CM", validPositions: ["MF"] },
      { id: "ST1", position: "FW", top: "15%", left: "35%", label: "ST", validPositions: ["FW"] },
      { id: "ST2", position: "FW", top: "15%", left: "65%", label: "ST", validPositions: ["FW"] },
    ],
  },
];

export function createEmptyTeam(formation: Formation): Record<string, null> {
  const team: Record<string, null> = {};
  formation.slots.forEach((slot) => {
    team[slot.id] = null;
  });
  return team;
}

export function getFormationByName(name: string): Formation {
  return FORMATIONS.find((f) => f.name === name) || FORMATIONS[0];
}
