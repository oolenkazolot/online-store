export class TopHeader {
  public header = document.querySelector('header') as HTMLElement;
  public createElement(element: string, myClass: string, parentElement?: HTMLElement): HTMLElement {
    const newElem = document.createElement(element);
    newElem.classList.add(myClass);
    if (parentElement) {
      parentElement.append(newElem);
    }
    return newElem;
  }

  public createContainers(contClass: string, firstElClass: string, secElement: string, secElClass: string, secElContent: string, firstElContent?: string): HTMLElement {
    const newElem = this.createElement('div', contClass);
    const firstEl = this.createElement('span', firstElClass, newElem);
    this.createElement(secElement, secElClass, newElem).innerHTML = secElContent;
    if (firstElContent) {
      firstEl.innerHTML = firstElContent;
    }
    return newElem;
  }

  public drawElements(): void {
    const headerTop = this.createElement('div', 'header-top', this.header);
    const headerTopWrapper = this.createElement('div', 'header-top__wrapper', headerTop);
    const headerTopContainer = this.createElement('div', 'header-top__container', headerTopWrapper);
    const mobileContainer = this.createContainers('header-top__mobile-container', 'header-top__mobile-icon', 'span', 'header-top__mobile-number', '(+48) 523-11-00');

    const emailContainer = this.createContainers('header-top__email-container', 'header-top__email-icon', 'span', 'header-top__email', 'Online_shop@gmail.com');

    const locationContainer = this.createContainers('header-top__location-container', 'header-top__location-icon', 'span', 'header-top__location', 'Our location');

    const signInContainer = this.createContainers('header-top__signIn-container', 'header-top__signIn-icon', 'button', 'header-top__signIn-button', 'Sign In');

    headerTopContainer.append(mobileContainer, emailContainer);
    headerTopContainer.append(locationContainer, signInContainer);
  }
}

export class BottomHeader extends TopHeader {
  public drawElements(): void {
    const headerBottom = super.createElement('div', 'header-bottom', this.header);
    const bottomWrapper = super.createElement('div', 'header-bottom__wrapper', headerBottom);
    const logoContainer = super.createContainers('header-bottom__logo-container', 'header-bottom__logo', 'h1', 'header-bottom__title', 'Online Store');
    const priceContainer = super.createContainers('header-bottom__price-container', 'header-bottom__cart-total', 'span', 'header-bottom__total-sum', '&#8364 0', 'Cart total');
    bottomWrapper.append(logoContainer, priceContainer);
    const cartContainer = super.createElement('div', 'header-bottom__cart-container', bottomWrapper);
    const Cart = super.createElement('div', 'header-bottom__cart', cartContainer);
    const cartItemsAmount = super.createElement('span', 'header-bottom__items-amount', Cart);
    cartItemsAmount.innerHTML = '0';
  }
}
