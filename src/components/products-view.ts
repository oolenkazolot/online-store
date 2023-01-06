import { IProductsSort, IProductsList, IRouter, IFilter } from "../types/index";
import ProductsSort from "./products-sort";

class ProductsView {
  private productsSort: IProductsSort;
  private productsList: IProductsList;
  private filter: IFilter;
  constructor(productsList: IProductsList, filter: IFilter) {
    this.productsList = productsList;
    this.filter = filter;
    this.productsSort = new ProductsSort(
      this.productsList.draw.bind(this.productsList)
    );
  }
  public createProductsViewBlock(router?: IRouter): HTMLElement {
    const productsViewBlock: HTMLElement = document.createElement("div");
    productsViewBlock.classList.add("products");
    const title: HTMLElement = document.createElement("h2");
    title.classList.add("products__title");
    title.textContent = "Products";
    const productsSortBlock: HTMLElement = this.productsSort.createProductsSort(
      router,
      this.filter
    );
    const productsListBlock: HTMLElement = this.productsList.createProductsList(
      router
    );
    productsViewBlock.append(title, productsSortBlock, productsListBlock);
    return productsViewBlock;
  }
}

export default ProductsView;
