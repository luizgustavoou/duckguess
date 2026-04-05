import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
// import { IOnlineUsers } from 'src/types/online-users';


export interface IChallengeProps {
    fromUserId: string;
    toUserId: string;
}

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

export class Challenge {
    public fromUserId: string;
    public toUserId: string;
    public accepted: boolean;

    constructor({ fromUserId, toUserId }: IChallengeProps) {
        this.validate(fromUserId, toUserId);

        this.fromUserId = fromUserId;
        this.toUserId = toUserId;
        this.accepted = false;
    }

    private validate(fromUserId: string, toUserId: string) {
        if (!fromUserId || !toUserId) {
            throw new Error('Invalid challenge');
        }

        if (fromUserId === toUserId) {
            throw new Error('User cannot challenge himself');
        }
    }

    respond(userId: string, accept: boolean) {
        if (userId !== this.toUserId) {
            throw new Error('Invalid challenge');
        }

        this.accepted = accept;
    }

    getId() {
        return `${this.fromUserId}-${this.toUserId}`;
    }

    toJson() {
        return {
            id: this.getId(),
            fromUserId: this.fromUserId,
            toUserId: this.toUserId,
            accepted: this.accepted,
        }
    }

    toString() {
        return `${this.fromUserId} -> ${this.toUserId}`;
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

        const challenge = new Challenge({ fromUserId, toUserId });

        const challengeId = `${fromUserId}-${toUserId}`;// uuidv4();

        await this.redisClient.hset('challenges', challengeId, JSON.stringify(challenge.toJson()));

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
            await this.redisClient.hset('active_matches', challengeId, JSON.stringify(challenge.toJson()));
        }

        await this.redisClient.hdel('challenges', challengeId);

        return challenge;
    }
}
