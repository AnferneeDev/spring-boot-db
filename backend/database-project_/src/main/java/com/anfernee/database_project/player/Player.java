package com.anfernee.database_project.player;

import jakarta.persistence.*;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "\"Player\"")
    private String playerName;

    @Column(name = "\"Pos\"")
    private String position;

    @Column(name = "\"Nation\"")
    private String nation;

    @Column(name = "\"Team\"")
    private String teamName;

    @Column(name = "\"Age\"")
    private Integer age;

    @Column(name = "\"Starts\"")
    private Integer starts;

    @Column(name = "\"MP\"")
    private Integer matchesPlayed;

    @Column(name = "\"Min\"")
    private Double minutesPlayed;

    @Column(name = "\"Gls\"")
    private Double goals;

    @Column(name = "\"Ast\"")
    private Double assists;

    @Column(name = "\"CrdY\"")
    private Double yellowCards;

    @Column(name = "\"CrdR\"")
    private Double redCards;

    @Column(name = "\"xG\"")
    private Double expectedGoals;

    @Column(name = "\"xAG\"")
    private Double expectedAssists;

    @Column(name = "\"PK\"")
    private Double penaltiesScored;
}