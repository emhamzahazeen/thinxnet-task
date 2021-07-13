import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PostIssueCommand } from '../impl';
import { Logger } from '@nestjs/common';
import { IssueService } from '../../issue.service';

@CommandHandler(PostIssueCommand)
export class PostIssueHandler implements ICommandHandler<PostIssueCommand> {
  private readonly logger = new Logger(PostIssueHandler.name);

  constructor(private issueService: IssueService) {}

  async execute(commandPayload: PostIssueCommand) {
    this.logger.debug(`executing command handler with: ${JSON.stringify(commandPayload)}`);
    await this.issueService.createIssue(commandPayload);
  }
}
