import { arrayHelper } from "../Utils/arrayHelper";
import { IDiscountInfo } from "./Discounts/IDiscountInfo";
import { DiscountPolitic } from "./Politics/DiscountPolitic";
import { SelectedServices } from "./SelectedServices";


export class DiscountList {
  private discounts: IDiscountInfo[];

  constructor(discounts: IDiscountInfo[]) {
    this.discounts = discounts;
  }

  public calculateDiscount(selectedServices: SelectedServices) {
    const matchingDiscounts = new DiscountPolitic(this.discounts)
      .GetMatchingDiscounts(selectedServices);
    return this.SumDiscounts(matchingDiscounts);
  }

  private SumDiscounts(finalDiscountInfos: IDiscountInfo[]) {
    return arrayHelper.sum(...finalDiscountInfos.map(discount => discount.discountPrice));
  }
}