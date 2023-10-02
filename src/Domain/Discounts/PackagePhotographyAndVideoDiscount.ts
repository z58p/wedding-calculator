import { arrayHelper } from "../../Utils/arrayHelper";
import { BasePriceList } from "../PriceLists/BasePriceList";
import { SelectedServices } from "../SelectedServices";
import { ServiceType } from "../model";
import { IDiscountInfo } from "./IDiscountInfo";


export class PackagePhotographyAndVideoDiscount implements IDiscountInfo {
    public readonly usedForServices: SelectedServices;
    public readonly discountPrice: number;
    public isConditionsMatch(selectedServices: SelectedServices): boolean {
        return selectedServices.Contain(this.usedForServices);
    }

    constructor(basePriceList: BasePriceList, priceAfterDiscount: number) {
        this.usedForServices = new SelectedServices(["Photography", "VideoRecording"]);
        this.discountPrice = this.calculateDiscount(basePriceList, priceAfterDiscount, this.usedForServices);
    }

    private calculateDiscount(basePriceList: BasePriceList, priceAfterDiscount: number, selectedServices: SelectedServices) {
        const basePriceForDiscountServiceType = arrayHelper.sum(...selectedServices.GetCollection().map(serviceType => basePriceList.priceFor(serviceType)));
        return basePriceForDiscountServiceType - priceAfterDiscount;
    }
}
