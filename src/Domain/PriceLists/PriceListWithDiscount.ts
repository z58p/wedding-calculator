import { arrayHelper } from "../../Utils/arrayHelper";
import { IDiscountInfo } from "../Discounts/IDiscountInfo";
import { ServiceType } from "../model";
import { BasePriceList } from "./BasePriceList";


export interface ICalculateResult {
  basePrice: number,
  finalPrice: number
}

export class PriceListWithDiscount {
  private readonly basePriceList: Readonly<BasePriceList>;
  private readonly discounts: ReadonlyArray<IDiscountInfo>;

  constructor(basePriceList: BasePriceList, discounts: Required<IDiscountInfo[]>) {
    this.basePriceList = basePriceList;
    this.discounts = discounts;
  }

  public calculate(selectedServices: ServiceType[]): ICalculateResult {
    if (!selectedServices) {
      return { basePrice: 0, finalPrice: 0 }
    }

    const basePrice = this.basePriceList.calculateBasePrice(selectedServices);
    const discount = this.calculateDiscount(selectedServices);

    return {
      basePrice: basePrice,
      finalPrice: basePrice - discount
    };
  }

  private calculateDiscount(selectedServices: ServiceType[]) {
    let finalDiscountInfos = this.filterDiscountsWithConditionsMatch(selectedServices);
    finalDiscountInfos = this.removeRedundantDiscount(finalDiscountInfos);
    return this.sumDiscountPriceFromAllDiscountInfos(finalDiscountInfos);
  }

  private filterDiscountsWithConditionsMatch(selectedServices: ServiceType[]) {
    return this.discounts.filter(discount => discount.isConditionsMatch(selectedServices));
  }

  private sumDiscountPriceFromAllDiscountInfos(finalDiscountInfos: IDiscountInfo[]) {
    return arrayHelper.sum(...finalDiscountInfos.map(discount => discount.discountPrice));
  }

  private removeRedundantDiscount(finalDiscounts: IDiscountInfo[]) {
    this.getRemoveDuplicatedDiscountFuncs()
      .forEach(removeMethod => {
        finalDiscounts = removeMethod(finalDiscounts);
      });
    return finalDiscounts;
  }

  private getRemoveDuplicatedDiscountFuncs() {
    return [
      this.removeDuplicatedWeddingSessionDiscount
    ];
  }

  private removeDuplicatedWeddingSessionDiscount(discounts: IDiscountInfo[]): IDiscountInfo[] {
    const discountsWeddingSession = discounts.filter(discount => discount.usedForServices.includes("WeddingSession"));
    if (discountsWeddingSession.length > 1) {
      const maxDiscount = arrayHelper.max(...discountsWeddingSession.map(discountInfo => discountInfo.discountPrice));
      const discountInfoWithBetterDiscount = discountsWeddingSession.filter((discountInfo) => discountInfo.discountPrice == maxDiscount)[0];

      return [
        ...discounts.filter(discount => !discount.usedForServices.includes("WeddingSession")),
        discountInfoWithBetterDiscount
      ];
    }

    return discounts;
  }
}