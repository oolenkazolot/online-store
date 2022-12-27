import { log } from "console";
import { IProducts, IFilterRange, IRouter } from "../types/index";
import Products from "../utils/products";
import FilterRange from "./filter-range";

class Filter {
  private products: IProducts;
  private filterRange1: IFilterRange;
  private filterRange2: IFilterRange;
  constructor() {
    this.products = new Products();
    this.filterRange1 = new FilterRange("price");
    this.filterRange2 = new FilterRange("stock");
  }

  public createFilter(): HTMLElement {
    const filterElement: HTMLElement = document.createElement("aside");
    filterElement.classList.add("filter");
    const filterTitle: HTMLElement = document.createElement("h2");
    filterTitle.classList.add("filter__title");
    filterTitle.textContent = "Filter";
    const filterWrap = this.createFilterWrap();
    filterElement.append(filterTitle, filterWrap);
    return filterElement;
  }

  private createFilterWrap(): HTMLElement {
    const filterWrap: HTMLElement = document.createElement("div");
    filterWrap.classList.add("filter__wrap");
    const blockCategories: HTMLElement = this.createFilterBlockCategories();
    const blockBrands: HTMLElement = this.createFilterBlockBrands();
    const blockPrice: HTMLElement = this.createFilterBlockPrice();
    const blockStock: HTMLElement = this.createFilterBlockStock();
    const blockButtons: HTMLElement = this.createFilterBlockButtons();
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
      const input: HTMLInputElement = document.createElement("input");
      input.classList.add("filter-block__input");
      input.setAttribute("id", key);
      input.setAttribute("type", "checkbox");
      input.addEventListener("change", () => {
        if (input.checked) {
          this.addQueryParameters(input.id, nameBlock);
        } else {
          this.removeQueryParameters(input.id, nameBlock);
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

  private createFilterBlockButtons(): HTMLElement {
    const block: HTMLElement = document.createElement("div");
    block.classList.add("filter-buttons");
    const btnReset: HTMLElement = document.createElement("button");
    btnReset.classList.add("filter-buttons__btn");
    btnReset.classList.add("btn");
    btnReset.textContent = "Reset filters";
    const btnCopyLink: HTMLElement = document.createElement("button");
    btnCopyLink.classList.add("filter-buttons__btn");
    btnCopyLink.classList.add("btn");
    btnCopyLink.textContent = "Copy link";
    block.append(btnReset, btnCopyLink);
    return block;
  }

  private addQueryParameters(id: string, nameBlock: string) {
    const url = new URL(window.location.href);
    const param: string = url.searchParams.get(nameBlock) || "";
    if (param) {
      url.searchParams.append(nameBlock, id);
    } else {
      url.searchParams.set(nameBlock, id);
    }

    window.history.pushState(null, "", url);
  }

  private removeQueryParameters(id: string, nameBlock: string) {
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
  }
}

export default Filter;
