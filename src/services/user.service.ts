import { tcApi } from "../api/server.api";
import { Meta, UpdateUser, UsersRespose, propsUserCreate } from "../interfaces";

export interface Response {users:Array<UsersRespose>, meta:Meta}

export class UserService {
    static users = async (limit: number = 5, page: number = 0): Promise<Response> => {
        const { data } = await tcApi.get<Response>(`/user`, { params: { limit, page } });
        return data;
    }

    static create = async (props: propsUserCreate): Promise<UsersRespose> => {
        const { data } = await tcApi.post<UsersRespose>('/user', props);
        return data;
    }

    static delete = async (id: string) => {
        const { data } = await tcApi.delete<boolean>(`/user/${id}`);
        return data;
    }

    static reActivate = async (id: string) => {
        const { data } = await tcApi.get<boolean>(`/user/re-activate/${id}`);
        return data;
    }

    static update = async ({ id, user }: { id: string, user: UpdateUser<propsUserCreate> }) => {
        const { data } = await tcApi.patch<UsersRespose>(`/user/${id}`, user);
        return data;
    }

}