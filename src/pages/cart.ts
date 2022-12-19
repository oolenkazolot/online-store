import { title } from "process";
import textObj from "../utils/textObj";
import Template from "../templates/template";
import ModalWindow from "../components/modal-window";
const modal = new ModalWindow();

class Temp extends Template {
  public createCardHeader(): void {
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
    itemsCont.append(itemsNum);

    itemsNum.value = "1";

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
  }

  public createItemBlock(): void {
    const prodCont = document.querySelector(".prod-cont") as HTMLElement;
    const cardCont = this.createElement("prod-cont__card-cont", prodCont);
    const itemNumb = this.createElement("item-num", cardCont, textObj.itemNumb);

    const itemImage = this.createElement("prod-cont__item-img", cardCont);
    const infoBlock = this.createElement("prod-cont__info-block", cardCont);
    const controlBlock = this.createElement("prod-cont__contr-block", cardCont);

    const prodName = this.createElement(
      "prod-cont__prod-name",
      infoBlock,
      textObj.prodName
    );

    const desc = this.createElement("item-descr", infoBlock, textObj.desc);

    const addInfoCont = this.createElement("prod-cont__addInfo", infoBlock);
    const ratWrap = this.createElement("prod-cont__rat-wrap", addInfoCont);
    const rating = this.createElement("rating", ratWrap, textObj.rating);

    const ratNum = this.createElement("rat-num", ratWrap, textObj.ratNum);

    const discWrap = this.createElement("prod-cont__disc-wrap", addInfoCont);
    const discount = this.createElement("discount", discWrap, textObj.disc);

    const discNum = this.createElement("disc-num", discWrap, textObj.discNum);

    const stockBl = this.createElement("prod-cont__stock-bl", controlBlock);
    const stock = this.createElement("stock", stockBl, textObj.stock);

    const stockNum = this.createElement("stock-num", stockBl, textObj.stockNum);

    const controlsWrap = this.createElement(
      "prod-cont__contr-wrap",
      controlBlock
    );
    const price = this.createElement("prod-cont__price", controlBlock);
    price.innerHTML = textObj.price;

    const incr = this.createElement("contr", controlsWrap, textObj.incr);

    const itemQt = this.createElement("quantity", controlsWrap, textObj.itemQt);

    const decr = this.createElement("contr", controlsWrap, textObj.decr);
  }

  public createSummary(): void {
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
    const products = this.createElement("product", prodCont, textObj.products);
    const prodAmt = this.createElement("prod-amt", prodCont, textObj.prodAmt);

    const totalCont = this.createElement("sum-prod__total-cont", sumInfoWrap);
    const total = this.createElement("total", totalCont, textObj.total);

    const totalSum = this.createElement("total-sum", totalCont);
    totalSum.innerHTML = textObj.totSum;

    const promoInput = document.createElement("input");
    promoInput.classList.add("sum-prod__promo-input");
    sumInfoWrap.append(promoInput);
    promoInput.placeholder = "Enter promo code";

    const promo = this.createElement("promo", sumInfoWrap, textObj.testPromo);
  }
}

class CartPage {
  public draw(): void {
    const temp = new Temp();
    temp.createCardHeader();
    temp.createItemBlock();
    temp.createSummary();
    modal.createModalWindow();
  }
}

export default CartPage;
