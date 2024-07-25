import { JwtStrategy } from '../jwt.strategy';
import { Test } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common';

describe('JWT Strategy Test', () => {
  let jwtStrategy: JwtStrategy;
  let authService: AuthService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
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
            get: jest.fn().mockReturnValue('testSecret'),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    jwtStrategy = module.get<JwtStrategy>(JwtStrategy);
  });

  describe('validate Method Test', () => {
    it('유저 정보가 옳바르게 검증 됬을 떄', async () => {
      const payload = { _id: 'testId' };
      const user = { _id: 'testId' };

      jest.spyOn(authService, 'validateUserById').mockResolvedValue(user);

      const result = await jwtStrategy.validate(payload);
      expect(result).toEqual(user);
    });

    it('유저 정보 검증에 실패했을 떄', async () => {
      const payload = { _id: 'testId' };

      jest.spyOn(authService, 'validateUserById').mockResolvedValue(null);

      await expect(jwtStrategy.validate(payload)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
