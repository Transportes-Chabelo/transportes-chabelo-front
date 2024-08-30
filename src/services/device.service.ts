import { tcApi } from "../api/server.api";
import { propsDeviceCreate } from '../interfaces/service.interface';

export class DeviceService {
    static create = async (props:propsDeviceCreate): Promise<any> => {
        const { data } = await tcApi.post<any>(`/device`, props);
        return data;
    }

    static createservice = async (props:{id:string,observation:string}): Promise<any> => {
        const { data } = await tcApi.post<any>(`/service-device`, props);
        return data;
    }

    static update = async ({ id, props }: { id: string, props:any }): Promise<any> => {
        const { data } = await tcApi.patch<any>(`/device/${id}`, props);
        return data;
    }
}