import { tcApi } from "../api/server.api";
import { DeviceGroupResponse } from '../interfaces/service.interface';

export class DeviceGroupService {
    static groups = async (): Promise<Array<DeviceGroupResponse>> => {
        const { data } = await tcApi.get<Array<DeviceGroupResponse>>(`/device-group`);
        return data;
    }

    static create = async (name: string): Promise<DeviceGroupResponse> => {
        const { data } = await tcApi.post<DeviceGroupResponse>(`/device-group`, { name });
        return data;
    }

    static update = async ({id,name}:{id: string, name: string}): Promise<DeviceGroupResponse> => {
        const { data } = await tcApi.patch<DeviceGroupResponse>(`/device-group/${id}`, { name });
        return data;
    }
}