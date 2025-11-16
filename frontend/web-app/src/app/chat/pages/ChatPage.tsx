import * as React from 'react';

import { PageWrapper } from '../../page';
import { Chat } from '../components';

export function ChatPage() {
  return (
    <PageWrapper className='aijs-chat-page'>
      <div id='aijs-chat-page-content' className='aijs-chat-page-content'>
        <Chat/>
      </div>
    </PageWrapper>
  );
}