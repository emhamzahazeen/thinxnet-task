import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ServiceConfigModule } from './config/config.module';
import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
  imports: [ServiceConfigModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('');
  }
}
