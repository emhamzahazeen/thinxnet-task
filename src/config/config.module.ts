import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { join, resolve } from 'path';

const rootPath = resolve(process.cwd());
const defaultEnvFile = join(rootPath, '.env');
const nodeEnvFile = process.env.NODE_ENV
  ? [join(rootPath, `.env.${process.env.NODE_ENV.toLowerCase()}`), '.env.local']
  : ['.env.local'];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [...nodeEnvFile, defaultEnvFile],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('test', 'development', 'staging', 'production')
          .default('development'),
        PORT: Joi.number().default(3000)
      }),
    }),
  ],
  providers: [ConfigService],
})
export class ServiceConfigModule {}
