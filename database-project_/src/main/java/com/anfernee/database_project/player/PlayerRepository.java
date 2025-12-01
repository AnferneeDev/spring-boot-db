package com.anfernee.database_project.player;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PlayerRepository extends JpaRepository<Player, String> {

    void deletePlayerByName(String name);

    Optional<Player> findById(String s);
}
