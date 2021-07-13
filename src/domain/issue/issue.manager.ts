import { Injectable, Logger } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { PostIssueCommand, ResolveIssueCommand } from './commands/impl';
import { CreateIssueDto, ResolveIssueDto } from './dtos/index.dto';

@Injectable()
export class IssueManager {
  private readonly logger = new Logger(IssueManager.name);

  constructor(private commandBus: CommandBus) {}

  async postIssue(issue: CreateIssueDto) {
    this.logger.debug(`dispatching new issue creation command ${JSON.stringify(issue)}`);

    return this.commandBus.execute(new PostIssueCommand(issue.description, issue.userId));
  }

  async resolveIssue(issue: ResolveIssueDto) {
    this.logger.debug(`dispatching issue resolution command ${JSON.stringify(issue)}`);

    return this.commandBus.execute(new ResolveIssueCommand(issue.id));
  }
}
