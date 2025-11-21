import * as React from 'react';
import { useEffect, useRef } from 'react';

import { usePatchState, useService, useTranslations } from '../../hooks';
import { AgentService } from '../../agent';
import {
  ChatPart,
  ModelErrorChatPart,
  ModelOutputChatPart,
  UserInputChatPart,
} from '../parts';
import { ChatOutput } from './ChatOutput';
import { ChatInput } from './ChatInput';
import { ChatTranslations } from './Chat.translations';

interface ChatState {
  userInput: string;
  modelOutput: string;
  streaming: boolean;
  chatParts: ChatPart<unknown>[];
}

export function Chat() {
  const agentService = useService(AgentService);
  const translate = useTranslations(ChatTranslations);
  const [state, setState] = React.useState<ChatState>({
    userInput: '',
    modelOutput: '',
    streaming: false,
    chatParts: [],
  });
  const patchState = usePatchState(setState);
  const autoScroll = useRef(false);

  useEffect(() => {
    return () => {
      agentService.cancelChatCompletionStream();
    };
  }, []);

  const doScrollToBottom = () => {
    const el = document.getElementById('aijs-chat-output-container');
    if (!el) {
      return;
    }

    // iOS Safari sometimes throws on smooth scroll
    const supportsSmooth = 'scrollBehavior' in document.documentElement.style;    
    if (supportsSmooth) {
      el.scrollTo({
        top: el.scrollHeight,
        behavior: 'smooth',
      });
    } else {
      el.scrollTo(0, el.scrollHeight);
    }
  };
  const scrollToBottom = () => {
    setTimeout(() => { doScrollToBottom(); }, 0);
  };

  const addChatParts = (
    chatParts: ChatPart<unknown>[],
    extraState: Partial<ChatState> = {},
  ) => {
    setState(prevState => ({
      ...prevState,
      chatParts: [...prevState.chatParts, ...chatParts],
      ...extraState,
    }));
  };

  const onTextChange = (text: string) => {
    patchState({ userInput: text });
  };

  const onTextEnter = () => {
    if (state.streaming) {
      return;
    }

    const handleError = (error: Error) => {
      addChatParts(
        [
          new ModelErrorChatPart(translate('error-occurred'))
        ],
        {
          streaming: false,
        }
      );
      autoScroll.current = false;
    };

    // scroll to the bottom prior to starting the streaming
    scrollToBottom();
    autoScroll.current = true;

    // add the user input part
    addChatParts(
      [
        new UserInputChatPart(state.userInput),
        new ModelOutputChatPart(''),
      ],
      {
        userInput: '',
        modelOutput: '',
        streaming: true,
      }
    );

    // start the streaming
    agentService.streamChatCompletion(
      { userInput: state.userInput },
      {
        onModelTextChunk: (chunk: string) => {
          setState(prevState => {
            const modelOutput = prevState.modelOutput + chunk;
            return {
              ...prevState,
              modelOutput,
              chatParts: [
                ...prevState.chatParts.slice(0, -1),
                new ModelOutputChatPart(modelOutput),
              ],
            }
          });
          if (autoScroll.current) {
            scrollToBottom();
          }
        },
        onFinish: () => {
          patchState({ streaming: false });
          autoScroll.current = false;
        },
        onError: (error: Error) => handleError(error),
      }
    )
    .catch(error => {
      handleError(error);
    });
  };

  return (
    <div className='aijs-chat'>
      { state.chatParts.length > 0 &&
        <ChatOutput
          chatParts={state.chatParts}
          onScrollUp={() => {
            autoScroll.current = false;
          }}
        />
      }
      <ChatInput
        text={state.userInput}
        hasChatParts={state.chatParts.length > 0}
        onTextChange={onTextChange}
        onTextEnter={onTextEnter}
      />
    </div>
  );
}