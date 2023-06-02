import { log } from "console";
import { unwatchFile } from "fs";

class FilterRange {
  private prefix: string;
  private updateView: () => void;
  private min: string;
  private max: string;
  private minValue: string;
  private maxValue: string;
  private sliderOne: HTMLInputElement;
  private sliderTwo: HTMLInputElement;
  private sliderTrack: HTMLElement;
  private displayValueOne: HTMLElement;
  private displayValueTwo: HTMLElement;
  constructor(
    prefix: string,
    min: string,
    max: string,
    minValue: string,
    maxValue: string,
    updateView: () => void
  ) {
    this.min = min;
    this.max = max;
    this.minValue = minValue;
    this.maxValue = maxValue;
    this.updateView = updateView;
    this.prefix = prefix;

    this.sliderOne = this.createSliderInput(
      this.min,
      this.max,
      `${this.prefix}-slider-1`,
      this.minValue,
      this.slideOne.bind(this)
    );
    this.sliderTwo = this.createSliderInput(
      this.min,
      this.max,
      `${this.prefix}-slider-2`,
      this.maxValue,
      this.slideTwo.bind(this)
    );
    this.displayValueOne = this.createFilterDisplayValue(
      `${this.prefix}-range1`,
      this.min
    );
    this.displayValueTwo = this.createFilterDisplayValue(
      `${this.prefix}-range2`,
      this.max
    );
    this.sliderTrack = this.createSliderTrack();
  }

  public updateValues(min: string, max: string): void {
    if (!Number.isFinite(+min) || !Number.isFinite(+max)) {
      this.sliderOne.value = this.min;
      this.sliderTwo.value = this.max;
    } else {
      this.sliderOne.value = min;
      this.sliderTwo.value = max;
    }
    this.slideOne();
    this.slideTwo();
  }

  public createFilterRange(): HTMLElement {
    const rangeFilter: HTMLElement = document.createElement("div");
    rangeFilter.classList.add("filter-range");
    rangeFilter.append(this.sliderTrack, this.sliderOne, this.sliderTwo);
    const slideOne = this.slideOne.bind(this);
    const slideTwo = this.slideTwo.bind(this);
    slideOne();
    slideTwo();
    return rangeFilter;
  }

  private createSliderTrack(): HTMLElement {
    const filterSliderTrack: HTMLElement = document.createElement("div");
    filterSliderTrack.classList.add("filter-range__slider-track");
    return filterSliderTrack;
  }

  private createSliderInput(
    min: string,
    max: string,
    id: string,
    value: string,
    cb: () => void
  ): HTMLInputElement {
    const input: HTMLInputElement = document.createElement("input");
    input.classList.add("filter-range__input");
    input.setAttribute("type", "range");
    input.setAttribute("min", min);
    input.setAttribute("max", max);
    input.setAttribute("value", value);
    input.setAttribute("id", id);
    input.addEventListener("input", cb);
    return input;
  }

  public createFilterValues(): HTMLElement {
    const filterValues: HTMLElement = document.createElement("div");
    filterValues.classList.add("filter-values");
    const span2: HTMLElement = document.createElement("span");
    span2.textContent = "⟷";
    filterValues.append(this.displayValueOne, span2, this.displayValueTwo);
    return filterValues;
  }

  private createFilterDisplayValue(id: string, value: string): HTMLElement {
    const span: HTMLElement = document.createElement("span");
    span.classList.add(`filter-values__${id}`);
    span.setAttribute("id", id);
    span.textContent = value;
    return span;
  }

  private slideOne(e?: Event): void {
    const minGap = 0;
    if (
      parseInt(this.sliderTwo.value) - parseInt(this.sliderOne.value) <=
      minGap
    ) {
      this.sliderOne.value = parseInt(this.sliderTwo.value) - minGap + "";
    }
    this.displayValueOne.textContent = this.sliderOne.value;
    this.fillColor();

    if (e) {
      this.addQueryParametersPriceStock();
    }
  }

  private slideTwo(e?: Event): void {
    const minGap = 0;
    if (
      parseInt(this.sliderTwo.value) - parseInt(this.sliderOne.value) <=
      minGap
    ) {
      this.sliderTwo.value = parseInt(this.sliderOne.value) + minGap + "";
    }
    this.displayValueTwo.textContent = this.sliderTwo.value;
    this.fillColor();

    if (e) {
      this.addQueryParametersPriceStock();
    }
  }

  private fillColor(): void {
    const sliderMaxValue: string = this.sliderOne.max;
    const percent1 = (+this.sliderOne.value / +sliderMaxValue) * 100;
    const percent2 = (+this.sliderTwo.value / +sliderMaxValue) * 100;
    this.sliderTrack.style.background = `linear-gradient(to right, #f1f1f2 ${percent1}%, #fd2 ${percent1}%,  #fd2 ${percent2}%, #f1f1f2 ${percent2}%)`;
  }

  public addQueryParametersPriceStock(): void {
    const url = new URL(window.location.href);
    url.searchParams.set(
      this.prefix,
      this.sliderOne.value + "," + this.sliderTwo.value
    );
    window.history.pushState(null, "", url);
    this.updateView();
  }
}

export default FilterRange;
