import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { ServiceConfigModule } from './config/config.module';
import { DomainModule } from './domain/domain.module';
import { ApiModule } from './api/api.module';
import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
  imports: [
    ServiceConfigModule,
    DomainModule,
    ApiModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        ({
          type: configService.get<string>('DB_CONNECTION'),
          host: configService.get<string>('FORWARD_DB_HOST'),
          port: configService.get<number>('FORWARD_DB_PORT'),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_DATABASE'),
          autoLoadEntities: true,
          synchronize: true,
        } as TypeOrmModuleOptions),
    }),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('');
  }
}
