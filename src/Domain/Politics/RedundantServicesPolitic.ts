import { ServiceType } from "../model";


export class RedundantServicesPolitic {
    private serviceCollection: ServiceType[];
    constructor(serviceCollection: ServiceType[]) {
        this.serviceCollection = serviceCollection;
    }
    public RemoveRedundantServices() {
        this.RemoveRedundantServiceRules()
            .forEach(executeRule => {
                this.serviceCollection = executeRule(this.serviceCollection);
            });

        return this.serviceCollection;
    }

    private RemoveRedundantServiceRules() {
        return [
            this.RemoveUnnecessaryBlurayRule,
            this.RemoveUnnecessaryTwoDayEventRule
        ];
    }

    private RemoveUnnecessaryTwoDayEventRule(distinctServices: ServiceType[]): ServiceType[] {
        if (distinctServices.includes("TwoDayEvent") &&
            !(distinctServices.includes("VideoRecording") || distinctServices.includes("Photography"))) {
            return distinctServices.filter(service => service != "TwoDayEvent");
        }
        return distinctServices;
    }

    private RemoveUnnecessaryBlurayRule(distinctServices: ServiceType[]): ServiceType[] {
        if (distinctServices.includes("BlurayPackage") && !distinctServices.includes("VideoRecording")) {
            return distinctServices.filter(service => service != "BlurayPackage");
        }
        return distinctServices;
    }
}