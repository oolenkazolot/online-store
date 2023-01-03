import { title } from "process";
import textObj from "../utils/textObj";
import Template from "../templates/template";
import ModalWindow from "../components/modal-window";
import { IProduct, IProductInCart } from "src/types";
import { Promo } from "../components/promo-block";
const modal = new ModalWindow();
const promoCode = new Promo(
  ["rs", 10, "Rolling Scopes School "],
  ["epm", 10, "EPAM Systems"]
);
const itemsInCart = [
  {
    id: 1,
    title: "iPhone 9",
    description: "An apple mobile which is nothing like apple",
    price: 549,
    discount: 12.96,
    rating: 4.69,
    stock: 94,
    brand: "Apple",
    category: "smartphones",
    thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
    images: [
      "https://i.dummyjson.com/data/products/1/1.jpg",
      "https://i.dummyjson.com/data/products/1/2.jpg",
      "https://i.dummyjson.com/data/products/1/3.jpg",
      "https://i.dummyjson.com/data/products/1/4.jpg",
      "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
    ],
    quantityInCart: 1,
  },
  {
    id: 2,
    title: "iPhone X",
    description:
      "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
    price: 899,
    discount: 17.94,
    rating: 4.44,
    stock: 34,
    brand: "Apple",
    category: "smartphones",
    thumbnail: "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
    images: [
      "https://i.dummyjson.com/data/products/2/1.jpg",
      "https://i.dummyjson.com/data/products/2/2.jpg",
      "https://i.dummyjson.com/data/products/2/3.jpg",
      "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
    ],
    quantityInCart: 1,
  },
  {
    id: 3,
    title: "Universe 9",
    description:
      "Samsung's new variant which goes beyond Galaxy to the Universe",
    price: 1249,
    discount: 15.46,
    rating: 4.09,
    stock: 36,
    brand: "Samsung",
    category: "smartphones",
    thumbnail: "https://i.dummyjson.com/data/products/3/thumbnail.jpg",
    images: ["https://i.dummyjson.com/data/products/3/1.jpg"],
    quantityInCart: 1,
  },
  {
    id: 4,
    title: "F19",
    description: "OPPO F19 is officially announced on April 2021.",
    price: 280,
    discount: 17.91,
    rating: 4.3,
    stock: 123,
    brand: "OPPO",
    category: "smartphones",
    thumbnail: "https://i.dummyjson.com/data/products/4/thumbnail.jpg",
    images: [
      "https://i.dummyjson.com/data/products/4/1.jpg",
      "https://i.dummyjson.com/data/products/4/2.jpg",
      "https://i.dummyjson.com/data/products/4/3.jpg",
      "https://i.dummyjson.com/data/products/4/4.jpg",
      "https://i.dummyjson.com/data/products/4/thumbnail.jpg",
    ],
    quantityInCart: 1,
  },
  {
    id: 5,
    title: "P30",
    description:
      "Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.",
    price: 499,
    discount: 10.58,
    rating: 4.09,
    stock: 32,
    brand: "Huawei",
    category: "smartphones",
    thumbnail: "https://i.dummyjson.com/data/products/5/thumbnail.jpg",
    images: [
      "https://i.dummyjson.com/data/products/5/1.jpg",
      "https://i.dummyjson.com/data/products/5/2.jpg",
      "https://i.dummyjson.com/data/products/5/3.jpg",
    ],
    quantityInCart: 1,
  },
  {
    id: 7,
    title: "Galaxy Book",
    description:
      "Samsung Galaxy Book S (2020) Laptop With Intel Lakefield Chip, 8GB of RAM Launched",
    price: 1499,
    discount: 4.15,
    rating: 4.25,
    stock: 50,
    brand: "Samsung",
    category: "laptops",
    thumbnail: "https://i.dummyjson.com/data/products/7/thumbnail.jpg",
    images: [
      "https://i.dummyjson.com/data/products/7/1.jpg",
      "https://i.dummyjson.com/data/products/7/2.jpg",
      "https://i.dummyjson.com/data/products/7/3.jpg",
      "https://i.dummyjson.com/data/products/7/thumbnail.jpg",
    ],
    quantityInCart: 1,
  },
  {
    id: 8,
    title: "Laptop 4",
    description:
      "Style and speed. Stand out on HD video calls backed by Studio Mics. Capture ideas on the vibrant touchscreen.",
    price: 1499,
    discount: 10.23,
    rating: 4.43,
    stock: 68,
    brand: "Microsoft Surface",
    category: "laptops",
    thumbnail: "https://i.dummyjson.com/data/products/8/thumbnail.jpg",
    images: [
      "https://i.dummyjson.com/data/products/8/1.jpg",
      "https://i.dummyjson.com/data/products/8/2.jpg",
      "https://i.dummyjson.com/data/products/8/3.jpg",
      "https://i.dummyjson.com/data/products/8/4.jpg",
      "https://i.dummyjson.com/data/products/8/thumbnail.jpg",
    ],
    quantityInCart: 1,
  },
];
localStorage.setItem("itemsInCart", JSON.stringify(itemsInCart));

