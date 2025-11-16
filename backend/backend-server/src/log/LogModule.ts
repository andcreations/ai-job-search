import { Module } from '@nestjs/common';

import { Logger } from './services';
import { getLogger } from './logger';

@Module({
  providers: [{
    provide: Logger,
    useValue: getLogger(),
  }],
  exports: [Logger],
})
export class LogModule {}