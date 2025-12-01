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
    private String player_name;
    private String position;
    private String nation;
    private String team_name;
    private int age;
    private int starts;
    private int matches_played;
    private double minutes_played;
    private double goals;
    private double assists;
    private double yellow_cards;
    private double red_cards;
    private double expected_goals;
    private double expected_assists;
    private double penalties_scored;
}
