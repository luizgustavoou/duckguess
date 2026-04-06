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
