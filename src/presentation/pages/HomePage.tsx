import { useCallback, useRef } from "react";
import { Button } from "../components/Button";
import { Loader } from "../components/Loader";
import { AddBranch, CloudDownload, ListDevices } from "../icons/icons";
import { Portal } from "../components/modals";
import { useQuery } from "@tanstack/react-query";
import { BranchService } from "../../services/branch.service";
import { BranchesRespose } from "../../interfaces";
import { IconBtn } from "../components/IconBtn";
import { Text } from "../components/Text";
import { CreateBranchModalContent } from "../components/modals/CreateBranchModalContent";

export const HomePage = () => {

    const dialog = useRef<HTMLDialogElement>(null);
    // const { showError } = useHandleError();


    const { data, refetch, isFetching, isLoading } = useQuery({
        queryKey: ['branches'],
        refetchOnWindowFocus: true,
        queryFn: () => BranchService.branches(),
    });

    // if (!isFetching && !isLoading && error) showError({ responseError: error, exit: true });

    // const consult = () => {
    //     setEnd(getDate());
    //     // refetch()
    // }

    // const download =
    //     ({ events, keys, title, percentaje }: { events: Array<Event<string>>, keys: Array<keyof Event<string>>, title: string, percentaje: number }) => () => {
    //         const sanityData = events.map(element => keys.map(key => key).reduce((acc, current) => ({ ...acc, [current]: element[current] }), {}));
    //         const wb = utils.book_new();
    //         const ws = utils.json_to_sheet([[]]);
    //         utils.sheet_add_json(ws, sanityData);
    //         utils.sheet_add_aoa(ws, [["Operator", "#Events", "Percentaje"], [title, events.length, percentaje]], { origin: `${String.fromCharCode(65 + keys.length + 2)}1` });

    //         utils.book_append_sheet(wb, ws, title);
    //         writeFile(wb, `${title}dd.xlsx`);
    //     }

    const RenderBranches = useCallback(
        ({ name,address,city,createdAt,isActive,zipCode }: BranchesRespose) => {
            // const alarms = [...new Set(events.map(event => event.CodigoAlarma))].reduce((acc, current) => ({ ...acc, [current]: events.filter(a => a.CodigoAlarma === current).length }), {});
            // const entries = Object.entries(alarms) as Array<[string, number]>;
            // const keys: Array<keyof Event<string>> = ['FechaOriginal', 'Hora', 'FechaPrimeraToma', 'HoraPrimeraToma', 'CodigoCte', 'Minutes', 'CodigoAlarma', 'CodigoEvento'];
            // const percentaje: number = data?.totalEvents ? +Math.ceil((events.length * 100) / data.totalEvents) : 0;
            return (
                <div key={name} className={`shadow-md bg-slate-200 dark:bg-slate-600 dark:shadow-slate-950 p-4 rounded-2xl relative ${isActive ? "border-green-500" : "border-red-500"} border-2`}>
                    <div className="flex gap-4 justify-between items-center ">
                        <span className="mb-2">
                            <h3 className="text-xl font-semibold">{name}</h3>
                            <Text variant="text-sm">Devices: <b>100</b></Text>
                        </span>
                        <span className="flex items-center gap-4">
                            <IconBtn className="size-9 flex justify-center items-center" onClick={()=>{}} children={<CloudDownload />} />
                            <IconBtn className="size-9 flex justify-center items-center text-blue-600 dark:text-blue-400" onClick={()=>{}} children={<ListDevices />} />
                        </span>
                    </div>
                    {/* <div className={`absolute top-1 right-4 flex gap-2 items-center`}>
                        <div className={`h-2.5 w-2.5 rounded-full ${isActive ? "bg-green-500" : "bg-red-500"}`}/>
                        <Text variant="text-sm" className="font-weight: 900">{isActive?'Online':'Offline'}</Text>
                    </div> */}
                    <Text variant="text-sm"><b>Address:</b> {address}</Text>
                    <Text variant="text-sm"><b>City:</b> {city}</Text>
                    <Text variant="text-sm"><b>ZipCode:</b> {zipCode}</Text>
                    <Text variant="text-sm"><b>Created: </b> {createdAt}</Text>
                </div>
            )
        },
        [],
    )

    return (
        <>
            <header className="flex w-full m-1 h-16 items-center justify-between">
                <h1 className="text-4xl font-semibold" >Dashboard</h1>
                <span className="flex gap-4 items-center justify-center h-full">
                    {/* <div className="flex gap-4">
                        <DatePicker type="datetime-local" showIcon date={start} onChange={setStart} label="Start" />
                        <DatePicker type="datetime-local" showIcon date={end} onChange={setEnd} label="End" />
                    </div>
                    <Button full={false} loading={false} children="Consult" onClick={consult} /> */}
                    <Button className="flex gap-2 items-center" loading={isFetching || isLoading} onClick={() => dialog.current?.show()}>
                        <AddBranch />
                        Add branch
                    </Button>
                </span>
            </header>
            <section className="flex-1 overflow-auto">
                {
                    (isLoading) ? <Loader text="Loading" />
                        :
                        <>
                            <Portal refElement={dialog} onClosed={(close) => close && dialog.current?.close()} >
                                <CreateBranchModalContent dialog={dialog} onSuccess={({ exit }) => { if(exit) refetch() }}/>
                            </Portal>
                            <h2 className="text-xl">Total Services per branch: algo</h2>
                            <div className="grid grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                                {(data && data.branches) && data.branches.map((props) => <RenderBranches key={`Name:${props.name}`} {...props} />)}
                            </div>
                        </>
                }
            </section>
        </>
    )
}
