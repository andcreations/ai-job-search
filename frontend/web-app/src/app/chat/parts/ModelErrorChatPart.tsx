import * as React from 'react';
import { ChatPart } from './ChatPart';

export class ModelErrorChatPart extends ChatPart<string> {
  private static readonly TYPE = 'model-error';

  public constructor(text: string) {
    super(ModelErrorChatPart.TYPE, text);
  }

  public override render(key: string): React.ReactNode {
    return (
      <div
        className='aijs-model-chat-part aijs-model-error-chat-part'
        key={key}
      >
        <div className='aijs-model-chat-part-content'>
          {this.getData()}
        </div>
      </div>
    );
  }
}