export interface IRout {
  path: string;
  cb: (param?: string) => void;
}

export interface IMainPage {
  draw: () => void;
}

export interface IErrorPage {
  draw: () => void;
}

export interface ICartPage {
  draw: () => void;
}
