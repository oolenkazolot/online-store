import { IProducts, IFilterRange, IRouter } from "../types/index";
import Products from "../utils/products";
import FilterRange from "./filter-range";

class Filter {
  private products: IProducts;
  private filterRange1: IFilterRange;
  private filterRange2: IFilterRange;
  private drawProductList: () => void;
  private minMaxPrice: string[];
  private minMaxStock: string[];
  private minMaxPriceValue: string[];
  private minMaxStockValue: string[];
  constructor(drawProductList: () => void) {
    this.products = new Products();
    this.drawProductList = drawProductList;
    this.minMaxPrice = this.products.getMinMaxPrice();
    this.minMaxStock = this.products.getMinMaxStock();
    this.minMaxPriceValue = this.createValuesMinMaxPrice();
    this.minMaxStockValue = this.createValuesMinMaxStock();
    this.filterRange1 = new FilterRange(
      "price",
      this.minMaxPrice[0],
      this.minMaxPrice[1],
      this.minMaxPriceValue[0],
      this.minMaxPriceValue[1],
      this.drawProductList
    );
    this.filterRange2 = new FilterRange(
      "stock",
      this.minMaxStock[0],
      this.minMaxStock[1],
      this.minMaxStockValue[0],
      this.minMaxStockValue[1],
      this.drawProductList
    );
  }

  public createFilter(router?: IRouter | undefined): HTMLElement {
    const filterElement: HTMLElement = document.createElement("aside");
    filterElement.classList.add("filter");
    const filterTitle: HTMLElement = document.createElement("h2");
    filterTitle.classList.add("filter__title");
    filterTitle.textContent = "Filter";
    const filterWrap = this.createFilterWrap(router);
    filterElement.append(filterTitle, filterWrap);
    return filterElement;
  }

  private createValuesMinMaxPrice(): string[] {
    const url = new URL(window.location.href);
    const urlParametersPrice: string | null = url.searchParams.get("price");
    let minMaxPrice: string[] | null = urlParametersPrice
      ? urlParametersPrice.split(",")
      : null;
    minMaxPrice = minMaxPrice ? minMaxPrice : this.products.getMinMaxPrice();
    return minMaxPrice;
  }

  private createValuesMinMaxStock(): string[] {
    const url = new URL(window.location.href);
    const urlParametersStock: string | null = url.searchParams.get("stock");
    let minMaxStock: string[] | null = urlParametersStock
      ? urlParametersStock.split(",")
      : null;
    minMaxStock = minMaxStock ? minMaxStock : this.products.getMinMaxStock();
    return minMaxStock;
  }

  private createFilterWrap(router?: IRouter | undefined): HTMLElement {
    const filterWrap: HTMLElement = document.createElement("div");
    filterWrap.classList.add("filter__wrap");
    const blockCategories: HTMLElement = this.createFilterBlockCategories();
    const blockBrands: HTMLElement = this.createFilterBlockBrands();
    const blockPrice: HTMLElement = this.createFilterBlockPrice();
    const blockStock: HTMLElement = this.createFilterBlockStock();
    const blockButtons: HTMLElement = this.createFilterBlockButtons(router);
    filterWrap.append(
      blockCategories,
      blockBrands,
      blockPrice,
      blockStock,
      blockButtons
    );
    return filterWrap;
  }

  private createFilterBlockCategories(): HTMLElement {
    const nameBlock = "category";
    const block: HTMLElement = document.createElement("div");
    block.classList.add("filter-block");
    const title: HTMLElement = document.createElement("h3");
    title.classList.add("filter-block__title");
    title.textContent = nameBlock;
    const obj: Record<string, number> = this.products.getCategoriesObject();
    const blockItems = this.createFilterBlockItems(obj, nameBlock);
    block.append(title, blockItems);
    return block;
  }

  private createFilterBlockItems(
    obj: Record<string, number>,
    nameBlock: string
  ): HTMLElement {
    const blockItems: HTMLElement = document.createElement("div");
    blockItems.classList.add("filter-block__items");
    for (const key in obj) {
      const item: HTMLElement = document.createElement("div");
      item.classList.add("filter-block__item");
      const label: HTMLElement = document.createElement("label");
      label.classList.add("filter-block__checkbox");
      const input = this.createInputCheckbox(key);
      input.addEventListener("change", () => {
        if (input.checked) {
          this.addQueryParametersBrandsCategory(input.id, nameBlock);
        } else {
          this.removeQueryParametersBrandsCategory(input.id, nameBlock);
        }
      });
      const customCheckbox: HTMLElement = document.createElement("span");
      customCheckbox.classList.add("filter-block__custom-checkbox");
      const span: HTMLElement = document.createElement("span");
      span.classList.add("filter-block__text");
      span.textContent = key;
      label.append(input, customCheckbox, span);
      const count: HTMLElement = document.createElement("span");
      count.classList.add("filter-block__count");
      count.textContent = "(" + obj[key] + "/" + obj[key] + ")";
      item.append(label, count);
      blockItems.append(item);
    }
    return blockItems;
  }

