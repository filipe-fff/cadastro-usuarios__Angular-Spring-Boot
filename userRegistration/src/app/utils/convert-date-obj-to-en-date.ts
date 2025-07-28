export const convertDateObjToEnDate = (date: Date): string => {
    
    const day = toDecimal(date.getDate());
    const month = toDecimal(date.getMonth() + 1);
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
};

const toDecimal = (value: number): string => {
    return value < 10 ? `0${value}` : value.toString();
};