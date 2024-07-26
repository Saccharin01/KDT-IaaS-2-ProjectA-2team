import { ConfigModuleOptions } from '@nestjs/config';
import * as Joi from 'joi';
import path from 'path';

export const configOptions: ConfigModuleOptions = {
  envFilePath: [path.resolve(__dirname, '../.env')],
  isGlobal: true,
  ignoreEnvFile: false,
  validationSchema: Joi.object({
    JWT_SECRET: Joi.string().default('default_secret_key').required(),
  }),
  validationOptions: {
    abortEarly: false,
    allowUnknown: true,
  },
};
