import { ICalculateResult } from "./Domain/PriceLists/PriceListWithDiscount";
import { ServiceType, ServiceYear } from "./Domain/model";
import { provideBasePiceListForServiceYear } from "./Providers/priceListProvider";
import { removeUnnecessaryServices } from "./Services/removeUnnecessarySelectedServiceService";


export const updateSelectedServices = (
    previouslySelectedServices: ServiceType[],
    action: { type: "Select" | "Deselect"; service: ServiceType }
): ServiceType[] => {
    switch (action.type) {
        case 'Select':
            return selectService(previouslySelectedServices, action.service);
        case 'Deselect':
            return deselectService(previouslySelectedServices, action.service);
        default:
            throw new Error();
    }
};

export const calculatePrice = (selectedServices: ServiceType[], selectedYear: ServiceYear): ICalculateResult => {
    const priceList = provideBasePiceListForServiceYear(selectedYear);
    return priceList.calculate(selectedServices);
};

const selectService = (previouslySelectedServices: ServiceType[], selectedService: ServiceType): ServiceType[] => {
    const distinctServices = Array.from(new Set([...previouslySelectedServices, selectedService]));
    return removeUnnecessaryServices(distinctServices);
}

const deselectService = (previouslySelectedServices: ServiceType[], deselectedService: ServiceType): ServiceType[] => {
    const servicesAfterDeselect = previouslySelectedServices.filter(service => service != deselectedService);
    return removeUnnecessaryServices(servicesAfterDeselect);
}



