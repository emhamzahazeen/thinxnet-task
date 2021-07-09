import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ServiceConfigModule } from './config/config.module';
import { DomainModule } from './domain/domain.module';
import { ApiModule } from './api/api.module';
import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
  imports: [ServiceConfigModule, DomainModule, ApiModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('');
  }
}
