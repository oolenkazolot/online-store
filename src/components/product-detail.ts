import Products from "../utils/products";
import UpdateCart from "../components/update-cart";

import { IProducts, IProduct, IUpdateCart, IRouter } from "../types/index";

class ProductDetail {
  private products: IProducts;
  private product?: IProduct;
  private updateCart: IUpdateCart;

  constructor() {
    this.products = new Products();
    this.updateCart = new UpdateCart();
  }

  public createProductDetail(
    id: string | undefined,
    router?: IRouter
  ): HTMLElement {
    this.product = this.products.getProduct(id);
    const productDetail: HTMLElement = document.createElement("section");
    productDetail.classList.add("product-detail");
    const title: HTMLElement = document.createElement("h2");
    title.classList.add("product-detail__title");
    if (this.product) {
      title.textContent = this.product?.title;
    }
    const productData: HTMLElement = this.createProductData(router);
    productDetail.append(title, productData);
    return productDetail;
  }

  private createProductData(router?: IRouter): HTMLElement {
    const productData: HTMLElement = document.createElement("div");
    productData.classList.add("product-data");
    const photosBlock: HTMLElement = this.createPhotosBlock();
    const infoBlock: HTMLElement = this.createInfoBlock();
    const cartBlock: HTMLElement = this.createCartBlock(router);
    productData.append(photosBlock, infoBlock, cartBlock);
    return productData;
  }

  private createPhotosBlock(): HTMLElement {
    const photosBlock: HTMLElement = document.createElement("div");
    photosBlock.classList.add("product-data__photos");
    const slidesBlock: HTMLElement | undefined = this.createSlidesBlock();
    const grandPhotoBlock: HTMLElement = this.createGrandPhotoBlock();
    if (slidesBlock) {
      photosBlock.append(slidesBlock, grandPhotoBlock);
    }
    return photosBlock;
  }

  private createSlidesBlock(): HTMLElement | undefined {
    const slidesBlock: HTMLElement = document.createElement("div");
    slidesBlock.classList.add("slides");
    const images: string[] | undefined = this.product?.images;
    if (!images?.length) {
      return;
    }

    const imagesSlides: string[] | undefined = images.reverse().slice(0, 3);
    console.log(imagesSlides);
    if (!imagesSlides?.length) {
      return;
    }

    const imagesElements = imagesSlides.map((item: string) => {
      const slide: HTMLElement = document.createElement("div");
      slide.classList.add("slides__slide");
      const img: HTMLElement = document.createElement("img");
      img.classList.add("slides__img");
      img.setAttribute("src", item);
      img.setAttribute("alt", "product-img");
      img.addEventListener("click", () => this.showSlidesImg(item));
      slide.append(img);
      return slide;
    });

    slidesBlock.append(...imagesElements);
    return slidesBlock;
  }

  private createGrandPhotoBlock(): HTMLElement {
    const grandPhotoBlock: HTMLElement = document.createElement("div");
    grandPhotoBlock.classList.add("grand-photo");
    const img: HTMLElement = document.createElement("img");
    img.classList.add("grand-photo__img");
    if (this.product) {
      img.setAttribute("src", this.product.thumbnail);
    }
    img.setAttribute("alt", "product-img");
    grandPhotoBlock.append(img);
    return grandPhotoBlock;
  }

  private createInfoBlock(): HTMLElement {
    const infoBlock: HTMLElement = document.createElement("div");
    infoBlock.classList.add("product-data__info");
    const arr: string[] = [
      "description",
      "discount",
      "rating",
      "stock",
      "brand",
      "category",
    ];
    const itemsInfo = arr.map((item: string) => {
      const itemInfo = this.createItemInfo(item);
      return itemInfo;
    });
    infoBlock.append(...itemsInfo);
    return infoBlock;
  }

  private createItemInfo(item: string): HTMLElement {
    const itemInfo: HTMLElement = document.createElement("div");
    itemInfo.classList.add("product-data__item");
    const title: HTMLElement = document.createElement("h3");
    title.classList.add("product-data__title");
    title.textContent = item + ":";
    const description: HTMLElement = document.createElement("p");
    description.classList.add("product-data__description");
    if (this.product) {
      const str: string | number | string[] | undefined = this.product[
        item as keyof IProduct
      ];
      description.textContent = str ? str.toString() : "";
    }
    itemInfo.append(title, description);
    return itemInfo;
  }

  private createCartBlock(router?: IRouter): HTMLElement {
    const blockCart: HTMLElement = document.createElement("div");
    blockCart.classList.add("product-data__cart");
    const price: HTMLElement = document.createElement("span");
    price.classList.add("product-data__price");
    if (this.product) {
      price.textContent = "€" + this.product.price.toString();
    }
    const btnWrap = this.createBtnWrap(router);
    blockCart.append(price, btnWrap);
    return blockCart;
  }

  private createBtnWrap(router?: IRouter): HTMLElement {
    const btnWrap: HTMLElement = document.createElement("div");
    btnWrap.classList.add("product-data__btn-wrap");
    const btnUpdateCart = this.createBtnUpdateCart();
    const btnBuyNow = this.createBtnBuyNow(router);
    btnWrap.append(btnUpdateCart, btnBuyNow);
    return btnWrap;
  }

  private createBtnUpdateCart(): HTMLElement {
    const btn: HTMLElement = document.createElement("button");
    btn.classList.add("product-data__update-cart");
    btn.classList.add("btn");
    btn.textContent = "Drop from cart";
    const productInCart = this.product
      ? this.updateCart.checkProductInCart(this.product)
      : "";
    if (productInCart) {
      btn.textContent = "Drop from cart";
    } else {
      btn.textContent = "Add to cart";
    }
    this.addHandlerBtn(btn);
    return btn;
  }

  private addHandlerBtn(btn: HTMLElement): void {
    btn.addEventListener("click", () => {
      if (!this.product) {
        return;
      }
      const productsInCart = this.product
        ? this.updateCart.checkProductInCart(this.product)
        : "";
      if (productsInCart) {
        btn.textContent = "Add to cart";
        this.updateCart.removeProductCart(this.product);
      } else {
        btn.textContent = "Drop from cart";
        this.updateCart.addProductCart(this.product);
      }
    });
  }

  private createBtnBuyNow(router?: IRouter): HTMLElement {
    const btn: HTMLElement = document.createElement("button");
    btn.classList.add("product-data__buy-now");
    btn.classList.add("btn");
    btn.textContent = "Buy now";
    this.addHandlerBtnBuyNow(btn, router);
    return btn;
  }

  private addHandlerBtnBuyNow(btn: HTMLElement, router?: IRouter): void {
    btn.addEventListener("click", () => {
      router?.navigate("cart");

      setTimeout(() => {
        this.showModal();
      }, 0);

      if (this.product) {
        const isInCart:
          | IProduct
          | undefined = this.updateCart.checkProductInCart(this.product);
        if (!isInCart) {
          this.updateCart.addProductCart(this.product);
        }
      }
    });
  }

  private showModal(): void {
    const overlayModal: HTMLElement | null = document.querySelector(".overlay");
    const wrapperModal: HTMLElement | null = document.querySelector(
      ".form-wrapper"
    );
    if (overlayModal && wrapperModal) {
      overlayModal.classList.remove("invisible");
      wrapperModal.classList.remove("invisible");
    }
  }

  private showSlidesImg(src: string): void {
    const grandPhotoElement: HTMLElement | null = document.querySelector(
      ".grand-photo__img"
    );
    if (grandPhotoElement) {
      grandPhotoElement.setAttribute("src", src);
    }
  }
}
export default ProductDetail;
