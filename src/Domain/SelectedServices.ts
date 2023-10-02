import { arrayHelper } from "../Utils/arrayHelper";
import { RedundantServicesPolitic } from "./Politics/RedundantServicesPolitic";
import { ServiceType } from "./model";


export class SelectedServices {
    private serviceCollection: ServiceType[]

    constructor(selectedServices: ServiceType[]) {
        this.serviceCollection = selectedServices;
    }

    public GetCollection() {
        return this.serviceCollection.map(service => service);
    }

    public Contain(selectedServices: SelectedServices) {
        return arrayHelper.containAll(this.GetCollection(), selectedServices.GetCollection());
    }

    public Add(serviceToAdd: ServiceType) {
        const distinctServices = Array.from(new Set([...this.serviceCollection, serviceToAdd]));
        this.serviceCollection = new RedundantServicesPolitic(distinctServices)
            .RemoveRedundantServices();
        return this;
    }

    public Remove(serviceToRemove: ServiceType) {
        const filteredServices = this.serviceCollection.filter(service => service != serviceToRemove);
        this.serviceCollection = new RedundantServicesPolitic(filteredServices)
            .RemoveRedundantServices();
        return this;
    }

    public Clone() {
        return new SelectedServices(this.GetCollection());
    }


}

