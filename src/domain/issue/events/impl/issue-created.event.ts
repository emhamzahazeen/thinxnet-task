import { IEvent } from '@nestjs/cqrs';

export class IssueCreatedEvent implements IEvent {
  constructor(public readonly issueId: number) {}
}
