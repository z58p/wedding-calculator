import { FreeServiceForPackage } from "../Domain/Discounts/FreeServiceForPackage";
import { FixedPriceForPackage } from "../Domain/Discounts/FixedPriceForPackage";
import { FixedDiscountForPackage } from "../Domain/Discounts/FixedDiscountForPackage";
import { BasePriceList } from "../Domain/BasePriceList";
import { ServiceYear } from "../Domain/model";
import { DiscountList } from "../Domain/DiscountList";


export const provideDiscountListForServiceYear = (serviceYear: ServiceYear, basePriceList: BasePriceList) => {
    switch (serviceYear) {
        case 2020: {
            return new DiscountList([
                new FixedPriceForPackage(basePriceList, 2200, "Photography", "VideoRecording"),
                new FixedDiscountForPackage(300, "Photography", "WeddingSession"),
                new FixedDiscountForPackage(300, "VideoRecording", "WeddingSession"),
            ]);
        }
        case 2021: {
            return new DiscountList([
                new FixedPriceForPackage(basePriceList, 2300, "Photography", "VideoRecording"),
                new FixedDiscountForPackage(300, "Photography", "WeddingSession"),
                new FixedDiscountForPackage(300, "VideoRecording", "WeddingSession"),
            ]);
        }
        case 2022: {
            return new DiscountList([
                new FixedPriceForPackage(basePriceList, 2500, "Photography", "VideoRecording"),
                new FixedDiscountForPackage(300, "Photography", "WeddingSession"),
                new FixedDiscountForPackage(300, "VideoRecording", "WeddingSession"),
                new FreeServiceForPackage(basePriceList, "WeddingSession", "Photography", "WeddingSession")
            ]);
        }
        default: {
            return new DiscountList([]);
        }
    }
};
