import { IProducts, IProduct, IRouter } from '../types/index';
import Products from '../utils/products';

class LinkNavigation {
  private products: IProducts;

  constructor() {
    this.products = new Products();
  }

  public createLinksNavigation(id: string | undefined, router?: IRouter): HTMLElement {
    const linksNavigation: HTMLElement = document.createElement('section');
    linksNavigation.classList.add('links-navigation');
    const link: HTMLElement = document.createElement('a');
    link.classList.add('links-navigation__link');
    link.setAttribute('href', '/');
    link.textContent = 'STORE';
    link.addEventListener('click', (e) => {
      e.preventDefault();
      router?.navigate('');
    });
    linksNavigation.append(link);
    const product: IProduct | undefined = this.products.getProduct(id);

    const arr = [product?.category, product?.brand, product?.title];
    for (let i = 0; i < arr.length; i++) {
      const span: HTMLElement = document.createElement('span');
      span.textContent = '>>';
      span.classList.add('links-navigation__arrow');
      const link = this.createLink(arr[i]);
      linksNavigation.append(span, link);
    }
    return linksNavigation;
  }

  private createLink(item: string | undefined): HTMLElement {
    const link: HTMLElement = document.createElement('a');
    link.classList.add('links-navigation__link');
    if (item) {
      link.textContent = item;
    }
    return link;
  }
}

export default LinkNavigation;
