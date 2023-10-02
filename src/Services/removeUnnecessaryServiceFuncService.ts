import { ServiceType } from "..";

export const removeUnnecessaryServices = (distinctServices: ServiceType[]) => {
    const removeUnnecessaryFuncs = provideRemoveUnnecessaryServiceFuncs()
    let result = distinctServices.map(service => service);
    removeUnnecessaryFuncs.forEach(removeMethod => {
        result = removeMethod(result);
    });

    return result;
}

function provideRemoveUnnecessaryServiceFuncs() {
    return [
        removeUnnecessaryBlurayFunc,
        removeUnnecessaryTwoDayEventFunc
    ];
}

function removeUnnecessaryTwoDayEventFunc(distinctServices: ServiceType[]): ServiceType[] {
    if (distinctServices.includes("TwoDayEvent") &&
        !(distinctServices.includes("VideoRecording") || distinctServices.includes("Photography"))) {
        return distinctServices.filter(service => service != "TwoDayEvent");
    }
    return distinctServices;
}

function removeUnnecessaryBlurayFunc(distinctServices: ServiceType[]): ServiceType[] {
    if (distinctServices.includes("BlurayPackage") && !distinctServices.includes("VideoRecording")) {
        return distinctServices.filter(service => service != "BlurayPackage");
    }
    return distinctServices;
}