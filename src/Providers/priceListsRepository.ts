import { ServiceType, ServiceYear } from "..";
import { PriceListWithDiscount } from "../Domain/PriceListWithDiscount";
import { PreparePriceListWithDiscountFor2020, PreparePriceListWithDiscountFor2021, PreparePriceListWithDiscountFor2022 } from "./priceListsRepositoryHelper";

export interface IPiceList {
    serviceYear: ServiceYear,
    priceList: PriceListWithDiscount
}

export interface IDiscountInfo {
    isConditionsMatch(serviceTypes: ServiceType[]): boolean;
    usedForServices: ServiceType[];
    discountPrice: number
}

export const priceLists: IPiceList[] = [
    {
        serviceYear: 2020,
        priceList: PreparePriceListWithDiscountFor2020()
    },
    {
        serviceYear: 2021,
        priceList: PreparePriceListWithDiscountFor2021()
    },
    {
        serviceYear: 2022,
        priceList: PreparePriceListWithDiscountFor2022()
    },
];