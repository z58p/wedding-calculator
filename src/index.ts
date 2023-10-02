
import { getBasePiceListForServiceYear } from "./Providers/priceListProvider";
import { ICalculateResult, calculate } from "./Services/priceCalculatorService";
import { removeUnnecessaryServices } from "./Services/removeUnnecessaryServiceFuncService";

export type ServiceYear = 2020 | 2021 | 2022;
export type ServiceType = "Photography" | "VideoRecording" | "BlurayPackage" | "TwoDayEvent" | "WeddingSession";

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
    const priceList = getBasePiceListForServiceYear(selectedYear);
    return calculate(priceList, selectedServices);
};

const selectService = (previouslySelectedServices: ServiceType[], selectedService: ServiceType): ServiceType[] => {
    const distinctServices = Array.from(new Set([...previouslySelectedServices, selectedService]));
    return removeUnnecessaryServices(distinctServices);
}

const deselectService = (previouslySelectedServices: ServiceType[], deselectedService: ServiceType): ServiceType[] => {
    const servicesAfterDeselect = previouslySelectedServices.filter(service => service != deselectedService);
    return removeUnnecessaryServices(servicesAfterDeselect);
}



