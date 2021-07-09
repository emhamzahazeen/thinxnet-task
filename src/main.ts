import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  await app.listen(port);

  const logger = new Logger('main');

  logger.log(
    `${configService.get('SERVICE_NAME')} running at http://localhost:${port}`,
  );
}
bootstrap();
