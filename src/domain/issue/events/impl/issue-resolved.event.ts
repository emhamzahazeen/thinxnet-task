import { IEvent } from '@nestjs/cqrs';

export class IssueResolvedEvent implements IEvent {
  constructor(public readonly issueId: number) {}
}
