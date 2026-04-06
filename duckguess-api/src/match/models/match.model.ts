import { v4 as uuidv4 } from 'uuid';

export class Match {
    public id: string;
    public matchId: string;
    public fromUserId: string;
    public toUserId: string;

    constructor({ id, matchId, fromUserId, toUserId }: { id: string, matchId: string, fromUserId: string, toUserId: string }) {
        this.validate(id, matchId, fromUserId, toUserId);

        this.id = id;
        this.matchId = matchId;
        this.fromUserId = fromUserId;
        this.toUserId = toUserId;
    }

    static create({ matchId, fromUserId, toUserId }: { matchId: string, fromUserId: string, toUserId: string }) {
        const id = uuidv4();

        return new Match({ id, matchId, fromUserId, toUserId });
    }

    private validate(id: string, matchId: string, fromUserId: string, toUserId: string) {
        if (!id || !matchId || !fromUserId || !toUserId) {
            throw new Error('Invalid match');
        }

        if (fromUserId === toUserId) {
            throw new Error('User cannot challenge himself');
        }
    }

    toJson() {
        return {
            id: this.id,
            matchId: this.matchId,
            fromUserId: this.fromUserId,
            toUserId: this.toUserId,
        };
    }
}
