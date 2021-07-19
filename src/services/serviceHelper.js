export const getRandomIntInclusive = (min, max) => { // получить случайное число в заданном интервале
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

export const checkOnUnknown = (str) => {
    const result = (str === "unknown") ? "secret information" : str;
    return result;
}
