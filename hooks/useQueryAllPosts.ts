import { useRouter } from 'next/router';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { TError } from '@/types/error';

export const useQueryAllPosts = () => {
  const getUser = async () => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts`);
    return data;
  };
  return useQuery({
    queryKey: ['allPosts'],
    queryFn: getUser,
    onError: (err: TError) => {
      if (err.response.status === 401 || err.response.status === 403) {
        console.error('全ての投稿取得失敗');
      }
    },
  });
};
