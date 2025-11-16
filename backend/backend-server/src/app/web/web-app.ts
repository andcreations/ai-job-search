import * as path from 'path';
import { DynamicModule } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { requireStrEnv } from '@ai-job-search/common';

import { BOOTSTRAP_CONTEXT } from '../../core';
import { getLogger } from '../../log';

const CACHED_URL_PATTERNS: RegExp[] = [/.*css/, /.*js/];
let staticFilesDir: string; 

function getStaticFilesDir(): string {
  if (!staticFilesDir) {
    staticFilesDir = path.normalize(requireStrEnv('MEALZ_WEB_APP_DIR'));
    getLogger().info('Static files directory', {
      ...BOOTSTRAP_CONTEXT,
      dir: staticFilesDir,
    });
  }
  return staticFilesDir;
}

function setHeaders(
  response: any,
  resourcePath: string,
  _stat: any,
): any {
  if (!response.setHeader) {
    return;
  }

  const dir = getStaticFilesDir();
  const relativePath = resourcePath.substring(dir.length);
  const cached = CACHED_URL_PATTERNS.some(pattern => {
    return relativePath.match(pattern);
  });

  response.setHeader('Cache-Control', cached ? 'private' : 'no-store');
}

export function getServeStaticModule(): DynamicModule {
  return ServeStaticModule.forRoot({
    rootPath: getStaticFilesDir(),
    serveRoot: '/',
    exclude: ['/api'],
    serveStaticOptions: {
      setHeaders,
    },
  });
}