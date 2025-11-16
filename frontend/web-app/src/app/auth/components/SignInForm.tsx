import * as React from 'react';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { usePatchState, useTranslations, useService } from '../../hooks';
import {
  ifEnterKey,
  isNonEmpty,
  focusRef,
  validate,
} from '../../utils';
import { Row } from '../../components';
import { PathTo } from '../../routing';
import { AuthService } from '../services';
import { SignInFormTranslations } from './SignInForm.translations';

enum Focus { Username, Password };

interface SignInFormState {
  username: string;
  password: string;
  focus: Focus;
  status: string;
}

export function SignInForm() {
  const [state, setState] = useState<SignInFormState>({
    username: '',
    password: '',
    focus: Focus.Username,
    status: '',
  });
  const patchState = usePatchState(setState);
  const translate = useTranslations(SignInFormTranslations);
  const navigate = useNavigate();
  const authService = useService(AuthService);

  const username = {
    ref: useRef(null),

    onFocus: () => {
      patchState({ focus: Focus.Username });
    },

    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      patchState({
        username: event.target.value,
        status: '',
      });
    },

    onEnter: () => {
      focusRef(password.ref);
    },
  };

  const password = {
    ref: useRef(null),

    onFocus: () => {
      patchState({ focus: Focus.Password });
    },

    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      patchState({
        password: event.target.value,
        status: '',
      });
    },

    onEnter: () => {
      login();
    },
  };

  const validateForm = (): boolean => {
    const errors = validate(state, [
      [ 'username', isNonEmpty, translate('e-mail-is-required') ],
      [ 'password', isNonEmpty, translate('password-is-required') ],
    ]);
    if (errors.length) {
      patchState({ status: errors[0].message });
    }
    return !errors.length;
  };

  const login = () => {
    if (!validateForm()) {
      return;
    }
    authService.signIn(state.username, state.password)
      .then(() => {
        window.scrollTo(0, 0);
        navigate(PathTo.dflt());
      })
      .catch((error) => {
        if (error.status === 401) {
          patchState({ status: translate('invalid-username-or-password') });
        } else {
          patchState({ status: translate('unexpected-error') });
        }
      });
  };
  
  switch (state.focus) {
    case Focus.Username:
      focusRef(username.ref);
      break;
    case Focus.Password:
      focusRef(password.ref);
      break;
  }

  return (
    <Form className='aijs-sign-in-form'>
      <Form.Group className='aijs-sign-in-form-control'>
        <Form.Control
          type='text'
          placeholder={translate('username')}
          ref={username.ref}
          autoFocus={state.focus === Focus.Username}
          onFocus={username.onFocus}
          onChange={username.onChange}
          onKeyDown={ifEnterKey(username.onEnter)}
        />
      </Form.Group>
      <Form.Group className='aijs-login-form-control'>
        <Form.Control
          type='password'
          placeholder={translate('password')}
          ref={password.ref}
          onFocus={password.onFocus}
          onChange={password.onChange}
          onKeyDown={ifEnterKey(password.onEnter)}
        />
      </Form.Group>
      <Row alignment='center'>
        <Button
          variant='primary'
          className='aijs-sign-in-form-button'
          onClick={login}
        >
          {translate('login')}
        </Button>
      </Row>
      <Row alignment='center'>
        <div className='aijs-sign-in-form-status'>
          {state.status}
        </div>
      </Row>        
    </Form>
  );
}