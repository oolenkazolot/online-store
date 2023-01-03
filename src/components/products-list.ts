import { IProducts, IProduct, IRouter } from "../types/index";
import Products from "../utils/products";

class ProductsList {
  private products: IProducts;
  private productsList: HTMLElement;

  constructor() {
    this.products = new Products();
    this.productsList = document.createElement("div");
  }

  public createProductsList(router?: IRouter): HTMLElement {
    this.productsList.textContent = "";
    this.productsList.classList.add("products__list");
    const productsElements = this.createProductsElement(router);
    this.productsList.append(...productsElements);
    return this.productsList;
  }

  public draw(router?: IRouter): void {
    this.productsList.textContent = "";
    const productsElements = this.createProductsElement(router);
    this.productsList.append(...productsElements);
  }

  private createProductsElement(router?: IRouter): HTMLElement[] {
    const url = new URL(window.location.href);
    const urlParameterSearch: string | null = url.searchParams.get("search");
    const urlParameterSort: string | null = url.searchParams.get("sort");
    let products: IProduct[] = this.products.getProductsFilters();

    if (products.length && !urlParameterSearch) {
      products = this.products.getProductsFilters();
    }

    if (products.length && urlParameterSearch && !urlParameterSort) {
      products = this.products.getProductsFiltersSearch();
    }

    if (products.length && urlParameterSort) {
      products = this.products.getProductsFiltersSort();
    }

    const amountProducts = document.querySelector(".amount");
    if (amountProducts) {
      amountProducts.textContent = `Found: ${products.length}`;
    }

    if (!products.length) {
      const productElement: HTMLElement = document.createElement("div");
      productElement.classList.add("products__not-found");
      productElement.textContent = "No products found 😏";
      this.productsList.classList.add("products__list--block");
      return [productElement];
    }

    this.productsList.classList.remove("products__list--block");
    const productsElements = products.map(
      (item: IProduct, index: number): HTMLElement => {
        const productElement: HTMLElement = document.createElement("div");
        productElement.classList.add("product");
        productElement.setAttribute("data-id", index + "");
        const productName: HTMLElement = this.createProductName(item);
        const productImg: HTMLElement = this.createProductImg(item);
        const productInfo: HTMLElement = this.createProductInfo(item);
        const productBtnWrap: HTMLElement = this.createProductBtnWrap(
          item,
          router
        );
        productElement.append(
          productName,
          productImg,
          productInfo,
          productBtnWrap
        );
        return productElement;
      }
    );
    return productsElements;
  }

  private createProductName(item: IProduct): HTMLElement {
    const productName: HTMLElement = document.createElement("div");
    productName.classList.add("product__name");
    const productBrand: HTMLElement = document.createElement("span");
    productBrand.classList.add("product__brand");
    productBrand.textContent = item.brand;
    const productModel: HTMLElement = document.createElement("span");
    productModel.classList.add("product__model");
    productModel.textContent = item.title;
    productName.append(productBrand, productModel);
    return productName;
  }

  private createProductImg(item: IProduct): HTMLElement {
    const productImg: HTMLElement = document.createElement("div");
    productImg.classList.add("product__display");
    const img: HTMLElement = document.createElement("img");
    img.classList.add("product__img");
    img.setAttribute("src", item.thumbnail);
    img.setAttribute("alt", "product-img");
    productImg.append(img);
    return productImg;
  }

  private createProductInfo(item: IProduct): HTMLElement {
    const arr = ["category", "discount", "rating", "stock"];
    const productInfo: HTMLElement = document.createElement("div");
    productInfo.classList.add("product__info");
    const productsInfoItems = arr.map((elem: string) => {
      const span: HTMLElement = document.createElement("span");
      span.classList.add("product__" + elem);
      span.textContent = elem + ": " + item[elem as keyof IProduct];
      return span;
    });
    productInfo.append(...productsInfoItems);
    return productInfo;
  }

  private createProductBtnWrap(item: IProduct, router?: IRouter): HTMLElement {
    const productBtnWrap: HTMLElement = document.createElement("div");
    productBtnWrap.classList.add("product__btn-wrap");
    const productPrice: HTMLElement = document.createElement("h3");
    productPrice.classList.add("product__price");
    productPrice.textContent = "€" + item.price;
    const btnDetails = this.createBtnDetails(item.id, router);
    const btnCart = this.createBtnCart();
    productBtnWrap.append(productPrice, btnDetails, btnCart);
    return productBtnWrap;
  }

  private createBtnDetails(id: number, router?: IRouter): HTMLElement {
    const btnDetails: HTMLElement = document.createElement("button");
    btnDetails.classList.add("product__btn-details");
    btnDetails.textContent = "Details";

    if (router) {
      btnDetails.addEventListener("click", (e) => {
        e.preventDefault();

        router.navigate(`products/${id}`);
      });
    }

    return btnDetails;
  }

  private createBtnCart(): HTMLElement {
    const btnCart: HTMLElement = document.createElement("button");
    btnCart.classList.add("product__btn-cart");
    const icon: HTMLElement = document.createElement("i");
    icon.classList.add("icon-shopping-cart");
    btnCart.append(icon);
    return btnCart;
  }
}

export default ProductsList;
