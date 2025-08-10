import { useQueries, useQuery } from "@tanstack/react-query"
import { seoCongig } from "../api/dravoxConfig"



export const useConfig = () => {
    return useQuery({
        queryKey: ["metaConfig"],
        queryFn: seoCongig
    })
}