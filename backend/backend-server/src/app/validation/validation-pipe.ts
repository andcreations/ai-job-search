import {
  HttpException,
  HttpStatus,
  INestApplication,
  ValidationError,
  ValidationPipe,
  ValidationPipeOptions,
} from '@nestjs/common';

export function useValidationPipe(app: INestApplication): void {
  const options: ValidationPipeOptions = {
    exceptionFactory: (errors: ValidationError[]): HttpException => {
      return new HttpException(
        {
          message: errors.join(','),
          code: 'request-validation-error'
        },
        HttpStatus.BAD_REQUEST
      );
    }
  };
  app.useGlobalPipes(new ValidationPipe(options));
}