import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { Role } from 'src/common/enums/Role.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || 'defaultSecret',
    });
  }
  async validate(payload: { sub: string; role: Role; email: string }) {
    if (payload?.role) {
      return {
        id: payload.sub,
        userId: payload.sub,
        email: payload.email,
        role: payload.role,
      };
    }

    const user = await this.userService.findById(payload.sub);
    return {
      id: payload.sub,
      userId: payload.sub,
      email: payload.email,
      role: user?.role,
    };
  }
}
