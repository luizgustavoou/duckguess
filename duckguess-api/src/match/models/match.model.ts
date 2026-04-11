import { v4 as uuidv4 } from 'uuid';


export class MatchStatus {
    static WAITING = new MatchStatus('waiting');
    static IN_PROGRESS = new MatchStatus('in_progress');
    static FINISHED = new MatchStatus('finished');

    constructor(public readonly value: string) { }

    static fromString(value: string) {
        switch (value) {
            case 'waiting':
                return this.WAITING;
            case 'in_progress':
                return this.IN_PROGRESS;
            case 'finished':
                return this.FINISHED;
            default:
                throw new Error('Invalid match status');
        }
    }

    equals(other: MatchStatus) {
        if (other == null || other == undefined) return false;

        if (!(other instanceof MatchStatus)) return false;

        return this.value === other.value;
    }


}

export class Match {
    public id: string;
    public matchId: string;
    public fromUserId: string;
    public toUserId: string;
    public themeId: string;
    public status: MatchStatus;

    constructor({ id, matchId, fromUserId, toUserId, themeId, status }: { id: string, matchId: string, fromUserId: string, toUserId: string, themeId: string, status: MatchStatus }) {
        this.validate(id, matchId, fromUserId, toUserId, themeId, status);

        this.id = id;
        this.matchId = matchId;
        this.fromUserId = fromUserId;
        this.toUserId = toUserId;
        this.themeId = themeId;
        this.status = status;
    }

    static create({ matchId, fromUserId, toUserId, themeId }: { matchId: string, fromUserId: string, toUserId: string, themeId: string }) {
        const id = uuidv4();

        const status = MatchStatus.WAITING;

        return new Match({ id, matchId, fromUserId, toUserId, themeId, status });
    }

    private validate(id: string, matchId: string, fromUserId: string, toUserId: string, themeId: string, status: MatchStatus) {
        if (!id || !matchId || !fromUserId || !toUserId || !themeId || !status) {
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
            themeId: this.themeId,
            status: this.status.value,
        };
    }
}


export class GuessMatch {
    guessId: string;
    answer: string;
    correct: boolean;
    userIdAnswered: string;

    constructor({ guessId, answer, correct, userIdAnswered }: { guessId: string, answer: string, correct: boolean, userIdAnswered: string }) {
        this.validate(guessId, answer, correct, userIdAnswered);

        this.guessId = guessId;
        this.answer = answer;
        this.correct = correct;
        this.userIdAnswered = userIdAnswered;
    }

    static create({ guessId, answer, userIdAnswered }: { guessId: string, answer: string, userIdAnswered: string }) {
        return new GuessMatch({ guessId, answer, correct: false, userIdAnswered });
    }

    private validate(guessId: string, answer: string, correct: boolean, userIdAnswered: string) {
        if (!guessId || !userIdAnswered || !answer || typeof correct !== 'boolean') {
            throw new Error('Invalid guess match');
        }
    }

    respond(answer: string, userIdAnswered: string) {
        this.answer = answer;
        this.userIdAnswered = userIdAnswered;
        this.correct = answer === this.answer;
    }

    toJson() {
        return {
            guessId: this.guessId,
            answer: this.answer,
            correct: this.correct,
            userIdAnswered: this.userIdAnswered,
        };
    }
}