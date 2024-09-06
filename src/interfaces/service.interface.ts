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
    isActive: boolean;
    createdAt: string;
    devices?: Array<DeviceResponse>
}

export interface DeviceGroupResponse {
    id: string;
    name: string;
    createdAt: string;
}

export interface AreaResponse {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}

export interface DeviceResponse {
    id: string;
    name: string;
    brand: string;
    model: string;
    barCode: string;
    price: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    holderDeviceId?: string,
    DeviceGroup: DeviceGroupResponse
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
    role?: any;
    isActive?: boolean;
}

export interface propsBranchCreate {
    name: string;
    address?: string;
    zipCode?: number;
    city?: string;
    isActive?: boolean;
}

export interface propsFormDeviceCreate {
    name: string;
    brand: string;
    model: string;
    barCode?: string;
    price?: number;
    status: { label: string, value: any };
    deviceGroupId: { label: string, value: any };
    deviceId?: string;
    branchId: string;
}

export interface propsDeviceCreate {
    name: string;
    brand: string;
    model: string;
    barCode?: string;
    price?: number;
    status: string;
    deviceGroupId: string;
    deviceId?: string;
    branchId: string;
}

export interface propsDeviceCreateU {
    name: string;
    brand: string;
    model: string;
    barCode?: string;
    price?: number;
    status: { label: string, value: any };
    deviceGroupId: { label: string, value: any };
    deviceId?: string;
    branchId: string;
}

export type UpdateUser<T> = {
    [P in keyof T]?: T[P];
}