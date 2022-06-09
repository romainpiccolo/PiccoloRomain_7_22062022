const toggleValueInArray = (array: Array<string>, value: string) => {
    if (array.includes(value)) {
        return array.filter((item) => item !== value).sort()
    }

    return [...array, value].sort()
}

export { toggleValueInArray };