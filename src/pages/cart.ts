class Temporary {
  public createElement(
    myClass: string,
    parentElement?: HTMLElement
  ): HTMLElement {
    const newElem = document.createElement("div");
    newElem.classList.add(myClass);
    if (parentElement) {
      parentElement.append(newElem);
    }
    return newElem;
  }

  public createCardHeader(): void {
    const mainElement = document.querySelector("main") as HTMLElement;
    mainElement.innerHTML = "";

    const wrapper = this.createElement("main__wrapper", mainElement);
    const prodCont = this.createElement("prod-cont", wrapper);
    const titleCont = this.createElement("prod-cont__title-cont", prodCont);
    const titleProd = document.createElement("h2");
    titleProd.classList.add("prod-cont__title");
    titleCont.append(titleProd);

    titleProd.innerText = "Products In Cart";

    const statCont = this.createElement("prod-cont__stat-cont", titleCont);
    const itemsCont = this.createElement("prod-cont__items-cont", statCont);
    const items = this.createElement("prod-cont__items", itemsCont);
    const itemsNum = document.createElement("input");
    itemsNum.classList.add("prod-cont__items-num");
    itemsCont.append(itemsNum);

    items.innerText = "items:";
    itemsNum.value = "1";

    const pageCont = this.createElement("prod-cont__pages-cont", statCont);
    const page = this.createElement("prod-cont__page", pageCont);

    page.innerText = "page:";

    const separLeft = document.createElement("button");
    separLeft.classList.add("prod-cont__separ");
    pageCont.append(separLeft);

    const count = this.createElement("prod-cont__count", pageCont);
    separLeft.innerText = "<";

    count.innerText = "1";

    const separRight = document.createElement("button");
    separRight.classList.add("prod-cont__separ");
    pageCont.append(separRight);
    separRight.innerText = ">";
  }

  public createItemBlock(): void {
    const prodCont = document.querySelector(".prod-cont") as HTMLElement;
    const cardCont = this.createElement("prod-cont__card-cont", prodCont);
    const itemNumber = this.createElement("prod-cont__item-num", cardCont);
    itemNumber.innerText = "1";

    const itemImage = this.createElement("prod-cont__item-img", cardCont);
    const infoBlock = this.createElement("prod-cont__info-block", cardCont);
    const controlBlock = this.createElement("prod-cont__contr-block", cardCont);

    const prodName = this.createElement("prod-cont__prod-name", infoBlock);
    prodName.innerText = "iPhone 9";

    const itemDescr = this.createElement("prod-cont__item-descr", infoBlock);
    itemDescr.innerText = "An apple mobile which is nothing like apple";

    const addInfoCont = this.createElement("prod-cont__addInfo", infoBlock);
    const ratWrapper = this.createElement("prod-cont__rat-wrap", addInfoCont);
    const rating = this.createElement("prod-cont__rating", ratWrapper);
    rating.innerText = "Rating";

    const ratNum = this.createElement("prod-cont__rat-num", ratWrapper);
    ratNum.innerText = "4.69";

    const discWrapper = this.createElement("prod-cont__disc-wrap", addInfoCont);
    const discount = this.createElement("prod-cont__discount", discWrapper);
    discount.innerText = "Discount";

    const discNum = this.createElement("prod-cont__disc-num", discWrapper);
    discNum.innerText = "12.96%";

    const stockBlock = this.createElement("prod-cont__stock-bl", controlBlock);
    const stock = this.createElement("prod-count__stock", stockBlock);
    stock.innerText = "Stock:";

    const stockNum = this.createElement("prod-cont__stock-num", stockBlock);
    stockNum.innerText = "94";

    const controlsWrapper = this.createElement(
      "prod-cont__contr-wrap",
      controlBlock
    );
    const price = this.createElement("prod-cont__price", controlBlock);
    price.innerHTML = "&#8364 549";

    const incr = this.createElement("prod-cont__contr", controlsWrapper);
    incr.innerText = "+";

    const itemQt = this.createElement("prod-cont__quantity", controlsWrapper);
    itemQt.innerText = "1";

    const decr = this.createElement("prod-cont__contr", controlsWrapper);
    decr.innerText = "-";
  }

  public createSummary(): void {
    const wrapper = document.querySelector(".main__wrapper") as HTMLElement;
    const summaryCont = this.createElement("sum-cont", wrapper);
    const summaryTitle = document.createElement("h2");
    summaryTitle.classList.add("sum-cont__title");
    summaryCont.append(summaryTitle);
    summaryTitle.innerText = "Summary";

    const sumInfoCont = this.createElement("sum-cont__info-cont", summaryCont);
    const sumInfoWrap = this.createElement("sum-cont__info-wrap", sumInfoCont);
    const buyBtn = document.createElement("button");
    buyBtn.classList.add("sum-cont__buy-btn");
    sumInfoCont.append(buyBtn);
    buyBtn.innerText = "buy now";

    const productsCont = this.createElement("sum-cont__prod-cont", sumInfoWrap);
    const products = this.createElement("sum-cont__product", productsCont);
    products.innerText = "Products:";
    const prodAmt = this.createElement("sum-cont__prod-amt", productsCont);
    prodAmt.innerText = "1";

    const totalCont = this.createElement("sum-prod__total-cont", sumInfoWrap);
    const total = this.createElement("sum-prod__total", totalCont);
    total.innerText = "Total:";

    const totalSum = this.createElement("sum-prod__total-sum", totalCont);
    totalSum.innerHTML = "&#8364 549";

    const promoInput = document.createElement("input");
    promoInput.classList.add("sum-prod__promo-input");
    sumInfoWrap.append(promoInput);
    promoInput.placeholder = "Enter promo code";

    const testPromo = this.createElement("sum-prod__test-promo", sumInfoWrap);
    testPromo.innerText = "Promo for test: 'RS', 'EPM";
  }
}

class CartPage {
  public draw(): void {
    const temp = new Temporary();
    temp.createCardHeader();
    temp.createItemBlock();
    temp.createSummary();
  }
}

export default CartPage;
