import { useCallback, useState } from "react";
import { ModalContent } from "../../interfaces/interfaces"
// import { Calendar } from "../calendar/Calendar";
import { CalendarStart, Caret, CheveronLeft, Pencil } from "../../icons/icons";
import { getDate, modDate } from "../../../helper/functions";
// import Input from "../Input";
import { formatDate } from "../../../interfaces";
import { DatePicker } from "../calendar/DatePicker";
import { Calendar } from "../calendar/Calendar";
import { IconBtn } from "../IconBtn";
import { Button } from "../Button";

interface PropsPicker<T> extends ModalContent<T> {
    onChenge: (date: formatDate) => void;
    locale?: 'es' | 'en';
    title?: string;
}

export const CalendarModalContent = <T extends object>({ dialog, onChenge, locale = 'es', title }: PropsPicker<T>) => {
    const [date, setDate] = useState<formatDate>(getDate());
    const [isCustomDate, setIsCustomDate] = useState<boolean>(false);
    const [isSelectYear, setIsSelectYear] = useState<boolean>(false);

    const intlForMonths = new Intl.DateTimeFormat(locale, { month: 'long' });
    const intlForShortMonths = new Intl.DateTimeFormat(locale, { month: 'short' });
    const monthShortName = intlForShortMonths.format(date.DATE);
    const monthName = intlForMonths.format(date.DATE);

    const intlForDay = new Intl.DateTimeFormat(locale, { weekday: 'short' });
    const dayName = intlForDay.format(date.DATE);

    const onAnimationEnd = useCallback(
        ({ currentTarget }: React.AnimationEvent<HTMLDivElement>) => {
            if (currentTarget.classList.contains('scale-down-center')) {
                currentTarget.classList.toggle('scale-down-center');
                dialog.current?.close();
            }
            setDate(getDate());
        },
        [dialog],
    );
    const close = () => {
        setIsCustomDate(false);
        setIsSelectYear(false);
        dialog.current?.close();
    }

    const DateOk = () => {
        onChenge(date);
        close();
    }

    return (
        <div className="p-4 rounded-xl bg-slate-100 shadow-lg" onAnimationEnd={onAnimationEnd}>
            <header>
                <p className="text-sm font-medium">{title ?? 'Select date'}</p>
                <div className="flex justify-between my-1">
                    {isCustomDate ? <p className="text-lg uppercase font-semibold">Enter date</p> : <p className="text-xl uppercase font-semibold" translate="no">{dayName}, {monthShortName} {date.date.day}</p>}
                    <IconBtn children={isCustomDate ? <CalendarStart /> : <Pencil />} onClick={() => setIsCustomDate(!isCustomDate)} />
                </div>
            </header>
            <section>
                {
                    isCustomDate
                        ?
                        <div className="py-4">
                            <DatePicker date={date} onChange={setDate} label="Select Date" locale="es" />
                        </div>
                        :
                        <>
                            <span className='flex justify-between my-4'>
                                <span className='flex gap-2'>
                                    <p>{monthName} {date.date.year}</p>
                                    <IconBtn className="bg-transparent" onClick={() => setIsSelectYear(!isSelectYear)} children={<Caret classname={`${isSelectYear ? "rotate-180" : ''} size-5`} />} />
                                </span>
                                <span className='flex gap-2'>
                                    <IconBtn onClick={() => setDate(modDate({ dateI: date.DATE, addMonth: -1 }))} children={<CheveronLeft />} />
                                    <IconBtn onClick={() => setDate(modDate({ dateI: date.DATE, addMonth: 1 }))} children={<CheveronLeft classname='rotate-180' />} />
                                </span>
                            </span>
                            <Calendar date={date} onChange={setDate} isSelectYear={isSelectYear} />
                        </>
                }
            </section>
            <footer className="flex items-center justify-end gap-4">
                <Button className="text-sm h-[35px]" typeBtn="error" onClick={close} children="Cancel" />
                <Button className="text-sm h-[35px]" onClick={DateOk} children="OK" />
            </footer>

        </div>
    )
}
