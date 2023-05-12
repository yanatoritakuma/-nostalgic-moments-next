import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { TError } from '@/types/error';
import { TPostPages } from '@/types/post';

export const useQueryUserPost = (page: number, pageSize: number) => {
  const getUser = async () => {
    const { data } = await axios.get<TPostPages>(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/userPosts?page=${page}&pageSize=${pageSize}`
    );
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
