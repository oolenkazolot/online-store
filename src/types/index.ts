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
  discount: number;
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
  getProducts: () => IProduct[];
}

export interface IFilter {
  createFilter: () => HTMLElement;
}

export interface IFilterRange {
  createFilterRange: () => HTMLElement;
  createFilterValues: () => HTMLElement;
}
export interface ICartPage {
  draw: () => void;
}

export interface IProductsSortOptionals {
  value: string;
  disabled?: boolean;
  selected?: boolean;
  content: string;
  class?: string;
}

export interface IProductsSort {
  createProductsSort: () => HTMLElement;
}

export interface IProductsView {
  createProductsViewBlock: () => HTMLElement;
}

export interface IProductsList {
  createProductsList: () => HTMLElement;
}
