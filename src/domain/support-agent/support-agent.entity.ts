import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AggregateRoot } from '@nestjs/cqrs';

@Entity()
export class SupportAgent extends AggregateRoot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null })
  activeIssueId: number;

  @Column({ default: true })
  isActive: boolean;

  constructor() {
    super();
  }
}
