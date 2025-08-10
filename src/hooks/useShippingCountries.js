


import { useQuery } from "@tanstack/react-query"
import { getAllshippingCountries } from "../api/shippingCountries"

export const useShippingCountries = () => {
    return useQuery({
        queryKey: ["shipping-countries"],
        queryFn: getAllshippingCountries,
    })
} 