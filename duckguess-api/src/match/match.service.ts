import { Injectable } from '@nestjs/common';
import { MatchRepository } from './match.repository';
import { OnlineUser, Challenge, Match } from './models';

export { OnlineUser, Challenge, Match } from './models';
@Injectable()
export class MatchService {
    constructor(private readonly matchRepository: MatchRepository) {}

    // Online Users - Apenas delegam ao repository
    async getOnlineUser(userId: string): Promise<OnlineUser> {
        return this.matchRepository.getOnlineUser(userId);
    }

    async getOnlineUsers(): Promise<OnlineUser[]> {
        return this.matchRepository.getOnlineUsers();
    }

    async addOnlineUser(userId: string, socketId: string): Promise<void> {
        return this.matchRepository.saveOnlineUser(userId, socketId);
    }

    async removeOnlineUser(userId: string): Promise<void> {
        return this.matchRepository.removeOnlineUser(userId);
    }

    async sendChallenge(fromUserId: string, toUserId: string): Promise<Challenge> {
        // Validação: verificar se ambos os usuários estão online
        const fromUser = await this.matchRepository.getOnlineUser(fromUserId);
        if (!fromUser) {
            console.log(`[sendChallenge] User not found: ${fromUserId}`);
            throw new Error('User not found');
        }

        const toUser = await this.matchRepository.getOnlineUser(toUserId);
        if (!toUser) {
            console.log(`[sendChallenge] User not found: ${toUserId}`);
            throw new Error('User not found');
        }

        const challenge = Challenge.create({ fromUserId, toUserId });

        await this.matchRepository.saveChallenge(challenge);

        return challenge;
    }

    async getChallengesFromUser(userId: string): Promise<Challenge[]> {
        return this.matchRepository.getChallengesForUser(userId);
    }

    async getAllChallenges(): Promise<Challenge[]> {
        return this.matchRepository.getAllChallenges();
    }

    async respondChallenge(challengeId: string, userId: string, accept: boolean): Promise<{challenge: Challenge, match: Match}> {
        const challenge = await this.matchRepository.getChallenge(challengeId);

        if(!challenge) {
            console.log(`[respondChallenge] Challenge not found: ${challengeId}`);
            throw new Error('Challenge not found');
        }

        challenge.respond(userId, accept);

        await this.matchRepository.saveChallenge(challenge);

        if (challenge.accepted) {
            const match = Match.create({
                matchId: challenge.id,
                fromUserId: challenge.fromUserId,
                toUserId: challenge.toUserId,
            });

            await this.matchRepository.saveMatch(match);

            return { challenge, match };
        }


        return { challenge, match: null };
    }
}
