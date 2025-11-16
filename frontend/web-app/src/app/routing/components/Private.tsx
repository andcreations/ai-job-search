import * as React from 'react';
import { Navigate } from 'react-router-dom';
import { IoC } from '@andcreations/common';

import { AuthService } from '../../auth';
import { PathTo } from '../path';
import { RoutingService } from '../services';

const authService = IoC.resolve(AuthService);
const routingService = IoC.resolve(RoutingService);

export interface PrivateProps extends React.PropsWithChildren {
}

export function Private(props: PrivateProps) {
  if (!authService.isSignedIn()) {
    const hash = routingService.getHash();
    return <Navigate to={PathTo.signIn(hash)}/>; 
  }

  return <>{props.children}</>;
}