import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { IOnlineUsers } from 'src/types/online-users';


export interface IChallengeProps {
    fromUserId: string;
    toUserId: string;
}

export class Challenge {
    public fromUserId: string;
    public toUserId: string;

    constructor({ fromUserId, toUserId }: IChallengeProps) {
        this.validate(fromUserId, toUserId);

        this.fromUserId = fromUserId;
        this.toUserId = toUserId;
    }

    private validate(fromUserId: string, toUserId: string) {
        if (!fromUserId || !toUserId) {
            throw new Error('Invalid challenge');
        }

        if (fromUserId === toUserId) {
            throw new Error('User cannot challenge himself');
        }
    }

    getId() {
        return `${this.fromUserId}-${this.toUserId}`;
    }

    toJson() {
        return {
            id: this.getId(),
            fromUserId: this.fromUserId,
            toUserId: this.toUserId,
        }
    }

    toString() {
        return `${this.fromUserId} -> ${this.toUserId}`;
    }
}

@Injectable()
export class MatchService {
    private readonly redisClient = new Redis({ host: process.env.REDIS_HOST, port: Number(process.env.REDIS_PORT) });

    async getOnlineUser(userId: string): Promise<string> {
        const onlineUser = await this.redisClient.hget('online_users', userId);

        if (!onlineUser) {
            throw new Error('User not found');
        }

        return onlineUser;
    }

    async getOnlineUsers(): Promise<IOnlineUsers> {
        const onlineUsers: IOnlineUsers = await this.redisClient.hgetall('online_users');

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
}
