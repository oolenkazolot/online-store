import { IProductsSort, IProductsList, IRouter } from '../types/index';
import ProductsSort from './products-sort';

class ProductsView {
  private productsSort: IProductsSort;
  private productsList: IProductsList;
  constructor(productsList: IProductsList) {
    this.productsList = productsList;
    this.productsSort = new ProductsSort();
  }
  public createProductsViewBlock(router?: IRouter): HTMLElement {
    const productsViewBlock: HTMLElement = document.createElement('div');
    productsViewBlock.classList.add('products');
    const title: HTMLElement = document.createElement('h2');
    title.classList.add('products__title');
    title.textContent = 'Products';
    const productsSortBlock: HTMLElement = this.productsSort.createProductsSort();
    const productsListBlock: HTMLElement = this.productsList.createProductsList(router);
    productsViewBlock.append(title, productsSortBlock, productsListBlock);
    return productsViewBlock;
  }
}

export default ProductsView;
