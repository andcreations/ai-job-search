import * as React from 'react';
import { ChatPart } from '../parts';

export interface ChatOutputProps {
  chatParts: ChatPart<unknown>[];
  onScrollDown?: () => void;
  onScrollUp?: (delta: number) => void;
}

export function ChatOutput(props: ChatOutputProps) {
  const lastScrollTop = React.useRef(0);

  const onScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = event.currentTarget.scrollTop;
    if (scrollTop > lastScrollTop.current) {
      props.onScrollDown?.();
    }
    if (scrollTop < lastScrollTop.current) {
      props.onScrollUp?.(lastScrollTop.current - scrollTop);
    }
    lastScrollTop.current = scrollTop;
  };

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
      onScroll={onScroll}
    >
      <div className='aijs-chat-output'>
        { renderChatParts() }
      </div>
    </div>
  );
}