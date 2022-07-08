/**
 * A function that toggle the value in array.
 * @param array An array of string
 * @param value The value you wish to toggle
 * @returns A sorted array with the value add or remove
 */
const toggleValueInArray = (array: Array<string>, value: string) => {
    if (array.includes(value)) {
        return array.filter((item) => item !== value).sort()
    }

    return [...array, value].sort()
}

export { toggleValueInArray };