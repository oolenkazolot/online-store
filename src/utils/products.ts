import { IProduct } from '../types/index';
import productsData from './products-data';

class Products {
  public getCategories(): string[] {
    return productsData.products.reduce((accumulator: string[], currentValue: IProduct) => {
      if (!accumulator.includes(currentValue.category)) {
        accumulator.push(currentValue.category);
      }
      return accumulator;
    }, []);
  }

  public getBrands(): string[] {
    return productsData.products.reduce((accumulator: string[], currentValue: IProduct) => {
      if (!accumulator.includes(currentValue.brand)) {
        accumulator.push(currentValue.brand);
      }
      return accumulator;
    }, []);
  }

  public getCategoriesObject(): Record<string, number> {
    return productsData.products.reduce((accumulator: Record<string, number>, currentValue: IProduct): Record<string, number> => {
      if (!accumulator[currentValue.category]) {
        accumulator[currentValue.category] = 1;
      } else {
        accumulator[currentValue.category] += 1;
      }
      return accumulator;
    }, {});
  }

  public getBrandsObject(): Record<string, number> {
    return productsData.products.reduce((accumulator: Record<string, number>, currentValue: IProduct): Record<string, number> => {
      if (!accumulator[currentValue.brand]) {
        accumulator[currentValue.brand] = 1;
      } else {
        accumulator[currentValue.brand] += 1;
      }
      return accumulator;
    }, {});
  }

  public getProduct(id: string | undefined): IProduct | undefined {
    const product = productsData.products.find((element) => {
      const numId = Number(id);
      if (id && element.id === numId) {
        return element;
      }
    });
    return product;
  }

  public getMinMaxPrice(): string[] {
    const arr: number[] = [];
    for (let i = 0; i < productsData.products.length; i++) {
      arr.push(productsData.products[i].price);
    }
    const min: string = Math.min.apply(null, arr).toString();
    const max: string = Math.max.apply(null, arr).toString();
    return [min, max];
  }

  public getMinMaxStock(): string[] {
    const arr: number[] = [];
    for (let i = 0; i < productsData.products.length; i++) {
      arr.push(productsData.products[i].stock);
    }
    const min: string = Math.min.apply(null, arr).toString();
    const max: string = Math.max.apply(null, arr).toString();
    return [min, max];
  }

  public getProductsFilters(): IProduct[] {
    const url = new URL(window.location.href);
    const urlParametersCategory: string[] = url.searchParams.getAll('category');
    const urlParametersBrand: string[] = url.searchParams.getAll('brand');
    const urlParametersPrice: string | null = url.searchParams.get('price');
    const urlParametersStock: string | null = url.searchParams.get('stock');
    const minMaxPrice: string[] | null = urlParametersPrice ? urlParametersPrice.split(',') : null;
    const minMaxStock: string[] | null = urlParametersStock ? urlParametersStock.split(',') : null;

    const products: IProduct[] = productsData.products.filter((element) => {
      if (urlParametersCategory.length && !urlParametersCategory.includes(element.category)) {
        return false;
      }
      if (urlParametersBrand.length && !urlParametersBrand.includes(element.brand)) {
        return false;
      }
      if (minMaxPrice && (element.price < Number(minMaxPrice[0]) || element.price > Number(minMaxPrice[1]))) {
        return false;
      }
      if (minMaxStock && (element.stock < Number(minMaxStock[0]) || element.stock > Number(minMaxStock[1]))) {
        return false;
      }

      return true;
    });

    return products;
  }
}

export default Products;
