import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "../components/Button";
import { Loader } from "../components/Loader";
import { Add, AddBranch, ListDevices, Pencil, Update, X } from "../icons/icons";
import { Portal } from "../components/modals";
import { BranchesRespose } from "../../interfaces";
import { IconBtn } from "../components/IconBtn";
import { Text } from "../components/Text";
import { TextField } from "../components/TextField";
import { SubmitHandler, useForm } from "react-hook-form";
import { useBranches, useNewBranch, useUpdateBranch } from "../../hooks/useBranch";
import { propsBranchCreate } from '../../interfaces/service.interface';
import { useHandleError } from "../../hooks";
import { NavLink } from "react-router-dom";
import { toast } from "sonner";


export const HomePage = () => {
    const dialog = useRef<HTMLDialogElement>(null);
    const { showError } = useHandleError();
    const mutationCreate = useNewBranch();
    const mutationUpdate = useUpdateBranch();
    const { data, refetch, isFetching, isLoading } = useBranches();
    const { handleSubmit, control, reset, setValue: setValueForm } = useForm<propsBranchCreate>({ defaultValues: { name: "", address: "", city: "", zipCode: 0 } });
    const [value, setValue] = useState<BranchesRespose | undefined>(undefined);

    const onSubmit: SubmitHandler<{ name: string }> = async (inputs: propsBranchCreate) => {
        if (value) {
            mutationUpdate.mutate({ id: value.id, props: inputs }, {
                onSuccess() {
                    toast.success('Branch created ...');
                    setValue(undefined);
                    refetch();
                    reset();
                },
                onError(error) {
                    showError({ responseError: error, exit: true })
                },
            });
        } else {
            mutationCreate.mutate(inputs, {
                onSuccess() {
                    toast.success('Branch updated ...');
                    refetch();
                    reset();
                    dialog.current?.close();
                },
                onError(error) {
                    showError({ responseError: error, exit: true })
                },
            });
        }
    }

    const RenderBranches = useCallback(
        ({ name, address, city, createdAt, zipCode, id }: BranchesRespose) => {
            return (
                <div key={name} className={`shadow-md bg-slate-200 dark:bg-slate-700 dark:shadow-slate-950 p-4 rounded-md relative flex flex-col gap-1`}>
                    <div className="flex flex-col items-end">
                        <h3 className="text-xl font-semibold">{name}</h3>
                        <span className="flex gap-2">
                            <IconBtn className="size-8 flex justify-center items-center text-blue-600 dark:text-blue-400" onClick={() => setValue(data?.branches.find(f => f.id === id))} children={<Pencil />} />
                            <NavLink to={`branch/${id}`}>
                                <IconBtn className="size-8 flex justify-center items-center text-blue-600 dark:text-blue-400" children={<ListDevices />} />
                            </NavLink>
                        </span>
                    </div>
                    <Text variant="text-sm"><b>Address:</b> {address}</Text>
                    <Text variant="text-sm"><b>City:</b> {city}</Text>
                    <Text variant="text-sm"><b>ZipCode:</b> {zipCode}</Text>
                    <Text variant="text-sm"><b>Created: </b> {createdAt}</Text>
                </div>
            )
        },
        [data?.branches],
    )

    useEffect(() => {
        if (value) {
            reset();
            setValueForm('name', value.name);
            setValueForm('address', value.address);
            setValueForm('city', value.city);
            setValueForm('zipCode', value.zipCode);
            setValueForm('isActive', value.isActive);
            dialog.current?.show();
        } else {
            dialog.current?.close();
        }
    }, [reset, setValueForm, value])

    return (
        <article className="flex-1 flex flex-col container mx-auto px-5">
            <Portal refElement={dialog} onClosed={(close) => close && dialog.current?.close()} >
                <div className="bg-slate-100 dark:bg-slate-800 p-5 m-2 rounded-xl shadow-xl dark:shadow-slate-950">
                    <span className="flex mb-4 justify-between items-center">
                        <h1 className="text-2xl font-semibold">Create branch</h1>
                        <IconBtn onClick={() => {
                            dialog.current?.close();
                            reset();
                            setValue(undefined);
                        }} children={<X />} />
                    </span>

                    <form className="flex flex-1 gap-3 flex-col" onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            control={control}
                            name="name"
                            labelText="Name"
                            rules={{ required: { value: true, message: 'name is required' } }}
                        />
                        <TextField
                            control={control}
                            name="address"
                            labelText="Address"
                        />
                        <span className="flex gap-2">
                            <TextField
                                control={control}
                                name="city"
                                labelText="City"
                            />
                            <TextField
                                control={control}
                                name="zipCode"
                                labelText="ZipCode"
                                type="number"
                            />
                        </span>
                        <div className="flex justify-end">
                            <Button type="submit" className="flex gap-2 items-center" loading={mutationUpdate.isPending || mutationCreate.isPending || isLoading}>
                                {value ? <Update /> : <Add />}
                                {value ? "Update Branch" : "Add Branch"}
                            </Button>
                        </div>
                    </form>
                </div>
            </Portal>
            <header className="flex w-full m-1 h-16 items-center justify-between">
                <h1 className="text-2xl md:text-3xl font-semibold">Branches</h1>
                <span className="flex gap-4 items-center justify-center h-full">
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
                            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 my-5">
                                {(data && data.branches) && data.branches.map((props) => <RenderBranches key={`Name:${props.name}`} {...props} />)}
                            </div>
                        </>
                }
            </section>
        </article>
    )
}
