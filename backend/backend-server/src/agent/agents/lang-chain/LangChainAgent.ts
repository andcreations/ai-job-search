import { BaseLanguageModel } from '@langchain/core/language_models/base';
import {
  AIMessage,
  HumanMessage,
  ReactAgent,
  ToolMessage,
  createAgent,
} from 'langchain';

import {
  Agent,
  AgentCfg,
  AgentInvokeInput,
  AgentInvokeOutput,
  AgentStreamInput,
  Message,
} from '../../types';
import {
  MODEL_MESSAGE_TYPE,
  ModelMessage,
  USER_MESSAGE_TYPE,
  UserMessage,
} from '../../messages';
import {
  CheckpointSaverProvider,
} from './CheckpointSaverProvider';

export abstract class LangChainAgent extends Agent {
  private agent: ReactAgent;

  protected constructor(
    name: string,
    private readonly langChainCheckpointSaver: CheckpointSaverProvider,
  ) {
    super(name);
  }

  /**
   * Create a LangChain model.
   */
  protected abstract createModel(agentCfg: AgentCfg): BaseLanguageModel;

  public async init(agentCfg: AgentCfg): Promise<void> {
    const model = this.createModel(agentCfg);
    this.agent = createAgent({
      model,
      tools: [], // TODO Add tools.
      checkpointer: await this.langChainCheckpointSaver.getCheckpointSaver(),
    });
  }

  public async invoke(input: AgentInvokeInput): Promise<AgentInvokeOutput> {
    // invoke
    const response = await this.agent.invoke(
      {
        messages: [
          {
            role: 'user',
            content: input.userMessage
          }
        ],
      },
      {
        configurable: {
          thread_id: input.threadId,
        },
      }
    );

    // build messages
    const messages: Message[] = [];
    for (const responseMessage of response.messages) {
      if (responseMessage instanceof HumanMessage) {
        const userMessage: UserMessage = {
          id: responseMessage.id,
          type: USER_MESSAGE_TYPE,
          data: {
            content: responseMessage.text,
          },
        };
        messages.push(userMessage);
      }
      else if (responseMessage instanceof AIMessage) {
        const toolCalls = responseMessage.tool_calls;
        if (toolCalls?.length) {
          // TODO Handle tool calls.
        }
        else {
          const modelMessage: ModelMessage = {
            id: responseMessage.id,
            type: MODEL_MESSAGE_TYPE,
            data: {
              content: responseMessage.text,
            },
          };
          messages.push(modelMessage);
        }
      }
      else if (responseMessage instanceof ToolMessage) {
        // TODO Handle tool results.
      }
    }

    return { messages };
  }

  public async stream(input: AgentStreamInput): Promise<void> {
  }
}