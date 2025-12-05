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

    private final Queue<MatchRequest> waitingQueue = new ConcurrentLinkedQueue<>();

    private final Map<String, MatchResult> matchResults = new ConcurrentHashMap<>();

    public MatchResult procressMatch(MatchRequest player) {

        MatchRequest opponent = waitingQueue.poll();

        if (opponent == null) {
            waitingQueue.add(player);
            return new MatchResult("WAITING", null, "Added to queue. Waiting for opponent");
        }

        return resolveMatch(player, opponent);

    }

    private MatchResult resolveMatch(MatchRequest player1, MatchRequest player2) {

        String winnerId;
        String message;

        if (player1.getTeamPower() >= player2.getTeamPower()) {
            winnerId = player1.getPlayerId();
            message = player1.getPlayerName() + " win against " + player2.getPlayerName();
        } else {
            winnerId = player2.getPlayerId();
            message = player2.getPlayerName() + " win against " + player1.getPlayerName();
        }

        MatchResult finalResult = new MatchResult("MATCH_FOUND", winnerId, message);

        matchResults.put(player2.getPlayerId(), finalResult);

        return finalResult;
    }

    public MatchResult checkStatus(String playerId) {
        MatchResult result = matchResults.get(playerId);

        if (result != null) {
            matchResults.remove(playerId);
            return result;
        }

        return new MatchResult("WAITING", null, "Still waiting...");
    }
}
