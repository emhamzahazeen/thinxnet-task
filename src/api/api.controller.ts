import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DomainServiceOrchestrator } from '../domain/domain.services';

@Controller('v1')
export class ApiController {
  constructor(
    private readonly configService: ConfigService,
    private readonly domainService: DomainServiceOrchestrator,
  ) {}

  @Post('issue')
  async postIssue(@Body('description') description, @Body('user_id') userId): Promise<string> {
    return this.domainService.get()['IssueManager'].postIssue({
      description,
      userId,
    });
  }

  @Patch('issue/:id')
  async resolveIssue(@Param('id') id: number) {
    return this.domainService.get()['IssueManager'].resolveIssue({ id });
  }

  @Get('health')
  checkHealth() {
    return 'live';
  }
}
