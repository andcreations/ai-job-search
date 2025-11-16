import * as React from 'react';
import * as classNames from 'classnames';

export interface FullScreenProps {
  className?: string;
  center?: boolean;
}

export function FullScreen(props: React.PropsWithChildren<FullScreenProps>) {
  const fullScreenClassNames = classNames([
    'aijs-full-screen',
    props.className,
    { 'aijs-full-screen-center': !!props.center }
  ]);

  return (
    <div className={fullScreenClassNames}>
      { props.children }
    </div>
  )
}