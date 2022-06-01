const capitalize = (value: string) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
}

const singularize = (value: string) => {
    return value.slice(0, -1);
}

export { capitalize, singularize };
