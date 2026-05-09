import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { MatchRepository } from './match.repository';
import { OnlineUser, Challenge, Match } from './models';
import { GuessMatchStatus } from './models/match.model';
import { GuessMatch } from 'src/match/models/match.model';
import { Hint } from 'src/hint/domain/hint';
import { MatchStatus } from 'src/match/models/match.model';

const ONLINE_USERS_KEY = 'online_users';
const CHALLENGES_KEY = 'challenges';
const MATCHES_KEY = 'matches';

@Injectable()
export class MatchRepositoryRedis implements MatchRepository {
    private readonly redisClient = new Redis({
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
    });

    // Online Users - CRUD básico
    async getOnlineUser(userId: string): Promise<OnlineUser> {
        const socketId = await this.redisClient.hget(ONLINE_USERS_KEY, userId);

        if (!socketId) {
            throw new Error('User not found');
        }

        return new OnlineUser({ userId, socketId });
    }

    async getOnlineUsers(): Promise<OnlineUser[]> {
        const onlineUsersHash = await this.redisClient.hgetall(ONLINE_USERS_KEY);

        return Object.entries(onlineUsersHash).map(([key, value]) => {
            return new OnlineUser({ userId: key, socketId: value });
        });
    }

    async saveOnlineUser(userId: string, socketId: string): Promise<void> {
        await this.redisClient.hset(ONLINE_USERS_KEY, userId, socketId);
    }

    async removeOnlineUser(userId: string): Promise<void> {
        await this.redisClient.hdel(ONLINE_USERS_KEY, userId);
    }

    // Challenges - CRUD básico
    async getChallenge(challengeId: string): Promise<Challenge> {
        const challengeJson = await this.redisClient.hget(CHALLENGES_KEY, challengeId);

        if (!challengeJson) {
            return null;
        }

        return new Challenge(JSON.parse(challengeJson));
    }

    async getChallengesForUser(userId: string): Promise<Challenge[]> {
        const challenges = await this.redisClient.hgetall(CHALLENGES_KEY);

        return Object.values(challenges)
            .map((value) => new Challenge(JSON.parse(value)))
            .filter((challenge) => challenge.toUserId === userId);
    }

    async getAllChallenges(): Promise<Challenge[]> {
        const challenges = await this.redisClient.hgetall(CHALLENGES_KEY);

        return Object.values(challenges).map((value) => new Challenge(JSON.parse(value)));
    }

    async saveChallenge(challenge: Challenge): Promise<void> {
        await this.redisClient.hset(CHALLENGES_KEY, challenge.id, JSON.stringify(challenge.toJson()));
    }

    // Matches - CRUD básico
    async saveMatch(match: Match): Promise<void> {
        await this.redisClient.hset(MATCHES_KEY, match.id, JSON.stringify(match.toJson()));
    }

    async getMatchesForUser(userId: string): Promise<Match[]> {
        const matches = await this.redisClient.hgetall(MATCHES_KEY);



        const matchesJson = Object.values(matches)
            .map((value) => JSON.parse(value))
            .filter((match) => match.fromUserId === userId || match.toUserId === userId);

        return matchesJson.map(match => {
            const guessMatches = (match.guessMatches ?? []).map(guessMatch => {
                const guessMatchInstance = new GuessMatch({
                    guessId: guessMatch.guessId,
                    answer: guessMatch.answer,
                    userIdAnswered: guessMatch.userIdAnswered,
                    currentPlayer: guessMatch.currentPlayer,
                    stageHint: guessMatch.stageHint,
                    status: guessMatch.status ? GuessMatchStatus.fromString(guessMatch.status) : null,
                    hints: (guessMatch.hints ?? []).map(hint => new Hint({
                        id: hint.id,
                        text: hint.text,
                        guessId: hint.guessId,
                        createdAt: new Date(hint.createdAt),
                        updatedAt: new Date(hint.updatedAt),
                    }))
                });

                return guessMatchInstance;
            })

            return new Match({
                id: match.id,
                matchId: match.matchId,
                fromUserId: match.fromUserId,
                toUserId: match.toUserId,
                themeId: match.themeId,
                status: match.status ? MatchStatus.fromString(match.status) : null,
                guessMatches: guessMatches,
            })
        })
    }

    async getAllMatches(): Promise<any[]> {
        const matches = await this.redisClient.hgetall(MATCHES_KEY);

        const matchesJson = Object.values(matches).map((value) => JSON.parse(value));

        return matchesJson.map(match => {
            const guessMatches = (match.guessMatches ?? []).map(guessMatch => {
                const guessMatchInstance = new GuessMatch({
                    guessId: guessMatch.guessId,
                    answer: guessMatch.answer,
                    userIdAnswered: guessMatch.userIdAnswered,
                    currentPlayer: guessMatch.currentPlayer,
                    stageHint: guessMatch.stageHint,
                    status: guessMatch.status ? GuessMatchStatus.fromString(guessMatch.status) : null,
                    hints: (guessMatch.hints ?? []).map(hint => new Hint({
                        id: hint.id,
                        text: hint.text,
                        guessId: hint.guessId,
                        createdAt: new Date(hint.createdAt),
                        updatedAt: new Date(hint.updatedAt),
                    }))
                });

                return guessMatchInstance;
            })

            return new Match({
                id: match.id,
                matchId: match.matchId,
                fromUserId: match.fromUserId,
                toUserId: match.toUserId,
                themeId: match.themeId,
                status: match.status ? MatchStatus.fromString(match.status) : null,
                guessMatches: guessMatches,
            })
        })
    }
}
