package com.anfernee.database_project.player;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/player")
@CrossOrigin(origins = "http://localhost:5173")
public class PlayerController {

    private final PlayerService playerService;

    @Autowired
    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }

    @GetMapping
    public List<Player> getAllPlayers(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String teamName,
            @RequestParam(required = false) String position,
            @RequestParam(required = false) String nation,
            @RequestParam(required = false) Integer age) {

        if (teamName != null && position != null) {
            return playerService.getPlayerByTeamNameAndPosition(teamName, position);
        }

        if (name != null) {
            return playerService.getPlayerByName(name);
        }

        if (nation != null) {
            return playerService.getPlayerByNation(nation);
        }

        if (age != null) {
            return playerService.getPlayerByAge(age);
        }

        if (teamName != null) {
            return playerService.getPlayerByTeamName(teamName);
        }

        if (position != null) {
            return playerService.getPlayerByPosition(position);
        }

        return playerService.getAllPlayers();
    }

    @PostMapping
    public ResponseEntity<Player> addPlayer(@RequestBody Player player) {
        Player addedPlayer = playerService.addPlayer(player);
        return new ResponseEntity<>(addedPlayer, HttpStatus.CREATED);
    }

    @DeleteMapping("/{name}")
    public ResponseEntity<String> deletePlayerByName(@PathVariable String name) {
        playerService.deletePlayerByName(name);
        return new ResponseEntity<>("Player deleted successfully", HttpStatus.OK);
    }
}

