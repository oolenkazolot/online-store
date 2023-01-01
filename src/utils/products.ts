import { IProduct, IProductsAmount } from '../types/index';
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

  public getCategoriesObject(): Record<string, IProductsAmount> {
    const categories = productsData.products.reduce((accumulator: Record<string, IProductsAmount>, currentValue: IProduct): Record<string, IProductsAmount> => {
      if (!accumulator[currentValue.category]) {
        accumulator[currentValue.category] = {
          all: 1,
          filter: 0,
        };
      } else {
        accumulator[currentValue.category].all += 1;
      }
      return accumulator;
    }, {});

    const productsFilters = this.getProductsFilters();
    productsFilters.forEach((element) => {
      categories[element.category].filter += 1;
    });

    return categories;
  }

  public getBrandsObject(): Record<string, IProductsAmount> {
    const brands = productsData.products.reduce((accumulator: Record<string, IProductsAmount>, currentValue: IProduct): Record<string, IProductsAmount> => {
      if (!accumulator[currentValue.brand]) {
        accumulator[currentValue.brand] = {
          all: 1,
          filter: 0,
        };
      } else {
        accumulator[currentValue.brand].all += 1;
      }
      return accumulator;
    }, {});

    const productsFilters = this.getProductsFilters();
    productsFilters.forEach((element) => {
      brands[element.brand].filter += 1;
    });

    return brands;
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
  // получает MinMaxPrice в зависимости от выбранной категории и брэнда

  public getMinMaxPriceUrlParameters(): string[] {
    const arr: number[] = [];
    const products = this.getProductFilterCategoryBrands();

    for (let i = 0; i < products.length; i++) {
      arr.push(products[i].price);
    }
    const min: string = Math.min.apply(null, arr).toString();
    const max: string = Math.max.apply(null, arr).toString();

    return [min, max];
  }

  // получает MinMaxStock в зависимости от выбранной категории и брэнда

  public getMinMaxStockUrlParameters(): string[] {
    const arr: number[] = [];
    const products = this.getProductFilterCategoryBrands();

    for (let i = 0; i < products.length; i++) {
      arr.push(products[i].stock);
    }
    const min: string = Math.min.apply(null, arr).toString();
    const max: string = Math.max.apply(null, arr).toString();

    return [min, max];
  }

  // получает MinMaxPrice общее из всех продуктов

  public getMinMaxPrice(): string[] {
    const arr: number[] = [];
    for (let i = 0; i < productsData.products.length; i++) {
      arr.push(productsData.products[i].price);
    }
    const min: string = Math.min.apply(null, arr).toString();
    const max: string = Math.max.apply(null, arr).toString();
    return [min, max];
  }

  // получает MinMaxStock общее из всех продуктов

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
    const urlParameterPrice: string | null = url.searchParams.get('price');
    const urlParameterStock: string | null = url.searchParams.get('stock');
    const minMaxPrice: string[] | null = urlParameterPrice ? urlParameterPrice.split(',') : null;
    const minMaxStock: string[] | null = urlParameterStock ? urlParameterStock.split(',') : null;

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

  public getProductsFiltersSearch(): IProduct[] {
    const url = new URL(window.location.href);
    let urlParameterSearch: string | null = url.searchParams.get('search');
    if (urlParameterSearch) {
      urlParameterSearch = urlParameterSearch.toLowerCase();
    }

    const productsFilters = this.getProductsFilters();

    const products: IProduct[] = productsFilters.filter((element) => {
      if (
        (urlParameterSearch && element.brand.toLowerCase().indexOf(urlParameterSearch) !== -1) ||
        (urlParameterSearch && element.title.toLowerCase().indexOf(urlParameterSearch) !== -1) ||
        (urlParameterSearch && element.description.toLowerCase().indexOf(urlParameterSearch) !== -1) ||
        (urlParameterSearch && element.price.toString().indexOf(urlParameterSearch) !== -1) ||
        (urlParameterSearch && element.discount.toString().indexOf(urlParameterSearch) !== -1) ||
        (urlParameterSearch && element.rating.toString().indexOf(urlParameterSearch) !== -1) ||
        (urlParameterSearch && element.stock.toString().indexOf(urlParameterSearch) !== -1) ||
        (urlParameterSearch && element.brand.toLowerCase().indexOf(urlParameterSearch) !== -1) ||
        (urlParameterSearch && element.category.toLowerCase().indexOf(urlParameterSearch) !== -1)
      ) {
        return true;
      }

      return false;
    });

    return products;
  }

  private getProductFilterCategoryBrands(): IProduct[] {
    const url = new URL(window.location.href);
    const urlParametersCategory: string[] = url.searchParams.getAll('category');
    const urlParametersBrand: string[] = url.searchParams.getAll('brand');

    const products: IProduct[] = productsData.products.filter((element) => {
      if (urlParametersCategory.length && !urlParametersCategory.includes(element.category)) {
        return false;
      }
      if (urlParametersBrand.length && !urlParametersBrand.includes(element.brand)) {
        return false;
      }

      return true;
    });

    return products;
  }
}

export default Products;
