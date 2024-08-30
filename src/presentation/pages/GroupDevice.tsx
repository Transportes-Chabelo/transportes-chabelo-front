import { useEffect, useMemo, useRef, useState } from "react";
import { DeviceGroupResponse } from "../../interfaces";
import { Add, Pencil, Update } from "../icons/icons";
import { useHandleError } from "../../hooks";
import { Button } from "../components/Button";
import { ColumnDef, Row } from "@tanstack/react-table";
import { IconBtn } from '../components/IconBtn';
import { Table } from "../components/Table";
import { TextField } from "../components/TextField";
import { SubmitHandler, useForm } from "react-hook-form";
import { useGroupDeviceCreate, useGroupDeviceUpdate, useGroupDevice } from "../../hooks/useDeviceGroup";


export const GroupDevicePage = () => {
    const { showError } = useHandleError();
    const [value, setValue] = useState<DeviceGroupResponse | undefined>();
    const inputRef = useRef<HTMLInputElement>(null);
    
    const { handleSubmit, control, reset, setValue: setValueForm } = useForm<{ name: string }>({ defaultValues: { name: '' } });
    
    const mutationCreate = useGroupDeviceCreate();
    const mutationUpdate = useGroupDeviceUpdate();

    const { data, isLoading, isFetching, error, refetch } = useGroupDevice();

    const columns = useMemo<ColumnDef<DeviceGroupResponse>[]>(() => [
        { accessorKey: 'name', header: 'name' },
        { accessorKey: 'createdAt', header: 'Date Created' },
        { header: 'action' },
    ], []);

    const actions = ({ row: { original } }: { row: Row<DeviceGroupResponse> }) => {
        return (
            <div className="flex gap-2">
                <IconBtn className="text-blue-500" children={<Pencil />} onClick={() => { setValue(original) }} />
            </div>
        )
    }
    const onSubmit: SubmitHandler<{ name: string }> = async ({ name }) => {
        if (value) {
            mutationUpdate.mutate({ id: value.id, name }, {
                onSuccess() {
                    setValue(undefined);
                    refetch();
                    reset();
                },
                onError(error) {
                    showError({ responseError: error, exit: true })
                },
            });
        } else {
            mutationCreate.mutate(name, {
                onSuccess() {
                    refetch();
                    reset();
                },
                onError(error) {
                    showError({ responseError: error, exit: true })
                },
            });
        }
    }

    if (!isFetching && !isLoading && error) showError({ responseError: error, exit: true });

    useEffect(() => {
        if (value) {
            setValueForm('name', value.name.toLowerCase().replace(/#|_/g, ' '))
            inputRef.current?.focus();
        }
    }, [setValueForm, value])


    return (
        <article className="flex-1 flex flex-col px-1 items-center">
            <header className="flex w-full m-1 h-16 items-center justify-between">
                <h1 className="text-4xl font-semibold" >Device Group</h1>
                <form className="flex gap-3 items-center" onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        classNameContent="w-auto"
                        reference={inputRef}
                        control={control}
                        name="name"
                        labelText="Group"
                        rules={{ required: { value: true, message: 'name is required' } }}
                    />
                    <Button type="submit" className="flex gap-2 items-center" loading={mutationUpdate.isPending || mutationCreate.isPending || isLoading}>
                        {value ? <Update /> : <Add />}
                        {value ? "Update Device" : "Add Device"}
                    </Button>
                </form>
            </header>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <Table {...{
                    KeyName: "groups",
                    columns,
                    data: data ?? [],
                    onValue: setValue,
                    renderSubComponent: actions,
                    useInternalPagination: true,
                    header: { title: 'List groups' },
                    maxHeight: 600,
                    shadow: true,
                }} />
            </div>
        </article >
    )   
};
