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

  handleRequest<TUser = JwtPayloadDTO | null>(err, user: TUser, info) {
    if (err || !user) {
      if (info) {
        console.log('Authentication failed:', info.message); // 인증 실패 이유를 로그로 출력
      }
      throw err || new UnauthorizedException(); // 에러가 있거나 사용자가 없으면 예외를 발생시킵니다.
    }
    return user; // 인증된 사용자 정보를 반환하여 req.user에 설정합니다.
  }
}
