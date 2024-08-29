import { useMutation } from "@tanstack/react-query";
import { UserService } from '../services';

export function useNewUser() {
    return useMutation({ mutationKey: ['createUser'], mutationFn: UserService.create });
}

export function useUpdateUser() {
    return useMutation({ mutationKey: ['updateUser'], mutationFn: UserService.update });
}