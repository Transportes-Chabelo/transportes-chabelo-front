import { useMemo, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { TypeUser, UsersRespose } from "../../interfaces";
import { useAuthStore } from "../../stores";
import { AddUser, CheveronLeft, Circle, Delete, Pencil, Question, Search } from "../icons/icons";
import { UserService } from "../../services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Input from "../components/Input";
import { Text } from "../components/Text";
import { useHandleError } from "../../hooks";
import { CreateUserModalContent, Portal } from "../components/modals";
import { toast } from "sonner";
import { SimpleSelect } from "../components/SimpleSelect";
import { Button } from "../components/Button";
import { ColumnDef, PaginationState, Row } from "@tanstack/react-table";
import { IconBtn } from '../components/IconBtn';
import { Table } from "../components/Table";
import { PropsSelect } from "../interfaces/interfaces";
import { AlertModalContent } from "../components/modals/AlertModalContent";
import {Response} from '../../services/user.service';


const Rows: Array<PropsSelect<number>> = [
    { label: '5', value: 5 },
    { label: '10', value: 10 },
    { label: '15', value: 15 },
];

export const UsersPage = () => {
    const user = useAuthStore(state => state.user);
    const { showError } = useHandleError();
    const [filter, setFilter] = useState<Array<UsersRespose>>();
    const [value, setValue] = useState<UsersRespose | undefined>();

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 1,
        pageSize: 5,
    });

    const dialog = useRef<HTMLDialogElement>(null);
    const dialogAlertDelete = useRef<HTMLDialogElement>(null);
    const dialogAlertReactivar = useRef<HTMLDialogElement>(null);

    const queryClient = useQueryClient();

    const DeleteMutation = useMutation({
        mutationKey: ['DeleteUser'],
        mutationFn: UserService.delete,
    });

    const ReActivateMutation = useMutation({
        mutationKey: ['ReActivateMutation'],
        mutationFn: UserService.reActivate,
    });

    const UpdateMutation = useMutation({
        mutationKey: ['UpdateMutation'],
        mutationFn: UserService.update,
    });

    const onDelete = ({ exit }: { exit: boolean; value?: object | undefined; }) => {
        if (exit && value) {        
            DeleteMutation.mutate(value.id, {
                onSuccess: () => {
                    toast.success('Usuario eliminado');
                    queryClient.invalidateQueries({ queryKey: ['users', pagination.pageSize, pagination.pageIndex] });
                },
                onError: error => {
                    showError({ responseError: error })
                }
            });
        } else {
            setValue(undefined);
        }
    }

    const onReActivate = ({ exit }: { exit: boolean; value?: object | undefined; }) => {
        if (exit && value) {
            ReActivateMutation.mutate(value.id, {
                onSuccess: () => {
                    toast.success('Usuario re-Activado');
                    queryClient.invalidateQueries({ queryKey: ['users', pagination.pageSize, pagination.pageIndex] });
                },
                onError: error => {
                    showError({ responseError: error })
                }
            });
        } else {
            setValue(undefined);
        }
    }

    const onUpdate = (data:UsersRespose) =>{
        const oldData = queryClient.getQueryData<Response>(['users', pagination.pageSize, pagination.pageIndex]);
        const users = oldData?.users.map(f => f.id === data.id ? ({...data,isActive : !data.isActive}): f );
        const newData:Response = {users:users ?? [], meta:oldData?.meta ?? {lastPage:1,page:1,total:1} };
        queryClient.setQueryData(['users', pagination.pageSize, pagination.pageIndex], () => newData);
        UpdateMutation.mutate({id:data.id,user:{isActive:!data.isActive}}, {
            onSuccess: () => {
                toast.success('Usuario actualizado');
                queryClient.invalidateQueries({ queryKey: ['users', pagination.pageSize, pagination.pageIndex] });
            },
            onError: error => {
                showError({ responseError: error })
                queryClient.setQueryData(['users', pagination.pageSize, pagination.pageIndex], () => oldData);
            }
        });
    }

    const { data, isLoading, isFetching, error, refetch } = useQuery({
        queryKey: ['users', pagination.pageSize, pagination.pageIndex],
        queryFn: () => UserService.users(pagination.pageSize, pagination.pageIndex),
        refetchOnWindowFocus: true,
        refetchOnMount:true,
        refetchOnReconnect:true
    });

    const columns = useMemo<ColumnDef<UsersRespose>[]>(() => [
        { accessorKey: 'fullName', header: 'full name' },
        { accessorKey: 'userName', header: 'user' },
        { accessorKey: 'role' },
        { accessorKey: 'isActive', header: 'status' },
        { accessorKey: 'phone', header: 'phone' },
        { header: 'action' },
    ], []);

    const actions = ({ row: { original } }: { row: Row<UsersRespose> }) => {
        return (
            <div className="flex gap-2">
                {
                (!original.isActive && original.deletedAt)
                ?
                <>
                    <IconBtn className="text-yellow-500" children={<Circle />} onClick={() => {
                        setValue(original)
                        dialogAlertReactivar.current?.show()
                        }} />
                </>
                :(original.role!=='master') && 
                <>
                    <IconBtn className={original.isActive?"text-green-500":"text-red-500"} children={<Circle />} onClick={() => onUpdate(original)} />
                    <IconBtn className="text-red-500" children={<Delete />} onClick={() => {
                        setValue(original)
                        dialogAlertDelete.current?.show()
                        }} />
                    <IconBtn className="text-blue-500" children={<Pencil />} onClick={() => {}} />
                </>
                }
            </div>
        )
    }

    if (!isFetching && !isLoading && error) showError({ responseError: error, exit: true });

    return (user?.role === TypeUser.user)
        ? <Navigate to="/home" />
        :
        <article className="flex-1 flex flex-col px-1">
            <Portal refElement={dialog} onClosed={(close) => close && dialog.current?.close()} >
                <CreateUserModalContent dialog={dialog} onSuccess={({ exit }) => { if(exit) refetch() }} />
            </Portal>
            <Portal refElement={dialogAlertDelete} onClosed={(close) => {
                if(close) dialogAlertDelete.current?.close();
                setValue(undefined);
            }}>
                <AlertModalContent dialog={dialogAlertDelete} btnlabelCanel = "No, cancel" btnlabelConfirm="Yes, I'm sure" type="error" label="Are you sure you want to delete this user?" Icon={<Delete className="mx-auto mb-4 w-12 h-12 mt-10" />} onSuccess={onDelete} />
            </Portal>
            <Portal refElement={dialogAlertReactivar} onClosed={(close) => {
                if(close) dialogAlertReactivar.current?.close();
                setValue(undefined);
            }}>
                <AlertModalContent dialog={dialogAlertReactivar} btnlabelCanel = "No, cancel" btnlabelConfirm="Yes, I'm sure" type="alert" label="Are you sure you want to hability this user?" Icon={<Question className="mx-auto mb-4 w-12 h-12 mt-10" />} onSuccess={onReActivate} />
            </Portal>
            <header className="flex w-full m-1 h-16 items-center justify-between">
                <h1 className="text-4xl font-semibold" >Users</h1>
                <Button className="flex gap-2 items-center" onClick={() => dialog.current?.show()}>
                    <AddUser />
                    Add user
                </Button>
            </header>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="flex items-center justify-end flex-column flex-wra md:space-y-0 p-3 bg-slate-50 dark:bg-slate-900">
                    <Input
                        classNameContent='scale-up-horizontal-right'
                        styleField={{ height: '35px' }}
                        leading={<Search />}
                        autoComplete="none"
                        name="filter"
                        placeholder="Search user"
                        onChange={({ target: { value } }) => {
                            if (value.length > 0)
                                setFilter(data?.users.filter(user => user.fullName.toLowerCase().includes(value)))
                            else {
                                setPagination({ pageIndex: 1, pageSize: Rows[0].value });
                                setFilter(undefined);
                            }
                        }}
                    />
                </div>
                <Table {...{
                    KeyName: "user-table",
                    columns,
                    data: filter ?? data?.users ?? [],
                    onValue: setValue,
                    renderSubComponent: actions
                }} />
                <div className="text-sm text-gray-700 bg-slate-300 dark:bg-slate-950 dark:text-slate-300 sticky flex justify-end items-center py-4 gap-3 px-4">
                    <Text>Rows per page:</Text>
                    <SimpleSelect selected={Rows.find(e => e.value === pagination.pageSize)?.label ?? ""} options={Rows} onSelect={(value) => setPagination({ ...pagination, pageSize: value.value })} />
                    <Text>{`${data?.meta.page}-${pagination.pageSize} of ${data?.meta.lastPage}`}</Text>
                    <IconBtn onClick={() => setPagination({ ...pagination, pageIndex: pagination.pageIndex - 1 })} children={<CheveronLeft />} />
                    <IconBtn onClick={() => setPagination({ ...pagination, pageIndex: pagination.pageIndex + 1 })} children={<CheveronLeft className="rotate-180" />} />
                </div>
            </div>
        </article >
};
