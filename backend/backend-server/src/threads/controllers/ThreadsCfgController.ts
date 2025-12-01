import { Body, Controller, Post } from '@nestjs/common';
import { AuthSystemAdmin } from '@ai-job-search/gateway';
import { ThreadsCfgAPI } from '@ai-job-search/threads-api';

import { UpsertThreadCfgGWRequestImpl } from '../dtos';
import { ThreadsCfgService } from '../services';

@Controller(ThreadsCfgAPI.URL)
export class ThreadsCfgController {
  public constructor(
    private readonly threadsCfgService: ThreadsCfgService,
  ) {}

  @Post()
  @AuthSystemAdmin()
  public async upsertThreadCfg(
    @Body() request: UpsertThreadCfgGWRequestImpl,
  ): Promise<void> {
    await this.threadsCfgService.upsertThreadCfg(request);
  }
}