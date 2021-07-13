import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AggregateRoot } from '@nestjs/cqrs';
import { IssueCreatedEvent } from './events/impl/issue-created.event';
import { IssueResolvedEvent } from './events/impl/issue-resolved.event';

@Entity()
export class Issue extends AggregateRoot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column({ default: false })
  isResolved: boolean;

  @Column()
  userId: number;

  constructor() {
    super();
  }

  created() {
    this.apply(new IssueCreatedEvent(this.id));
  }

  resolved() {
    this.apply(new IssueResolvedEvent(this.id));
  }
}
