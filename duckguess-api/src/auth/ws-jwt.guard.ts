import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { IPayloadToken } from "src/types/payload-token";



@Injectable()
export class WsJwtGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    canActivate(context: ExecutionContext): boolean {
        const client = context.switchToWs().getClient();

        const { authorization } = client.handshake.headers;

        const [, token] = authorization?.split(' ') || [];

        if (!token) return false;

        try {
            const payload = this.jwtService.verify(token);
            client.user = payload;

            return true;
        } catch (error) {
            return false;
        }
    }

    static validateToken(token: string, jwtService: JwtService): IPayloadToken {
        try {
            return jwtService.verify(token);
        } catch (error) {
            return null;
        }
    }
}