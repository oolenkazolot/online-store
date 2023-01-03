import { IProductsSortOptionals, IRouter, IProducts } from "../types/index";
import Products from "../utils/products";

class ProductsSort {
  private drawProductList: (router?: IRouter) => void;
  private products: IProducts;
  constructor(drawProductList: (router?: IRouter) => void) {
    this.drawProductList = drawProductList;
    this.products = new Products();
  }

  public createProductsSort(router?: IRouter): HTMLElement {
    const productsSort: HTMLElement = document.createElement("section");
    productsSort.classList.add("products__sort");
    const sortBar: HTMLElement = this.createSortBar(router);
    const amountElement: HTMLElement = this.createAmountElement();
    const searchBar: HTMLElement = this.createSearchBar(router);
    const viewModeBlock: HTMLElement = this.createViewModeBlock();
    productsSort.append(sortBar, amountElement, searchBar, viewModeBlock);
    return productsSort;
  }

  private createSortBar(router?: IRouter): HTMLElement {
    const sortBar: HTMLElement = document.createElement("div");
    sortBar.classList.add("sort-bar");
    const selectSorting = this.createSelectSorting(router);
    sortBar.append(selectSorting);
    return sortBar;
  }

  private createSelectSorting(router?: IRouter): HTMLElement {
    const options: IProductsSortOptionals[] = [
      {
        value: "sort-title",
        disabled: true,
        selected: true,
        content: "Sort options:",
        class: "sort-name",
      },
      {
        value: "price-ASC",
        content: "Sort by price ASC",
      },
      {
        value: "price-DESC",
        content: "Sort by price DESC",
      },
      {
        value: "rating-ASC",
        content: "Sort by rating ASC",
      },
      {
        value: "rating-DESC",
        content: "Sort by rating DESC",
      },
      {
        value: "discount-ASC",
        content: "Sort by discount ASC",
      },
      {
        value: "discount-DESC",
        content: "Sort by discount DESC",
      },
    ];

    const selectSorting: HTMLSelectElement = document.createElement("select");
    selectSorting.classList.add("select-sorting");
    selectSorting.setAttribute("id", "select-sorting");
    selectSorting.setAttribute("name", "select-sorting");
    const optionElements: HTMLElement[] = options.map((item) => {
      return this.createSortOption(item);
    });

    selectSorting.append(...optionElements);

    selectSorting.addEventListener("change", () => {
      if (selectSorting.value === "sort-title") {
        this.removeQueryParameters("sort", router);
      } else {
        this.addQueryParameters(selectSorting.value, "sort", router);
      }
    });
    return selectSorting;
  }

  private createSortOption(item: IProductsSortOptionals): HTMLElement {
    const url = new URL(window.location.href);
    const urlParameterSort: string | null = url.searchParams.get("sort");

    const option: HTMLElement = document.createElement("option");
    if (item.class) {
      option.setAttribute("class", item.class);
    }

    option.setAttribute("value", item.value);
    if (urlParameterSort && item.value === urlParameterSort) {
      option.setAttribute("selected", "true");
    }

    option.textContent = item.content;

    return option;
  }

  private createAmountElement(): HTMLElement {
    const amountElement: HTMLElement = document.createElement("div");
    amountElement.classList.add("amount");
    const products = this.products.getProductsFilters();
    amountElement.textContent = `Found: ${products.length}`;
    return amountElement;
  }

  private createSearchBar(router?: IRouter): HTMLElement {
    const searchBar: HTMLElement = document.createElement("div");
    searchBar.classList.add("search-bar");
    const input = this.createInputSearch(router);
    searchBar.append(input);
    return searchBar;
  }

  private createInputSearch(router?: IRouter): HTMLInputElement {
    const input: HTMLInputElement = document.createElement("input");
    input.classList.add("search-bar__input");
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "Search product");
    const url = new URL(window.location.href);
    const urlParameterSearch: string | null = url.searchParams.get("search");
    if (urlParameterSearch) {
      input.setAttribute("value", urlParameterSearch);
    }
    input.addEventListener("input", () => {
      if (input.value) {
        this.addQueryParameters(input.value, "search", router);
      } else {
        this.removeQueryParameters("search", router);
      }
    });
    return input;
  }

  private createViewModeBlock(): HTMLElement {
    const arr = ["icon-grid", "icon-grid1"];
    const viewModeBlock: HTMLElement = document.createElement("div");
    viewModeBlock.classList.add("view-mode");
    const viewModeButtons: HTMLElement[] = arr.map((item) => {
      const btn = this.createViewModeBtn(item);
      return btn;
    });
    viewModeBlock.append(...viewModeButtons);
    return viewModeBlock;
  }

  private createViewModeBtn(item: string): HTMLElement {
    const btn: HTMLElement = document.createElement("button");
    btn.classList.add("view-mode__btn");
    const icon: HTMLElement = document.createElement("i");
    icon.classList.add(item);
    btn.append(icon);
    return btn;
  }

  private addQueryParameters(
    text: string,
    paramsName: string,
    router?: IRouter
  ): void {
    const url = new URL(window.location.href);
    const param: string = url.searchParams.get(paramsName) || "";
    if (param) {
      url.searchParams.set(paramsName, text);
    } else {
      url.searchParams.set(paramsName, text);
    }

    window.history.pushState(null, "", url);
    this.drawProductList(router);
  }

  private removeQueryParameters(paramsName: string, router?: IRouter): void {
    const url = new URL(window.location.href);
    url.searchParams.delete(paramsName);
    window.history.pushState(null, "", url);
    this.drawProductList(router);
  }
}

export default ProductsSort;
