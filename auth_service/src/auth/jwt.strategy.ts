import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { JwtPayloadDTO } from './dto/JwtPayloadDTO';

/**
 * LocalStrategy는 passport-local 전략을 구현합니다. 이 전략은 PassportModule에 의해 자동으로 등록됩니다.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      //! JWT를 요청해더에서 분리한다.
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      //! 만료된 토큰 거부
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  /**
   * * JWT 검증 메소드
   * * _id를 통해 검증을 시도한다.
   * @param payload
   * @returns
   */
  async validate(payload: JwtPayloadDTO): Promise<JwtPayloadDTO | null> {
    const user = await this.authService.validateUserById(payload._id);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
