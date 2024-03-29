import textObj from "../utils/textObj";
import Template from "../templates/template";
import ModalWindow from "../components/modal-window";
import { IProductInCart, IRouter } from "src/types";
import { Promo } from "../components/promo-block";
import productsData from "../utils/products-data";
const modal = new ModalWindow();
const promoCode = new Promo(
  ["rs", 10, "Rolling Scopes School "],
  ["epm", 10, "EPAM Systems"]
);

class Temp extends Template {
  page = this.getPage();

  public getPage(): number {
    const url = new URL(window.location.href);
    if (url.searchParams.get("page")) {
      return Number(url.searchParams.get("page"));
    } else return 1;
  }

  public getItems(): number {
    const url = new URL(window.location.href);
    if (url.searchParams.get("items")) {
      return Number(url.searchParams.get("items"));
    } else return 3;
  }

  public createCardHeader(itemsInCart: IProductInCart[] | []): void {
    const mainElement = document.querySelector("main") as HTMLElement;
    mainElement.classList.add("main");
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
    this.createElement("items", itemsCont, textObj.items);
    const itemsNum = document.createElement("input");
    itemsNum.classList.add("prod-cont__items-num");
    itemsNum.type = "number";
    itemsNum.min = "1";
    itemsNum.max = `${itemsInCart.length}`;
    itemsCont.append(itemsNum);

    itemsNum.value = String(this.getItems());

    const pageCont = this.createElement("prod-cont__pages-cont", statCont);
    this.createElement("page", pageCont, textObj.page);

    const separLeft = document.createElement("button");
    separLeft.classList.add("prod-cont__separ");
    pageCont.append(separLeft);

    const countItems = this.createElement("count", pageCont);
    countItems.innerHTML = String(this.page);

    separLeft.innerText = textObj.separLeft;

    const separRight = document.createElement("button");
    separRight.classList.add("prod-cont__separ");
    pageCont.append(separRight);
    separRight.innerText = textObj.separRight;
    this.createElement("cards-wrapper", prodCont);
  }

  public createItemBlock(
    itemsInCartObj: IProductInCart[] | [],
    page: number
  ): void {
    const paginationArray = this.createArraysForPagination(itemsInCartObj);
    const itemsNum = document.querySelector(
      ".prod-cont__items-num"
    ) as HTMLInputElement;
    const cardsWrapper = document.querySelector(
      ".cards-wrapper"
    ) as HTMLElement;
    if (paginationArray) {
      collectElements();
    }

    function collectElements() {
      if (paginationArray[page - 1]) {
        for (let i = 0; i < paginationArray[page - 1].length; i++) {
          const cardCont = createCardCont(paginationArray[page - 1][i].id);

          temp.createElement(
            "item-num",
            cardCont,
            String(i + 1 + Number(itemsNum.value) * (temp.page - 1))
          );

          createDataCont(cardCont, paginationArray[page - 1][i].thumbnail);

          createInfoBlock(
            cardCont,
            paginationArray[page - 1][i].title,
            paginationArray[page - 1][i].description,
            paginationArray[page - 1][i].rating,
            paginationArray[page - 1][i].discount,
            paginationArray[page - 1][i].category,
            paginationArray[page - 1][i].brand
          );

          createControlBlock(
            cardCont,
            paginationArray[page - 1][i].price,
            paginationArray[page - 1][i].id,
            paginationArray[page - 1][i].quantityInCart
            // paginationArray[page - 1][i].stock
          );
        }
      }

      function createCardCont(arg: number): HTMLElement {
        const cardCont = temp.createElement(
          "prod-cont__card-cont",
          cardsWrapper
        );
        cardCont.setAttribute("data-id", String(arg));
        return cardCont;
      }

      function createDataCont(cardCont: HTMLElement, src: string): HTMLElement {
        const dataCont = temp.createElement("data-cont", cardCont);
        const imageCont = temp.createElement("img-cont", dataCont);
        const itemImage = document.createElement("img");
        itemImage.className = "prod-cont__item-img";
        imageCont.append(itemImage);
        itemImage.src = src;
        return dataCont;
      }

      function createInfoBlock(
        dataCont: HTMLElement,
        title: string,
        description: string,
        rating: number,
        discount: number,
        category: string,
        brand: string
      ) {
        const infoBlock = temp.createElement("prod-cont__info-block", dataCont);
        temp.createElement("prod-cont__prod-name", infoBlock, title);
        temp.createElement("brand", infoBlock, brand);
        temp.createElement("item-descr", infoBlock, description);
        temp.createElement("category", infoBlock, category);

        const addInfoCont = temp.createElement("prod-cont__addInfo", infoBlock);
        const ratWrap = temp.createElement("prod-cont__rat-wrap", addInfoCont);
        const discWrap = temp.createElement(
          "prod-cont__disc-wrap",
          addInfoCont
        );
        temp.createElement("rating", ratWrap, textObj.rating);
        temp.createElement("rat-num", ratWrap, String(rating));
        temp.createElement("discount", discWrap, textObj.disc);
        temp.createElement("disc-num", discWrap, String(discount));
      }

      function createControlBlock(
        cardCont: HTMLElement,
        priceArg: number,
        id: number,
        quantity: number
        // stock: number
      ) {
        const controlBlock = temp.createElement(
          "prod-cont__contr-block",
          cardCont
        );
        const controlsWrap = temp.createElement(
          "prod-cont__contr-wrap",
          controlBlock
        );
        const stockBl = temp.createElement("prod-cont__stock-bl", controlBlock);
        const price = temp.createElement("prod-cont__price", controlBlock);
        price.innerHTML = `&#8364 ${String(priceArg)}`;
        price.setAttribute("data-id", String(id));

        const incr = temp.createElement("contr", controlsWrap, textObj.incr);
        const itemQt = temp.createElement("quantity", controlsWrap);
        itemQt.setAttribute("data-id", String(id));
        itemQt.innerText = String(quantity);
        incr.setAttribute("data-id", String(id));
        const decr = temp.createElement("contr", controlsWrap, textObj.decr);
        decr.setAttribute("data-id", String(id));
        temp.createElement("stock", stockBl, textObj.stock);
        const stockNum = temp.createElement(
          "stock-num",
          stockBl
          // String(stock)
        );
        stockNum.setAttribute("data-id", String(id));
        for (let i = 0; i < productsData.products.length; i++) {
          const productsID: number = productsData.products[i].id;
          if (Number(stockNum.dataset.id) === productsID) {
            stockNum.innerHTML = String(productsData.products[i].stock);
          }
        }
      }
    }
  }

