import { updateSelectedServices, calculatePrice } from ".";
import { SelectedServices } from "./Domain/SelectedServices";
import { ServiceType, ServiceYear } from "./Domain/model";


describe("updateSelectedServices.select", () => {
    test("should select when not selected", () => {
        const result = updateSelectedServices(new SelectedServices([]), { type: "Select", service: "Photography" })
            .GetCollection();
        expect(result).toEqual(["Photography"]);
    });

    test("should not select the same service twice", () => {
        const result = updateSelectedServices(new SelectedServices(["Photography"]), { type: "Select", service: "Photography" })
            .GetCollection();
        expect(result).toEqual(["Photography"]);
    });

    test("should not select related service when main service is not selected", () => {
        const result = updateSelectedServices(new SelectedServices(["WeddingSession"]), { type: "Select", service: "BlurayPackage" });
        expect(result.GetCollection()).toEqual(["WeddingSession"]);
    });

    test("should select related service when main service is selected", () => {
        const result = updateSelectedServices(new SelectedServices(["WeddingSession", "VideoRecording"]), {
            type: "Select",
            service: "BlurayPackage"
        }).GetCollection();
        expect(result).toEqual(["WeddingSession", "VideoRecording", "BlurayPackage"]);
    });

    test("should select related service when one of main services is selected", () => {
        const result = updateSelectedServices(new SelectedServices(["WeddingSession", "Photography"]), {
            type: "Select",
            service: "TwoDayEvent"
        }).GetCollection();
        expect(result).toEqual(["WeddingSession", "Photography", "TwoDayEvent"]);
    });
});

describe("updateSelectedServices.deselect", () => {
    test("should deselect", () => {
        const result = updateSelectedServices(new SelectedServices(["WeddingSession", "Photography"]), {
            type: "Deselect",
            service: "Photography"
        }).GetCollection();
        expect(result).toEqual(["WeddingSession"]);
    });

    test("should do nothing when service not selected", () => {
        const result = updateSelectedServices(new SelectedServices(["WeddingSession", "Photography"]), {
            type: "Deselect",
            service: "TwoDayEvent"
        }).GetCollection();
        expect(result).toEqual(["WeddingSession", "Photography"]);
    });

    test("should deselect related when last main service deselected", () => {
        const result = updateSelectedServices(new SelectedServices(["WeddingSession", "Photography", "TwoDayEvent"]), {
            type: "Deselect",
            service: "Photography"
        });
        expect(result.GetCollection()).toEqual(["WeddingSession"]);
    });

    test("should not deselect related when at least one main service stays selected", () => {
        const result = updateSelectedServices(new SelectedServices(["WeddingSession", "Photography", "VideoRecording", "TwoDayEvent"]), {
            type: "Deselect",
            service: "Photography"
        }).GetCollection();
        expect(result).toEqual(["WeddingSession", "VideoRecording", "TwoDayEvent"]);
    });
});

describe.each([2020, 2021, 2022] as ServiceYear[])("calculatePrice.zero (%i)", (year: ServiceYear) => {
    test("should be zero with no services selected", () => {
        const result = calculatePrice(new SelectedServices([]), year);
        expect(result).toEqual({ basePrice: 0, finalPrice: 0 });
    });
});

describe.each([
    ["WeddingSession" as ServiceType, 2020 as ServiceYear, 600],
    ["WeddingSession" as ServiceType, 2021 as ServiceYear, 600],
    ["WeddingSession" as ServiceType, 2022 as ServiceYear, 600],
    ["Photography" as ServiceType, 2020 as ServiceYear, 1700],
    ["Photography" as ServiceType, 2021 as ServiceYear, 1800],
    ["Photography" as ServiceType, 2022 as ServiceYear, 1900],
    ["VideoRecording" as ServiceType, 2020 as ServiceYear, 1700],
    ["VideoRecording" as ServiceType, 2021 as ServiceYear, 1800],
    ["VideoRecording" as ServiceType, 2022 as ServiceYear, 1900]
])("calculatePrice.singleService (%s, %i)", (service: ServiceType, year: ServiceYear, expectedPrice) => {
    test("no discount applied", () => {
        const result = calculatePrice(new SelectedServices([service]), year);
        expect(result.basePrice).toBeGreaterThan(0);
        expect(result.finalPrice).toBeGreaterThan(0);
        expect(result.basePrice).toBe(result.finalPrice);
    });

    test("price matches requirements", () => {
        const result = calculatePrice(new SelectedServices([service]), year);
        expect(result).toEqual({ basePrice: expectedPrice, finalPrice: expectedPrice });
    });
});

