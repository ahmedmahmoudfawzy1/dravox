import { useQuery } from "@tanstack/react-query"
import { getAllSlides } from "../api/slides"

export const useSlides = () => {
    return useQuery({
        queryKey: ["slides"],
        queryFn: getAllSlides,
    })
}   