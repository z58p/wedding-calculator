import { arrayHelper } from "../Utils/arrayHelper";
import { ServiceType } from "./model";

export interface IPiceListItem {
  serviceType: ServiceType,
  price: number
}

export class BasePriceList {
  private readonly items: IPiceListItem[];

  constructor(items: IPiceListItem[]) {
    this.items = items;
  }

  // todo: ask the business what if the service is not in the price list 
  public priceFor(serviceType: ServiceType): number {
    return this.items.find(x => x.serviceType == serviceType)?.price ?? 0;
  }

  public calculateBasePrice(selectedServices: ServiceType[]): number {
    return selectedServices ?
      arrayHelper.sum(...selectedServices.map(service => this.priceFor(service))) :
      0;
  }
}

export const emptyBasePriceList = new BasePriceList([]);
