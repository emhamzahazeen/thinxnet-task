import { IIssue, IIssueRecord } from '../../../interfaces';
import { PickType } from '@nestjs/mapped-types';

class IssueDto implements IIssue {
  description: string;
  userId: number;
}

class IssueRecordDto extends IssueDto implements IIssueRecord {
  id: number;
}

export class CreateIssueDto extends IssueDto {}

export class AssignIssueDto extends PickType(IssueRecordDto, ['id'] as const) {}

export class ResolveIssueDto extends PickType(IssueRecordDto, ['id'] as const) {}
