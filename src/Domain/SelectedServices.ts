import { ServiceType } from "./model";

export class SelectedServices {
    private serviceCollection: ServiceType[]

    constructor(selectedServices: ServiceType[]) {
        this.serviceCollection = selectedServices;
    }

    public GetCollection() {
        return this.serviceCollection.map(service => service);
    }

    public Add(serviceToAdd: ServiceType) {
        this.serviceCollection = Array.from(new Set([...this.serviceCollection, serviceToAdd]));
        this.removeUnnecessaryServices();
        return this;
    }

    public Remove(serviceToRemove: ServiceType) {
        this.serviceCollection = this.serviceCollection.filter(service => service != serviceToRemove);
        this.removeUnnecessaryServices();
        return this;
    }

    private removeUnnecessaryServices() {
        this.provideRemoveUnnecessaryServiceFuncs()
            .forEach(removeMethod => {
                this.serviceCollection = removeMethod(this.serviceCollection);
            });
    }

    private provideRemoveUnnecessaryServiceFuncs() {
        return [
            this.removeUnnecessaryBlurayFunc,
            this.removeUnnecessaryTwoDayEventFunc
        ];
    }

    private removeUnnecessaryTwoDayEventFunc(distinctServices: ServiceType[]): ServiceType[] {
        if (distinctServices.includes("TwoDayEvent") &&
            !(distinctServices.includes("VideoRecording") || distinctServices.includes("Photography"))) {
            return distinctServices.filter(service => service != "TwoDayEvent");
        }
        return distinctServices;
    }

    private removeUnnecessaryBlurayFunc(distinctServices: ServiceType[]): ServiceType[] {
        if (distinctServices.includes("BlurayPackage") && !distinctServices.includes("VideoRecording")) {
            return distinctServices.filter(service => service != "BlurayPackage");
        }
        return distinctServices;
    }
}

