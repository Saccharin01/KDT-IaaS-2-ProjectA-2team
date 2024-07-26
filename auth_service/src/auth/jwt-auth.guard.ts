// jwt-auth.guard.ts
import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtPayloadDTO } from './dto/JwtPayloadDTO';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context); // 기본 인증 로직을 실행합니다.
  }

  //* validate 메소드가 호출되고 난 후, 자동으로 호출되는 메소드
  handleRequest<TUser = JwtPayloadDTO | null>(err, user: TUser, info) {
    if (err || !user) {
      if (info) {
        console.log('Authentication failed:', info.message);
      }
      throw err || new UnauthorizedException();
    }

    //* 해당 반환 값을 req.user에 할당한다.
    return user;
  }
}
