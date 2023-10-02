import { BasePriceList } from "../Domain/BasePriceList";
import { ServiceYear } from "../Domain/model";


export const providePriceListForServiceYear = (serviceYear: ServiceYear): BasePriceList => {
    switch (serviceYear) {
        case 2020: {
            return new BasePriceList([
                {
                    serviceType: "Photography",
                    price: 1700
                },
                {
                    serviceType: "VideoRecording",
                    price: 1700
                },
                {
                    serviceType: "WeddingSession",
                    price: 600
                },
                {
                    serviceType: "BlurayPackage",
                    price: 300
                },
                {
                    serviceType: "TwoDayEvent",
                    price: 400
                },
            ]);
        }
        case 2021: {
            return new BasePriceList([
                {
                    serviceType: "Photography",
                    price: 1800
                },
                {
                    serviceType: "VideoRecording",
                    price: 1800
                },
                {
                    serviceType: "WeddingSession",
                    price: 600
                },
                {
                    serviceType: "BlurayPackage",
                    price: 300
                },
                {
                    serviceType: "TwoDayEvent",
                    price: 400
                },
            ]);
        }
        case 2022: {
            return new BasePriceList([
                {
                    serviceType: "Photography",
                    price: 1900
                },
                {
                    serviceType: "VideoRecording",
                    price: 1900
                },
                {
                    serviceType: "WeddingSession",
                    price: 600
                },
                {
                    serviceType: "BlurayPackage",
                    price: 300
                },
                {
                    serviceType: "TwoDayEvent",
                    price: 400
                },
            ]);
        }
        default: {
            throw new Error(`not found PriceListWithDiscount for ${serviceYear}`);
        }
    }
}

