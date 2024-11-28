export const mapDataToDto = <T extends object>(
    keys: readonly (keyof T)[],
    data: object | object[]
): T | T[] => {
    const transform = (item: object): T =>
        keys.reduce((acc, key) => {
            if (key in item) {
                acc[key] = item[key as keyof typeof item];
            }
            return acc;
        }, {} as T);

    return Array.isArray(data) ? data.map(transform) : transform(data);
};
