import {
  MiddlewareConsumer,
  Module,
  NestMiddleware,
  NestModule,
  Type,
} from '@nestjs/common';

import { AuthModule } from '../auth';
import { CorrelationIdMiddleware } from './middlewares';
import { getServeStaticModule } from './web';

@Module({
  imports: [
    getServeStaticModule(),
    AuthModule
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