  public createSummary(itemsInCart: IProductInCart[] | []): void {
    const appliedDiscounts = JSON.parse(
      localStorage.getItem("appliedPromos") || "[]"
    );
    const discountsArray = JSON.parse(
      localStorage.getItem("discountsArray") || "[]"
    );
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
    modal.formWrapper.addEventListener("click", getClickedEl);

    function getClickedEl(e: Event): void {
      const target = e.target as HTMLElement;
      if (target.className === "form-wrapper") {
        modal.overlay.classList.add("invisible");
        modal.formWrapper.classList.add("invisible");
      }
    }

    sumInfoCont.append(buyBtn);
    buyBtn.innerText = textObj.buyBtn;

    const prodCont = this.createElement("sum-cont__prod-cont", sumInfoWrap);
    this.createElement("prod-c", prodCont, textObj.products);
    const quantity = this.createElement("prod-amt", prodCont);
    const itemsArray = temp.getTotalSumAndQt(itemsInCart);
    quantity.innerHTML = String(itemsArray[1]);

    const totalCont = this.createElement("sum-prod__total-cont", sumInfoWrap);
    this.createElement("total", totalCont, textObj.total);

    const totalSum = this.createElement("total-sum", totalCont);
    totalSum.innerHTML = `&#8364 ${itemsArray[0]}`;

    const totalContPromo = this.createElement(
      "sum-prod__total-cont",
      sumInfoWrap
    );
    totalContPromo.id = "total-sum-wrapper";
    totalContPromo.classList.add("invisible");
    this.createElement("total", totalContPromo, textObj.total);

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

    temp.restorePromos();

    const promoInput = document.createElement("input");
    promoInput.classList.add("sum-prod__promo-input");
    promoInput.addEventListener("input", () => {
      promoCode.applyPromo();
    });

    sumInfoWrap.append(promoInput);
    promoInput.placeholder = "Enter promo code";

    const appliedCodesWrapper = this.createDiscountItem();
    appliedCodesWrapper.id = "promo-item-wrapper";
    sumInfoWrap.append(appliedCodesWrapper);

    this.createElement("promo", sumInfoWrap, textObj.testPromo);
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
      temp.createArraysForPagination(itemsInCart);
      const pageEl = document.querySelector(".count") as HTMLElement;
      const itemsNum = document.querySelector(
        ".prod-cont__items-num"
      ) as HTMLInputElement;

      if (target.classList.contains("contr")) {
        itemsInCart.forEach((el, index) => {
          if (el.id === Number(target.dataset.id)) {
            if (target.innerHTML === "+") {
              if (el.stock > 1) {
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
                  if (temp.page > 1) {
                    temp.page--;
                  }
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
                // elementSt.innerHTML = String(el.stock);
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
      const totalSumDiscount = document.getElementById(
        "total-sum-discount"
      ) as HTMLElement;
      const discount = Number(localStorage.getItem("discount"));
      const totSum = Number(totalSum.innerHTML.split(" ")[1]);
      if (totalSumDiscount) {
        totalSumDiscount.innerHTML = `&#8364 ${String(
          totSum - (totSum * discount) / 100
        )}`;
      }
    }
  }
  public getTotalSumAndQt(itemsInCart: IProductInCart[] | []): number[] {
    const sumArray: number[] = [];
    const qtArray: number[] = [];
    const resArr: number[] = [];
    if (itemsInCart && itemsInCart.length > 0) {
      for (let i = 0; i < itemsInCart.length; i++) {
        sumArray.push(Number(itemsInCart[i].price));
        qtArray.push(Number(itemsInCart[i].quantityInCart));
      }
      resArr.push(sumArray.reduce((acc, value) => acc + value));
      resArr.push(qtArray.reduce((acc, value) => acc + value));
      localStorage.setItem("itemsArray", JSON.stringify(resArr));
      return resArr;
    } else {
      localStorage.setItem("itemsArray", JSON.stringify([0, 0]));
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
      Number(rowsInput.value);

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
          temp.addQueryParameters("page", String(temp.page));
        }
        cardsWrapper.innerHTML = "";
        temp.createItemBlock(itemsInCart, temp.page);
        temp.addQueryParameters("items", rowsInput.value);
      }
    }
  }

  public addQueryParameters(paramName: string, items: string): void {
    const url = new URL(window.location.href);
    const param: string = url.searchParams.get(paramName) || "";
    url.searchParams.set(paramName, items);
    window.history.pushState({ paramName: `${paramName}` }, "", url);
  }

  public emptyCart(): void {
    const mainElement = document.querySelector("main") as HTMLElement;
    mainElement.classList.add("main");
    const itemsInCart = temp.getLocalStorageData();
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
    discountBtn.id = "disc-btn";
    return discountWrapper;
  }

  public linkChange(itemsInCart: IProductInCart[] | []): void {
    window.addEventListener(
      "popstate",
      (e) => {
        const query = window.location.search.substring(1);
        const vars = query.split("&");
        const rowsInput = document.querySelector(
          ".prod-cont__items-num"
        ) as HTMLInputElement;
        const cardsWrapper = document.querySelector(
          ".cards-wrapper"
        ) as HTMLElement;
        const pageEl = document.querySelector(".count") as HTMLElement;
        const array: string[] = ["items", "page"];
        if (cardsWrapper) {
          for (let i = 0; i < vars.length; i++) {
            if (array[0] === vars[i].split("=")[0]) {
              rowsInput.value = vars[i].split("=")[1];
            }
            if (array[1] === vars[i].split("=")[0]) {
              this.page = Number(vars[i].split("=")[1]);
            }
            if (
              !(array[0] === vars[i].split("=")[0]) &&
              !(array[1] === vars[i].split("=")[0])
            ) {
              rowsInput.value = "3";
              this.page = 1;
            }
          }
          cardsWrapper.innerHTML = "";
          this.createItemBlock(itemsInCart, this.page);
          pageEl.innerHTML = String(this.page);
        }
      },
      false
    );
  }

  public restorePromos(): void {
    const discountsArray = JSON.parse(
      localStorage.getItem("discountsArray") || "[]"
    );
    const appliedPromosBlock = document.querySelector(
      ".applied-promos-block"
    ) as HTMLElement;
    const discount = localStorage.getItem("discount") || 0;
    if (discountsArray.length) {
      for (let i = 0; i < discountsArray.length; i++) {
        const discountWrapper = document.createElement("div");
        discountWrapper.className = "discount-wrapper";
        const discountType = document.createElement("div");
        const totalSumDiscWrapper = document.getElementById(
          "total-sum-wrapper"
        ) as HTMLElement;
        const totalSumDiscount = document.getElementById(
          "total-sum-discount"
        ) as HTMLElement;
        const totalSum = document.querySelector(".total-sum") as HTMLElement;
        discountType.className = "discount-type";
        discountType.innerText = `${discountsArray[i][1]} - ${discountsArray[i][0]}%`;
        const discountBtn = document.createElement("div");
        discountBtn.className = "add-drop-btn";
        discountWrapper.append(discountType, discountBtn);
        discountBtn.innerText = "drop";
        discountBtn.setAttribute("id", discountsArray[i][1].trim());
        appliedPromosBlock.append(discountWrapper);
        appliedPromosBlock.classList.remove("invisible");
        totalSumDiscWrapper.classList.remove("invisible");
        const totSum = Number(totalSum.innerHTML.split(" ")[1]);

        totalSumDiscount.innerHTML = `&#8364 ${
          totSum - (Number(discount) / 100) * totSum
        }`;
        totalSum.classList.add("crossed");
      }
    }
  }
}

const temp = new Temp();

class CartPage {
  public router?: IRouter;
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
      temp.linkChange(itemsInCart);
      modal.createModalWindow();
      modal.clickConfirmButton(this.router);
      promoCode.appendDelPromoItem();
    }
  }
}

export default CartPage;
