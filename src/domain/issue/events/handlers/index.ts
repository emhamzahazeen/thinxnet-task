import { IssueCreatedHandler } from './issue-created.handler';
import { IssueResolvedHandler } from './issue-resolved.handler';

export const IssueEventHandlers = [IssueCreatedHandler, IssueResolvedHandler];