  private createInputCheckbox(key: string): HTMLInputElement {
    const url = new URL(window.location.href);
    const urlParametersCategory = url.searchParams.getAll("category");
    const urlParametersBrand = url.searchParams.getAll("brand");
    const input: HTMLInputElement = document.createElement("input");
    input.classList.add("filter-block__input");
    input.setAttribute("type", "checkbox");
    input.setAttribute("id", key);
    if (
      urlParametersCategory.includes(key) ||
      urlParametersBrand.includes(key)
    ) {
      input.setAttribute("checked", "true");
    }
    return input;
  }

  private createFilterBlockBrands(): HTMLElement {
    const nameBlock = "brand";
    const block: HTMLElement = document.createElement("div");
    block.classList.add("filter-block");
    const title: HTMLElement = document.createElement("h3");
    title.classList.add("filter-block__title");
    title.textContent = nameBlock;
    const obj: Record<string, number> = this.products.getBrandsObject();
    const blockItems = this.createFilterBlockItems(obj, nameBlock);
    block.append(title, blockItems);
    return block;
  }

  private createFilterBlockPrice(): HTMLElement {
    const block: HTMLElement = document.createElement("div");
    block.classList.add("filter-block");
    const title: HTMLElement = document.createElement("h3");
    title.classList.add("filter-block__title");
    title.textContent = "Price";
    const rangeFilter: HTMLElement = this.filterRange1.createFilterRange();
    const filterValues: HTMLElement = this.filterRange1.createFilterValues();
    block.append(title, filterValues, rangeFilter);
    return block;
  }

  private createFilterBlockStock(): HTMLElement {
    const block: HTMLElement = document.createElement("div");
    block.classList.add("filter-block");
    const title: HTMLElement = document.createElement("h3");
    title.classList.add("filter-block__title");
    title.textContent = "Stock";
    const rangeFilter: HTMLElement = this.filterRange2.createFilterRange();
    const filterValues: HTMLElement = this.filterRange2.createFilterValues();
    block.append(title, filterValues, rangeFilter);
    return block;
  }

  protected createFilterBlockButtons(
    router?: IRouter | undefined
  ): HTMLElement {
    const block: HTMLElement = document.createElement("div");
    block.classList.add("filter-buttons");
    const btnReset: HTMLElement = document.createElement("button");
    btnReset.classList.add("filter-buttons__btn");
    btnReset.classList.add("btn");
    btnReset.textContent = "Reset filters";
    btnReset.addEventListener("click", () => {
      if (router) {
        router.navigate("");
      }
    });
    const btnCopyLink: HTMLElement = document.createElement("button");
    btnCopyLink.classList.add("filter-buttons__btn");
    btnCopyLink.classList.add("btn");
    btnCopyLink.textContent = "Copy link";
    block.append(btnReset, btnCopyLink);
    return block;
  }

  private addQueryParametersBrandsCategory(
    id: string,
    nameBlock: string
  ): void {
    const url = new URL(window.location.href);
    const param: string = url.searchParams.get(nameBlock) || "";
    if (param) {
      url.searchParams.append(nameBlock, id);
    } else {
      url.searchParams.set(nameBlock, id);
    }

    window.history.pushState(null, "", url);
    this.drawProductList();
  }

  private removeQueryParametersBrandsCategory(
    id: string,
    nameBlock: string
  ): void {
    const url = new URL(window.location.href);
    const urlParameters = url.searchParams.getAll(nameBlock);
    const newUrlParameters = urlParameters.filter((item) => {
      return item !== id;
    });
    url.searchParams.delete(nameBlock);
    if (newUrlParameters.length) {
      newUrlParameters.forEach((element) => {
        url.searchParams.append(nameBlock, element);
      });
    }

    window.history.pushState(null, "", url);
    this.drawProductList();
  }
}

export default Filter;
