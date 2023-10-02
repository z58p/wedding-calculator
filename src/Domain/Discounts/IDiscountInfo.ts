import { SelectedServices } from "../SelectedServices";


export interface IDiscountInfo {
    isConditionsMatch(selectedServices: SelectedServices): boolean;
    usedForServices: SelectedServices;
    discountPrice: number;
}
