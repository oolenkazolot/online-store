import { IProduct } from "../types/index";

class UpdateCart {
  public checkProductInCart(item: IProduct): IProduct | undefined {
    const itemsInCart: IProduct[] | undefined = this.getItemLocalStorage(
      "itemsInCart"
    );
    if (itemsInCart?.length) {
      const product: IProduct | undefined = itemsInCart.find((element) => {
        return element.id === item.id;
      });
      return product;
    }
  }

  public addProductCart(item: IProduct): void {
    const itemsInCartStr: string | null = localStorage.getItem("itemsInCart");
    const itemsInCart: IProduct[] = itemsInCartStr
      ? JSON.parse(itemsInCartStr)
      : [];
    itemsInCart.push(item);
    this.setItemLocalStorage("itemsInCart", itemsInCart);
    this.updateProductAmount();
  }

  public removeProductCart(item: IProduct): void {
    const itemsInCart = this.getItemLocalStorage("itemsInCart");
    if (!itemsInCart?.length) {
      return;
    }
    const newProductsCart: IProduct[] = itemsInCart.filter((element) => {
      return element.id !== item.id;
    });
    this.setItemLocalStorage("itemsInCart", newProductsCart);
    this.updateProductAmount();
  }

  private updateProductAmount(): void {
    const products: IProduct[] | undefined = this.getItemLocalStorage(
      "itemsInCart"
    );
    this.updateCartAmount(products);
    this.updateCartTotal(products);
  }

  private updateCartTotal(products: IProduct[] | undefined): void {
    const cartTotalEl: HTMLElement | null = document.querySelector(
      ".header-bottom__total-sum"
    );
    if (!cartTotalEl) {
      return;
    }
    if (!products) {
      cartTotalEl.textContent = `€ 0`;
      return;
    }
    const totalAmount: number = products.reduce((acc, currentValue) => {
      return acc + currentValue.price;
    }, 0);

    cartTotalEl.textContent = `€ ${totalAmount}`;
  }

  private updateCartAmount(products: IProduct[] | undefined): void {
    const cart: HTMLElement | null = document.querySelector(
      ".header-bottom__items-amount"
    );
    if (cart) {
      cart.textContent = products ? products.length.toString() : "0";
    }
  }

  private getItemLocalStorage(nameItem: string): IProduct[] | undefined {
    const itemsInCartStr: string | null = localStorage.getItem(nameItem);
    if (!itemsInCartStr) {
      return;
    }
    const itemsInCart: IProduct[] = JSON.parse(itemsInCartStr);
    return itemsInCart;
  }

  private setItemLocalStorage(
    nameItem: string,
    newProductsCart: IProduct[]
  ): void {
    localStorage.setItem(nameItem, JSON.stringify(newProductsCart));
  }
}

export default UpdateCart;
