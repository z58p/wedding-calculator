import { arrayHelper } from "../../Utils/arrayHelper";
import { SelectedServices } from "../SelectedServices";
import { IDiscountInfo } from "./IDiscountInfo";


export class PackageWeddingSessionAndPhotographyOrVideoDiscount implements IDiscountInfo {
    public readonly usedForServices: SelectedServices;
    public readonly discountPrice: number;
    public isConditionsMatch(selectedServices: SelectedServices): boolean {
        return selectedServices.Contain(new SelectedServices(["Photography", "WeddingSession"])) ||
            selectedServices.Contain(new SelectedServices(["VideoRecording", "WeddingSession"]));
    }

    constructor() {
        this.usedForServices = new SelectedServices(["WeddingSession"]);
        this.discountPrice = 300;
    }
}
