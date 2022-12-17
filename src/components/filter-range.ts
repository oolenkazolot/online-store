class FilterRange {
  private prefix: string;
  private sliderOne: HTMLInputElement;
  private sliderTwo: HTMLInputElement;
  private sliderTrack: HTMLElement;
  private displayValueOne: HTMLElement;
  private displayValueTwo: HTMLElement;
  constructor(prefix: string) {
    this.prefix = prefix;
    this.sliderOne = this.createSliderInput('0', '100', `${this.prefix}-slider-1`, '30', this.slideOne.bind(this));
    this.sliderTwo = this.createSliderInput('0', '100', `${this.prefix}-slider-2`, '70', this.slideTwo.bind(this));
    this.displayValueOne = this.createFilterDisplayValue(`${this.prefix}-range1`, '0');
    this.displayValueTwo = this.createFilterDisplayValue(`${this.prefix}-range2`, '100');
    this.sliderTrack = this.createSliderTrack();
  }

  public createFilterRange(): HTMLElement {
    const rangeFilter: HTMLElement = document.createElement('div');
    rangeFilter.classList.add('filter-range');
    rangeFilter.append(this.sliderTrack, this.sliderOne, this.sliderTwo);
    const slideOne = this.slideOne.bind(this);
    const slideTwo = this.slideTwo.bind(this);
    window.addEventListener('load', () => {
      slideOne();
      slideTwo();
    });
    return rangeFilter;
  }

  private createSliderTrack(): HTMLElement {
    const filterSliderTrack: HTMLElement = document.createElement('div');
    filterSliderTrack.classList.add('filter-range__slider-track');
    return filterSliderTrack;
  }

  private createSliderInput(min: string, max: string, id: string, value: string, cb: () => void): HTMLInputElement {
    const input: HTMLInputElement = document.createElement('input');
    input.classList.add('filter-range__input');
    input.setAttribute('type', 'range');
    input.setAttribute('min', min);
    input.setAttribute('max', max);
    input.setAttribute('value', value);
    input.setAttribute('id', id);
    input.addEventListener('input', cb);
    return input;
  }

  public createFilterValues(): HTMLElement {
    const filterValues: HTMLElement = document.createElement('div');
    filterValues.classList.add('filter-values');
    const span2: HTMLElement = document.createElement('span');
    span2.textContent = '-';
    filterValues.append(this.displayValueOne, span2, this.displayValueTwo);
    return filterValues;
  }

  private createFilterDisplayValue(id: string, value: string): HTMLElement {
    const span: HTMLElement = document.createElement('span');
    span.setAttribute('id', id);
    span.textContent = value;
    return span;
  }

  private slideOne(): void {
    const minGap = 0;
    if (parseInt(this.sliderTwo.value) - parseInt(this.sliderOne.value) <= minGap) {
      this.sliderOne.value = parseInt(this.sliderTwo.value) - minGap + '';
    }
    this.displayValueOne.textContent = this.sliderOne.value;
    this.fillColor();
  }

  private slideTwo(): void {
    const minGap = 0;
    if (parseInt(this.sliderTwo.value) - parseInt(this.sliderOne.value) <= minGap) {
      this.sliderTwo.value = parseInt(this.sliderOne.value) + minGap + '';
    }
    this.displayValueTwo.textContent = this.sliderTwo.value;
    this.fillColor();
  }

  private fillColor(): void {
    const sliderMaxValue: string = this.sliderOne.max;
    const percent1 = (+this.sliderOne.value / +sliderMaxValue) * 100;
    const percent2 = (+this.sliderTwo.value / +sliderMaxValue) * 100;
    this.sliderTrack.style.background = `linear-gradient(to right, #f1f1f2 ${percent1}%, #fd2 ${percent1}%,  #fd2 ${percent2}%, #f1f1f2 ${percent2}%)`;
  }
}

export default FilterRange;
