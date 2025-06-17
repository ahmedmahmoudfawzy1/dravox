import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from '../api/auth';

export const useUser = () => {
    return useQuery({
        queryKey: ['user'],
        queryFn: getUserProfile,
    });
};
