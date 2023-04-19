declare type ResponseFormat<T> = {
  success: boolean;
  message?: string;
  payload: T;
}
declare var pathsUtil: {
  add: (path: string) => Promise<ResponseFormat<number>>;
  delete: (paths: string[]) => Promise<ResponseFormat<number>>;
  read: () => Promise<ResponseFormat<string[]>>;
  open: (path: string) => Promise<ResponseFormat<any[]>>;
  clear: () => Promise<ResponseFormat<undefined>>;
} 