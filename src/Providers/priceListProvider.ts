import { ServiceYear } from "..";
import { PriceListWithDiscount, emptyPriceListWithDiscount } from "../Domain/PriceListWithDiscount";
import { priceLists } from "./priceListsRepository";

export const getBasePiceListForServiceYear = (serviceYear: ServiceYear): PriceListWithDiscount => {
    return priceLists.find(priceList => priceList.serviceYear == serviceYear)?.priceList ?? emptyPriceListWithDiscount;
}