import { OnlineUser, Challenge, Match } from './models';

export abstract class MatchRepository {
    abstract getOnlineUser(userId: string): Promise<OnlineUser>;
    abstract getOnlineUsers(): Promise<OnlineUser[]>;
    abstract saveOnlineUser(userId: string, socketId: string): Promise<void>;
    abstract removeOnlineUser(userId: string): Promise<void>;

    abstract getChallenge(challengeId: string): Promise<Challenge>;
    abstract getChallengesForUser(userId: string): Promise<Challenge[]>;
    abstract getAllChallenges(): Promise<Challenge[]>;
    abstract saveChallenge(challenge: Challenge): Promise<void>;

    abstract saveMatch(match: Match): Promise<void>;
}
