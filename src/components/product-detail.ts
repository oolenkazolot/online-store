import Products from '../utils/products';
import { IProducts, IProduct } from '../types/index';
import { reverse } from 'dns';

class ProductDetail {
  products: IProducts;
  product?: IProduct;

  constructor() {
    this.products = new Products();
  }

  public createProductDetail(id: string | undefined): HTMLElement {
    this.product = this.products.getProduct(id);
    const productDetail: HTMLElement = document.createElement('section');
    productDetail.classList.add('product-detail');
    const title: HTMLElement = document.createElement('h2');
    title.classList.add('product-detail__title');
    if (this.product) {
      title.textContent = this.product?.title;
    }
    const productData: HTMLElement = this.createProductData();
    productDetail.append(title, productData);
    return productDetail;
  }

  private createProductData(): HTMLElement {
    const productData: HTMLElement = document.createElement('div');
    productData.classList.add('product-data');
    const photosBlock: HTMLElement = this.createPhotosBlock();
    const infoBlock: HTMLElement = this.createInfoBlock();
    const cartBlock: HTMLElement = this.createCartBlock();
    productData.append(photosBlock, infoBlock, cartBlock);
    return productData;
  }

  private createPhotosBlock(): HTMLElement {
    const photosBlock: HTMLElement = document.createElement('div');
    photosBlock.classList.add('product-data__photos');
    const slidesBlock: HTMLElement | undefined = this.createSlidesBlock();
    const grandPhotoBlock: HTMLElement = this.createGrandPhotoBlock();
    if (slidesBlock) {
      photosBlock.append(slidesBlock, grandPhotoBlock);
    }
    return photosBlock;
  }

  private createSlidesBlock(): HTMLElement | undefined {
    const slidesBlock: HTMLElement = document.createElement('div');
    slidesBlock.classList.add('slides');
    const images: string[] | undefined = this.product?.images;
    if (!images?.length) {
      return;
    }
    const imagesSlides: string[] | undefined = images.reverse().slice(0, 3);
    if (!imagesSlides?.length) {
      return;
    }

    const imagesElements = imagesSlides.map((item: string) => {
      const img: HTMLElement = document.createElement('img');
      img.classList.add('slides__img');
      img.setAttribute('src', item);
      img.setAttribute('alt', 'product-img');
      img.addEventListener('click', () => this.showSlidesImg(item));
      return img;
    });

    slidesBlock.append(...imagesElements);
    return slidesBlock;
  }

  private createGrandPhotoBlock(): HTMLElement {
    const grandPhotoBlock: HTMLElement = document.createElement('div');
    grandPhotoBlock.classList.add('grand-photo');
    const img: HTMLElement = document.createElement('img');
    img.classList.add('grand-photo__img');
    if (this.product) {
      img.setAttribute('src', this.product.thumbnail);
    }
    img.setAttribute('alt', 'product-img');
    grandPhotoBlock.append(img);
    return grandPhotoBlock;
  }

  private createInfoBlock(): HTMLElement {
    const infoBlock: HTMLElement = document.createElement('div');
    infoBlock.classList.add('product-data__info');
    const arr: string[] = ['description', 'discount', 'rating', 'stock', 'brand', 'category'];
    const itemsInfo = arr.map((item: string) => {
      const itemInfo = this.createItemInfo(item);
      return itemInfo;
    });
    infoBlock.append(...itemsInfo);
    return infoBlock;
  }

  private createItemInfo(item: string): HTMLElement {
    const itemInfo: HTMLElement = document.createElement('div');
    itemInfo.classList.add('product-data__item');
    const title: HTMLElement = document.createElement('h3');
    title.classList.add('product-data__title');
    title.textContent = item + ':';
    const description: HTMLElement = document.createElement('p');
    description.classList.add('product-data__description');
    if (this.product) {
      description.textContent = this.product[item as keyof IProduct].toString();
    }
    itemInfo.append(title, description);
    return itemInfo;
  }

  private createCartBlock(): HTMLElement {
    const blockCart: HTMLElement = document.createElement('div');
    blockCart.classList.add('product-data__cart');
    const price: HTMLElement = document.createElement('span');
    price.classList.add('product-data__price');
    if (this.product) {
      price.textContent = '€' + this.product.price.toString();
    }
    const buttonsCart = this.createButtonsCart();
    blockCart.append(price, buttonsCart);
    return blockCart;
  }

  private createButtonsCart(): HTMLElement {
    const btnWrap: HTMLElement = document.createElement('div');
    btnWrap.classList.add('product-data__btn-wrap');
    const btnOne: HTMLElement = document.createElement('button');
    btnOne.classList.add('product-data__btn');
    btnOne.classList.add('btn');
    btnOne.textContent = 'Drop from cart';
    const btnTwo: HTMLElement = document.createElement('button');
    btnTwo.classList.add('product-data__btn');
    btnTwo.classList.add('btn');
    btnTwo.textContent = 'Buy now';
    btnWrap.append(btnOne, btnTwo);
    return btnWrap;
  }

  private showSlidesImg(src: string): void {
    const grandPhotoElement: HTMLElement | null = document.querySelector('.grand-photo__img');
    if (grandPhotoElement) {
      grandPhotoElement.setAttribute('src', src);
    }
  }
}
export default ProductDetail;
