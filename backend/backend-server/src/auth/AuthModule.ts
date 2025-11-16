import { Module } from '@nestjs/common';
import { LogModule } from '@ai-job-search/log';

import { AuthService } from './services';
import { AuthController } from './controllers';

@Module({
  imports: [LogModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}