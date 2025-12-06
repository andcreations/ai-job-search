import { HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { AIJobSearchError } from '@ai-job-search/common';


export class ResponseError {
  public static set(response: Response, error: Error): void {
    if (error instanceof AIJobSearchError) {
      response.status(error.getHTTPStatus()).send({
        message: error.getMessage(),
        code: error.getCode(),
      });
      return;
    }

    if (error instanceof HttpException) {
      response.status(error.getStatus()).send({
        message: error.message,
      });
      return;
    }
    
    response
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send({
        message: 'Internal server error',
      });
  }
}