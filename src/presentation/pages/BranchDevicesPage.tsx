import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DeviceResponse, propsFormDeviceCreate } from "../../interfaces";
import { Add, ArrowLeft, Pencil, Update, X } from '../icons/icons';
import { useHandleError } from "../../hooks";
import { Button } from "../components/Button";
import { ColumnDef, Row } from "@tanstack/react-table";
import { IconBtn } from '../components/IconBtn';
import { Table } from "../components/Table";
import { TextField } from "../components/TextField";
import { SubmitHandler, useForm } from "react-hook-form";
import { useBranch } from "../../hooks/useBranch";
import { Portal } from "../components/modals";
import { SelectField } from "../components/SelectField";
import { useNewDevice, useNewDeviceservice, useUpdateDevice } from "../../hooks/useDevice";
import { useGroupDevice } from "../../hooks/useDeviceGroup";

const options: Array<{ value: string, label: string }> = [
    { label: "NUEVO", value: "NUEVO" },
    { label: "USADO", value: "USADO" },
    { label: "REPARADO", value: "REPARADO" },
    { label: "AVERIADO", value: "AVERIADO" },
    { label: "CAMBIADO", value: "CAMBIADO" }
];

export const BranchDevicesPage = () => {
    let { id } = useParams<"id">();
    const { showError } = useHandleError();
    const [value, setValue] = useState<any | undefined>(undefined);
    const [value2, setValue2] = useState<any | undefined>(undefined);
    const dialog = useRef<HTMLDialogElement>(null);
    const dialog2 = useRef<HTMLDialogElement>(null);
    const navigate = useNavigate();
    const mutationCreate = useNewDevice();
    const mutationUpdate = useUpdateDevice();
    const mutationCreateService = useNewDeviceservice();

    const { data: groups } = useGroupDevice();

    const { handleSubmit, control, reset, setValue: setValueForm } = useForm<propsFormDeviceCreate>({ defaultValues: { name: '', brand: '', model: '', barCode: '' } });

    const formservice= useForm<{ textService: string }>({ defaultValues: { textService: '' } });

    const { data, isLoading, isFetching, error, refetch } = useBranch(id ?? "");

    const columns = useMemo<ColumnDef<DeviceResponse>[]>(() => [
        { accessorKey: 'name', header: 'name' },
        { accessorKey: 'brand', header: 'brand' },
        { accessorKey: 'model', header: 'model' },
        { accessorKey: 'barCode', header: 'barCode' },
        { accessorKey: 'price', header: 'price' },
        { accessorKey: 'status', header: 'status' },
        { accessorKey: 'createdAt', header: 'Date Created' },
        { header: 'action' },
    ], []);

    const actions = ({ row: { original: { name, brand, model, status, barCode, price, id } } }: { row: Row<DeviceResponse> }) => {
        return (
            <div className="flex gap-2">
                <IconBtn className="text-blue-500" children={<Pencil />} onClick={() => {
                    setValue({ name, brand, model, status: options.find(f => f.value == status) ?? options[0], barCode, price, id });
                }} />
                <IconBtn className="text-green-500" children={<ArrowLeft className="rotate-180" />} onClick={() => {
                    setValue2({ id, name });
                    dialog2.current?.show();
                }} />
            </div>
        )
    }

    const onSubmit: SubmitHandler<propsFormDeviceCreate> = useCallback(
        async (values) => {
            if (value) {
                const { name, brand, model, barCode, price } = values

                mutationUpdate.mutate({ id: value.id, props: { name, brand, model, status: values.status.value, barCode, price } }, {
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
                mutationCreate.mutate({ ...values, branchId: data!.id, deviceGroupId: values.deviceGroupId.value, status: values.status.value }, {
                    onSuccess() {
                        dialog.current?.close();
                        refetch();
                        reset();
                    },
                    onError(error) {
                        showError({ responseError: error, exit: true })
                    },
                });
            }
        }, [data, mutationCreate, mutationUpdate, refetch, reset, showError, value]
    )


    const onSubmit2: SubmitHandler<{ textService: string }> = useCallback(
        async ({textService}) => {
            if (value2) {
                mutationCreateService.mutate({id:value2.id,observation: textService}, {
                    onSuccess() {
                        dialog2.current?.close();
                        refetch();
                        formservice.reset();
                    },
                    onError(error) {
                        showError({ responseError: error, exit: true })
                    },
                });
            }
        }, [mutationCreateService, formservice.reset, showError, value2]
    )

    if (!isFetching && !isLoading && error) showError({ responseError: error, exit: true });

    useEffect(() => {
        if (value) {
            reset();
            setValueForm('name', value.name ?? "");
            setValueForm('brand', value.brand ?? "");
            setValueForm('model', value.model ?? "");
            setValueForm('status', value.status ?? options[0]);
            setValueForm('barCode', value.barCode);
            setValueForm('price', value.price);
            dialog.current?.show();
        } else {
            dialog.current?.close();
        }
    }, [reset, setValueForm, value])

    return (
        <article className="flex-1 flex flex-col px-1">
            <Portal refElement={dialog} onClosed={(close) => close && dialog.current?.close()} >
                <div className="bg-slate-100 dark:bg-slate-800 p-5 rounded-xl shadow-md dark:shadow-slate-950 w-[600px]">
                    <span className="flex mb-4 justify-between items-center">
                        <h1 className="text-2xl font-semibold">Create Device for {data?.name}</h1>
                        <IconBtn onClick={() => {
                            dialog.current?.close();
                            reset();
                            setValue(undefined);
                        }} children={<X />} />
                    </span>

                    <form className="flex flex-1 gap-3 flex-col" onSubmit={handleSubmit(onSubmit)}>
                        {
                            !value && <span className="flex gap-2">
                                <SelectField
                                    rules={{ required: { value: true, message: 'status required...' } }}
                                    control={control}
                                    name="deviceGroupId"
                                    placeholder="Select Group..."
                                    options={groups?.map(a => ({ label: a.name, value: a.id })) ?? []}
                                />
                            </span>
                        }
                        <span className="flex gap-2">
                            <TextField
                                classNameContent="flex-1"
                                control={control}
                                name="name"
                                labelText="Name"
                                rules={{ required: { value: true, message: 'name is required' } }}
                            />
                            <TextField
                                classNameContent="flex-1"
                                control={control}
                                name="brand"
                                labelText="Brand"
                                rules={{ required: { value: true, message: 'name is required' } }}
                            />
                        </span>
                        <span className="flex gap-2">
                            <TextField
                                classNameContent="flex-1"
                                control={control}
                                name="model"
                                labelText="Model"
                                rules={{ required: { value: true, message: 'name is required' } }}
                            />
                            <SelectField
                                rules={{ required: { value: true, message: 'status required...' } }}
                                control={control}
                                name="status"
                                placeholder="Select status..."
                                options={options}
                            />
                        </span>
                        <span className="flex gap-2">
                            <TextField
                                classNameContent="flex-1"
                                control={control}
                                name="barCode"
                                labelText="BarCode"
                            />
                            <TextField
                                classNameContent="flex-1"
                                control={control}
                                name="price"
                                labelText="Price"
                                type="text"
                            />
                        </span>

                        <div className="flex justify-end">
                            <Button type="submit" className="flex gap-2 items-center" loading={isLoading}>
                                {value ? <Update /> : <Add />}
                                {value ? "Update Branch" : "Add Branch"}
                            </Button>
                        </div>
                    </form>
                </div>
            </Portal>
            <Portal refElement={dialog2} onClosed={(close) => close && dialog2.current?.close()} >
                <div className="bg-slate-100 dark:bg-slate-800 p-5 rounded-xl shadow-md dark:shadow-slate-950 w-[600px]">
                    <span className="flex mb-4 justify-between items-center">
                        <h1 className="text-2xl font-semibold">Create service for {value2?.name}</h1>
                        <IconBtn onClick={() => {
                            dialog2.current?.close();
                            reset();
                            setValue2(undefined);
                        }} children={<X />} />
                    </span>
                    <form className="flex flex-1 gap-3 flex-col h-[300px]" onSubmit={formservice.handleSubmit(onSubmit2)}>
                        <textarea className="flex flex-1 text-black p-3" placeholder="Insert Observations"/>
                        <div className="flex justify-end">
                            <Button type="submit" className="flex gap-2 items-center" loading={isLoading}>
                                <Add />
                                Add Service
                            </Button>
                        </div>
                    </form>
                </div>
            </Portal>
            <header className="flex w-full m-1 h-16 items-center justify-between">
                <span className="flex gap-5 items-center">
                    <IconBtn className="size-9 flex justify-center items-center text-blue-600 dark:text-blue-400" onClick={() => navigate('/home')} children={<ArrowLeft />} />
                    <h1 className="text-4xl font-semibold" >Devices {data?.name}</h1>
                </span>
                <Button className="flex gap-2 items-center" loading={isLoading} onClick={() => {
                    dialog.current?.show();
                }}>
                    {value ? <Update /> : <Add />}
                    {value ? "Update Device" : "Add Device"}
                </Button>
            </header>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <Table {...{
                    KeyName: "groups",
                    columns,
                    data: data?.devices ?? [],
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
