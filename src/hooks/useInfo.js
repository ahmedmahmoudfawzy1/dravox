import { useQuery } from "@tanstack/react-query"
import { dravoxInfo } from "../api/dravoxInformations"



export const useInfo = () => {
    return useQuery({
        queryKey: ["siteInfo"],
        queryFn: dravoxInfo
    })
}