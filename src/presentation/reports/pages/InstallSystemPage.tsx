import { useQuery } from "@tanstack/react-query";
import { useHandleError } from "../../../hooks";
import { ReportService } from "../../../services";
import { Loader } from "../../components/Loader";
import { Account } from "../../../interfaces";
import { Button } from "../../components/Button";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { Table } from "../../components/Table";

export const InstallSystemPage = () => {
    const { showError } = useHandleError();

    const columns = useMemo<ColumnDef<Account>[]>(() => [
        { accessorKey: 'Nombre', header: 'Name' },
        { accessorKey: 'CodigoAbonado', header: 'Subscriber' },
        { accessorKey: 'CodigoCte', header: "Client" },
        { accessorKey: 'panel.Modelo' },
    ], []);

    const { isLoading, isFetching, error, data, refetch } = useQuery({
        queryKey: ['istalledSystem'],
        queryFn: ReportService.installerSystems
    });

    if (!isFetching && !isLoading && error) showError({ responseError: error });

    return (
        <article className="container-is px-4 overflow-auto">
            <header className="flex justify-between">
                <h1 className="text-4xl font-semibold" >Installed systems</h1>
                <Button loading={isFetching} children="Refresh" onClick={() => refetch()} />
            </header>
            {
                (isLoading)
                    ? <Loader text="Loading ..." />
                    :
                    <section className="flex gap-4 py-4 flex-wrap">
                        <div className="flex-1">
                            <Table {...{
                                key: "with-panel",
                                columns,
                                maxHeight: 500,
                                shadow: true,
                                data: data?.accounts.filter(account => account.panel.Modelo) ?? [],
                                useInternalPagination: true,
                                header: { title: "Installed systems" }
                            }} />
                        </div>
                        <div className="flex-1">
                            <Table {...{
                                key: "without-panel",
                                columns,
                                maxHeight: 500,
                                shadow: true,
                                data: data?.accounts.filter(account => !account.panel.Modelo) ?? [],
                                useInternalPagination: true,
                                header: { title: "No registered system" }
                            }} />
                        </div>
                    </section>
            }
        </article >
    )
};