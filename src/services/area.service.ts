import { tcApi } from "../api/server.api";
import { AreaResponse } from '../interfaces/service.interface';

export class AreaService {
    static areas = async (): Promise<Array<AreaResponse>> => {
        const { data } = await tcApi.get<Array<AreaResponse>>(`/area`);
        return data;
    }

    static create = async (name: string): Promise<AreaResponse> => {
        const { data } = await tcApi.post<AreaResponse>(`/area`, { name });
        return data;
    }

    static update = async ({id,name}:{id: string, name: string}): Promise<AreaResponse> => {
        const { data } = await tcApi.patch<AreaResponse>(`/area/${id}`, { name });
        return data;
    }
}