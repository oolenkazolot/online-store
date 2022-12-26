import { title } from "process";
import textObj from "../utils/textObj";
import Template from "../templates/template";
import ModalWindow from "../components/modal-window";
import { IProduct, IProductInCart } from "src/types";
const modal = new ModalWindow();
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
];
localStorage.setItem("itemsInCart", JSON.stringify(itemsInCart));

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
    const cardsWrapper = this.createElement("cards-wrapper", prodCont);
  }

  public createItemBlock(itemsInCartObj: IProductInCart[] | []): void {
    for (let i = 0; i < itemsInCartObj.length; i++) {
      const cardsWrapper = document.querySelector(
        ".cards-wrapper"
      ) as HTMLElement;

      const cardCont = this.createElement("prod-cont__card-cont", cardsWrapper);
      cardCont.setAttribute("data-id", String(itemsInCartObj[i].id));
      const itemNumb = this.createElement("item-num", cardCont, String(i + 1));

      const dataCont = this.createElement("data-cont", cardCont);
      const imageCont = this.createElement("img-cont", dataCont);
      const itemImage = document.createElement("img");
      itemImage.className = "prod-cont__item-img";
      imageCont.append(itemImage);
      itemImage.src = itemsInCartObj[i].thumbnail;

      const infoBlock = this.createElement("prod-cont__info-block", dataCont);
      const controlBlock = this.createElement(
        "prod-cont__contr-block",
        cardCont
      );

      const prodName = this.createElement(
        "prod-cont__prod-name",
        infoBlock,
        itemsInCartObj[i].title
      );

      const desc = this.createElement(
        "item-descr",
        infoBlock,
        itemsInCartObj[i].description
      );

      const addInfoCont = this.createElement("prod-cont__addInfo", infoBlock);
      const ratWrap = this.createElement("prod-cont__rat-wrap", addInfoCont);
      const rating = this.createElement("rating", ratWrap, textObj.rating);

      const ratNum = this.createElement(
        "rat-num",
        ratWrap,
        String(itemsInCartObj[i].rating)
      );

      const discWrap = this.createElement("prod-cont__disc-wrap", addInfoCont);
      const discount = this.createElement("discount", discWrap, textObj.disc);

      const discNum = this.createElement(
        "disc-num",
        discWrap,
        String(itemsInCartObj[i].discount)
      );

      const stockBl = this.createElement("prod-cont__stock-bl", controlBlock);
      const stock = this.createElement("stock", stockBl, textObj.stock);

      const stockNum = this.createElement(
        "stock-num",
        stockBl,
        String(itemsInCartObj[i].stock)
      );
      stockNum.setAttribute("data-id", String(itemsInCartObj[i].id));
      const controlsWrap = this.createElement(
        "prod-cont__contr-wrap",
        controlBlock
      );
      const price = this.createElement("prod-cont__price", controlBlock);
      price.innerHTML = `&#8364 ${String(itemsInCartObj[i].price)}`;
      price.setAttribute("data-id", String(itemsInCartObj[i].id));

      const incr = this.createElement("contr", controlsWrap, textObj.incr);
      const itemQt = this.createElement("quantity", controlsWrap);
      itemQt.setAttribute("data-id", String(itemsInCartObj[i].id));
      itemQt.innerText = String(itemsInCartObj[i].quantityInCart);
      incr.setAttribute("data-id", String(itemsInCartObj[i].id));
      const decr = this.createElement("contr", controlsWrap, textObj.decr);
      decr.setAttribute("data-id", String(itemsInCartObj[i].id));
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

    const promoInput = document.createElement("input");
    promoInput.classList.add("sum-prod__promo-input");
    sumInfoWrap.append(promoInput);
    promoInput.placeholder = "Enter promo code";

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

    cardsWrapper.addEventListener("click", getClickedItem);

    function getClickedItem(event: Event): void {
      const quantities = document.querySelectorAll(".quantity");
      const stockArray = document.querySelectorAll(".stock-num");
      const priceElements = document.querySelectorAll(".prod-cont__price");
      const target = event.target as HTMLElement;
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
                temp.createItemBlock(itemsInCart);
              }
            }
            for (let i = 0; i < itemsInCart.length; i++) {
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
}
const temp = new Temp();

class CartPage {
  public draw(): void {
    const itemsInCart = temp.getLocalStorageData();
    temp.getTotalSumAndQt(itemsInCart);
    temp.createCardHeader();
    temp.createItemBlock(itemsInCart);
    temp.createSummary(itemsInCart);
    temp.changeAmountInCart(itemsInCart);
    modal.createModalWindow();
  }
}

export default CartPage;
