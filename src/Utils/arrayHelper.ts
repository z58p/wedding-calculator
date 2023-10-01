const sum = (...items: number[]) => {
    if (!items.length) {
        return 0;
    }

    return items.reduce((a, b) => a + b) ?? 0;
}

const max = (...items: number[]) => {
    if (!items.length) {
        return 0;
    }

    return items.reduce((a, b) => Math.max(a, b)) ?? 0;
}

function containAll<T>(selected: T[], collection: T[]): boolean {
    return collection.every(v => selected.includes(v))
}

export const arrayHelper = {
    sum,
    max,
    containAll,
}