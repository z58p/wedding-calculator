import { ServiceType } from "..";
import { BasePriceList } from "../Domain/BasePriceList";
import { PriceListWithDiscount } from "../Domain/PriceListWithDiscount";
import { arrayHelper } from "../Utils/arrayHelper";
import { IDiscountInfo } from "./priceListsRepository";

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
        packagePhotographyAndVideoDiscount(basePriceList, 2200),
        packageWeddingSessionAndPhotographyOrVideoDiscount(),
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
        packagePhotographyAndVideoDiscount(basePriceList, 2300),
        packageWeddingSessionAndPhotographyOrVideoDiscount(),
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

    const freeWeddingSessionWithPhotography =
        {
            usedForServices: ["Photography", "WeddingSession"],
            isConditionsMatch: (selectedTypes: ServiceType[]) => {
                return arrayHelper.containAll(selectedTypes, ["Photography", "WeddingSession"]);
            },
            discountPrice: basePriceList.priceFor("WeddingSession")
        } as IDiscountInfo

    const discounts = [
        packagePhotographyAndVideoDiscount(basePriceList, 2500),
        packageWeddingSessionAndPhotographyOrVideoDiscount(),
        freeWeddingSessionWithPhotography
    ]
    return new PriceListWithDiscount(basePriceList, discounts);
}

function packagePhotographyAndVideoDiscount(basePriceList: BasePriceList, finalPrice: number) {
    return {
        usedForServices: ["Photography", "VideoRecording"],
        isConditionsMatch: (selectedTypes: ServiceType[]) => {
            return arrayHelper.containAll(selectedTypes, ["Photography", "VideoRecording"]);
        },
        discountPrice: calculateDiscountForConstPriceAfterDiscount(basePriceList, finalPrice, "Photography", "VideoRecording")
    } as Required<IDiscountInfo>;
}

function packageWeddingSessionAndPhotographyOrVideoDiscount() {
    return {
        usedForServices: ["WeddingSession"],
        isConditionsMatch: (selectedTypes: ServiceType[]) => {
            return arrayHelper.containAll(selectedTypes, ["VideoRecording", "WeddingSession"]) ||
                arrayHelper.containAll(selectedTypes, ["Photography", "WeddingSession"]);
        },
        discountPrice: 300
    } as Required<IDiscountInfo>;
}

function calculateDiscountForConstPriceAfterDiscount(basePriceList: BasePriceList, priceAfterDiscount: number, ...discountServiceType: ServiceType[]) {
    const basePriceForDiscountServiceType =
        arrayHelper.sum(...discountServiceType.map(serviceType => basePriceList.priceFor(serviceType)));
    return basePriceForDiscountServiceType - priceAfterDiscount;
}

