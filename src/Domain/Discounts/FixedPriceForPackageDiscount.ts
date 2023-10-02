import { arrayHelper } from "../../Utils/arrayHelper";
import { BasePriceList } from "../BasePriceList";
import { SelectedServices } from "../SelectedServices";
import { ServiceType } from "../model";
import { IDiscountInfo } from "./IDiscountInfo";


export class FixedPriceForPackageDiscount implements IDiscountInfo {
    public readonly usedForServices: SelectedServices;
    public readonly discountPrice: number;
    public isConditionsMatch(selectedServices: SelectedServices): boolean {
        return selectedServices.Contain(this.usedForServices);
    }

    constructor(basePriceList: BasePriceList, fixedPrice: number, ...packageItems: ServiceType[]) {
        this.usedForServices = new SelectedServices(packageItems);
        this.discountPrice = this.calculateDiscount(basePriceList, fixedPrice, this.usedForServices);
    }

    private calculateDiscount(basePriceList: BasePriceList, priceAfterDiscount: number, selectedServices: SelectedServices) {
        const basePriceForDiscountServiceType = arrayHelper.sum(...selectedServices.GetCollection().map(serviceType => basePriceList.priceFor(serviceType)));
        return basePriceForDiscountServiceType - priceAfterDiscount;
    }
}
