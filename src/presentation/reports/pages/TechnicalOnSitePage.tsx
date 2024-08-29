import { useMemo, useRef, useState } from "react";
import { DatePicker } from "../../components/calendar/DatePicker";
import { Portal } from "../../components/modals";
import { CalendarModalContent } from "../../components/modals/CalendarModalContent";
import { CalendarStart, Spinner } from "../../icons/icons";
import { getDate } from "../../../helper/functions";
import { useQuery } from "@tanstack/react-query";
import { ReportService } from "../../../services";
import { AlarmTechnicalOnSite, Event } from "../../../interfaces";
import { useHandleError } from "../../../hooks";
import { Loader } from "../../components/Loader";
import { ColumnDef } from "@tanstack/react-table";
import { Table } from "../../components/Table";

export const TechnicalOnSitePage = () => {

    const [start, setStart] = useState(getDate());
    const [end, setEnd] = useState(getDate());
    const dialog = useRef<HTMLDialogElement>(null);
    const CalendarPicker = useRef<HTMLDivElement>(null);
    const { showError } = useHandleError();

    const columns = useMemo<ColumnDef<Event<AlarmTechnicalOnSite>>[]>(() => [
        { accessorFn: row => `${row.FechaOriginal}  ${row.Hora}`, id: 'Date Hour', size: 200 },
        { accessorKey: 'CodigoAlarma', header: 'Alarm' },
        { accessorKey: 'CodigoAbonado', header: "Subscriber" },
        { accessorKey: 'CodigoCte', header: "Client" },
        { accessorKey: 'Comment', header: "Comment" },
    ], []);

    const { data, refetch, isFetching, isLoading, error } = useQuery({
        queryKey: ['TessTese'],
        queryFn: () => ReportService.technicalObSite({ start: start.date.date, end: end.date.date }),
    });

    if (!isFetching && !isLoading && error) showError({ responseError: error, exit: true });


    return (
        <article className="container-page-report">
            <header>
                <div className="top">
                    <h1>Technical on site</h1>
                    <span className="container-buttons">
                        <div className="pickers">
                            <DatePicker showIcon date={start} onChange={setStart} label="Start" />
                            <DatePicker showIcon date={end} onChange={setEnd} label="End" />
                        </div>
                        <div className="buttons" >
                            <button className="button-small" onClick={() => refetch()}>
                                {(isFetching) ? <Spinner classname="icon-spin" /> : 'Consult'}
                            </button>
                            <button className="btn-icon" onClick={() => dialog.current?.show()}>
                                <CalendarStart />
                                <Portal className="blur-1" refElement={dialog}
                                    onClosed={(close) => close && CalendarPicker.current?.classList.toggle('scale-down-center')}
                                >
                                    <CalendarModalContent dialog={dialog} onChenge={date => console.log(date)} />
                                </Portal>
                            </button>
                        </div>
                    </span>
                </div>
            </header>
            {
                (isLoading)
                    ? <Loader text="Loading ..." />
                    :
                    <section className="content-data" style={{ display: 'flex', gap: '1rem', padding: '1rem 0' }}>
                        <div className="flex-1">
                            <Table {...{
                                key: "Tese",
                                columns,
                                maxHeight: 500,
                                shadow: true,
                                data: data?.tese ?? [],
                                useInternalPagination: true,
                                header: { title: "Tese" }
                            }} />
                        </div>
                        <div className="flex-1">
                            <Table {...{
                                key: "Tess",
                                columns,
                                maxHeight: 500,
                                shadow: true,
                                data: data?.tess ?? [],
                                useInternalPagination: true,
                                header: { title: "Tese" }
                            }} />
                        </div>
                    </section>
            }
        </article >
    )
};
