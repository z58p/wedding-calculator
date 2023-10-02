import { PriceListWithDiscount } from "../Domain/PriceLists/PriceListWithDiscount";
import { ServiceYear } from "../Domain/model";
import { PreparePriceListWithDiscountFor2020, PreparePriceListWithDiscountFor2021, PreparePriceListWithDiscountFor2022 } from "../Repositories/priceListsRepository";


export const providePriceListForServiceYear = (serviceYear: ServiceYear): PriceListWithDiscount => {
    switch (serviceYear) {
        case 2020: {
            return PreparePriceListWithDiscountFor2020();
        }
        case 2021: {
            return PreparePriceListWithDiscountFor2021();
        }
        case 2022: {
            return PreparePriceListWithDiscountFor2022();
        }
        default: {
            throw new Error(`not found PriceListWithDiscount for ${serviceYear}`);
        }
    }
}