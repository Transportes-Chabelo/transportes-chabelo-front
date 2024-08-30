import { useMutation, useQuery } from "@tanstack/react-query";
import { BranchService } from "../services/branch.service";

export function useBranches() {
    return useQuery({ queryKey: ['branches'], queryFn: () => BranchService.branches(), });
}

export function useBranch(id: string) {
    return useQuery({
        queryKey: ['branch', id], queryFn: () => BranchService.branch(id),
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true
    });
}

export function useNewBranch() {
    return useMutation({ mutationKey: ['createBranch'], mutationFn: BranchService.create });
}

export function useUpdateBranch() {
    return useMutation({ mutationKey: ['updateBranch'], mutationFn: BranchService.update });
}