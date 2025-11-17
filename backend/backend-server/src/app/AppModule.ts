import {
  MiddlewareConsumer,
  Module,
  NestMiddleware,
  NestModule,
  Type,
} from '@nestjs/common';

import { CorrelationIdMiddleware } from './middlewares';
import { getServeStaticModule } from './web';
import { AuthModule } from '../auth';
import { AgentModule } from '../agent';

@Module({
  imports: [
    getServeStaticModule(),
    AuthModule,
    AgentModule,
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