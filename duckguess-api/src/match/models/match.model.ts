import { Hint } from 'src/hint/domain/hint';
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
    public guessMatches: GuessMatch[];
    public status: MatchStatus;

    constructor({ id, matchId, fromUserId, toUserId, themeId, guessMatches, status }: { id: string, matchId: string, fromUserId: string, toUserId: string, themeId: string, guessMatches: GuessMatch[], status: MatchStatus }) {
        this.validate(id, matchId, fromUserId, toUserId, themeId, guessMatches, status);

        this.id = id;
        this.matchId = matchId;
        this.fromUserId = fromUserId;
        this.toUserId = toUserId;
        this.themeId = themeId;
        this.guessMatches = guessMatches;
        this.status = status;
    }

    static create({ matchId, fromUserId, toUserId, themeId, guessMatches }: { matchId: string, fromUserId: string, toUserId: string, themeId: string, guessMatches: GuessMatch[] }) {
        const id = uuidv4();

        const status = MatchStatus.WAITING;

        return new Match({ id, matchId, fromUserId, toUserId, themeId, guessMatches, status });
    }

    private validate(id: string, matchId: string, fromUserId: string, toUserId: string, themeId: string, guessMatches: GuessMatch[], status: MatchStatus) {
        if (!id || !matchId || !fromUserId || !toUserId || !themeId || !guessMatches || !status) {
            throw new Error('Invalid match');
        }

        if (!guessMatches.length) {
            throw new Error('Invalid match: the theme must have at least one guess');
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
            guessMatches: (this.guessMatches ?? []).map((guessMatch) => {
                return guessMatch.toJson()
            }),
        };
    }
}






export class GuessMatchStatus {
    static WAITING_RESPONSE = new MatchStatus('waiting_response');
    static TIED = new MatchStatus('tied');
    static WINNER = new MatchStatus('winner');

    constructor(public readonly value: string) { }

    static fromString(value: string) {
        switch (value) {
            case 'waiting_response':
                return this.WAITING_RESPONSE;
            case 'tied':
                return this.TIED;
            case 'winner':
                return this.WINNER;
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


export enum Player {
    PLAYER_ONE = 'playerOne',
    PLAYER_TWO = 'playerTwo',
}

export class GuessMatch {
    guessId: string;
    answer: string;
    userIdAnswered: string | null;
    hints: Hint[]
    currentPlayer: Player
    stageHint: number
    status: GuessMatchStatus


    constructor({ guessId, answer, userIdAnswered, hints, currentPlayer, stageHint, status }: { guessId: string, answer: string, userIdAnswered: string, hints: Hint[], currentPlayer: Player, stageHint: number, status: GuessMatchStatus }) {
        this.validate(guessId, answer, hints, currentPlayer);

        this.guessId = guessId;
        this.answer = answer;
        this.userIdAnswered = userIdAnswered;
        this.hints = hints
        this.currentPlayer = currentPlayer
        this.stageHint = stageHint
        this.status = status
    }

    static create({ guessId, answer, hints }: { guessId: string, answer: string, hints: Hint[] }) {
        return new GuessMatch({ guessId, answer, userIdAnswered: null, hints, currentPlayer: Player.PLAYER_ONE, stageHint: 0, status: GuessMatchStatus.WAITING_RESPONSE });
    }

    private validate(guessId: string, answer: string, hints: Hint[], currentPlayer: Player) {
        if (!guessId || !answer || !currentPlayer) {
            throw new Error('Invalid guess match');
        }

        if (!hints || hints.length < 3) {
            throw new Error('Number of hints must be greather or equal than 3')
        }
    }

    respond(answer: string, userIdAnswered: string) {
        if (!this.status.equals(GuessMatchStatus.WAITING_RESPONSE)) {
            throw new Error('The guess match is not waiting for a response');
        }


        if (userIdAnswered !== this.currentPlayer) {
            throw new Error('It is not the user turn to answer');
        }

        if (this.answer == answer) {
            this.userIdAnswered = userIdAnswered;
            this.status = GuessMatchStatus.WINNER;
            return;

        }

        if (this.stageHint >= this.hints.length) {
            this.status = GuessMatchStatus.TIED
            return
        }

        this.currentPlayer = this.currentPlayer === Player.PLAYER_ONE ? Player.PLAYER_TWO : Player.PLAYER_ONE

    }

    toJson() {
        return {
            guessId: this.guessId,
            answer: this.answer,
            userIdAnswered: this.userIdAnswered,
            hints: this.hints.map((hint) => hint.toJson()),
            currentPlayer: this.currentPlayer,
            stageHint: this.stageHint,
            status: this.status.value,
        };
    }
}