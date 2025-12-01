import {
  MiddlewareConsumer,
  Module,
  NestMiddleware,
  NestModule,
  Type,
} from '@nestjs/common';

import { CorrelationIdMiddleware } from './middlewares';
import { getServeStaticModule } from './web';
import { UsersDBModule } from '../users/db';
import { AuthModule } from '../auth';
import { AgentModule } from '../agent';
import { ThreadsModule } from '../threads';
import { ThreadsCompletionModule } from '../threads-completion';

@Module({
  imports: [
    getServeStaticModule(),
    UsersDBModule,
    AuthModule,
    AgentModule,
    ThreadsModule,
    ThreadsCompletionModule,
  ],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(...this.getMiddlewares())
      .forRoutes('*');
  }

  private getMiddlewares(): Type<NestMiddleware>[] {
    return [CorrelationIdMiddleware];
  }
}