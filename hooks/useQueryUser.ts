import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { TError } from '@/types/error';
import { TUser } from '@/types/user';

export const useQueryUser = () => {
  const getUser = async () => {
    const { data } = await axios.get<TUser>(`${process.env.NEXT_PUBLIC_API_URL}/user`);
    return data;
  };
  return useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    onError: (err: TError) => {
      if (err.response.status === 401 || err.response.status === 403) {
        console.error('未ログイン');
      }
    },
  });
};
