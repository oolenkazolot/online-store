import Filter from "../components/filter";
import ProductsView from "../components/products-view.ts";
import { IFilter, IProductsView, IRouter } from "../types/index";

class MainPage {
  private filter: IFilter;
  private productsView: IProductsView;
  public router?: IRouter;
  constructor() {
    this.filter = new Filter();
    this.productsView = new ProductsView();
  }

  public draw(): void {
    const mainElement: HTMLElement | null = document.querySelector("main");

    if (!mainElement) {
      return;
    }
    mainElement.textContent = "";
    const mainPageElement: HTMLElement = document.createElement("div");
    mainPageElement.classList.add("main-page");
    const filterElement: HTMLElement = this.filter.createFilter();
    const productsViewBlock: HTMLElement = this.productsView.createProductsViewBlock(
      this.router
    );
    mainPageElement.append(filterElement, productsViewBlock);
    mainElement.append(mainPageElement);
  }
}

export default MainPage;
