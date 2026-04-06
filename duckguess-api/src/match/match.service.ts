import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

export class OnlineUser {
    public userId: string;
    public socketId: string;

    constructor({ userId, socketId }: { userId: string, socketId: string }) {
        this.userId = userId;
        this.socketId = socketId;
    }

    toJson() {
        return {
            userId: this.userId,
            socketId: this.socketId,
        }
    }
}

export interface IChallengeProps {
    id: string;
    fromUserId: string;
    toUserId: string;
}

export class Challenge {
    public id: string;
    public fromUserId: string;
    public toUserId: string;
    public accepted: boolean;

    constructor({ id, fromUserId, toUserId }: IChallengeProps) {
        this.validate(id, fromUserId, toUserId);

        this.id = id;
        this.fromUserId = fromUserId;
        this.toUserId = toUserId;
        this.accepted = false;
    }

    private validate(id: string, fromUserId: string, toUserId: string) {
        if (!id || !fromUserId || !toUserId) {
            throw new Error('Invalid challenge');
        }

        if (fromUserId === toUserId) {
            throw new Error('User cannot challenge himself');
        }
    }

    static create({ fromUserId, toUserId }: { fromUserId: string, toUserId: string }) {
        const id = uuidv4();

        return new Challenge({ id, fromUserId, toUserId });
    }

    respond(userId: string, accept: boolean) {
        if (userId !== this.toUserId) {
            throw new Error('Invalid challenge');
        }

        this.accepted = accept;
    }

    toJson() {
        return {
            id: this.id,
            fromUserId: this.fromUserId,
            toUserId: this.toUserId,
            accepted: this.accepted,
        }
    }

    toString() {
        return `${this.fromUserId} -> ${this.toUserId}`;
    }
}

export class Match {
    public id: string;
    public fromUserId: string;
    public toUserId: string;

    constructor({ id, fromUserId, toUserId }: { id: string, fromUserId: string, toUserId: string }) {
        this.validate(id, fromUserId, toUserId);

        this.id = id;
        this.fromUserId = fromUserId;
        this.toUserId = toUserId;
    }

    static create({ fromUserId, toUserId }: { fromUserId: string, toUserId: string }) {
        const id = uuidv4();

        return new Match({ id, fromUserId, toUserId });
    }

    private validate(id: string, fromUserId: string, toUserId: string) {
        if (!id || !fromUserId || !toUserId) {
            throw new Error('Invalid match');
        }

        if (fromUserId === toUserId) {
            throw new Error('User cannot challenge himself');
        }
    }

    toJson() {
        return {
            id: this.id,
            fromUserId: this.fromUserId,
            toUserId: this.toUserId,
        }
    }
}

@Injectable()
export class MatchService {
    private readonly redisClient = new Redis({ host: process.env.REDIS_HOST, port: Number(process.env.REDIS_PORT) });

    async getOnlineUser(userId: string): Promise<OnlineUser> {
        const onlineUserHash = await this.redisClient.hget('online_users', userId);

        if (!onlineUserHash) {
            throw new Error('User not found');
        }

        const onlineUser = new OnlineUser({ userId, socketId: onlineUserHash });

        return onlineUser;
    }

    async getOnlineUsers(): Promise<OnlineUser[]> {
        const onlineUsersHash = await this.redisClient.hgetall('online_users');

        const onlineUsers = Object.entries(onlineUsersHash).map(([key, value]) => {
            return new OnlineUser({ userId: key, socketId: value });
        });

        return onlineUsers;
    }

    async addOnlineUser(userId: string, socketId: string) {
        await this.redisClient.hset('online_users', userId, socketId);
    }

    async removeOnlineUser(userId: string) {
        await this.redisClient.hdel('online_users', userId);
    }

    async sendChallenge(fromUserId: string, toUserId: string): Promise<Challenge> {
        const fromUser = await this.redisClient.hget('online_users', fromUserId);

        if (!fromUser) {
            console.log(`[sendChallenge] User not found: ${fromUserId}`);
            throw new Error('User not found');
        }

        const toUser = await this.redisClient.hget('online_users', toUserId);

        if (!toUser) {
            console.log(`[sendChallenge] User not found: ${toUserId}`);
            throw new Error('User not found');
        }

        const challenge = Challenge.create({ fromUserId, toUserId });

        await this.redisClient.hset('challenges', challenge.id, JSON.stringify(challenge.toJson()));

        return challenge;
    }

    async getChallengesFromUser(userId: string): Promise<Challenge[]> {
        const challenges = await this.redisClient.hgetall('challenges');

        const userChallenges = Object.entries(challenges).map(([key, value]) => {
            const challengeJson = JSON.parse(value);

            const challenge = new Challenge(challengeJson);

            return challenge.toUserId === userId ? challenge : null;
        }).filter((challenge) => challenge && challenge.toUserId === userId);

        return userChallenges;
    }

    async getAllChallenges() {
        const challenges = await this.redisClient.hgetall('challenges');

        return Object.values(challenges).map((challenge) => new Challenge(JSON.parse(challenge)));
    }

    async respondChallenge(challengeId: string, userId: string, accept: boolean) {
        const challengeHash = await this.redisClient.hget('challenges', challengeId);

        if (!challengeHash) {
            throw new Error('Challenge not found');
        }

        const challengeJson = JSON.parse(challengeHash);

        const challenge = new Challenge(challengeJson);

        challenge.respond(userId, accept);


        if (challenge.accepted) {
            const match = Match.create({ fromUserId: challenge.fromUserId, toUserId: challenge.toUserId });

            await this.redisClient.hset('active_matches', match.id, JSON.stringify(match.toJson()));
        }

        await this.redisClient.hset('challenges', challenge.id, JSON.stringify(challenge.toJson()));

        return challenge;
    }
}
