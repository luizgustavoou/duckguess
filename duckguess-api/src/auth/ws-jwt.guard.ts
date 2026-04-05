import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Socket } from "socket.io";
import { IPayloadToken } from "src/types/payload-token";



@Injectable()
export class WsJwtGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    canActivate(context: ExecutionContext): boolean {
        const client = context.switchToWs().getClient();

        const payload = WsJwtGuard.validateToken(client, this.jwtService);

        if (!payload) return false;

        client.user = payload;

        return true;
    }

    static validateToken(socket: Socket, jwtService: JwtService): IPayloadToken {
        try {
            const { authorization } = socket.handshake.headers;

            const [, token] = authorization?.split(' ') || [];

            if (!token) return null;

            return jwtService.verify(token);
        } catch (error) {
            return null;
        }
    }
}