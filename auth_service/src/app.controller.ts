import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  ConflictException,
  Get,
  Query,
} from '@nestjs/common';
import { LoginDto } from '@shared/dto/login.dto';
import { AccountDto } from '@shared/dto/account.dto';
import CheckIdDTO from '@shared/interfaces/checkId';
import SuccessDTO from '@shared/dto/success.dto';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.appService.validateUser(
      loginDto._id,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('InCorrect UserId or Password');
    }

    const token = await this.appService.makeJWT(loginDto);
    return token;
  }

  // 회원가입 엔드포인트
  @Post('signup')
  async signup(@Body() body: AccountDto) {
    const result = await this.appService.create(body); // 사용자 생성

    if (result === false) throw new ConflictException('User already exists');

    return;
  }

  @Get('checkId')
  async checkId(@Query() query: CheckIdDTO): Promise<SuccessDTO> {
    const result = await this.appService.checkDuplicate(query.userId);
    return { success: result };
  }
}
