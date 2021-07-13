export interface IIssue {
  description: string;
  userId: number;
  isResolved?: boolean;
}

export interface IIssueRecord extends IIssue {
  id: number;
}

export interface IUser {
  isActive: boolean;
}

export interface IUserRecord extends IUser {
  id: number;
}

export interface ISupportAgent {
  isActive: boolean;
  activeIssueId?: string;
}

export interface ISupportAgentRecord extends ISupportAgent {
  id: number;
}
