package com.anfernee.database_project.player;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "player_data")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Player {

    @Id
    @Column(name = "player_name", unique = true)
    private String playerName;

    private String position;

    private String nation;

    @Column(name = "team_name")
    private String teamName;

    private Integer age;

    private Integer starts;

    @Column(name = "matches_played")
    private Integer matchesPlayed;

    @Column(name = "minutes_played")
    private Double minutesPlayed;

    private Double goals;

    private Double assists;

    @Column(name = "yellow_cards")
    private Double yellowCards;

    @Column(name = "red_cards")
    private Double redCards;

    @Column(name = "expected_goals")
    private Double expectedGoals;

    @Column(name = "expected_assists")
    private Double expectedAssists;

    @Column(name = "penalties_scored")
    private Double penaltiesScored;
}