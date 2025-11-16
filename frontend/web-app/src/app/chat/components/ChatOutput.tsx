import * as React from 'react';
import { ChatPart } from '../parts';

export interface ChatOutputProps {
  chatParts: ChatPart<unknown>[];
}

export function ChatOutput(props: ChatOutputProps) {

  const renderChatParts = () => {
    return props.chatParts.map((chatPart, index) => {
      const key = `aijs-chat-part-${index}`;
      return chatPart.render(key);
    });
  }

  return (
    <div 
      id='aijs-chat-output-container'
      className='aijs-chat-output-container aijs-scroll'
    >
      <div className='aijs-chat-output'>
        { renderChatParts() }
      </div>
    </div>
  );
}