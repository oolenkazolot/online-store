import Filter from "../components/filter";
import ProductsView from "../components/products-view.ts";
import { IFilter, IProductsView, IRouter } from "../types/index";

import ProductsList from "../components/products-list";
import { IProductsList } from "../types/index";

class MainPage {
  private filter?: IFilter;
  private productsView?: IProductsView;
  public productsList?: IProductsList;
  public router?: IRouter;

  public draw(): void {
    const mainElement: HTMLElement | null = document.querySelector("main");
    if (!mainElement) {
      return;
    }
    mainElement.classList.add("main");

    this.productsList = new ProductsList();
    this.filter = new Filter(
      this.productsList.draw.bind(this.productsList, this.router)
    );
    this.productsView = new ProductsView(this.productsList, this.filter);
    mainElement.textContent = "";
    const mainPageElement: HTMLElement = document.createElement("div");
    mainPageElement.classList.add("main-page");
    const filterElement: HTMLElement = this.filter.createFilter(this.router);
    if (this.productsView) {
      const productsViewBlock: HTMLElement = this.productsView.createProductsViewBlock(
        this.router
      );
      mainPageElement.append(filterElement, productsViewBlock);
    }
    mainElement.append(mainPageElement);
  }
}

export default MainPage;
