import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { TError } from '@/types/error';
import { TResFollow } from '@/types/follow';

export const useQueryFollow = (page: number, pageSize: number) => {
  const getFollow = async () => {
    const { data } = await axios.get<TResFollow>(
      `${process.env.NEXT_PUBLIC_API_URL}/follows?page=${page}&pageSize=${pageSize}`
    );
    return data;
  };
  return useQuery({
    queryKey: ['follow'],
    queryFn: getFollow,
    onError: (err: TError) => {
      if (err.response.status === 401 || err.response.status === 403) {
        console.error('フォロー情報の取得失敗');
      }
    },
  });
};
