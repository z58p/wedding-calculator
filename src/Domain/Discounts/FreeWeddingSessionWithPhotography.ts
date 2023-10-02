import { arrayHelper } from "../../Utils/arrayHelper";
import { BasePriceList } from "../PriceLists/BasePriceList";
import { ServiceType } from "../model";
import { IDiscountInfo } from "./IDiscountInfo";


export class FreeWeddingSessionWithPhotography implements IDiscountInfo {
    public readonly usedForServices: ServiceType[];
    public readonly discountPrice: number;
    public isConditionsMatch(selectedServices: ServiceType[]): boolean {
        return arrayHelper.containAll(selectedServices, ["Photography", "WeddingSession"]);
    }

    constructor(basePriceList: BasePriceList) {
        this.usedForServices = ["Photography", "WeddingSession"];
        this.discountPrice = basePriceList.priceFor("WeddingSession");
    }
}
