package com.anfernee.database_project.player;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PlayerService {

    private final PlayerRepository playerRepository;

    @Autowired
    public PlayerService(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    public List<Player> getAllPlayers() {
        return playerRepository.findAll();
    }

    public Player addPlayer(Player player) {
        return playerRepository.save(player);
    }

    public void deletePlayer(Player player) {
        playerRepository.delete(player);
    }

    public List<Player> getPlayerByName(String name) {
        return playerRepository.findByPlayerName(name); // Make sure this matches field name
    }

    public List<Player> getPlayerByTeamNameAndPosition(String teamName, String position) {
        return playerRepository.findByTeamNameAndPosition(teamName, position);
    }

    public List<Player> getPlayerByNation(String nation) {
        return playerRepository.findByNation(nation);
    }

    public List<Player> getPlayerByTeamName(String teamName) {
        return playerRepository.findByTeamName(teamName);
    }

    public List<Player> getPlayerByPosition(String position) {
        return playerRepository.findByPosition(position);
    }

    @Transactional
    public void deletePlayerByName(String name) {
        playerRepository.deleteByPlayerName(name);
    }
}