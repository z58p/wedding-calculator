
import { IDiscountInfo } from "../Providers/priceListsRepository";
import { BasePriceList, emptyBasePriceList } from "./BasePriceList";

export class PriceListWithDiscount {
  public readonly basePriceList: Readonly<BasePriceList>;
  public readonly discounts: ReadonlyArray<IDiscountInfo>;

  constructor(basePriceList: BasePriceList, discounts: Required<IDiscountInfo[]>) {
    this.basePriceList = basePriceList;
    this.discounts = discounts;
  }
}

export const emptyPriceListWithDiscount = new PriceListWithDiscount(emptyBasePriceList, []);


