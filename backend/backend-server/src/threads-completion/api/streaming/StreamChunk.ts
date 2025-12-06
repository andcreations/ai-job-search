export interface StreamChunk<TData = any> {
  type: string;
  data: TData;
}