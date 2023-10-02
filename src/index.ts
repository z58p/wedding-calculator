import { Calculator, ICalculateResult } from "./Domain/Calculator";
import { ServiceType, ServiceYear } from "./Domain/model";
import { providePriceListForServiceYear } from "./Providers/priceListProvider";
import { SelectedServices } from "./Domain/SelectedServices";
import { provideDiscountListForServiceYear } from "./Providers/discountListProvider";


export const updateSelectedServices = (
    previouslySelectedServices: SelectedServices,
    action: { type: "Select" | "Deselect"; service: ServiceType }
): SelectedServices => {
    switch (action.type) {
        case 'Select': {
            return previouslySelectedServices
                .Add(action.service)
                .Clone();
        }
        case 'Deselect': {
            return previouslySelectedServices
                .Remove(action.service)
                .Clone();
        }
        default:
            throw new Error();
    }
};

export const calculatePrice = (selectedServices: SelectedServices, selectedYear: ServiceYear): ICalculateResult => {
    try {
        const priceList = providePriceListForServiceYear(selectedYear);
        const discountList = provideDiscountListForServiceYear(selectedYear, priceList);
        return new Calculator(priceList, discountList).calculatePrice(selectedServices);
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