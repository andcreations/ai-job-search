import { Module } from '@nestjs/common';
import { LogModule } from '@ai-job-search/log';
import { UsersDBModule } from '@ai-job-search/users-db';

import { AuthService } from './services';
import { AuthController } from './controllers';

@Module({
  imports: [LogModule, UsersDBModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}