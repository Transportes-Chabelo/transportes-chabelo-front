import { formatDate } from "../interfaces";

interface ModDate {
    dateI: Date;
    addDay?: number;
    addHour?: number;
    addMinute?: number;
    addMonth?: number;
    addSecond?: number;
    Day?: number;
    Hours?: number;
    Minutes?: number;
    Month?: number;
    Seconds?: number;
    Year?: number;
}

export const getDate = (dateIn?: Date): formatDate => {
    try {
        const newDate = dateIn ?? new Date();
        let date = newDate.toLocaleDateString();
        let time = newDate.toTimeString().slice(0, 8);
        const [day, month, year]: Array<number> = date.split('/').map(value => +value);
        date = `${year}-${`${month}`.padStart(2, '0')}-${`${day}`.padStart(2, '0')}`;
        const [hour, minute, second]: Array<number> = time.split(':').map(value => +value);
        time = `${`${hour}`.padStart(2, '0')}:${`${minute}`.padStart(2, '0')}:${`${second}`.padStart(2, '0')}`;
        const daysInMonth = new Date(year, month, 0).getDate();
        const startDay = new Date(newDate.getFullYear(), newDate.getMonth(), 1).getDay();
        return {
            DATE: newDate,
            daysInMonth,
            startDay,
            date: { date, day, month, year },
            time: { time, hour, minute, second },
        };
    } catch (error) {
        return getDate();
    }
}

export const modDate = ({ dateI, Day, Month, Year, Seconds, Minutes, Hours, addMonth, addDay, addSecond, addMinute, addHour }: ModDate): formatDate => {
    const newDate = dateI;
    (addDay !== undefined) && newDate.setDate(newDate.getDate() + addDay);
    (addHour !== undefined) && newDate.setHours(newDate.getHours() + addHour);
    (addMinute !== undefined) && newDate.setMinutes(newDate.getMinutes() + addMinute);
    (addMonth !== undefined) && newDate.setMonth(newDate.getMonth() + addMonth);
    (addSecond !== undefined) && newDate.setSeconds(newDate.getSeconds() + addSecond);
    (Day !== undefined) && newDate.setDate(Day);
    (Hours !== undefined) && newDate.setHours(Hours);
    (Minutes !== undefined) && newDate.setMinutes(Minutes);
    (Month !== undefined) && newDate.setMonth(Month);
    (Seconds !== undefined) && newDate.setSeconds(Seconds);
    (Year !== undefined) && newDate.setFullYear(Year);
    return getDate(newDate);
}