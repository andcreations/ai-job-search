import { ApiProperty } from '@nestjs/swagger';
import { CreateThreadGWResponse } from '@ai-job-search/threads-api';

export class CreateThreadGWResponseImpl implements CreateThreadGWResponse {
  @ApiProperty({
    description: 'The identifier of the thread',
  })
  public id: string;
}