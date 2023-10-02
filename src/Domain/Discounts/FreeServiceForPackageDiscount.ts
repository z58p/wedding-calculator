import { BasePriceList } from "../BasePriceList";
import { SelectedServices } from "../SelectedServices";
import { ServiceType } from "../model";
import { IDiscountInfo } from "./IDiscountInfo";


export class FreeServiceForPackageDiscount implements IDiscountInfo {
    public readonly usedForServices: SelectedServices;
    public readonly discountPrice: number;
    public isConditionsMatch(selectedServices: SelectedServices): boolean {
        return selectedServices.Contain(this.usedForServices);
    }

    constructor(basePriceList: BasePriceList, freeService: ServiceType, ...packageItems: ServiceType[]) {
        this.usedForServices = new SelectedServices(packageItems);
        this.discountPrice = basePriceList.priceFor(freeService);
    }
}