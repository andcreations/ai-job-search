import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AgentAPI } from '@ai-job-search/agent-api';

import { CreateChatCompletionGWRequestImpl } from '../dtos';
import { AgentService } from '../services';

@Controller(AgentAPI.URL)
export class AgentController {
  public constructor(private readonly agentService: AgentService) {}

  @Post()
  public async createChatCompletion(
    @Body() body: CreateChatCompletionGWRequestImpl,
    @Res() res: Response
  ): Promise<void> {
    // important headers for streaming
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');
    res.setHeader('Cache-Control', 'no-cache');    
    res.flushHeaders?.(); // Is it needed?

    const chunks = [
      'Hello',
      ' there,',
      ' this is ',
      'NestJS ',
      'streamed ',
      'text. ',
    ];
    const manyChunks = [];
    for (let i = 0; i < 16; i++) {
      manyChunks.push(...chunks);
    }

    for (const chunk of manyChunks) {
      res.write(chunk);
      // simulate delay like tokens coming from an LLM
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    res.end();    
  }
}