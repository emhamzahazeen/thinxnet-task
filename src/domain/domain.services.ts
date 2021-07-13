import { Injectable, Logger } from '@nestjs/common';
import { IssueManager } from './issue/issue.manager';

@Injectable()
export class DomainServiceOrchestrator {
  private readonly logger = new Logger(DomainServiceOrchestrator.name);

  constructor(private issueManager: IssueManager) {}

  public get() {
    this.logger.debug('domain service instance requested');

    return {
      IssueManager: this.issueManager,
    };
  }
}
