import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DomainService } from '../domain/domain.service';

@Controller('v1')
export class ApiController {
  constructor(
    private readonly configService: ConfigService,
    private readonly appService: DomainService,
  ) {}

  @Get('health')
  checkHealth() {
    return 'live';
  }
}
