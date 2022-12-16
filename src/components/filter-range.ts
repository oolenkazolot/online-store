class FilterRange {
  public drawFilterRange(): HTMLElement {
    const rangeFilter: HTMLElement = document.createElement('div');
    rangeFilter.classList.add('filter-range');
    const filterSliderTrack: HTMLElement = document.createElement('div');
    filterSliderTrack.classList.add('filter-range__slider-track');
    const input1: HTMLElement = document.createElement('input');
    input1.classList.add('filter-range__input');
    input1.setAttribute('type', 'range');
    input1.setAttribute('min', '0');
    input1.setAttribute('max', '100');
    input1.setAttribute('value', '30');
    input1.setAttribute('id', 'slider-1');
    input1.addEventListener('input', this.slideOne.bind(this));
    const input2: HTMLElement = document.createElement('input');
    input2.classList.add('filter-range__input');
    input2.setAttribute('type', 'range');
    input2.setAttribute('min', '0');
    input2.setAttribute('max', '100');
    input2.setAttribute('value', '70');
    input2.setAttribute('id', 'slider-2');
    input2.addEventListener('input', this.slideTwo.bind(this));
    rangeFilter.append(filterSliderTrack, input1, input2);
    const slideOne = this.slideOne.bind(this);
    const slideTwo = this.slideTwo.bind(this);
    window.onload = function () {
      slideOne();
      slideTwo();
    };
    return rangeFilter;
  }

  public drawFilterValues(): HTMLElement {
    const filterValues: HTMLElement = document.createElement('div');
    filterValues.classList.add('filter-values');
    const span1: HTMLElement = document.createElement('span');
    span1.setAttribute('id', 'range1');
    span1.textContent = '0';
    const span2: HTMLElement = document.createElement('span');
    span2.textContent = '-';
    const span3: HTMLElement = document.createElement('span');
    span3.setAttribute('id', 'range2');
    span3.textContent = '100';
    filterValues.append(span1, span2, span3);
    return filterValues;
  }

  private slideOne(): void {
    const sliderOne: HTMLInputElement | null = document.getElementById('slider-1') as HTMLInputElement;
    const sliderTwo: HTMLInputElement | null = document.getElementById('slider-2') as HTMLInputElement;
    const minGap = 0;
    const displayValOne: HTMLElement | null = document.getElementById('range1');

    if (!sliderOne || !sliderTwo || !displayValOne) {
      return;
    }

    if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
      sliderOne.value = parseInt(sliderTwo.value) - minGap + '';
    }

    displayValOne.textContent = sliderOne.value;
    this.fillColor();
  }

  private slideTwo(): void {
    const sliderOne: HTMLInputElement | null = document.getElementById('slider-1') as HTMLInputElement;
    const sliderTwo: HTMLInputElement | null = document.getElementById('slider-2') as HTMLInputElement;
    const displayValTwo: HTMLElement | null = document.getElementById('range2');
    const minGap = 0;
    if (!sliderOne || !sliderTwo || !displayValTwo) {
      return;
    }

    if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
      sliderTwo.value = parseInt(sliderOne.value) + minGap + '';
    }

    displayValTwo.textContent = sliderTwo.value;

    this.fillColor();
  }

  private fillColor(): void {
    const sliderOne: HTMLInputElement | null = document.getElementById('slider-1') as HTMLInputElement;
    const sliderTwo: HTMLInputElement | null = document.getElementById('slider-2') as HTMLInputElement;
    const sliderTrack: HTMLElement | null = document.querySelector('.filter-range__slider-track');
    const sliderMaxValue: string = sliderOne.max;
    if (!sliderOne || !sliderTwo || !sliderTrack) {
      return;
    }

    const percent1 = (+sliderOne.value / +sliderMaxValue) * 100;
    const percent2 = (+sliderTwo.value / +sliderMaxValue) * 100;
    sliderTrack.style.background = `linear-gradient(to right, #f1f1f2 ${percent1}%, #fd2 ${percent1}%,  #fd2 ${percent2}%, #f1f1f2 ${percent2}%)`;
  }
}

export default FilterRange;
