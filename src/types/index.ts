export interface IRoutItem {
  path: RegExp | string;
  cb: (param?: string) => void;
}

export interface IRoutOptions {
  root: string;
  mode: string;
}
