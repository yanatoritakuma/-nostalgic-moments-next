import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { TError } from '@/types/error';
import { TPostComment } from '@/types/postComment';

export const useQueryPostComment = (postId: number, page: number, pageSize: number) => {
  const getPostComment = async () => {
    const { data } = await axios.get<TPostComment>(
      `${process.env.NEXT_PUBLIC_API_URL}/postComment/${postId}?page=${page}&pageSize=${pageSize}`
    );
    return data;
  };
  return useQuery({
    queryKey: ['postComment'],
    queryFn: getPostComment,
    onError: (err: TError) => {
      if (err.response.status === 401 || err.response.status === 403) {
        console.error('投稿のコメント取得失敗');
      }
    },
  });
};
