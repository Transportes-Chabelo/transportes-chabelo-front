import { tcApi } from "../api/server.api";
import { BranchesRespose, propsBranchCreate } from '../interfaces/service.interface';

export interface Response {
    branches: Array<BranchesRespose>;
}
export class BranchService {
    static branch = async (id: string): Promise<BranchesRespose> => {
        const { data } = await tcApi.get<BranchesRespose>(`/branch/${id}`);
        return data;
    }

    static branches = async (): Promise<Response> => {
        const { data } = await tcApi.get<Response>(`/branch`);
        return data;
    }

    static create = async (props: propsBranchCreate): Promise<Response> => {
        const { data } = await tcApi.post<Response>(`/branch`, props);
        return data;
    }

    static update = async ({ id, props }: { id: string, props: propsBranchCreate }): Promise<Response> => {
        const { data } = await tcApi.patch<Response>(`/branch/${id}`, props);
        return data;
    }
}