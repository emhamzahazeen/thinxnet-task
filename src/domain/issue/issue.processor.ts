import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { CommandBus } from '@nestjs/cqrs';
import { AssignIssueCommand } from './commands/impl';

@Processor('issues')
export class IssueProcessor {
  private readonly logger = new Logger(IssueProcessor.name);

  constructor(private commandBus: CommandBus) {}

  @Process()
  assignIssue(job: Job) {
    this.logger.debug(`dispatching new issue assignment command ${JSON.stringify(job.data)}`);

    return this.commandBus.execute(new AssignIssueCommand(job.data.id));
  }
}
