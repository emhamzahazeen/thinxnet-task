import { Module } from '@nestjs/common';
import { DomainService } from './domain.service';

@Module({
  imports: [],
  providers: [DomainService],
  exports: [DomainService],
})
export class DomainModule {}