class Temp extends Template {
  page = this.getPage();

  public getPage(): number {
    if (localStorage.getItem("page")) {
      return Number(localStorage.getItem("page"));
    } else return 1;
  }

  public createCardHeader(itemsInCart: IProductInCart[] | []): void {
    const mainElement = document.querySelector("main") as HTMLElement;
    mainElement.innerHTML = "";

    const wrapper = this.createElement("main__wrapper", mainElement);
    const prodCont = this.createElement("prod-cont", wrapper);
    const titleCont = this.createElement("prod-cont__title-cont", prodCont);
    const titleProd = document.createElement("h2");
    titleProd.classList.add("prod-cont__title");
    titleCont.append(titleProd);

    titleProd.innerText = textObj.titleProd;

    const statCont = this.createElement("prod-cont__stat-cont", titleCont);
    const itemsCont = this.createElement("prod-cont__items-cont", statCont);
    const items = this.createElement("items", itemsCont, textObj.items);
    const itemsNum = document.createElement("input");
    itemsNum.classList.add("prod-cont__items-num");
    itemsNum.type = "number";
    itemsNum.min = "1";
    itemsNum.max = `${itemsInCart.length}`;
    itemsCont.append(itemsNum);

    itemsNum.value = "3";

    const pageCont = this.createElement("prod-cont__pages-cont", statCont);
    const page = this.createElement("page", pageCont, textObj.page);

    const separLeft = document.createElement("button");
    separLeft.classList.add("prod-cont__separ");
    pageCont.append(separLeft);

    const count = this.createElement("count", pageCont, textObj.count);
    separLeft.innerText = textObj.separLeft;

    const separRight = document.createElement("button");
    separRight.classList.add("prod-cont__separ");
    pageCont.append(separRight);
    separRight.innerText = textObj.separRight;
    const cardsWrapper = this.createElement("cards-wrapper", prodCont);
  }

