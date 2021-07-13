import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { IssueCreatedEvent } from '../impl/issue-created.event';
import { Logger } from '@nestjs/common';
import { IssueService } from '../../issue.service';

@EventsHandler(IssueCreatedEvent)
export class IssueCreatedHandler implements IEventHandler<IssueCreatedEvent> {
  private readonly logger = new Logger(IssueCreatedHandler.name);

  constructor(private issueService: IssueService) {}

  async handle(event: IssueCreatedEvent) {
    this.logger.debug(`new issue created: ${JSON.stringify(event)}`);

    await this.issueService.toQueue(event.issueId);
  }
}
