package com.anfernee.database_project.matchmaking.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MatchRequest {

    private String playerId;
    private String playerName;
    private int teamPower;
}
