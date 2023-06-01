import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { TError } from '@/types/error';
import { TLikeTopTenPosts } from '@/types/post';

export const useQueryLikeTopPost = (userId: number | undefined) => {
  const getLikeTopPosts = async () => {
    const { data } = await axios.get<TLikeTopTenPosts>(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/likeTopTen?userId=${userId}`
    );
    return data;
  };
  return useQuery({
    queryKey: ['likeTopPosts'],
    queryFn: getLikeTopPosts,
    onError: (err: TError) => {
      if (err.response.status === 401 || err.response.status === 403) {
        console.error('いいねTOPの投稿取得失敗');
      }
    },
  });
};
