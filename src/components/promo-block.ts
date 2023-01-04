export class Promo {
  public rs: [string, number, string];
  public epm: [string, number, string];

  constructor(rs: [string, number, string], epm: [string, number, string]) {
    this.rs = rs;
    this.epm = epm;
  }

  appliedPromos: string[] = [];
  discountsArray: Array<Array<number | string>> = [];
  totSumValue = "";
  discount = 0;

  public applyPromo(): void {
    const input = document.querySelector(
      ".sum-prod__promo-input"
    ) as HTMLInputElement;
    const totalSum = document.querySelector(".total-sum") as HTMLElement;
    const discountType = document.getElementById("disc-type") as HTMLElement;
    const discountWrapper = document.getElementById(
      "promo-item-wrapper"
    ) as HTMLElement;

    const addDropBtn = document.getElementById("disc-btn") as HTMLElement;

    let totalSumValue;
    if (totalSum) {
      totalSumValue = Number(totalSum.innerText.slice(1).trim());
      const valuesArr = Object.values(this);
      const keysArr = Object.keys(this);
      for (let i = 0; i < keysArr.length; i++) {
        if (!this.appliedPromos.includes(input.value)) {
          if (input.value === keysArr[i]) {
            addDropBtn.classList.remove("invisible");
            discountWrapper.classList.remove("invisible");
            discountType.innerHTML = `${valuesArr[i][2]} - ${valuesArr[i][1]}%`;
            return;
          } else {
            addDropBtn.classList.add("invisible");
            discountWrapper.classList.add("invisible");
          }
        }
        this.totSumValue = `&#8364 ${String(
          totalSumValue - (totalSumValue * this.discount) / 100
        )}`;
      }
    }
  }
  public createDiscountItem(element1: HTMLElement): HTMLElement {
    const discountWrapper = document.createElement("div");
    discountWrapper.className = "discount-wrapper";
    const discountType = document.createElement("div");
    discountType.className = "discount-type";
    discountType.innerText = element1.innerText;
    const discountBtn = document.createElement("div");
    discountBtn.className = "add-drop-btn";
    discountWrapper.append(discountType, discountBtn);
    discountBtn.innerText = "drop";
    discountBtn.setAttribute("id", element1.innerText);
    return discountWrapper;
  }

  public appendDelPromoItem(): void {
    const button = document.getElementById("disc-btn") as HTMLElement;
    const discountType = document.getElementById("disc-type") as HTMLElement;
    const appliedCodesBlock = document.querySelector(
      ".applied-promos-block"
    ) as HTMLElement;
    const totalSumPromoCont = document.getElementById(
      "total-sum-wrapper"
    ) as HTMLElement;
    const input = document.querySelector(
      ".sum-prod__promo-input"
    ) as HTMLInputElement;
    const totalSumDiscount = document.getElementById(
      "total-sum-discount"
    ) as HTMLElement;
    const keysArr = Object.keys(this);
    const valuesArr = Object.values(this);

    const addItem = (event: Event): void => {
      for (let i = 0; i < keysArr.length; i++) {
        if (input.value === keysArr[i]) {
          if (!this.appliedPromos.includes(input.value)) {
            this.discountsArray.push([valuesArr[i][1], valuesArr[i][2]]);
          }
        }
      }
      this.discount = this.discountsArray.reduce(
        (acc, val) => acc + Number(val[0]),
        0
      );

      const totalSum = document.querySelector(".total-sum") as HTMLElement;
      const totalSumValue = Number(totalSum.innerText.slice(1).trim());
      this.totSumValue = `&#8364 ${String(
        totalSumValue - (totalSumValue * this.discount) / 100
      )}`;
      this.appliedPromos.push(input.value);
      totalSumDiscount.innerHTML = this.totSumValue;
      const promoItem = this.createDiscountItem(discountType);
      appliedCodesBlock.append(promoItem);
      totalSumPromoCont.classList.remove("invisible");
      totalSum.classList.add("crossed");
      appliedCodesBlock.classList.remove("invisible");
      button.classList.add("invisible");
    };

    button.addEventListener("click", addItem);

    const dropItem = (event: Event): void => {
      const target = event.target as HTMLElement;
      if (target.className === "add-drop-btn") {
        this.discountsArray.forEach((el) => {
          const targetId = target.id.split("-")[0].trim();
          if (String(el[1]).trim() === targetId) {
            this.appliedPromos.splice(this.discountsArray.indexOf(el), 1);
            this.discountsArray.splice(this.discountsArray.indexOf(el), 1);
          }
        });
        const delItem = target.parentNode as HTMLElement;
        if (delItem) {
          delItem.remove();
          let discount = 0;
          discount = this.discountsArray.reduce(
            (acc, val) => acc + Number(val[0]),
            0
          );
          const totalSum = document.querySelector(".total-sum") as HTMLElement;
          const totalSumValue = Number(totalSum.innerText.slice(1).trim());
          this.totSumValue = `&#8364 ${String(
            totalSumValue - (totalSumValue * discount) / 100
          )}`;
          totalSumDiscount.innerHTML = this.totSumValue;
          if (this.appliedPromos.length === 0) {
            appliedCodesBlock.classList.add("invisible");
            totalSumPromoCont.classList.add("invisible");
            totalSum.classList.remove("crossed");
          }
        }
      }
    };
    appliedCodesBlock.addEventListener("click", dropItem);
  }
}
