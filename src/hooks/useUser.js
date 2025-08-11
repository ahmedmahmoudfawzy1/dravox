import { useQuery } from '@tanstack/react-query';
import { getUserAccount, getUserProfile } from '../api/auth';
import { getUserInfo } from '../api/userInfo';
import useAuthStore from '../store/authStore';

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


// userInfo



export const useUserInfo = () => {
    return useQuery({
        queryKey: ["userInfo"],
        queryFn: getUserInfo
    })
}