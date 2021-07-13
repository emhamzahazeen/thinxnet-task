import { Injectable, Logger } from '@nestjs/common';
import { EventBus, EventPublisher } from '@nestjs/cqrs';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

import { IssueRepository } from './issue.repository';
import { AssignIssueDto, CreateIssueDto } from './dtos/index.dto';
import { Issue } from './issue.entity';
import { SupportAgentService } from '../support-agent/support-agent.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class IssueService {
  private readonly logger = new Logger(IssueService.name);

  constructor(
    private readonly configService: ConfigService,
    private repository: IssueRepository,
    private publisher: EventPublisher,
    private eventBus: EventBus,
    private supportAgentService: SupportAgentService,
    @InjectQueue('issues') private readonly issuesQueue: Queue,
  ) {}

  async createIssue(createIssueDto: CreateIssueDto) {
    this.logger.debug(`persisting issue with: ${JSON.stringify(createIssueDto)}`);

    const issue = new Issue();
    const issueModel = this.publisher.mergeObjectContext(issue);
    issue.description = createIssueDto.description;
    issue.userId = createIssueDto.userId;
    await this.repository.save(issue);
    issueModel.created();
    issueModel.commit();
  }

  async toQueue(issueId: number, lifo = false) {
    this.logger.debug(`pushing issue #${issueId} to queue`);

    await this.issuesQueue.add({ id: issueId }, { lifo, delay: this.configService.get('QUEUE_PROCESS_DELAY') });
  }

  async resolveIssue(assignIssueDto: AssignIssueDto) {
    this.logger.debug(`resolving issue ${assignIssueDto.id}`);

    const issueModel = this.publisher.mergeObjectContext(await this.repository.findOne(assignIssueDto.id));
    await this.repository.update(assignIssueDto.id, { isResolved: true });
    issueModel.resolved();
    issueModel.commit();
  }
}
