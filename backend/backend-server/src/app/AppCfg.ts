import { INestApplication } from '@nestjs/common';
import cookieParser from 'cookie-parser';

import { useValidationPipe } from './validation';
import { ErrorsInterceptor } from './errors';

export class AppCfg {
  public static async configure(app: INestApplication): Promise<void> {
    app.use(cookieParser());
    app.enableShutdownHooks();    
    useValidationPipe(app);
    app.useGlobalInterceptors(new ErrorsInterceptor());
  }
}