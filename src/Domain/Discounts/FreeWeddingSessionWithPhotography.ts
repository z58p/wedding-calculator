import { arrayHelper } from "../../Utils/arrayHelper";
import { BasePriceList } from "../PriceLists/BasePriceList";
import { SelectedServices } from "../SelectedServices";
import { IDiscountInfo } from "./IDiscountInfo";


export class FreeWeddingSessionWithPhotography implements IDiscountInfo {
    public readonly usedForServices: SelectedServices;
    public readonly discountPrice: number;
    public isConditionsMatch(selectedServices: SelectedServices): boolean {
        return selectedServices.Contain(this.usedForServices);
    }

    constructor(basePriceList: BasePriceList) {
        this.usedForServices = new SelectedServices(["Photography", "WeddingSession"]);
        this.discountPrice = basePriceList.priceFor("WeddingSession");
    }
}
