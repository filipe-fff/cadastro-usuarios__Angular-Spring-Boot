export const convertPtDateToDateObj = (date: string): Date => {

    const [year, month, day] = date.split("-").map(Number);

    if (isValidDate(day, month, year)) {
        return new Date(year, month - 1, day);
    }

    return new Date();
};

const isValidDate = (day: number, month: number, year: number): boolean => {
    const date = new Date(year, month - 1, day);

    return (
        day === date.getDate() &&
        month === date.getMonth() + 1 &&
        year === date.getFullYear()
    );
};