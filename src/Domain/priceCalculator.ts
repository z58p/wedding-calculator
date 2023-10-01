import { ServiceType } from "..";
import { IDiscountInfo } from "../Providers/priceListsRepository";
import { arrayHelper } from "../Utils/arrayHelper";
import { PriceListWithDiscount } from "./PriceListWithDiscount";
import { removeRedundantDiscount } from "./Services/removeRedundandDiscountService";

export interface ICalculateResult {
    basePrice: number,
    finalPrice: number
}

export const calculate = (priceList: PriceListWithDiscount, selectedServices: ServiceType[]): ICalculateResult => {
    if (!selectedServices) {
        return { basePrice: 0, finalPrice: 0 }
    }

    const basePrice = calculateBasePrice(selectedServices, priceList);
    const discount = calculateDiscount(priceList, selectedServices);

    return {
        basePrice: basePrice,
        finalPrice: basePrice - discount
    };
}

function calculateBasePrice(selectedServices: ServiceType[], priceList: PriceListWithDiscount) {
    return selectedServices ?
        arrayHelper.sum(...selectedServices.map(service => priceList.basePriceList.priceFor(service))) :
        0;
}

function calculateDiscount(priceList: PriceListWithDiscount, selectedServices: ServiceType[]) {
    let finalDiscountInfos = filterDiscountsWithConditionsMatch(priceList, selectedServices);
    finalDiscountInfos = removeRedundantDiscount(finalDiscountInfos);
    return sumDiscountPriceFromAllDiscountInfos(finalDiscountInfos);
}

function filterDiscountsWithConditionsMatch(priceList: PriceListWithDiscount, selectedServices: ServiceType[]) {
    return priceList.discounts.filter(discount => discount.isConditionsMatch(selectedServices));
}

function sumDiscountPriceFromAllDiscountInfos(finalDiscountInfos: IDiscountInfo[]) {
    return arrayHelper.sum(...finalDiscountInfos.map(discount => discount.discountPrice));
}





