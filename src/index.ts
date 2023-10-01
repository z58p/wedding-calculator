
import { getBasePiceListForServiceYear } from "./Providers/priceListProvider";
import { ICalculateResult, calculate } from "./Domain/priceCalculator";
import { provideRemoveUnnecessaryServiceFuncs as provideRemoveUnnecessaryFuncs } from "./Providers/removeUnnecessaryServiceFuncProvider";

export type ServiceYear = 2020 | 2021 | 2022;
export type ServiceType = "Photography" | "VideoRecording" | "BlurayPackage" | "TwoDayEvent" | "WeddingSession";

export const updateSelectedServices = (
    previouslySelectedServices: ServiceType[],
    action: { type: "Select" | "Deselect"; service: ServiceType }
): ServiceType[] => {
    switch (action.type) {
        case 'Select':
            return selectAction(previouslySelectedServices, action.service);
        case 'Deselect':
            return deselectAction(previouslySelectedServices, action.service);
        default:
            throw new Error();
    }
};

export const calculatePrice = (selectedServices: ServiceType[], selectedYear: ServiceYear): ICalculateResult => {
    const priceList = getBasePiceListForServiceYear(selectedYear);
    return calculate(priceList, selectedServices);
};

const selectAction = (previouslySelectedServices: ServiceType[], selectedService: ServiceType): ServiceType[] => {
    const distinctServices = Array.from(new Set([...previouslySelectedServices, selectedService]));
    return removeUnnecessaryServices(distinctServices);
}

const deselectAction = (previouslySelectedServices: ServiceType[], deselectedService: ServiceType): ServiceType[] => {
    const servicesAfterDeselect = previouslySelectedServices.filter(service => service != deselectedService);
    return removeUnnecessaryServices(servicesAfterDeselect);
}

const removeUnnecessaryServices = (distinctServices: ServiceType[]) => {
    const removeUnnecessaryFuncs = provideRemoveUnnecessaryFuncs()
    let result = distinctServices.map(service => service);
    removeUnnecessaryFuncs.forEach(removeMethod => {
        result = removeMethod(result);
    });

    return result;
}

