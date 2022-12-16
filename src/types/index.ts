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

export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface IProducts {
  getCategories: () => string[];
  getBrands: () => string[];
  getCategoriesObject: () => Record<string, number>;
  getBrandsObject: () => Record<string, number>;
}

export interface IFilter {
  drawFilter: () => HTMLElement;
}

export interface IFilterRange {
  drawFilterRange: () => HTMLElement;
  drawFilterValues: () => HTMLElement;
}
