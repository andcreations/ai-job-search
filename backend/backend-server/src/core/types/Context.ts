export interface Context {
  correlationId: string;
  [key: string]: string | number | boolean;
}

export const BOOTSTRAP_CONTEXT: Context = {
  correlationId: 'bootstrap',
};