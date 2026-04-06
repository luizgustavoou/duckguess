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
  WsException,
} from '@nestjs/websockets';
import Redis from 'ioredis';
import { Server, Socket } from 'socket.io';
import { WsJwtGuard } from 'src/auth/ws-jwt.guard';
import { IPayloadToken } from 'src/types/payload-token';
import { MatchService } from './match.service';

@UseGuards(WsJwtGuard)
@WebSocketGateway()
export class MatchGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(MatchGateway.name);

  constructor(private readonly jwtService: JwtService, private readonly matchService: MatchService) { }

  @WebSocketServer()
  server: Server;

  private redis: Redis;

  afterInit(server: Server) {
    this.logger.log('[afterInit] WebSocket server initialized');

    server.use((socket: Socket, next) => {
      try {
        const payload = WsJwtGuard.validateToken(socket, this.jwtService);

        if (!payload) {
          this.logger.warn('[WS AUTH] Invalid token');
          return next(new Error('Unauthorized'));
        }

        (socket as any).user = payload;

        // console.log(
        //   `[WS AUTH] User authenticated: ${(payload as IPayloadToken).sub}`,
        // );

        next();
      } catch (error) {
        this.logger.error('[WS AUTH] Error during authentication', error);
        next(new Error('Unauthorized'));
      }
    });

    setInterval(() => {
      this.broadcastOnlineUsers();
    }, 1000);
  }

  async handleConnection(client: Socket) {
    const user = (client as any).user as IPayloadToken;
    // console.log(`[handleConnection] user: ${JSON.stringify(user)}`);
    const userId = user?.sub;

    // console.log(`[handleConnection] socket id: ${client.id}`);
    // console.log(`[handleConnection] User connected: ${userId}`);

    if (!userId) return

    await this.matchService.addOnlineUser(userId, client.id);

    // console.log(
    //   `[handleConnection] online users: `,
    //   await this.matchService.getOnlineUsers(),
    // );
  }

  async handleDisconnect(client: Socket) {
    const user = (client as any).user as IPayloadToken;
    const userId = user?.sub;

    // console.log(`[handleDisconnect] socket id: ${client.id}`);
    // console.log(`[handleDisconnect] User disconnected: ${userId}`);

    if (!userId) return;

    await this.matchService.removeOnlineUser(userId);
    // console.log(
    //   `[handleDisconnect] online users: `,
    //   await this.matchService.getOnlineUsers(),
    // );

  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): string {
    const user = (client as any).user as IPayloadToken;

    console.log(
      `[handleMessage] user: ${user?.sub} payload: ${JSON.stringify(payload)}`,
    );

    return 'Hello world!';
  }

  @SubscribeMessage('send_challenge')
  async sendChallenge(client: Socket, payload: any) {
    try {
      const user = (client as any).user as IPayloadToken;
      const userId = user?.sub;

      console.log(`[sendChallenge] user: ${userId} payload: ${JSON.stringify(payload)}`);

      const challenge = await this.matchService.sendChallenge(userId, payload.toUserId);

      // notify challenge to the toUserId
      const toUserId = payload.toUserId;

      const onlineUser = await this.matchService.getOnlineUser(toUserId);

      if (!onlineUser.socketId) {
        console.log(`[sendChallenge] User not found: ${toUserId}`);
        throw new Error('User not found');
      }

      this.notifyUser(onlineUser.socketId, 'challenge', challenge.toJson());

      return challenge.toJson();
    } catch (error) {
      throw new WsException(error.message)
    }
  }

  @SubscribeMessage('respond_challenge')
  async respondChallenge(client: Socket, payload: { challengeId: string, accepted: boolean }) {
    try {
      const user = (client as any).user as IPayloadToken;
      const userId = user?.sub;

      console.log(`[respondChallenge] user: ${userId} payload: ${JSON.stringify(payload)}`);

      const { challenge, match } = await this.matchService.respondChallenge(payload.challengeId, userId, payload.accepted);

      const onlineUser = await this.matchService.getOnlineUser(challenge.fromUserId);

      if (!onlineUser?.socketId) {
        console.log(`[MatchGateway.respondChallenge] User not found: ${challenge.fromUserId}`);
        throw new Error('User not found');
      }

      const data = {
        challenge: challenge.toJson(),
        match: match ? match.toJson() : null,
      }

      this.notifyUser(onlineUser.socketId, 'challenge_responded', data);

      return payload;
    } catch (error) {
      throw new WsException(error.message)
    }
  }

  notifyUser(socketId: string, event: string, payload: any) {
    this.server.to(socketId).emit(event, payload);
  }

  async broadcastOnlineUsers() {
    const onlineUsers = await this.matchService.getOnlineUsers();
    this.server.emit('online_users', onlineUsers);
  }
}