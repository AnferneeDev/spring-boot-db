package com.anfernee.database_project.matchmaking;

import com.anfernee.database_project.matchmaking.dto.MatchRequest;
import com.anfernee.database_project.matchmaking.dto.MatchResult;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Queue;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedQueue;

@Service
public class MatchmakingService {

    //print hello world
    public void printHelloWorld() {
        System.out.println("Hello World");
    }
}
