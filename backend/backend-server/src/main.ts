import { NestFactory } from '@nestjs/core';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import { getIntEnv } from '@ai-job-search/common';

import { BOOTSTRAP_CONTEXT } from './core';
import { getLogger } from './log';
import { AppModule } from './app';

async function bootstrap() {
  // create application
  const app = await NestFactory
    .create<NestExpressApplication>(
      AppModule,
      new ExpressAdapter(),
      {}
    );
  app.use(cookieParser());

  // configure
  app.enableShutdownHooks();

  // listen
  const port = getIntEnv('HTTP_PORT', 8080);
  getLogger().info('Listening on port', {
    ...BOOTSTRAP_CONTEXT,
    port,
  });
  await app.listen(port, '0.0.0.0');
}

bootstrap()
  .catch((error) => {
    console.error('Failed to bootstrap', error);
    process.exit(1);
  });
