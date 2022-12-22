import LinkNavigation from '../components/links-navigation';
import ProductDetail from '../components/product-detail';
import { ILinkNavigation, IRouter, IProductDetail } from '../types/index';

class ProductPage {
  private linkNavigation: ILinkNavigation;
  private productDetail: IProductDetail;

  public router?: IRouter;
  constructor() {
    this.linkNavigation = new LinkNavigation();
    this.productDetail = new ProductDetail();
  }

  public draw(id: string | undefined): void {
    const mainElement: HTMLElement | null = document.querySelector('main');

    if (!mainElement) {
      return;
    }
    mainElement.textContent = '';
    const productPageElement: HTMLElement = document.createElement('div');
    productPageElement.classList.add('product-page');
    const productPageContainer: HTMLElement = document.createElement('div');
    productPageContainer.classList.add('product-page__container');
    const linksNavigation: HTMLElement = this.linkNavigation.createLinksNavigation(id, this.router);
    const productDetail: HTMLElement = this.productDetail.createProductDetail(id);
    productPageContainer.append(linksNavigation, productDetail);
    productPageElement.append(productPageContainer);
    mainElement.append(productPageElement);
  }
}

export default ProductPage;