  public createItemBlock(
    itemsInCartObj: IProductInCart[] | [],
    page: number
  ): void {
    const paginationArray = this.createArraysForPagination(itemsInCartObj);
    const itemsNum = document.querySelector(
      ".prod-cont__items-num"
    ) as HTMLInputElement;

    if (paginationArray[page - 1]) {
      for (let i = 0; i < paginationArray[page - 1].length; i++) {
        const cardsWrapper = document.querySelector(
          ".cards-wrapper"
        ) as HTMLElement;

        const cardCont = this.createElement(
          "prod-cont__card-cont",
          cardsWrapper
        );
        cardCont.setAttribute(
          "data-id",
          String(paginationArray[page - 1][i].id)
        );
        const itemNumb = this.createElement(
          "item-num",
          cardCont,
          String(i + 1 + Number(itemsNum.value) * (this.page - 1))
        );

        const dataCont = this.createElement("data-cont", cardCont);
        const imageCont = this.createElement("img-cont", dataCont);
        const itemImage = document.createElement("img");
        itemImage.className = "prod-cont__item-img";
        imageCont.append(itemImage);
        itemImage.src = paginationArray[page - 1][i].thumbnail;

        const infoBlock = this.createElement("prod-cont__info-block", dataCont);
        const controlBlock = this.createElement(
          "prod-cont__contr-block",
          cardCont
        );

        const prodName = this.createElement(
          "prod-cont__prod-name",
          infoBlock,
          paginationArray[page - 1][i].title
        );

        const desc = this.createElement(
          "item-descr",
          infoBlock,
          paginationArray[page - 1][i].description
        );

        const addInfoCont = this.createElement("prod-cont__addInfo", infoBlock);
        const ratWrap = this.createElement("prod-cont__rat-wrap", addInfoCont);
        const rating = this.createElement("rating", ratWrap, textObj.rating);

        const ratNum = this.createElement(
          "rat-num",
          ratWrap,
          String(paginationArray[page - 1][i].rating)
        );

        const discWrap = this.createElement(
          "prod-cont__disc-wrap",
          addInfoCont
        );
        const discount = this.createElement("discount", discWrap, textObj.disc);

        const discNum = this.createElement(
          "disc-num",
          discWrap,
          String(paginationArray[page - 1][i].discount)
        );

        const stockBl = this.createElement("prod-cont__stock-bl", controlBlock);
        const stock = this.createElement("stock", stockBl, textObj.stock);

        const stockNum = this.createElement(
          "stock-num",
          stockBl,
          String(paginationArray[page - 1][i].stock)
        );
        stockNum.setAttribute(
          "data-id",
          String(paginationArray[page - 1][i].id)
        );
        const controlsWrap = this.createElement(
          "prod-cont__contr-wrap",
          controlBlock
        );
        const price = this.createElement("prod-cont__price", controlBlock);
        price.innerHTML = `&#8364 ${String(
          paginationArray[page - 1][i].price
        )}`;
        price.setAttribute("data-id", String(paginationArray[page - 1][i].id));

        const incr = this.createElement("contr", controlsWrap, textObj.incr);
        const itemQt = this.createElement("quantity", controlsWrap);
        itemQt.setAttribute("data-id", String(paginationArray[page - 1][i].id));
        itemQt.innerText = String(paginationArray[page - 1][i].quantityInCart);
        incr.setAttribute("data-id", String(paginationArray[page - 1][i].id));
        const decr = this.createElement("contr", controlsWrap, textObj.decr);
        decr.setAttribute("data-id", String(paginationArray[page - 1][i].id));
      }
    }
  }

