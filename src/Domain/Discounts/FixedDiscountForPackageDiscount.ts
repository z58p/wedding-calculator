import { SelectedServices } from "../SelectedServices";
import { ServiceType } from "../model";
import { IDiscountInfo } from "./IDiscountInfo";


export class FixedDiscountForPackageDiscount implements IDiscountInfo {
    public readonly usedForServices: SelectedServices;
    public readonly discountPrice: number;
    public isConditionsMatch(selectedServices: SelectedServices): boolean {
        return selectedServices.Contain(this.usedForServices);
    }

    constructor(fixedDiscount: number, ...packageItems: ServiceType[]) {
        this.usedForServices = new SelectedServices(packageItems);
        this.discountPrice = fixedDiscount;
    }
}
