import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { TError } from '@/types/error';

export const useQueryUserPost = () => {
  const getUser = async () => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts/userPosts`);
    return data;
  };
  return useQuery({
    queryKey: ['userPost'],
    queryFn: getUser,
    onError: (err: TError) => {
      if (err.response.status === 401 || err.response.status === 403) {
        console.error('ログインユーザーの投稿取得失敗');
      }
    },
  });
};
