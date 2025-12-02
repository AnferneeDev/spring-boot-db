package com.anfernee.database_project.player;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PlayerRepository extends JpaRepository<Player, String> {

    void deleteByPlayerName(String name);

    List<Player> findByPlayerName(String name);

    List<Player> findByPosition(String position);

    List<Player> findByNation(String nation);

    List<Player> findByTeamName(String teamName);

    List<Player> findByTeamNameAndPosition(String teamName, String position);
}