  public createSummary(itemsInCart: IProductInCart[] | []): void {
    const wrapper = document.querySelector(".main__wrapper") as HTMLElement;
    const summaryCont = this.createElement("sum-cont", wrapper);
    const summaryTitle = document.createElement("h2");
    summaryTitle.classList.add("sum-cont__title");
    summaryCont.append(summaryTitle);
    summaryTitle.innerText = textObj.summaryTitle;

    const sumInfoCont = this.createElement("sum-cont__info-cont", summaryCont);
    const sumInfoWrap = this.createElement("sum-cont__info-wrap", sumInfoCont);
    const buyBtn = document.createElement("button");
    buyBtn.classList.add("sum-cont__buy-btn");

    buyBtn.addEventListener("click", () => {
      modal.overlay.classList.remove("invisible");
      modal.formWrapper.classList.remove("invisible");
    });
    modal.overlay.addEventListener("click", () => {
      modal.overlay.classList.add("invisible");
      modal.formWrapper.classList.add("invisible");
    });

    sumInfoCont.append(buyBtn);
    buyBtn.innerText = textObj.buyBtn;

    const prodCont = this.createElement("sum-cont__prod-cont", sumInfoWrap);
    const products = this.createElement("prod-c", prodCont, textObj.products);
    const quantity = this.createElement("prod-amt", prodCont);
    const itemsArray = temp.getTotalSumAndQt(itemsInCart);
    quantity.innerHTML = String(itemsArray[1]);

    const totalCont = this.createElement("sum-prod__total-cont", sumInfoWrap);
    const total = this.createElement("total", totalCont, textObj.total);

    const totalSum = this.createElement("total-sum", totalCont);
    totalSum.innerHTML = `&#8364 ${itemsArray[0]}`;

    const totalContPromo = this.createElement(
      "sum-prod__total-cont",
      sumInfoWrap
    );
    totalContPromo.id = "total-sum-wrapper";
    totalContPromo.classList.add("invisible");
    const totalPromo = this.createElement(
      "total",
      totalContPromo,
      textObj.total
    );

    const totalSumPromo = this.createElement("total-sum", totalContPromo);
    totalSumPromo.id = "total-sum-discount";

    const appliedPromosBlock = this.createElement(
      "applied-promos-block",
      sumInfoWrap
    );
    appliedPromosBlock.classList.add("invisible");

    const appliedCodesTitle = document.createElement("h3");
    appliedPromosBlock.append(appliedCodesTitle);

    appliedCodesTitle.className = "applied-codes-title";

    appliedCodesTitle.innerText = textObj.applyCodesTitle;

    const promoInput = document.createElement("input");
    promoInput.classList.add("sum-prod__promo-input");
    promoInput.addEventListener("input", () => {
      promoCode.applyPromo();
    });

    sumInfoWrap.append(promoInput);
    promoInput.placeholder = "Enter promo code";

    const appliedCodesWrapper = this.createDiscountItem();
    sumInfoWrap.append(appliedCodesWrapper);

    const promo = this.createElement("promo", sumInfoWrap, textObj.testPromo);
  }

  public getLocalStorageData(): IProductInCart[] | [] {
    const itemsInCart = JSON.parse(localStorage.getItem("itemsInCart") || "[]");
    return itemsInCart;
  }

