import { v4 as uuidv4 } from 'uuid';

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
