import { useEffect, useMemo, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { TypeUser, UsersRespose } from "../../interfaces";
import { useAuthStore } from "../../stores";
import { AddUser, CheveronLeft, Delete, Search } from "../icons/icons";
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


const Rows: Array<PropsSelect<number>> = [
    { label: '5', value: 5 },
    { label: '10', value: 10 },
    { label: '15', value: 15 },
    { label: '100', value: 100 },
];

export const UsersPage = () => {
    const user = useAuthStore(state => state.user);
    const { showError } = useHandleError();
    const [filter, setFilter] = useState<Array<UsersRespose>>();
    const [value, setValue] = useState<UsersRespose | undefined>();

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: Rows[0].value,
    });

    const dialog = useRef<HTMLDialogElement>(null);
    const dialogAlert = useRef<HTMLDialogElement>(null);

    const queryClient = useQueryClient();

    const { data, isLoading, isFetching, error, refetch } = useQuery({
        queryKey: ['users', pagination.pageSize, pagination.pageIndex],
        queryFn: () => UserService.users(pagination.pageSize, pagination.pageIndex),
        refetchOnWindowFocus: true
    });

    const columns = useMemo<ColumnDef<UsersRespose>[]>(() => [
        { accessorKey: 'fullName', header: 'full name' },
        { accessorKey: 'userName', header: 'user' },
        { accessorKey: 'role' },
        { accessorKey: 'isActive', header: 'status' },
        { header: 'action' },
    ], []);

    const actions = ({ row: { original } }: { row: Row<UsersRespose> }) => {
        return (
            <div className="flex gap-2">
                <IconBtn className="text-red-500" children={<Delete />} onClick={() => setValue(original)} />
            </div>
        )
    }

    const DeleteMutation = useMutation({
        mutationKey: ['DeleteUser'],
        mutationFn: UserService.delete,
    });

    const onDelete = ({ exit }: { exit: boolean; value?: object | undefined; }) => {
        if (exit && value) {
            const oldData = queryClient.getQueryData<Array<UsersRespose>>(['users', pagination.pageSize, pagination.pageIndex]);
            queryClient.setQueryData(['users', pagination.pageSize, pagination.pageIndex], () => oldData?.filter(user => user.id !== value.id));
            DeleteMutation.mutate(value.id, {
                onSuccess: () => {
                    toast.success('Usuario eliminado');
                    queryClient.invalidateQueries({ queryKey: ['users', pagination.pageSize, pagination.pageIndex] });
                },
                onError: error => {
                    showError({ responseError: error })
                    queryClient.setQueryData(['users', pagination.pageSize, pagination.pageIndex], () => oldData);
                }
            });
        } else {
            setValue(undefined);
        }
    }

    if (!isFetching && !isLoading && error) showError({ responseError: error, exit: true });

    useEffect(() => {
        value && dialogAlert.current?.show();
    }, [value]);

    return (user?.role === TypeUser.user)
        ? <Navigate to="/home" />
        :
        <article className="flex-1 flex flex-col px-1">
            <Portal refElement={dialog} onClosed={(close) => close && dialog.current?.close()} >
                <CreateUserModalContent dialog={dialog} onSuccess={({ exit }) => { exit && refetch() }} />
            </Portal>
            <Portal refElement={dialogAlert} onClosed={(close) => {
                close && dialogAlert.current?.close();
                setValue(undefined);
            }}>
                <AlertModalContent dialog={dialogAlert} btnlabelCanel="No, cancel" btnlabelConfirm="Yes, I'm sure" type="error" label="Are you sure you want to delete this user?" Icon={<Delete classname="mx-auto mb-4 w-12 h-12 mt-10" />} onSuccess={onDelete} />
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
                                setFilter(data?.filter(user => user.fullName.toLowerCase().includes(value)))
                            else {
                                setPagination({ pageIndex: 0, pageSize: Rows[0].value });
                                setFilter(undefined);
                            }
                        }}
                    />
                </div>
                <Table {...{
                    key: "user-table",
                    columns,
                    data: filter ?? data ?? [],
                    onValue: setValue,
                    renderSubComponent: actions,
                }} />
                <div className="flex justify-end items-center py-4 gap-3 px-4">
                    <Text>Rows per page:</Text>
                    <SimpleSelect selected={Rows.find(e => e.value === pagination.pageSize)?.label ?? ""} options={Rows} onSelect={(value) => setPagination({ ...pagination, pageSize: value.value })} />
                    <Text>{`${pagination.pageIndex}–${pagination.pageIndex + pagination.pageSize} of ${(filter ?? data ?? []).length}`}</Text>
                    <IconBtn onClick={() => (pagination.pageIndex !== 0) && setPagination({ ...pagination, pageIndex: (pagination.pageIndex - pagination.pageSize < 0) ? 0 : pagination.pageIndex - pagination.pageSize })} children={<CheveronLeft />} />
                    <IconBtn onClick={() => (data?.length === pagination.pageSize) && setPagination({ ...pagination, pageIndex: pagination.pageIndex + pagination.pageSize })} children={<CheveronLeft classname="rotate-180" />} />
                </div>
            </div>
        </article >
};
