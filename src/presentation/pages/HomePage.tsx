import { useCallback, useState } from "react";
import { getDate, modDate } from "../../helper/functions";
import { DatePicker } from "../components/calendar/DatePicker"
import { Event, Operator, formatDate } from "../../interfaces";
import { useQuery } from "@tanstack/react-query";
import { ReportService } from "../../services";
import { useHandleError } from "../../hooks";
import { CloudDownload } from "../icons/icons";
import { Text } from "../components/Text";
import { utils, writeFile } from "xlsx";
import { Button } from "../components/Button";
import { Loader } from "../components/Loader";
import { IconBtn } from "../components/IconBtn";

export const HomePage = () => {
    const { showError } = useHandleError();
    const [start, setStart] = useState<formatDate>(modDate({ dateI: new Date(), Hours: 0, Minutes: 0 }));
    const [end, setEnd] = useState<formatDate>(getDate());

    const { data, refetch, isFetching, isLoading, error } = useQuery({
        queryKey: ['attention'],
        refetchOnWindowFocus: true,
        queryFn: () => ReportService.attentionOperator({ start: `${start.date.date} ${start.time.time.slice(0, 5)}`, end: `${end.date.date} ${end.time.time.slice(0, 5)}` }),
    });

    if (!isFetching && !isLoading && error) showError({ responseError: error, exit: true });

    const consult = () => {
        setEnd(getDate());
        refetch()
    }

    const download =
        ({ events, keys, title, percentaje }: { events: Array<Event<string>>, keys: Array<keyof Event<string>>, title: string, percentaje: number }) => () => {
            const sanityData = events.map(element => keys.map(key => key).reduce((acc, current) => ({ ...acc, [current]: element[current] }), {}));
            const wb = utils.book_new();
            const ws = utils.json_to_sheet([[]]);
            utils.sheet_add_json(ws, sanityData);
            utils.sheet_add_aoa(ws, [["Operator", "#Events", "Percentaje"], [title, events.length, percentaje]], { origin: `${String.fromCharCode(65 + keys.length + 2)}1` });

            utils.book_append_sheet(wb, ws, title);
            writeFile(wb, `${title}dd.xlsx`);
        }

    const RenderOperator = useCallback(
        ({ name, events }: Operator) => {
            const alarms = [...new Set(events.map(event => event.CodigoAlarma))].reduce((acc, current) => ({ ...acc, [current]: events.filter(a => a.CodigoAlarma === current).length }), {});
            const entries = Object.entries(alarms) as Array<[string, number]>;
            const keys: Array<keyof Event<string>> = ['FechaOriginal', 'Hora', 'FechaPrimeraToma', 'HoraPrimeraToma', 'CodigoCte', 'Minutes', 'CodigoAlarma', 'CodigoEvento'];
            const percentaje: number = data?.totalEvents ? +Math.ceil((events.length * 100) / data.totalEvents) : 0;
            return (
                <div className="shadow-md bg-slate-200 dark:bg-slate-600 dark:shadow-slate-950 p-4 rounded-2xl">
                    <div className="flex gap-4 justify-between items-center ">
                        <h3 className="text-xl font-semibold">{name === '' ? 'Pendings events...' : name}</h3>
                        <span className="flex items-center gap-4">
                            <h4>Events: {events.length}</h4>
                            <IconBtn className="size-9 flex justify-center items-center" onClick={download({ events, keys, title: name, percentaje })} children={<CloudDownload />} />
                        </span>
                    </div>
                    <Text variant="text-base">Percentaje: {percentaje}%</Text>
                    <div className="flex flex-wrap gap-3 p-1 text-sm font-semibold mt-3">
                        {entries.map(value => <p className="shadow-md dark:bg-slate-800 px-3 py-1 rounded-xl dark:shadow-slate-900" key={`${name}-${value[0]}`}>{value[0]}: {value[1]}</p>)}
                    </div>
                </div>
            )
        },
        [data?.totalEvents, download],
    )


    return (
        <>
            <header className="flex w-full m-1 h-16 items-center justify-between">
                <h1 className="text-4xl font-semibold" >Dashboard</h1>
                <span className="flex gap-4 items-center justify-center h-full">
                    <div className="flex gap-4">
                        <DatePicker type="datetime-local" showIcon date={start} onChange={setStart} label="Start" />
                        <DatePicker type="datetime-local" showIcon date={end} onChange={setEnd} label="End" />
                    </div>
                    <Button full={false} loading={isFetching} children="Consult" onClick={consult} />
                </span>
            </header>
            <section className="flex-1 overflow-auto">
                {
                    isLoading ? <Loader text="Loading" />
                        :
                        <>
                            <h2 className="text-xl">Total Events: {data?.totalEvents}</h2>
                            <div className="grid grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                                {(data && data.operators) && data.operators.map((props) => <RenderOperator key={`Name:${props.name}`} {...props} />)}
                            </div>
                        </>
                }
            </section>
        </>
    )
}
