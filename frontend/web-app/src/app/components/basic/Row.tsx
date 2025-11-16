import * as React from 'react';
import * as classNames from 'classnames';

export interface RowProps {
  alignment?: 'center';
  className?: string;
}

export function Row(props: React.PropsWithChildren<RowProps>) {
  const rowClassNames = classNames([
    'aijs-row',
    { 'aijs-row-center': props.alignment === 'center' },
    props.className,
  ])

  return (
    <div className={rowClassNames}>
      {props.children}
    </div>
  )
}