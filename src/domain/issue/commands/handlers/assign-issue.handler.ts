import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AssignIssueCommand } from '../impl';
import { Logger } from '@nestjs/common';
import { SupportAgentService } from '../../../support-agent/support-agent.service';
import { IssueService } from '../../issue.service';

@CommandHandler(AssignIssueCommand)
export class AssignIssueHandler implements ICommandHandler<AssignIssueCommand> {
  private readonly logger = new Logger(AssignIssueHandler.name);

  constructor(private supportAgentService: SupportAgentService, private issueService: IssueService) {}

  async execute(commandPayload: AssignIssueCommand) {
    this.logger.debug(`executing command handler with: ${JSON.stringify(commandPayload)}`);

    const isSuccess = await this.supportAgentService.assignIssue(commandPayload);

    if(!isSuccess) {
      this.logger.debug(`no free agent available, pushing back to queue: ${JSON.stringify(commandPayload)}`);
      await this.issueService.toQueue(commandPayload.id, true);
    }
  }
}
