import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { IssueResolvedEvent } from '../impl/issue-resolved.event';
import { SupportAgentService } from '../../../support-agent/support-agent.service';

@EventsHandler(IssueResolvedEvent)
export class IssueResolvedHandler implements IEventHandler<IssueResolvedEvent> {
  private readonly logger = new Logger(IssueResolvedHandler.name);

  constructor(private supportAgentService: SupportAgentService) {}

  async handle(event: IssueResolvedEvent) {
    this.logger.debug(`processing issue resolved event: ${JSON.stringify(event)}`);
    await this.supportAgentService.markFree({ id: event.issueId });
  }
}
