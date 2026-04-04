import {
  Logger,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WsJwtGuard } from 'src/auth/ws-jwt.guard';
import { IPayloadToken } from 'src/types/payload-token';

@UseGuards(WsJwtGuard)
@WebSocketGateway()
export class MatchGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(MatchGateway.name);

  constructor(private readonly jwtService: JwtService) { }

  private onlineUsers: Map<string, string> = new Map(); // userId -> socketId

  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    console.log('[afterInit] WebSocket server initialized');

    server.use((socket: Socket, next) => {
      try {
        const { authorization } = socket.handshake.headers;

        const [, token] = authorization?.split(' ') || [];

        if (!token) {
          this.logger.warn('[WS AUTH] No token provided');
          return next(new Error('Unauthorized'));
        }

        const payload = WsJwtGuard.validateToken(token, this.jwtService);

        if (!payload) {
          this.logger.warn('[WS AUTH] Invalid token');
          return next(new Error('Unauthorized'));
        }

        (socket as any).user = payload;

        console.log(
          `[WS AUTH] User authenticated: ${(payload as IPayloadToken).sub}`,
        );

        next();
      } catch (error) {
        this.logger.error('[WS AUTH] Error during authentication', error);
        next(new Error('Unauthorized'));
      }
    });
  }

  handleConnection(client: Socket) {
    const user = (client as any).user as IPayloadToken;
    console.log(`[handleConnection] user: ${JSON.stringify(user)}`);
    const userId = user?.sub;

    console.log(`[handleConnection] socket id: ${client.id}`);
    console.log(`[handleConnection] User connected: ${userId}`);

    if (userId) {
      this.onlineUsers.set(userId, client.id);
    }

    console.log(
      `[handleConnection] online users: `,
      this.onlineUsers,
    );
  }

  handleDisconnect(client: Socket) {
    const user = (client as any).user as IPayloadToken;
    const userId = user?.sub;

    console.log(`[handleDisconnect] socket id: ${client.id}`);
    console.log(`[handleDisconnect] User disconnected: ${userId}`);

    if (userId) {
      this.onlineUsers.delete(userId);
    }

    console.log(
      `[handleDisconnect] online users: ${JSON.stringify([
        ...this.onlineUsers,
      ])}`,
    );
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): string {
    const user = (client as any).user as IPayloadToken;

    console.log(
      `[handleMessage] user: ${user?.sub} payload: ${JSON.stringify(payload)}`,
    );

    return 'Hello world!';
  }
}