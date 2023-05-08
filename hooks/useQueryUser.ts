import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { TError } from '@/types/error';

export const useQueryUser = () => {
  const getUser = async () => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user`);
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
