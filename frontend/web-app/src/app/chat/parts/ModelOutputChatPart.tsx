import * as React from 'react';
import { ChatPart } from './ChatPart';

export class ModelOutputChatPart extends ChatPart<string> {
  private static readonly TYPE = 'model-output';

  public constructor(text: string) {
    super(ModelOutputChatPart.TYPE, text);
  }

  public override render(key: string): React.ReactNode {
    return (
      <div
        className='aijs-model-chat-part aijs-model-output-chat-part'
        key={key}
      >
        <div className='aijs-model-chat-part-content'>
          {this.getData()}
        </div>
      </div>
    );
  }
}