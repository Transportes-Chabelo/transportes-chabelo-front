import { useMemo, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { DeviceGroupResponse, TypeUser} from "../../interfaces";
import { useAuthStore } from "../../stores";
import { Add, Pencil } from "../icons/icons";
import { useQuery } from "@tanstack/react-query";
import { useHandleError } from "../../hooks";
import { Button } from "../components/Button";
import { ColumnDef, Row } from "@tanstack/react-table";
import { IconBtn } from '../components/IconBtn';
import { Table } from "../components/Table";
import { DeviceGroupService } from "../../services/device-group.service";
import { TextField } from "../components/TextField";
import { useForm } from "react-hook-form";


export const GroupDevicePage = () => {
    const user = useAuthStore(state => state.user);
    const { showError } = useHandleError();
    const [value, setValue] = useState<DeviceGroupResponse | undefined>();
    // const { handleSubmit, control, reset, setError } = useForm<{name:string}>({ defaultValues: { name: '' } });

    // const { mutate, isPending } = useNewUser();

    const { data, isLoading, isFetching, error, refetch } = useQuery({
        queryKey: ['device-group'],
        queryFn: () => DeviceGroupService.groups(),
        refetchOnWindowFocus: true,
        refetchOnMount:true,
        refetchOnReconnect:true
    });

    const columns = useMemo<ColumnDef<DeviceGroupResponse>[]>(() => [
        { accessorKey: 'name', header: 'name' },
        { accessorKey: 'createdAt', header: 'Date Created' },
        { header: 'action' },
    ], []);

    const actions = ({ row: { original } }: { row: Row<DeviceGroupResponse> }) => {
        return (
            <div className="flex gap-2">
                <IconBtn className="text-blue-500" children={<Pencil />} onClick={() => {}} />
            </div>
        )
    }

    if (!isFetching && !isLoading && error) showError({ responseError: error, exit: true });

    return (user?.role === TypeUser.user)
        ? <Navigate to="/home" />
        :
        <article className="flex-1 flex flex-col px-1 items-center">
            <header className="flex w-full m-1 h-16 items-center justify-between">
                <h1 className="text-4xl font-semibold" >Device Group</h1>
                <span>
                    {/* <TextField /> */}
                    <Button className="flex gap-2 items-center" onClick={() => {}}>
                        <Add />
                        Add Device
                    </Button>
                </span>
            </header>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <Table {...{
                    KeyName:"groups",
                    columns,
                    data: data ?? [],
                    onValue: setValue,
                    renderSubComponent: actions,
                    useInternalPagination: true,
                    header:{title:'List groups'},
                    maxHeight:600,
                    shadow:true,
                }} />
            </div>
        </article >
};
