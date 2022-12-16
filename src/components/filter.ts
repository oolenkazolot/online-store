import { IProducts, IFilterRange } from '../types/index';
import Products from '../utils/products';
import FilterRange from './filter-range';

class Filter {
  private products: IProducts;
  private filterRange: IFilterRange;
  constructor() {
    this.products = new Products();
    this.filterRange = new FilterRange();
  }

  public drawFilter(): HTMLElement {
    const filterElement: HTMLElement = document.createElement('aside');
    filterElement.classList.add('filter');
    const filterTitle: HTMLElement = document.createElement('h2');
    filterTitle.classList.add('filter__title');
    filterTitle.textContent = 'Filter';
    const filterWrap = this.drawFilterWrap();
    filterElement.append(filterTitle, filterWrap);
    return filterElement;
  }

  private drawFilterWrap(): HTMLElement {
    const filterWrap: HTMLElement = document.createElement('div');
    filterWrap.classList.add('filter__wrap');
    const blockCategories: HTMLElement = this.drawFilterBlockCategories();
    const blockBrands: HTMLElement = this.drawFilterBlockBrands();
    const blockPrice: HTMLElement = this.drawFilterBlockPrice();
    filterWrap.append(blockCategories, blockBrands, blockPrice);
    return filterWrap;
  }

  private drawFilterBlockCategories(): HTMLElement {
    const block: HTMLElement = document.createElement('div');
    block.classList.add('filter-block');
    const title: HTMLElement = document.createElement('h3');
    title.classList.add('filter-block__title');
    title.textContent = 'Category';
    const obj: Record<string, number> = this.products.getCategoriesObject();
    const blockItems = this.drawFilterBlockItems(obj);
    block.append(title, blockItems);
    return block;
  }

  private drawFilterBlockItems(obj: Record<string, number>): HTMLElement {
    const blockItems: HTMLElement = document.createElement('div');
    blockItems.classList.add('filter-block__items');
    for (const key in obj) {
      const item: HTMLElement = document.createElement('div');
      item.classList.add('filter-block__item');
      const label: HTMLElement = document.createElement('label');
      label.classList.add('filter-block__checkbox');
      const input: HTMLElement = document.createElement('input');
      input.classList.add('filter-block__input');
      input.setAttribute('type', 'checkbox');
      const customCheckbox: HTMLElement = document.createElement('span');
      customCheckbox.classList.add('filter-block__custom-checkbox');
      const span: HTMLElement = document.createElement('span');
      span.classList.add('filter-block__text');
      span.textContent = key;
      label.append(input, customCheckbox, span);
      const count: HTMLElement = document.createElement('span');
      count.classList.add('filter-block__count');
      count.textContent = '(' + obj[key] + '/' + obj[key] + ')';
      item.append(label, count);
      blockItems.append(item);
    }
    return blockItems;
  }

  private drawFilterBlockBrands(): HTMLElement {
    const block: HTMLElement = document.createElement('div');
    block.classList.add('filter-block');
    const title: HTMLElement = document.createElement('h3');
    title.classList.add('filter-block__title');
    title.textContent = 'Brand';
    const obj: Record<string, number> = this.products.getBrandsObject();
    const blockItems = this.drawFilterBlockItems(obj);
    block.append(title, blockItems);
    return block;
  }

  private drawFilterBlockPrice(): HTMLElement {
    const block: HTMLElement = document.createElement('div');
    block.classList.add('filter-block');
    const title: HTMLElement = document.createElement('h3');
    title.classList.add('filter-block__title');
    title.textContent = 'Price';
    const rangeFilter: HTMLElement = this.filterRange.drawFilterRange();
    const filterValues: HTMLElement = this.filterRange.drawFilterValues();
    block.append(title, filterValues, rangeFilter);
    return block;
  }
}

export default Filter;
