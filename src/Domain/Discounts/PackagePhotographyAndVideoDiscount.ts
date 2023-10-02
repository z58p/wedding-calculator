import { arrayHelper } from "../../Utils/arrayHelper";
import { BasePriceList } from "../PriceLists/BasePriceList";
import { ServiceType } from "../model";
import { IDiscountInfo } from "./IDiscountInfo";


export class PackagePhotographyAndVideoDiscount implements IDiscountInfo {
    public readonly usedForServices: ServiceType[];
    public readonly discountPrice: number;
    public isConditionsMatch(selectedServices: ServiceType[]): boolean {
        return arrayHelper.containAll(selectedServices, ["Photography", "VideoRecording"]);
    }

    constructor(basePriceList: BasePriceList, priceAfterDiscount: number) {
        this.usedForServices = ["Photography", "VideoRecording"];
        this.discountPrice = this.calculateDiscount(basePriceList, priceAfterDiscount, "Photography", "VideoRecording");
    }

    private calculateDiscount(basePriceList: BasePriceList, priceAfterDiscount: number, ...discountServiceType: ServiceType[]) {
        const basePriceForDiscountServiceType = arrayHelper.sum(...discountServiceType.map(serviceType => basePriceList.priceFor(serviceType)));
        return basePriceForDiscountServiceType - priceAfterDiscount;
    }
}
