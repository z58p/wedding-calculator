import { ServiceType } from "../model";

export interface IDiscountInfo {
    isConditionsMatch(selectedServices: ServiceType[]): boolean;
    usedForServices: ServiceType[];
    discountPrice: number;
}
