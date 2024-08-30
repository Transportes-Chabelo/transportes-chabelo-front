import { TypeUser } from ".";

export interface Meta {
    total: number,
    page: number,
    lastPage: number
}

export interface LoginResponse {
    id: string;
    fullName: string;
    userName: string;
    phone: string;
    role: TypeUser;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    token: string;
}

export type UsersRespose = Omit<LoginResponse, 'token'>

export interface BranchesRespose {
    id: string;
    name: string;
    address: string;
    zipCode: number;
    city: string;
    isActive: string;
    createdAt: string;
}

export interface DeviceGroupResponse{
    id: string;
    name: string;
    createdAt: string;
}

export interface ErrorResponse {
    message: Array<string> | string;
    error: string;
    statusCode: number;
}

export interface propsUserCreate {
    fullName: string;
    userName: string;
    phone?: string;
    password?: string;
    role?: TypeUser;
    isActive?: boolean;
}

export type UpdateUser<T> = {
    [P in keyof T]?: T[P];
}