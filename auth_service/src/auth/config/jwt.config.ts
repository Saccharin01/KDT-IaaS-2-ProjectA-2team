import { JwtModuleOptions } from '@nestjs/jwt';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

export const jwtModuleOptions: JwtModuleOptions = {
  secret: process.env.JWT_SECRET || 'default_secret_key',
  signOptions: {
    expiresIn: '60s',
  },
};
