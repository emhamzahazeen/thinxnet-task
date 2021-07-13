import { ISupportAgent } from '../../interfaces';

export class SupportAgentDto implements ISupportAgent {
  isActive: boolean;
  activeIssueId?: string;
}

export class CreateSupportAgentDto extends SupportAgentDto {}
