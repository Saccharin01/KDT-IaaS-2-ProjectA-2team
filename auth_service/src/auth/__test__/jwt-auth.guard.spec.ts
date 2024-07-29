import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { JwtStrategy } from '../jwt.strategy';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

describe('JwtAuthGuard', () => {
  let guard: JwtAuthGuard;
  let authService: AuthService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtAuthGuard,
        JwtStrategy,
        {
          provide: AuthService,
          useValue: {
            validateUserById: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('test-token'),
          },
        },
      ],
    }).compile();

    guard = module.get<JwtAuthGuard>(JwtAuthGuard);
    authService = module.get<AuthService>(AuthService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('super.canActive 호츌, 토큰이 옳바른 Secret 키를 포함했을 떄', async () => {
    const validToken = jwt.sign(
      { _id: '111', password: 'test' },
      configService.get('test'),
      { expiresIn: '1h' },
    );

    const context = {
      switchToHttp: jest.fn().mockReturnThis(),
      getRequest: jest.fn().mockReturnValue({
        headers: {
          authorization: `Bearer ${validToken}`,
        },
      }),
      getResponse: jest.fn().mockReturnValue({}),
    } as unknown as ExecutionContext;

    jest
      .spyOn(authService, 'validateUserById')
      .mockResolvedValue({ _id: '111' });

    const canActivateSpy = jest.spyOn(
      AuthGuard('jwt').prototype,
      'canActivate',
    );

    await guard.canActivate(context);
    expect(canActivateSpy).toHaveBeenCalledWith(context);
  });

  it('super.canActive 호츌, 토큰이 인증되지않는 Secret 키를 포함했을 떄', async () => {
    const validToken = jwt.sign(
      { _id: '111', password: 'test' },
      'Invalid Token',
      { expiresIn: '1h' },
    );

    const context = {
      switchToHttp: jest.fn().mockReturnThis(),
      getRequest: jest.fn().mockReturnValue({
        headers: {
          authorization: `Bearer ${validToken}`,
        },
      }),
      getResponse: jest.fn().mockReturnValue({}),
    } as unknown as ExecutionContext;

    jest
      .spyOn(authService, 'validateUserById')
      .mockResolvedValue({ _id: '111' });

    const canActivateSpy = jest.spyOn(
      AuthGuard('jwt').prototype,
      'canActivate',
    );

    try {
      await guard.canActivate(context);
    } catch (error) {
      expect(canActivateSpy).toHaveBeenCalledWith(context);
      expect(error).toBeInstanceOf(UnauthorizedException);
    }
  });

  it('handRequest에 옳바른 값 반환하는지', () => {
    const user = { _id: 'test' };
    const result = guard.handleRequest(null, user, null);
    expect(result).toEqual(user);
  });

  it('handleRequest에서 user 매개 변수가 null 일 때', () => {
    expect(() => guard.handleRequest(null, null, null)).toThrow(
      UnauthorizedException,
    );
  });
});
