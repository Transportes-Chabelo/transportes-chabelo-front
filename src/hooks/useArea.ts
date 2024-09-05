import { useMutation, useQuery } from "@tanstack/react-query";
import { AreaService } from "../services";

export function useArea() {
    return useQuery({ queryKey: ['areas'], queryFn: () => AreaService.areas() });
}

export function useAreaCreate() {
    return useMutation({ mutationKey: ['createArea'], mutationFn: AreaService.create });
}

export function useAreaUpdate() {
    return useMutation({ mutationKey: ['updateArea'], mutationFn: AreaService.update });
}