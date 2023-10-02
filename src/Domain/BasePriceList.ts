import { arrayHelper } from "../Utils/arrayHelper";
import { SelectedServices } from "./SelectedServices";
import { ServiceType } from "./model";


export interface IBasePriceListItem {
  serviceType: ServiceType,
  price: number
}

export class BasePriceList {
  private readonly items: IBasePriceListItem[];

  constructor(items: IBasePriceListItem[]) {
    this.items = items;
  }

  public priceFor(serviceType: ServiceType): number {
    const item = this.items.find(x => x.serviceType == serviceType);
    if (item) {
      return item.price;
    }

    throw new Error(`No base price for ${serviceType} service`);
  }

  public calculateBasePrice(selectedServices: SelectedServices): number {
    return selectedServices ?
      arrayHelper.sum(...selectedServices.GetCollection().map(service => this.priceFor(service))) :
      0;
  }
}
