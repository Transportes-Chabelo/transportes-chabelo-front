import { useMemo, useRef, useState } from "react";
import { CalendarStart, Spinner } from "../../icons/icons";
import { Portal } from "../../components/modals";
import { CalendarModalContent } from "../../components/modals/CalendarModalContent";
import { DatePicker } from "../../components/calendar/DatePicker";
import { getDate } from "../../../helper/functions";
import { useQuery } from "@tanstack/react-query";
import { ReportService } from "../../../services";
import { Key } from "../../interfaces/interfaces";
import { AlarmApplicationSystem, Event } from "../../../interfaces";
import { useHandleError } from "../../../hooks";
import { Loader } from "../../components/Loader";
import { ColumnDef } from "@tanstack/react-table";
import { Table } from "../../components/Table";
import { Button } from "../../components/Button";
import { IconBtn } from "../../components/IconBtn";

export const SystemRequestPage = () => {
    const { showError } = useHandleError();
    const [start, setStart] = useState(getDate());
    const [end, setEnd] = useState(getDate());
    const dialog = useRef<HTMLDialogElement>(null);
    const CalendarPicker = useRef<HTMLDivElement>(null);

    const columns = useMemo<ColumnDef<Event<AlarmApplicationSystem>>[]>(() => [
        { accessorFn: row => `${row.FechaOriginal}  ${row.Hora}`, id: 'Date Hour', },
        { accessorKey: 'CodigoAlarma', header: 'Alarm' },
        { accessorKey: 'CodigoAbonado', header: "Subscriber" },
        { accessorKey: 'CodigoCte', header: "Client" },
    ], []);

    const { data, refetch, isFetching, isLoading, error } = useQuery({
        queryKey: ['SrsSta'],
        queryFn: () => ReportService.applicationSystem({ start: start.date.date, end: end.date.date }),
    });

    if (!isFetching && !isLoading && error) showError({ responseError: error, exit: true });

    return (
        <article className="container-page-report">
            <Portal refElement={dialog} onClosed={(close) => close && dialog.current?.close()} >
                <CalendarModalContent dialog={dialog} onChenge={date => console.log(date)} title="Select the first day of the month." />
            </Portal>
            <header>
                <div className="flex justify-between px-4">
                    <h1 className="text-4xl font-semibold" >System request</h1>
                    <span className="flex gap-2 items-center">
                        <div className="flex gap-2">
                            <DatePicker showIcon date={start} onChange={setStart} label="Start" />
                            <DatePicker showIcon date={end} onChange={setEnd} label="End" />
                        </div>
                        <div className="flex gap-2 items-center" >
                            <Button loading={isFetching} onClick={() => refetch()} children="Refresh" />
                            <IconBtn children={<CalendarStart />} onClick={() => dialog.current?.show()} />
                        </div>
                    </span>
                </div>
            </header>
            {
                (isLoading)
                    ? <Loader text="Loading ..." />
                    :
                    <section className="flex flex-col gap-4 mt-4 lg:flex-row flex-wrap">
                        <div className="flex-1">
                            <Table {...{
                                key: "with-panel",
                                columns,
                                maxHeight: 500,
                                shadow: true,
                                data: data?.srs ?? [],
                                useInternalPagination: true,
                                header: { title: "Srs" }
                            }} />
                        </div>
                        <div className="flex-1">
                            <Table {...{
                                key: "with-panel",
                                columns,
                                maxHeight: 500,
                                shadow: true,
                                data: data?.sta ?? [],
                                useInternalPagination: true,
                                header: { title: "Sta" }
                            }} />
                        </div>
                        <div className="flex-1">
                            <Table {...{
                                key: "with-panel",
                                columns,
                                maxHeight: 500,
                                shadow: true,
                                data: data?.pendingSrs ?? [],
                                useInternalPagination: true,
                                header: { title: "Pending srs" }
                            }} />
                        </div>

                    </section>
            }
        </article >
    )
};