import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { MatchRepository } from './match.repository';
import { OnlineUser, Challenge, Match } from './models';

@Injectable()
export class MatchRepositoryRedis implements MatchRepository {
    private readonly redisClient = new Redis({
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
    });

    // Online Users - CRUD básico
    async getOnlineUser(userId: string): Promise<OnlineUser> {
        const socketId = await this.redisClient.hget('online_users', userId);

        if (!socketId) {
            throw new Error('User not found');
        }

        return new OnlineUser({ userId, socketId });
    }

    async getOnlineUsers(): Promise<OnlineUser[]> {
        const onlineUsersHash = await this.redisClient.hgetall('online_users');

        return Object.entries(onlineUsersHash).map(([key, value]) => {
            return new OnlineUser({ userId: key, socketId: value });
        });
    }

    async saveOnlineUser(userId: string, socketId: string): Promise<void> {
        await this.redisClient.hset('online_users', userId, socketId);
    }

    async removeOnlineUser(userId: string): Promise<void> {
        await this.redisClient.hdel('online_users', userId);
    }

    // Challenges - CRUD básico
    async getChallenge(challengeId: string): Promise<Challenge> {
        const challengeJson = await this.redisClient.hget('challenges', challengeId);

        if (!challengeJson) {
            return null;
        }

        return new Challenge(JSON.parse(challengeJson));
    }

    async getChallengesForUser(userId: string): Promise<Challenge[]> {
        const challenges = await this.redisClient.hgetall('challenges');

        return Object.values(challenges)
            .map((value) => new Challenge(JSON.parse(value)))
            .filter((challenge) => challenge.toUserId === userId);
    }

    async getAllChallenges(): Promise<Challenge[]> {
        const challenges = await this.redisClient.hgetall('challenges');

        return Object.values(challenges).map((value) => new Challenge(JSON.parse(value)));
    }

    async saveChallenge(challenge: Challenge): Promise<void> {
        await this.redisClient.hset('challenges', challenge.id, JSON.stringify(challenge.toJson()));
    }

    // Matches - CRUD básico
    async saveMatch(match: Match): Promise<void> {
        await this.redisClient.hset('matches', match.id, JSON.stringify(match.toJson()));
    }
}
