import * as React from 'react';

import { Center } from '../../components';
import { SignInForm } from '../components';

export function SignInPage() {
  return (
    <Center  className='aijs-sign-in-page'>
      <SignInForm/>
    </Center>
  );
}