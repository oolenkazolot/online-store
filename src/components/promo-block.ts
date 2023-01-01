export class Promo {
  public rs: [string, number];
  public epm: [string, number];

  constructor(rs: [string, number], epm: [string, number]) {
    this.rs = rs;
    this.epm = epm;
  }

  public applyPromo(): void {
    const input = document.querySelector(
      ".sum-prod__promo-input"
    ) as HTMLInputElement;
    const totalSum = document.querySelector(".total-sum") as HTMLElement;
    for (const key in this) {
      if (key === input.value) {
        console.log(this[key]);
        const totalSumValue = Number(totalSum.innerText.slice(1).trim());
        const totalSumPromo =
          totalSumValue - (totalSumValue * Number(key[1])) / 100;
        console.log(totalSumPromo);
      }
    }
  }
}
