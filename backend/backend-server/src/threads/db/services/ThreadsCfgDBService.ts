import { Injectable } from '@nestjs/common';
import { type IdGenerator, InjectIdGenerator } from '@ai-job-search/common';

import { ThreadCfg } from '../../types';
import { ThreadCfgNotFoundError } from '../errors';
import { ThreadsCfgRepository } from '../repositories';

@Injectable()
export class ThreadsCfgDBService {
  public constructor(
    private readonly threadsCfgRepository: ThreadsCfgRepository,
    @InjectIdGenerator() private readonly idGenerator: IdGenerator,

  ) {}

  public async upsertThreadCfg(
    name: string,
    threadCfg: ThreadCfg,
  ): Promise<void> {
    await this.threadsCfgRepository.upsertThreadCfg({
      id: this.idGenerator(),
      name,
      cfg: Buffer.from(JSON.stringify(threadCfg)),
    });
  }

  public async readThreadCfg(
    name: string,
  ): Promise<ThreadCfg> {
    const entity = await this.threadsCfgRepository.readThreadCfg(name);
    if (!entity) {
      throw new ThreadCfgNotFoundError(name);
    }
    return JSON.parse(entity.cfg.toString());
  }
}