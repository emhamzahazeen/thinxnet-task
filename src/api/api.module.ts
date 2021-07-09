import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { DomainModule } from '../domain/domain.module';

@Module({
  imports: [DomainModule],
  controllers: [ApiController],
})
export class ApiModule {}