  public changeAmountInCart(itemsInCart: IProductInCart[] | []): void {
    const totalSum = document.querySelector(".total-sum") as HTMLElement;
    const quantity = document.querySelector(".prod-amt") as HTMLElement;
    const cardsWrapper = document.querySelector(
      ".cards-wrapper"
    ) as HTMLElement;
    const headerCart = document.querySelector(
      ".header-bottom__items-amount"
    ) as HTMLElement;
    const headerSum = document.querySelector(
      ".header-bottom__total-sum"
    ) as HTMLElement;

    if (itemsInCart.length > 0) {
      cardsWrapper.addEventListener("click", getClickedItem);
    }

    function getClickedItem(event: Event): void {
      const quantities = document.querySelectorAll(".quantity");
      const stockArray = document.querySelectorAll(".stock-num");
      const priceElements = document.querySelectorAll(".prod-cont__price");
      const target = event.target as HTMLElement;
      const paginationArray = temp.createArraysForPagination(itemsInCart);
      const pageEl = document.querySelector(".count") as HTMLElement;
      const itemsNum = document.querySelector(
        ".prod-cont__items-num"
      ) as HTMLInputElement;

      if (target.classList.contains("contr")) {
        itemsInCart.forEach((el, index) => {
          if (el.id === Number(target.dataset.id)) {
            if (target.innerHTML === "+") {
              if (el.stock > 0) {
                el.stock--;
                el.quantityInCart++;
                el.price = el.price + el.price / (el.quantityInCart - 1);
                localStorage.setItem(
                  "itemsInCart",
                  JSON.stringify(itemsInCart)
                );
              }
            }
            if (target.innerHTML === "-") {
              if (el.quantityInCart > 0) {
                el.stock++;
                el.quantityInCart--;
                el.price = el.price - el.price / (el.quantityInCart + 1);
                localStorage.setItem(
                  "itemsInCart",
                  JSON.stringify(itemsInCart)
                );
              }
              if (el.quantityInCart === 0) {
                itemsInCart.splice(index, 1);
                localStorage.setItem(
                  "itemsInCart",
                  JSON.stringify(itemsInCart)
                );
                cardsWrapper.innerHTML = "";
                const paginationArray = temp.createArraysForPagination(
                  itemsInCart
                );
                if (!paginationArray[temp.page - 1]) {
                  temp.page--;
                  pageEl.innerText = String(temp.page);
                }
                temp.createItemBlock(itemsInCart, temp.page);
                temp.addQueryParameters("page", String(temp.page));
                itemsNum.max = `${itemsInCart.length}`;
                temp.emptyCart();
              }
            }
            for (let i = 0; i < quantities.length; i++) {
              const elementQt = quantities[i] as HTMLElement;
              const elementSt = stockArray[i] as HTMLElement;
              const elementPr = priceElements[i] as HTMLElement;
              if (elementQt.dataset.id === target.dataset.id) {
                elementQt.innerText = String(el.quantityInCart);
                elementSt.innerHTML = String(el.stock);
                elementPr.innerHTML = `&#8364 ${String(el.price)}`;
              }
            }
          }
        });
      }
      const itemsArray = temp.getTotalSumAndQt(itemsInCart);
      totalSum.innerHTML = `&#8364 ${itemsArray[0]}`;
      quantity.innerHTML = String(itemsArray[1]);
      localStorage.setItem("itemsArray", JSON.stringify(itemsArray));
      headerCart.innerHTML = String(itemsArray[1]);
      headerSum.innerHTML = `&#8364 ${itemsArray[0]}`;
      promoCode.applyPromo();
    }
  }
  public getTotalSumAndQt(itemsInCart: IProductInCart[] | []): number[] {
    const sumArray: number[] = [];
    const qtArray: number[] = [];
    const resArr: number[] = [];
    if (itemsInCart.length > 0) {
      for (let i = 0; i < itemsInCart.length; i++) {
        sumArray.push(Number(itemsInCart[i].price));
        qtArray.push(Number(itemsInCart[i].quantityInCart));
      }
      resArr.push(sumArray.reduce((acc, value) => acc + value));
      resArr.push(qtArray.reduce((acc, value) => acc + value));
      localStorage.setItem("itemsArray", JSON.stringify(resArr));
      return resArr;
    } else {
      localStorage.setItem("itemsArray", JSON.stringify(resArr));
      return [0, 0];
    }
  }

  public createArraysForPagination(
    itemsInCart: IProductInCart[] | []
  ): IProductInCart[][] {
    const rowsInput = document.querySelector(
      ".prod-cont__items-num"
    ) as HTMLInputElement;
    const inputValue = Number(rowsInput.value);
    const paginationArray = [];
    for (let i = 0; i < itemsInCart.length; i = i + inputValue) {
      paginationArray.push(itemsInCart.slice(i, i + inputValue));
    }
    return paginationArray;
  }

  public changePages(): void {
    const btnBlock = document.querySelector(
      ".prod-cont__pages-cont"
    ) as HTMLElement;
    const pageEl = document.querySelector(".count") as HTMLElement;

    btnBlock.addEventListener("click", switchPage);

    function switchPage(event: Event): void {
      const itemsInCart = temp.getLocalStorageData();
      const paginationArray = temp.createArraysForPagination(itemsInCart);
      const cardsWrapper = document.querySelector(
        ".cards-wrapper"
      ) as HTMLElement;
      const target = event.target as HTMLElement;
      const rowsInput = document.querySelector(
        ".prod-cont__items-num"
      ) as HTMLInputElement;
      const inputValue = Number(rowsInput.value);

      if (target.innerText === ">") {
        if (temp.page <= paginationArray.length - 1) {
          temp.page++;
          pageEl.innerText = String(temp.page);
          cardsWrapper.innerHTML = "";
          temp.createItemBlock(itemsInCart, temp.page);
          temp.addQueryParameters("page", String(temp.page));
        }
      }
      if (target.innerText === "<") {
        if (temp.page > 1) {
          temp.page--;
          pageEl.innerText = String(temp.page);
          cardsWrapper.innerHTML = "";
          temp.createItemBlock(itemsInCart, temp.page);
          temp.addQueryParameters("page", String(temp.page));
        }
      }
    }
  }

