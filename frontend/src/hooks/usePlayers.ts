import { useQuery } from "@tanstack/react-query";
import { playerApi } from "@/services/api";
import type { Player } from "@/types/player";

import playersData from "@/data/players.json";

export function usePlayers() {
  return useQuery<Player[]>({
    queryKey: ["players"],
    queryFn: async () => {
      try {
        const data = await playerApi.getAllPlayers();
        return data;
      } catch (error) {
        console.warn("API not available, using local data");
        return playersData as Player[];
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
}
