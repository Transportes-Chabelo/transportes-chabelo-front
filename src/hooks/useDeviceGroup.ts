import { useMutation, useQuery } from "@tanstack/react-query";
import { DeviceGroupService } from "../services/device-group.service";

export function useGroupDevice(){
    return useQuery({
        queryKey: ['device-group'],
        queryFn: () => DeviceGroupService.groups(),
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true,
    });
}

export function useGroupDeviceCreate() {
    return useMutation({ mutationKey: ['createDeviceGroup'], mutationFn: DeviceGroupService.create });
}

export function useGroupDeviceUpdate() {
    return useMutation({ mutationKey: ['updateDeviceGroup'], mutationFn: DeviceGroupService.update });
}