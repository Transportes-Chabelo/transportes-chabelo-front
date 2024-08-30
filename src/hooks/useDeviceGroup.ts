import { useMutation } from "@tanstack/react-query";
import { DeviceGroupService } from "../services/device-group.service";

export function useGroupDeviceCreate() {
    return useMutation({ mutationKey: ['createDeviceGroup'], mutationFn: DeviceGroupService.create });
}

export function useGroupDeviceUpdate() {
    return useMutation({ mutationKey: ['updateDeviceGroup'], mutationFn: DeviceGroupService.update });
}