import { ConfigModuleOptions } from "@nestjs/config";
import * as Joi from "joi";

export const configOptions: ConfigModuleOptions = {
  envFilePath: [".env", ".env.development"],
  isGlobal: true,
  ignoreEnvFile: false,
  validationSchema: Joi.object({
    DATABASE_HOST: Joi.string().required(),
  }),
  validationOptions: {
    abortEarly: false,
    allowUnknown: true,
  },
};