  public changePageNum(itemsInCart: IProductInCart[] | []): void {
    const rowsInput = document.querySelector(
      ".prod-cont__items-num"
    ) as HTMLInputElement;
    const cardsWrapper = document.querySelector(
      ".cards-wrapper"
    ) as HTMLElement;
    const pageEl = document.querySelector(".count") as HTMLElement;
    rowsInput.addEventListener("input", changePage);
    function changePage(): void {
      if (Number(rowsInput.value) > 0) {
        const paginationArray = temp.createArraysForPagination(itemsInCart);
        if (!paginationArray[temp.page - 1]) {
          temp.page = paginationArray.length;
          pageEl.innerHTML = String(temp.page);
        }
        cardsWrapper.innerHTML = "";
        temp.createItemBlock(itemsInCart, temp.page);
        temp.addQueryParameters("items", rowsInput.value);
        temp.addQueryParameters("page", String(temp.page));
      }
    }
  }

  public addQueryParameters(
    paramName: string,
    items: string
    // itemsInCart: IProductInCart[] | []
  ): void {
    const url = new URL(window.location.href);
    const param: string = url.searchParams.get(paramName) || "";
    url.searchParams.set(paramName, items);
    window.history.pushState(null, "", url);
    // this.createItemBlock(itemsInCart, this.page);
  }

  public emptyCart(): void {
    const mainElement = document.querySelector("main") as HTMLElement;
    const itemsInCart = temp.getLocalStorageData();
    console.log(itemsInCart.length);
    if (itemsInCart.length === 0) {
      mainElement.innerHTML = "";
      const message = this.createElement("message", mainElement);
      message.innerText = textObj.message;
    }
  }

  public createDiscountItem(): HTMLElement {
    const discountWrapper = this.createElement("discount-wrapper");
    discountWrapper.classList.add("invisible");
    const discountType = this.createElement("discount-type", discountWrapper);
    discountType.id = "disc-type";
    discountType.innerText = "Rolling Scopes School - 10% -";
    const discountBtn = this.createElement("add-drop-btn", discountWrapper);
    discountBtn.innerText = "add";
    return discountWrapper;
  }

  // public linkChange(
  //   paramName: string,
  //   itemsInCart: IProductInCart[] | []
  // ): void {
  //   window.addEventListener(
  //     "popstate",
  //     () => {
  //       const url = new URL(window.location.href);
  //       const param: string = url.searchParams.get(paramName) || "";
  //       const rowsInput = document.querySelector(
  //         ".prod-cont__items-num"
  //       ) as HTMLInputElement;
  //       const cardsWrapper = document.querySelector(
  //         ".cards-wrapper"
  //       ) as HTMLElement;
  //       rowsInput.value = param;
  //       cardsWrapper.innerHTML = "";
  //       this.createItemBlock(itemsInCart, this.page);
  //     },
  //     false
  //   );
  // }
}

const temp = new Temp();

class CartPage {
  public draw(): void {
    const itemsInCart = temp.getLocalStorageData();
    temp.getTotalSumAndQt(itemsInCart);
    temp.createCardHeader(itemsInCart);
    temp.createItemBlock(itemsInCart, temp.page);
    temp.emptyCart();
    if (itemsInCart.length > 0) {
      temp.createSummary(itemsInCart);
      temp.changeAmountInCart(itemsInCart);
      temp.createArraysForPagination(itemsInCart);
      temp.changePages();
      temp.changePageNum(itemsInCart);
      // temp.linkChange("items", itemsInCart);
      modal.createModalWindow();
    }
  }
}

export default CartPage;
