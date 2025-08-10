import { useQuery } from "@tanstack/react-query"
import { getPopup } from "../api/popup"




export const usePopup = () => {
    return useQuery({
        queryKey: ["popup"],
        queryFn: getPopup
    })
}