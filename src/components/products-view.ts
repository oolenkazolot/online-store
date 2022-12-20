import { IProductsSort, IProductsList } from "../types/index";
import ProductsSort from "./products-sort";
import ProductsList from "./products-list";

class ProductsView {
  private productsSort: IProductsSort;
  private productsList: IProductsList;
  constructor() {
    this.productsSort = new ProductsSort();
    this.productsList = new ProductsList();
  }
  public createProductsViewBlock(): HTMLElement {
    const productsViewBlock: HTMLElement = document.createElement("div");
    productsViewBlock.classList.add("products");
    const title: HTMLElement = document.createElement("h2");
    title.classList.add("products__title");
    title.textContent = "Products";
    const productsSortBlock: HTMLElement = this.productsSort.createProductsSort();
    const productsListBlock: HTMLElement = this.productsList.createProductsList();
    productsViewBlock.append(title, productsSortBlock, productsListBlock);
    return productsViewBlock;
  }
}

export default ProductsView;
