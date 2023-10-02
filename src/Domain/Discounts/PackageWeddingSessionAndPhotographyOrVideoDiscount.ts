import { arrayHelper } from "../../Utils/arrayHelper";
import { ServiceType } from "../model";
import { IDiscountInfo } from "./IDiscountInfo";


export class PackageWeddingSessionAndPhotographyOrVideoDiscount implements IDiscountInfo {
    public readonly usedForServices: ServiceType[];
    public readonly discountPrice: number;
    public isConditionsMatch(selectedServices: ServiceType[]): boolean {
        return arrayHelper.containAll(selectedServices, ["Photography", "WeddingSession"]) ||
            arrayHelper.containAll(selectedServices, ["VideoRecording", "WeddingSession"])
    }

    constructor() {
        this.usedForServices = ["WeddingSession"];
        this.discountPrice = 300;
    }
}
