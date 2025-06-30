import { useQuery } from '@tanstack/react-query';
import { getUserAccount, getUserProfile } from '../api/auth';

export const useUser = () => {
    return useQuery({
        queryKey: ['user'],
        queryFn: getUserProfile,
    });
};


export const useGetUserDetails = (token) => {
    return useQuery({
        queryKey: ['userDetails'],
        queryFn: () => getUserAccount(token),
        enabled: !!token
    })
}