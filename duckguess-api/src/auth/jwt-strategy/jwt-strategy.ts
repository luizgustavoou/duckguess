import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-jwt';
import { jwtConstants } from '../constants';
import { IPayloadToken } from 'src/types/payload-token';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
      // secretOrKeyProvider(requestType, tokenOrPayload, options) {},
    });
  }

  async validate(payload: IPayloadToken) {
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}
