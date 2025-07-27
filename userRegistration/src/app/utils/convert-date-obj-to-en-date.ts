export const convertDateObjToEnDate = (date: Date): string => {
    
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
};