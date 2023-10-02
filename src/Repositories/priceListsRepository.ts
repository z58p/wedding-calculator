import { BasePriceList } from "../Domain/PriceLists/BasePriceList";
import { FreeWeddingSessionWithPhotography } from "../Domain/Discounts/FreeWeddingSessionWithPhotography";
import { PackagePhotographyAndVideoDiscount } from "../Domain/Discounts/PackagePhotographyAndVideoDiscount";
import { PackageWeddingSessionAndPhotographyOrVideoDiscount } from "../Domain/Discounts/PackageWeddingSessionAndPhotographyOrVideoDiscount";
import { PriceListWithDiscount } from "../Domain/PriceLists/PriceListWithDiscount";


export const PreparePriceListWithDiscountFor2020 = () => {
    const basePriceList = new BasePriceList([
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

    const discounts = [
        new PackagePhotographyAndVideoDiscount(basePriceList, 2200),
        new PackageWeddingSessionAndPhotographyOrVideoDiscount(),
    ];

    return new PriceListWithDiscount(basePriceList, discounts);
}

export const PreparePriceListWithDiscountFor2021 = () => {
    const basePriceList = new BasePriceList([
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

    const discounts = [
        new PackagePhotographyAndVideoDiscount(basePriceList, 2300),
        new PackageWeddingSessionAndPhotographyOrVideoDiscount(),
    ]

    return new PriceListWithDiscount(basePriceList, discounts);
}

export const PreparePriceListWithDiscountFor2022 = () => {
    const basePriceList = new BasePriceList([
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

    const discounts = [
        new PackagePhotographyAndVideoDiscount(basePriceList, 2500),
        new PackageWeddingSessionAndPhotographyOrVideoDiscount(),
        new FreeWeddingSessionWithPhotography(basePriceList)
    ]
    return new PriceListWithDiscount(basePriceList, discounts);
}