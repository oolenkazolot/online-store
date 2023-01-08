export interface IRout {
  path: string;
  cb: (param?: string) => void;
}

export interface IRouter {
  navigate: (path: string) => void;
  init: () => void;
}

export interface IMainPage {
  draw: () => void;
  router?: IRouter;
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
  quantityInCart?: number;
}

export interface IProducts {
  getCategories: () => string[];
  getBrands: () => string[];
  getCategoriesObject: () => Record<string, IProductsAmount>;
  getBrandsObject: () => Record<string, IProductsAmount>;
  getProduct: (id: string | undefined) => IProduct | undefined;
  getProductsFilters: () => IProduct[];
  getMinMaxPriceUrlParameters: () => string[];
  getMinMaxStockUrlParameters: () => string[];
  getMinMaxPrice: () => string[];
  getMinMaxStock: () => string[];
  getProductsFiltersSearch: (products: IProduct[]) => IProduct[];
  getProductsFiltersSort: (products: IProduct[]) => IProduct[];
}

export interface IFilter {
  createFilter: (router?: IRouter) => HTMLElement;
  drawFilterBlock: () => void;
  updateFilter: () => void;
}

export interface IFilterRange {
  createFilterRange: () => HTMLElement;
  createFilterValues: () => HTMLElement;
  updateValues: (min: string, max: string) => void;
}
export interface ICartPage {
  draw: () => void;
  router?: IRouter;
}

export interface IProductsSortOptionals {
  value: string;
  disabled?: boolean;
  selected?: boolean;
  content: string;
  class?: string;
}

export interface IProductsSort {
  createProductsSort: (router?: IRouter, filter?: IFilter) => HTMLElement;
}

export interface IProductsView {
  createProductsViewBlock: (router?: IRouter) => HTMLElement;
}

export interface IProductsList {
  createProductsList: (router?: IRouter) => HTMLElement;
  draw: (router?: IRouter) => void;
}

export type TtextObject = {
  [key: string]: string;
};

export interface IProductPage {
  draw: (id: string | undefined) => void;
  router?: IRouter;
}

export interface ILinkNavigation {
  createLinksNavigation: (
    id: string | undefined,
    router?: IRouter
  ) => HTMLElement;
}

export interface IProductDetail {
  createProductDetail: (
    id: string | undefined,
    router?: IRouter
  ) => HTMLElement;
}

export interface IProductInCart {
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
  quantityInCart: number;
  totalSum: string;
}

export interface IProductsAmount {
  all: number;
  filter: number;
}

export interface IUpdateCart {
  checkProductInCart: (item: IProduct) => IProduct | undefined;
  addProductCart: (item: IProduct) => void;
  removeProductCart: (item: IProduct) => void;
}

export interface ITopHeader {
  header: HTMLElement;
  createElement: (
    element: string,
    myClass: string,
    parentElement?: HTMLElement
  ) => HTMLElement;
  createContainers: (
    contClass: string,
    firstElClass: string,
    secElement: string,
    secElClass: string,
    secElContent: string,
    firstElContent?: string
  ) => HTMLElement;
  drawElements: () => void;
}

export interface IBottomHeader {
  router?: IRouter;
  drawElements: () => void;
  createLinkOnMainPage: () => void;
  createLinkOnCartPage: () => void;
}

export interface IFooter {
  drawFooter: () => void;
}
