import * as React from 'react';
import classNames from 'classnames';

export interface PageWrapperProps {
  className?: string;
}

export function PageWrapper(props: React.PropsWithChildren<PageWrapperProps>) {
  const wrapperClassName = classNames('aijs-page-wrapper', props.className);
  return (
    <div className={wrapperClassName}>
      { props.children }
    </div>
  );
}