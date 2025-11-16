import * as React from 'react';
import { useEffect } from 'react';

import { usePatchState, useService } from '../../hooks';
import { ChatPart, ModelOutputChatPart, UserInputChatPart } from '../parts';
import { ChatOutput } from './ChatOutput';
import { ChatInput } from './ChatInput';
import { ChatService } from '../services';

interface ChatState {
  userInput: string;
  modelOutput: string;
  streaming: boolean;
  chatParts: ChatPart<unknown>[];
}

export function Chat() {
  const chatService = useService(ChatService);
  const [state, setState] = React.useState<ChatState>({
    userInput: '',
    modelOutput: '',
    streaming: false,
    chatParts: [
      new UserInputChatPart('Tell me a joke'),
      new ModelOutputChatPart(
        'Why did the chicken cross the road? To get to the other side.' +
        'Why did the chicken cross the road? To get to the other side.' +
        'Why did the chicken cross the road? To get to the other side.' +
        'Why did the chicken cross the road? To get to the other side.' +
        'Why did the chicken cross the road? To get to the other side.'
      ),
      new UserInputChatPart('Tell me a joke'),
      new ModelOutputChatPart(
        'Why did the chicken cross the road? To get to the other side.' +
        'Why did the chicken cross the road? To get to the other side.' +
        'Why did the chicken cross the road? To get to the other side.' +
        'Why did the chicken cross the road? To get to the other side.' +
        'Why did the chicken cross the road? To get to the other side.'
      ),
      new UserInputChatPart('Tell me a joke'),
      new ModelOutputChatPart(
        'Why did the chicken cross the road? To get to the other side.' +
        'Why did the chicken cross the road? To get to the other side.' +
        'Why did the chicken cross the road? To get to the other side.' +
        'Why did the chicken cross the road? To get to the other side.' +
        'Why did the chicken cross the road? To get to the other side.'
      ),
      new UserInputChatPart('Tell me a joke'),
      new ModelOutputChatPart(
        'Why did the chicken cross the road? To get to the other side.' +
        'Why did the chicken cross the road? To get to the other side.' +
        'Why did the chicken cross the road? To get to the other side.' +
        'Why did the chicken cross the road? To get to the other side.' +
        'Why did the chicken cross the road? To get to the other side.'
      ),
      new UserInputChatPart('Tell me a joke'),
      new ModelOutputChatPart(
        'Why did the chicken cross the road? To get to the other side.' +
        'Why did the chicken cross the road? To get to the other side.' +
        'Why did the chicken cross the road? To get to the other side.' +
        'Why did the chicken cross the road? To get to the other side.' +
        'Why did the chicken cross the road? To get to the other side.'
      ),
      new UserInputChatPart('Tell me a joke'),
      new ModelOutputChatPart(
        'Why did the chicken cross the road? To get to the other side.' +
        'Why did the chicken cross the road? To get to the other side.' +
        'Why did the chicken cross the road? To get to the other side.' +
        'Why did the chicken cross the road? To get to the other side.' +
        'Why did the chicken cross the road? To get to the other side.'
      ),
      new UserInputChatPart('Tell me a joke'),
      new ModelOutputChatPart(
        'Why did the chicken cross the road? To get to the other side.' +
        'Why did the chicken cross the road? To get to the other side.' +
        'Why did the chicken cross the road? To get to the other side.' +
        'Why did the chicken cross the road? To get to the other side.' +
        'Why did the chicken cross the road? To get to the other side.'
      ),
      new UserInputChatPart('Tell me a joke'),
      new ModelOutputChatPart(
        'Why did the chicken cross the road? To get to the other side.' +
        'Why did the chicken cross the road? To get to the other side.' +
        'Why did the chicken cross the road? To get to the other side.' +
        'Why did the chicken cross the road? To get to the other side.' +
        'Why did the chicken cross the road? To get to the other side.'
      ),
      new UserInputChatPart('Tell me a joke'),
      new ModelOutputChatPart(
        'Why did the chicken cross the road? To get to the other side.' +
        'Why did the chicken cross the road? To get to the other side.' +
        'Why did the chicken cross the road? To get to the other side.' +
        'Why did the chicken cross the road? To get to the other side.' +
        'Why did the chicken cross the road? To get to the other side.'
      ),
      new UserInputChatPart('Tell me a joke'),
      new ModelOutputChatPart(
        'Why did the chicken cross the road? To get to the other side.' +
        'Why did the chicken cross the road? To get to the other side.' +
        'Why did the chicken cross the road? To get to the other side.' +
        'Why did the chicken cross the road? To get to the other side.' +
        'Why did the chicken cross the road? To get to the other side.'
      ),
    ],
  });
  const patchState = usePatchState(setState);

  const scrollToBottom = () => {
    const chatOutput = document.getElementById('aijs-chat-output-container');
    if (chatOutput) {
      const diff = chatOutput.scrollHeight - chatOutput.scrollTop;
      chatOutput.scrollTo({
        top: chatOutput.scrollHeight,
        behavior: 'smooth',
      });
    }
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

    scrollToBottom();
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
    chatService.createChatCompletion(
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
          scrollToBottom();
        },
        onFinish: () => {
          patchState({ streaming: false });
        },
      }
    )
    .catch(error => {
      // TODO Handle error
      console.error(error);
      patchState({ streaming: false });
    });
  };

  return (
    <div className='aijs-chat'>
      { state.chatParts.length > 0 &&
        <ChatOutput chatParts={state.chatParts}/>
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