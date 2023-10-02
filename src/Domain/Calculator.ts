import { SelectedServices } from "./SelectedServices";
import { BasePriceList } from "./BasePriceList";
import { DiscountList } from "./DiscountList";


export interface ICalculateResult {
  basePrice: number,
  finalPrice: number
}

export class Calculator {
  private readonly basePriceList: BasePriceList;
  private readonly discountList: DiscountList;

  constructor(basePriceList: BasePriceList, discounts: DiscountList) {
    this.basePriceList = basePriceList;
    this.discountList = discounts;
  }

  public calculatePrice(selectedServices: SelectedServices): ICalculateResult {
    if (!selectedServices) {
      return { basePrice: 0, finalPrice: 0 }
    }

    const basePrice = this.basePriceList.calculateBasePrice(selectedServices);
    const discount = this.discountList.calculateDiscount(selectedServices);

    return {
      basePrice: basePrice,
      finalPrice: basePrice - discount
    };
  }

}