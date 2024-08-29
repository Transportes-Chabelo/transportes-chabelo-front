import { useCallback } from 'react';
import { modDate } from '../../../helper/functions';
import { formatDate } from '../../../interfaces';

export const Calendar = ({ date, onChange, isSelectYear, isSelectMonth, locale = 'es' }: {
    date: formatDate,
    onChange: (date: formatDate) => void;
    isSelectYear?: boolean;
    isSelectMonth?: boolean;
    locale?: 'es' | 'en';
}) => {
    const currentDate = new Date();

    const days = [...Array(date.daysInMonth).keys()];

    const Day = useCallback(
        ({ day, start }: { day: number, start?: number }) => {
            const onClick = (selectedDay: number) => () => {
                const Date = modDate({ dateI: date.DATE, Day: selectedDay });
                typeof Date !== 'string' && onChange(Date);
            }
            const isCurrentDay = currentDate.getDate() === day;
            const selected = date.date.day === day;
            return (<li translate='no' style={start ? { gridColumnStart: start } : {}} className={`w-8 h-8 flex justify-center items-center rounded-full ${isCurrentDay ? 'border-2 border-slate-700 dark:border-slate-400 font-medium' : ''} ${selected ? 'bg-slate-600 text-slate-200 dark:bg-slate-400 dark:text-slate-950 font-medium' : ''}`} onClick={onClick(day)}>{String(day).padStart(2, '0')}</li>)
        },
        [currentDate, date.DATE, date.date.day, onChange],
    );

    const RenderDays = useCallback(
        () => {
            return (
                <>
                    <Day start={(date.startDay === 6) ? 0 : date.startDay + 1} day={1} />
                    {days.slice(0, days.length - 1).map((_, idx) => <Day key={idx + 2} day={idx + 2} />)}
                </>
            )
        },
        [Day, date.startDay, days],
    );

    const RenderYear = useCallback(
        ({ year }: { year: number }) => {
            const onClick = () => {
                const Date = modDate({ dateI: date.DATE, Year: year });
                typeof Date !== 'string' && onChange(Date);
            }
            return (<li className={`value ${date.DATE.getFullYear() === year ? 'current' : ''}`} onClick={onClick} >{year}</li>)
        },
        [date, onChange],
    );

    const RenderMonth = useCallback(
        ({ month }: { month: number }) => {
            const intlForShortMonths = new Intl.DateTimeFormat(locale, { month: 'long' });
            const name = intlForShortMonths.format(new Date(date.DATE.getFullYear(), month));
            const onClick = () => {
                const Date = modDate({ dateI: date.DATE, Month: month });
                typeof Date !== 'string' && onChange(Date);
            }
            return (<li className={`value ${date.DATE.getMonth() === month ? 'current' : ''}`} onClick={onClick}>{name}</li>)
        },
        [date, onChange, locale],
    );

    const RenderYears = useCallback(
        () => new Array(15).fill('').map((_, idx) => <RenderYear key={currentDate.getFullYear() + 3 - idx} year={currentDate.getFullYear() + 3 - idx} />).reverse(),
        [RenderYear, currentDate],
    )

    const RenderMonths = useCallback(
        () => new Array(12).fill('').map((_, idx) => <RenderMonth key={`month-${idx}`} month={idx} />),
        [RenderMonth],
    );

    if (isSelectYear) return (
        <div className="m-4">
            <ol className='grid grid-cols-3'>
                <RenderYears />
            </ol>
        </div>
    );

    if (isSelectMonth) return (
        <div className="container-calendar">
            <ol className='month'>
                <RenderMonths />
            </ol>
        </div>
    );

    return (
        <div className="w-[300px] h-[250px]">
            <ol className="grid grid-cols-7 gap-1 text-center">
                <li translate='no' className="font-semibold">S</li>
                <li translate='no' className="font-semibold">M</li>
                <li translate='no' className="font-semibold">T</li>
                <li translate='no' className="font-semibold">W</li>
                <li translate='no' className="font-semibold">T</li>
                <li translate='no' className="font-semibold">F</li>
                <li translate='no' className="font-semibold">S</li>
                <RenderDays />
            </ol>
        </div >
    )
}