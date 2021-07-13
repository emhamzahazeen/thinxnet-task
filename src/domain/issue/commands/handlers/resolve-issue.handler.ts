import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ResolveIssueCommand } from '../impl';
import { Logger } from '@nestjs/common';
import { IssueService } from '../../issue.service';

@CommandHandler(ResolveIssueCommand)
export class ResolveIssueHandler implements ICommandHandler<ResolveIssueCommand> {
  private readonly logger = new Logger(ResolveIssueHandler.name);

  constructor(private issueService: IssueService) {}

  async execute(commandPayload: ResolveIssueCommand) {
    this.logger.debug(`executing command handler with: ${JSON.stringify(commandPayload)}`);
    await this.issueService.resolveIssue(commandPayload);
  }
}
