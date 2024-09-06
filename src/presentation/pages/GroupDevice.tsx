import { useEffect, useMemo, useRef, useState } from "react";
import { DeviceGroupResponse } from "../../interfaces";
import { Add, Update } from "../icons/icons";
import { useHandleError } from "../../hooks";
import { Button } from "../components/Button";
import { ColumnDef } from "@tanstack/react-table";
import { Table } from "../components/Table";
import { TextField } from "../components/TextField";
import { SubmitHandler, useForm } from "react-hook-form";
import { useGroupDeviceCreate, useGroupDeviceUpdate, useGroupDevice } from "../../hooks/useDeviceGroup";
import { toast } from "sonner";

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
    ], []);

    const onSubmit: SubmitHandler<{ name: string }> = async ({ name }) => {
        if (value) {
            mutationUpdate.mutate({ id: value.id, name }, {
                onSuccess() {
                    toast.success('Group Updated ...');
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
                    toast.success('Group Created ...');
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
        <article className="flex-1 flex flex-col container mx-auto px-5 pb-5 gap-5">
            <header className="flex w-full items-center justify-between mt-5 gap-5">
                <h1 className="text-2xl md:text-3xl font-semibold">Device Group</h1>
                <form className="flex gap-3 items-end md:items-center flex-col-reverse md:flex-row" onSubmit={handleSubmit(onSubmit)}>
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
                    useInternalPagination: true,
                    header: { title: 'List groups' },
                    maxHeight: 450,
                    shadow: true,
                    selectRow: true
                }} />
            </div>
        </article >
    )
};
