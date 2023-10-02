import { IDiscountInfo } from "../Providers/priceListsRepository";
import { arrayHelper } from "../Utils/arrayHelper";

export function removeRedundantDiscount(finalDiscounts: IDiscountInfo[]) {
    getRemoveDuplicatedDiscountFunc().forEach(removeMethod => {
        finalDiscounts = removeMethod(finalDiscounts);
    });
    return finalDiscounts;
}

function getRemoveDuplicatedDiscountFunc() {
    return [
        removeDuplicatedWeddingSessionDiscount
    ];
}

function removeDuplicatedWeddingSessionDiscount(discounts: IDiscountInfo[]): IDiscountInfo[] {
    const discountsWeddingSession = discounts.filter(discount => discount.usedForServices.includes("WeddingSession"));
    if (discountsWeddingSession.length > 1) {
        const maxDiscount = arrayHelper.max(...discountsWeddingSession.map(discountInfo => discountInfo.discountPrice));
        const discountInfoWithBetterDiscount = discountsWeddingSession.filter((discountInfo) => discountInfo.discountPrice == maxDiscount)[0];

        return [
            ...discounts.filter(discount => !discount.usedForServices.includes("WeddingSession")),
            discountInfoWithBetterDiscount
        ];
    }

    return discounts;
}
