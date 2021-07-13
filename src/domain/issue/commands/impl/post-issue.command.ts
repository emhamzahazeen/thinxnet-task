export class PostIssueCommand {
  constructor(
    public readonly description: string,
    public readonly userId: number,
  ) {}
}
