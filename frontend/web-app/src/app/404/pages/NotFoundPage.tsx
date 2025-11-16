import * as React from 'react';

import { useTranslations } from '../../hooks';
import { PageWrapper } from '../../page';
import { Center } from '../../components';
import { NotFoundPageTranslations } from './NotFoundPage.translations';

export function NotFoundPage() {
  const translate = useTranslations(NotFoundPageTranslations);

  return (
    <PageWrapper>
      <Center className='aijs-not-found-page'>
        {translate('not-found')}
      </Center>
    </PageWrapper>
  );
}