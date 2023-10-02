import { arrayHelper } from "../../Utils/arrayHelper";
import { IDiscountInfo } from "../Discounts/IDiscountInfo";
import { SelectedServices } from "../SelectedServices";


export class DiscountPolitic {
    private discounts: IDiscountInfo[];

    constructor(discounts: IDiscountInfo[]) {
        this.discounts = discounts;
    }

    public GetMatchingDiscounts(selectedServices: SelectedServices) {
        const filteredDiscounts = this.discounts.filter(discount => discount.isConditionsMatch(selectedServices));
        return this.RemoveRedundantDiscount(filteredDiscounts);
    }

    private RemoveRedundantDiscount(discounts: IDiscountInfo[]) {
        this.RemoveDiscountRules()
            .forEach(removeMethod => {
                discounts = removeMethod(discounts);
            });
        return discounts;
    }

    private RemoveDiscountRules() {
        return [
            this.LeaveTheBestDiscountForWeddingSession
        ];
    }

    private LeaveTheBestDiscountForWeddingSession(discounts: IDiscountInfo[]): IDiscountInfo[] {
        var weddingSession = new SelectedServices(["WeddingSession"]);
        const discountsWeddingSession = discounts.filter(discount => discount.usedForServices.Contain(weddingSession));
        if (discountsWeddingSession.length > 1) {
            const maxPriceDiscount = arrayHelper.max(...discountsWeddingSession.map(discountInfo => discountInfo.discountPrice));
            const theBestDiscount = discountsWeddingSession.filter((discountInfo) => discountInfo.discountPrice == maxPriceDiscount)[0];

            return [
                ...discounts.filter(discount => !discount.usedForServices.Contain(weddingSession)),
                theBestDiscount
            ];
        }

        return discounts;
    }
}