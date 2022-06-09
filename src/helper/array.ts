const toggleValueInArray = (array: Array<string>, value: string) => {
    if (array.includes(value)) {
        return array.filter((item) => item !== value)
    }

    return [...array, value]
}

export { toggleValueInArray };