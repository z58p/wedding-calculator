import { ICalculateResult } from "./Domain/PriceLists/PriceListWithDiscount";
import { ServiceType, ServiceYear } from "./Domain/model";
import { providePriceListForServiceYear } from "./Providers/priceListProvider";
import { SelectedServices } from "./Domain/SelectedServices";


export const updateSelectedServices = (
    previouslySelectedServices: ServiceType[],
    action: { type: "Select" | "Deselect"; service: ServiceType }
): ServiceType[] => {
    switch (action.type) {
        case 'Select': {
            return new SelectedServices(previouslySelectedServices)
                .Add(action.service)
                .GetCollection();
        }
        case 'Deselect': {
            return new SelectedServices(previouslySelectedServices)
                .Remove(action.service)
                .GetCollection();
        }
        default:
            throw new Error();
    }
};

export const calculatePrice = (selectedServices: ServiceType[], selectedYear: ServiceYear): ICalculateResult => {
    const priceList = providePriceListForServiceYear(selectedYear);
    return priceList.calculate(selectedServices);
};