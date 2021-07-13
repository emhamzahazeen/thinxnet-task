import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';

import { IssueManager } from './issue/issue.manager';
import { IssueCommandHandlers } from './issue/commands/handlers';
import { UsersService } from './user/user.service';
import { User } from './user/user.entity';
import { SupportAgent } from './support-agent/support-agent.entity';
import { SupportAgentService } from './support-agent/support-agent.service';
import { IssueRepository } from './issue/issue.repository';
import { IssueEventHandlers } from './issue/events/handlers';
import { DomainServiceOrchestrator } from './domain.services';
import { IssueService } from './issue/issue.service';
import { IssueProcessor } from './issue/issue.processor';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, SupportAgent, IssueRepository]),
    BullModule.registerQueue({
      name: 'issues',
    }),
    CqrsModule,
  ],
  providers: [
    UsersService,
    SupportAgentService,
    IssueService,
    IssueManager,
    DomainServiceOrchestrator,
    ...IssueEventHandlers,
    ...IssueCommandHandlers,
    IssueProcessor,
  ],
  exports: [DomainServiceOrchestrator],
})
export class DomainModule {}
