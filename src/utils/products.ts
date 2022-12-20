import { IProduct } from "../types/index";
import productsData from "./products-data";

class Products {
  public getCategories(): string[] {
    return productsData.products.reduce(
      (accumulator: string[], currentValue: IProduct) => {
        if (!accumulator.includes(currentValue.category)) {
          accumulator.push(currentValue.category);
        }
        return accumulator;
      },
      []
    );
  }

  public getBrands(): string[] {
    return productsData.products.reduce(
      (accumulator: string[], currentValue: IProduct) => {
        if (!accumulator.includes(currentValue.brand)) {
          accumulator.push(currentValue.brand);
        }
        return accumulator;
      },
      []
    );
  }

  public getCategoriesObject(): Record<string, number> {
    return productsData.products.reduce(
      (
        accumulator: Record<string, number>,
        currentValue: IProduct
      ): Record<string, number> => {
        if (!accumulator[currentValue.category]) {
          accumulator[currentValue.category] = 1;
        } else {
          accumulator[currentValue.category] += 1;
        }
        return accumulator;
      },
      {}
    );
  }

  public getBrandsObject(): Record<string, number> {
    return productsData.products.reduce(
      (
        accumulator: Record<string, number>,
        currentValue: IProduct
      ): Record<string, number> => {
        if (!accumulator[currentValue.brand]) {
          accumulator[currentValue.brand] = 1;
        } else {
          accumulator[currentValue.brand] += 1;
        }
        return accumulator;
      },
      {}
    );
  }

  public getProducts(): IProduct[] {
    return productsData.products;
  }
}

export default Products;
