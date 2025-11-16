import * as React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

import { SignInPage } from '../../auth';
import { ChatPage } from '../../chat';
import { NotFoundPage } from '../../404';
import { Private } from './Private';

export function AppRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/sign-in' element={<SignInPage/>}/>
        <Route path='/' element={<Private><ChatPage/></Private>}/>
        <Route path='*' element={<NotFoundPage/>}/>
      </Routes>
    </HashRouter>
  );
}