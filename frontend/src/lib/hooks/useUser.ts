import {useQuery} from "@tanstack/react-query";
import {fetchUser} from "@/lib/api/userApi";

export function useUser(){
    return useQuery({
        queryKey:['user'],
        queryFn:fetchUser,
        staleTime: 1000 * 60 * 15,
        gcTime: 1000 * 60 * 60,
        retry:false,
    })
}