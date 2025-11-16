import * as React from 'react';

export abstract class ChatPart<T> {
  protected constructor(
    private readonly type: string,
    private readonly data: T,
  ) {}

  public getType(): string {
    return this.type;
  }

  public getData(): T {
    return this.data;
  }

  public abstract render(key: string): React.ReactNode;
}