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
    try {
        const priceList = providePriceListForServiceYear(selectedYear);
        return priceList.calculate(selectedServices);
    } catch (e) {
        const error = e as Error
        if (error) {
            const errorMessage = {
                message: `error on calculation`,
                innerErrorMessage: error.message,
                selectedYear,
                selectedServices
            };
            throw new Error(JSON.stringify(errorMessage));
        }

        throw e;
    }
};