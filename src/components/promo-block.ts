export class Promo {
  public rs: [string, number, string];
  public epm: [string, number, string];

  constructor(rs: [string, number, string], epm: [string, number, string]) {
    this.rs = rs;
    this.epm = epm;
  }

  public applyPromo(): void {
    const input = document.querySelector(
      ".sum-prod__promo-input"
    ) as HTMLInputElement;
    const totalSum = document.querySelector(".total-sum") as HTMLElement;
    const totalSumDiscount = document.getElementById(
      "total-sum-discount"
    ) as HTMLElement;
    const totalSumPromoCont = document.getElementById(
      "total-sum-wrapper"
    ) as HTMLElement;
    const discountWrapper = document.querySelector(
      ".discount-wrapper"
    ) as HTMLElement;
    const discountType = document.getElementById("disc-type") as HTMLElement;
    const addDropBtn = document.querySelector(".add-drop-btn") as HTMLElement;
    const appliedCodesBlock = document.querySelector(
      ".applied-promos-block"
    ) as HTMLElement;
    let totalSumValue;
    if (totalSum) {
      totalSumValue = Number(totalSum.innerText.slice(1).trim());
      const valuesArr = Object.values(this);
      const keysArr = Object.keys(this);
      let discount = 0;
      for (let i = 0; i < keysArr.length; i++) {
        if (input.value === keysArr[i]) {
          discount = valuesArr[i][1];
          totalSumDiscount.innerHTML = `&#8364 ${String(
            totalSumValue - (totalSumValue * discount) / 100
          )}`;
          discountWrapper.classList.remove("invisible");
          discountType.innerHTML = `${valuesArr[i][2]} - ${discount}%`;
          addDropBtn.addEventListener("click", () => {
            totalSumPromoCont.classList.remove("invisible");
            totalSum.classList.add("crossed");
            appliedCodesBlock.classList.remove("invisible");
            addDropBtn.innerHTML = "drop";
            const discountWrapCopy = discountWrapper.cloneNode(true);
            appliedCodesBlock.append(discountWrapCopy);
            addDropBtn.classList.add("invisible");
          });
        }
      }
    }
  }
}
