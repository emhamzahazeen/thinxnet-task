import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSupportAgentDto } from './support-agent.dto';
import { SupportAgent } from './support-agent.entity';
import { AssignIssueDto, ResolveIssueDto } from '../issue/dtos/index.dto';

@Injectable()
export class SupportAgentService {
  private readonly logger = new Logger(SupportAgentService.name);
  constructor(
    @InjectRepository(SupportAgent)
    private readonly repository: Repository<SupportAgent>,
  ) {}

  create(createSupportAgentDto: CreateSupportAgentDto): Promise<SupportAgent> {
    this.logger.debug(`persisting agent with: ${JSON.stringify(createSupportAgentDto)}`);

    const agent = new SupportAgent();
    agent.isActive = createSupportAgentDto.isActive;
    return this.repository.save(agent);
  }

  findOneFree(): Promise<SupportAgent> {
    return this.repository.findOne({
      where: {
        activeIssueId: null,
      },
    });
  }

  async assignIssue(assignIssueDto: AssignIssueDto) {
    this.logger.debug(`persisting agent info with: ${JSON.stringify(assignIssueDto)}`);

    const availAgent = await this.findOneFree();
    this.logger.debug(`free agent found : ${JSON.stringify(availAgent)}`);

    if (!availAgent) {
      this.logger.debug(`no free agent found`);
      return false;
    }

    return this.repository.update(availAgent.id, { activeIssueId: assignIssueDto.id });
  }

  async markFree(resolveIssueDto: ResolveIssueDto) {
    this.logger.debug(`persisting agent as free: ${JSON.stringify(resolveIssueDto)}`);

    return this.repository.update(
      {
        activeIssueId: resolveIssueDto.id,
      },
      { activeIssueId: null },
    );
  }
}
