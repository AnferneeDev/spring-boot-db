package com.anfernee.database_project.matchmaking.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MatchRequest {

    private String playerName;
    private String playerId;
    private int teamPower;
}
