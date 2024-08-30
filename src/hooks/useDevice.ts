import { useMutation } from "@tanstack/react-query";
import { DeviceService } from "../services/device.service";

export function useNewDevice() {
    return useMutation({ mutationKey: ['createDevice'], mutationFn: DeviceService.create });
}

export function useNewDeviceservice() {
    return useMutation({ mutationKey: ['createDeviceService'], mutationFn: DeviceService.createservice });
}

export function useUpdateDevice() {
    return useMutation({ mutationKey: ['updateDevice'], mutationFn: DeviceService.update });
}