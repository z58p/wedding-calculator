import { FreeServiceForPackageDiscount } from "../Domain/Discounts/FreeServiceForPackageDiscount";
import { FixedPriceForPackageDiscount } from "../Domain/Discounts/FixedPriceForPackageDiscount";
import { FixedDiscountForPackageDiscount } from "../Domain/Discounts/FixedDiscountForPackageDiscount";
import { BasePriceList } from "../Domain/BasePriceList";
import { ServiceYear } from "../Domain/model";
import { DiscountList } from "../Domain/DiscountList";


export const provideDiscountListForServiceYear = (serviceYear: ServiceYear, basePriceList: BasePriceList) => {
    switch (serviceYear) {
        case 2020: {
            return new DiscountList([
                new FixedPriceForPackageDiscount(basePriceList, 2200, "Photography", "VideoRecording"),
                new FixedDiscountForPackageDiscount(300, "Photography", "WeddingSession"),
                new FixedDiscountForPackageDiscount(300, "VideoRecording", "WeddingSession"),
            ]);
        }
        case 2021: {
            return new DiscountList([
                new FixedPriceForPackageDiscount(basePriceList, 2300, "Photography", "VideoRecording"),
                new FixedDiscountForPackageDiscount(300, "Photography", "WeddingSession"),
                new FixedDiscountForPackageDiscount(300, "VideoRecording", "WeddingSession"),
            ]);
        }
        case 2022: {
            return new DiscountList([
                new FixedPriceForPackageDiscount(basePriceList, 2500, "Photography", "VideoRecording"),
                new FixedDiscountForPackageDiscount(300, "Photography", "WeddingSession"),
                new FixedDiscountForPackageDiscount(300, "VideoRecording", "WeddingSession"),
                new FreeServiceForPackageDiscount(basePriceList, "WeddingSession", "Photography", "WeddingSession")
            ]);
        }
        default: {
            return new DiscountList([]);
        }
    }
};
