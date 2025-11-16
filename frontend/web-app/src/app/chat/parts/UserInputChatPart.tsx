import * as React from 'react';
import { ChatPart } from './ChatPart';

export class UserInputChatPart extends ChatPart<string> {
  private static readonly TYPE = 'user-input';

  public constructor(text: string) {
    super(UserInputChatPart.TYPE, text);
  }

  public override render(key: string): React.ReactNode {
    return (
      <div
        className='aijs-user-chat-part aijs-user-input-chat-part'
        key={key}
      >
        <div className='aijs-user-chat-part-content'>
          {this.getData()}
        </div>
      </div>
    );
  }
}