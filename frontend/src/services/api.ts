import type { Player } from "@/types/player";

// Configure this to your Spring Boot backend URL
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1";

export const playerApi = {
  getAllPlayers: async (): Promise<Player[]> => {
    const response = await fetch(`${API_BASE_URL}/player`);
    if (!response.ok) throw new Error("Failed to fetch players");
    return response.json();
  },

  getPlayersByTeam: async (teamName: string): Promise<Player[]> => {
    const response = await fetch(`${API_BASE_URL}/player?teamName=${encodeURIComponent(teamName)}`);
    if (!response.ok) throw new Error("Failed to fetch players");
    return response.json();
  },

  getPlayersByPosition: async (position: string): Promise<Player[]> => {
    const response = await fetch(`${API_BASE_URL}/player?position=${encodeURIComponent(position)}`);
    if (!response.ok) throw new Error("Failed to fetch players");
    return response.json();
  },

  getPlayersByNation: async (nation: string): Promise<Player[]> => {
    const response = await fetch(`${API_BASE_URL}/player?nation=${encodeURIComponent(nation)}`);
    if (!response.ok) throw new Error("Failed to fetch players");
    return response.json();
  },

  searchPlayers: async (params: { name?: string; teamName?: string; position?: string; nation?: string }): Promise<Player[]> => {
    const searchParams = new URLSearchParams();
    if (params.name) searchParams.append("name", params.name);
    if (params.teamName) searchParams.append("teamName", params.teamName);
    if (params.position) searchParams.append("position", params.position);
    if (params.nation) searchParams.append("nation", params.nation);

    const response = await fetch(`${API_BASE_URL}/player?${searchParams.toString()}`);
    if (!response.ok) throw new Error("Failed to fetch players");
    return response.json();
  },
};
