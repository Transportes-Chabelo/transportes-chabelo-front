import { tcApi } from "../api/server.api";
import { BranchesRespose } from '../interfaces/service.interface';

export interface Response {
    branches: Array<BranchesRespose>;
}
export class BranchService {
    static branches = async (): Promise<Response> => {
        const { data } = await tcApi.get<Response>(`/branch`);
        return data;
    }
}