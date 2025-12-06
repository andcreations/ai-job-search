import { Injectable } from '@nestjs/common';
import { AIJobSearchError, InternalServerError } from '@ai-job-search/common';
import {
  Message,
  MODEL_MESSAGE_TYPE,
  USER_MESSAGE_TYPE,
} from '@ai-job-search/agent';
import {
  GWMessage,
  USER_GW_MESSAGE_TYPE,
  UserGWMessage,
  MODEL_GW_MESSAGE_TYPE,
  ModelGWMessage,
} from '@ai-job-search/threads-completion-api';

@Injectable()
export class ThreadMessagesMapper {
  public toGWMessage(message: Message): GWMessage<unknown> {
    switch (message.type) {
      case USER_MESSAGE_TYPE:
        const userGWMMessage: UserGWMessage = {
          id: message.id,
          type: USER_GW_MESSAGE_TYPE,
          data: {
            content: message.data.content,
          },
        };
        return userGWMMessage;

      case MODEL_MESSAGE_TYPE:
        const modelGWMMessage: ModelGWMessage = {
          id: message.id,
          type: MODEL_GW_MESSAGE_TYPE,
          data: {
            content: message.data.content,
          },
        };
        return modelGWMMessage;

      default:
        throw new InternalServerError(
          `Unknown agent message type ${AIJobSearchError.quote(message.type)}`
        );
    }
  }

  public toGWMessages(messages: Message[]): GWMessage<unknown>[] {
    return messages.map(message => this.toGWMessage(message));
  }
}