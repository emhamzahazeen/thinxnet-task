import { PostIssueHandler } from './post-issue.handler';
import { AssignIssueHandler } from './assign-issue.handler';
import { ResolveIssueHandler } from './resolve-issue.handler';

export const IssueCommandHandlers = [PostIssueHandler, AssignIssueHandler, ResolveIssueHandler];
