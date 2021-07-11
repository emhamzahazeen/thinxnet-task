export interface IIssue {
  description: string;
  userId: string;
}

export interface IIssueRecord extends IIssue {
  id: string;
}

export interface IUser {
  isActive: boolean;
}

export interface IUserRecord extends IUser {
  id: string;
}

export interface ISupportAgent {
  isActive: boolean;
  activeIssueId: string;
}

export interface ISupportAgentRecord extends ISupportAgent {
  id: string;
}
