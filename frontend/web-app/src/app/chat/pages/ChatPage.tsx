import * as React from 'react';
import { IoC } from '@andcreations/common';

import { ThreadsService } from '../../threads';
import { PageWrapper } from '../../page';
import { Chat } from '../components';

export function ChatPage() {
  const threadsService = IoC.resolve(ThreadsService);

  return (
    <PageWrapper className='aijs-chat-page'>
      <div id='aijs-chat-page-content' className='aijs-chat-page-content'>
        <Chat/>
      </div>
    </PageWrapper>
  );
}