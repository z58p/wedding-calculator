import { ICalculateResult } from "./Domain/PriceLists/PriceListWithDiscount";
import { ServiceType, ServiceYear } from "./Domain/model";
import { provideBasePriceListForServiceYear } from "./Providers/priceListProvider";
import { SelectedServices } from "./Domain/SelectedServices";


export const updateSelectedServices = (
    previouslySelectedServices: ServiceType[],
    action: { type: "Select" | "Deselect"; service: ServiceType }
): ServiceType[] => {
    switch (action.type) {
        case 'Select': {
            const selectedServices = new SelectedServices(previouslySelectedServices);
            selectedServices.Add(action.service);
            return selectedServices.Get();
        }
        case 'Deselect': {
            const selectedServices = new SelectedServices(previouslySelectedServices);
            selectedServices.Remove(action.service);
            return selectedServices.Get();
        }
        default:
            throw new Error();
    }
};

export const calculatePrice = (selectedServices: ServiceType[], selectedYear: ServiceYear): ICalculateResult => {
    const priceList = provideBasePriceListForServiceYear(selectedYear);
    return priceList.calculate(selectedServices);
};