describe.each([
    [2020 as ServiceYear, 300],
    [2021 as ServiceYear, 300],
    [2022 as ServiceYear, 0]
])("calculatePrice.photographyWithWeddingSessionPrice (%i increase by %i)", (year: ServiceYear, increase) => {
    test("price matches requirements", () => {
        const withoutSession = calculatePrice(new SelectedServices(["Photography"]), year);
        const withSession = calculatePrice(new SelectedServices(["Photography", "WeddingSession"]), year);

        const priceChangeWithSession = withSession.finalPrice - withoutSession.finalPrice;

        expect(withSession.basePrice).toBeGreaterThan(0);
        expect(withSession.finalPrice).toBeGreaterThan(0);
        expect(priceChangeWithSession).toEqual(increase);
    });

    test("discount applied", () => {
        const withoutSession = calculatePrice(new SelectedServices(["Photography"]), year);
        const onlySession = calculatePrice(new SelectedServices(["WeddingSession"]), year);
        const withSession = calculatePrice(new SelectedServices(["Photography", "WeddingSession"]), year);

        const priceWithoutDiscounts = withoutSession.finalPrice + onlySession.finalPrice;

        expect(priceWithoutDiscounts).toBeGreaterThan(withSession.finalPrice);
    });
});

describe.each([
    [2020 as ServiceYear, 300],
    [2021 as ServiceYear, 300],
    [2022 as ServiceYear, 300]
])("calculatePrice.videoRecordingWithWeddingSessionPrice (%i increase by %i)", (year: ServiceYear, increase) => {
    test("price matches requirements", () => {
        const withoutSession = calculatePrice(new SelectedServices(["VideoRecording"]), year);
        const withSession = calculatePrice(new SelectedServices(["VideoRecording", "WeddingSession"]), year);

        const priceChangeWithSession = withSession.finalPrice - withoutSession.finalPrice;

        expect(priceChangeWithSession).toEqual(increase);
    });

    test("discount applied", () => {
        const withoutSession = calculatePrice(new SelectedServices(["VideoRecording"]), year);
        const onlySession = calculatePrice(new SelectedServices(["WeddingSession"]), year);
        const withSession = calculatePrice(new SelectedServices(["VideoRecording", "WeddingSession"]), year);

        const priceWithoutDiscounts = withoutSession.finalPrice + onlySession.finalPrice;

        expect(priceWithoutDiscounts).toBeGreaterThan(withSession.finalPrice);
    });
});

describe.each([
    [2020 as ServiceYear, 500],
    [2021 as ServiceYear, 500],
    [2022 as ServiceYear, 600]
])("calculatePrice.videoRecordingWithPhotographyPrice (%i increase by %i)", (year: ServiceYear, increase) => {
    test("price matches requirements", () => {
        const withoutPhotography = calculatePrice(new SelectedServices(["VideoRecording"]), year);
        const withPhotography = calculatePrice(new SelectedServices(["VideoRecording", "Photography"]), year);

        const priceChangeWithPhotography = withPhotography.finalPrice - withoutPhotography.finalPrice;

        expect(priceChangeWithPhotography).toEqual(increase);
    });

    test("discount applied", () => {
        const withoutPhotography = calculatePrice(new SelectedServices(["VideoRecording"]), year);
        const onlyPhotography = calculatePrice(new SelectedServices(["Photography"]), year);
        const withPhotography = calculatePrice(new SelectedServices(["VideoRecording", "Photography"]), year);

        const priceWithoutDiscounts = withoutPhotography.finalPrice + onlyPhotography.finalPrice;

        expect(priceWithoutDiscounts).toBeGreaterThan(withPhotography.finalPrice);
    });
});

describe.each([
    [2020 as ServiceYear, 300],
    [2021 as ServiceYear, 300],
    [2022 as ServiceYear, 0]
])(
    "calculatePrice.videoRecordingWithPhotographyWithSessionPrice (%i increase by %i)",
    (year: ServiceYear, increase) => {
        test("price matches requirements", () => {
            const withoutSession = calculatePrice(new SelectedServices(["VideoRecording", "Photography"]), year);
            const withSession = calculatePrice(new SelectedServices(["VideoRecording", "Photography", "WeddingSession"]), year);

            const priceChangeWithSession = withSession.finalPrice - withoutSession.finalPrice;

            expect(withSession.basePrice).toBeGreaterThan(0);
            expect(withSession.finalPrice).toBeGreaterThan(0);
            expect(priceChangeWithSession).toEqual(increase);
        });

        test("discount applied", () => {
            const withoutSession = calculatePrice(new SelectedServices(["VideoRecording", "Photography"]), year);
            const onlySession = calculatePrice(new SelectedServices(["WeddingSession"]), year);
            const withSession = calculatePrice(new SelectedServices(["VideoRecording", "Photography", "WeddingSession"]), year);

            const priceWithoutDiscounts = withoutSession.finalPrice + onlySession.finalPrice;

            expect(priceWithoutDiscounts).toBeGreaterThan(withSession.finalPrice);
        });
    }
);
