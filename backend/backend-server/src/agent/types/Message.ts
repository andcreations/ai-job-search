export interface Message<TData = any> {
  id: string;
  type: string;
  data: TData;
}