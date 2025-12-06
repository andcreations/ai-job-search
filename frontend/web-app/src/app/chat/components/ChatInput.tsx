import * as React from 'react';
import { useRef, useEffect } from 'react';
import classNames from 'classnames';
import Form from 'react-bootstrap/Form';

import { focusRef, isEnterKey } from '../../utils';
import { useTranslations } from '../../hooks';
import { ChatInputTranslations } from './ChatInput.translations';

export interface ChatInputProps {
  text: string;
  hasChatParts: boolean;
  onTextChange: (text: string) => void;
  onTextEnter: () => void;
}

export function ChatInput(props: ChatInputProps) {
  const translate = useTranslations(ChatInputTranslations);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    focusRef(inputRef);
  }, []);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onTextChange(event.target.value);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (isEnterKey(event)) {
      event.preventDefault();
      props.onTextEnter();
    }
  };

  const chatInputClassName = classNames(
    'aijs-chat-input',
    { 'aijs-chat-input-without-output': !props.hasChatParts },
  );

  return (
    <div className={chatInputClassName}>
      { props.hasChatParts &&
        <div className='aijs-chat-input-border'/>
      }
      <div className='aijs-chat-input-content-container'>
        <div className='aijs-chat-input-content'>
          <Form.Control
            ref={inputRef}
            className='aijs-chat-input-control'
            type='text'
            value={props.text}
            placeholder={translate('placeholder')}
            onChange={onChange}
            onKeyDown={onKeyDown}
          />
        </div>
      </div>
    </div>
  );
}