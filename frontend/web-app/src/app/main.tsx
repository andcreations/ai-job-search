import * as React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { IoC } from '@andcreations/common';
import { LocationService } from '@andcreations/web-common';

import { AppRouter, PathTo } from './routing';
import { AuthService } from './auth';
import { ThreadsService } from './threads';

function failedToRunApp(error: any): void {
  console.log('Failed to run the application', error);
}

async function bootstrapServices(): Promise<void> {
  IoC.resolve(ThreadsService);
  IoC.bootstrap();
}

async function checkSignedIn(): Promise<void> {
  const authService = IoC.resolve(AuthService);
  const isSignedIn = await authService.authMe();

  if (!isSignedIn) {
    const locationService = IoC.resolve(LocationService);
    locationService.setHash(`#${PathTo.signIn()}`);
  }
}

async function bootstrap(): Promise<void> {
  await bootstrapServices();  
  await checkSignedIn();

  const container = document.getElementById('app');
  const root = ReactDOMClient.createRoot(container);
  root.render(<AppRouter/>);
}

bootstrap()
  .catch((error) => {
    failedToRunApp(error);
  });
