export interface GWMessage<TData> {
  id: string;
  type: string;
  data: TData;
}
