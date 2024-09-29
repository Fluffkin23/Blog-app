import { useSession } from 'next-auth/react';

export const useAuthSession = () => {
    const { data: session, status } = useSession();

    return { session, status };
};