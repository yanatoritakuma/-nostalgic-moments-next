import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { TError } from '@/types/error';
import { TPostPages } from '@/types/post';

export const useQueryTagPost = (
  tag: string,
  page: number,
  pageSize: number,
  userId: number | undefined
) => {
  const getTagPost = async () => {
    const { data } = await axios.get<TPostPages>(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/tagName/${tag}?page=${page}&pageSize=${pageSize}&userId=${userId}`
    );
    return data;
  };
  return useQuery({
    queryKey: ['tagPost'],
    queryFn: getTagPost,
    onError: (err: TError) => {
      if (err.response.status === 401 || err.response.status === 403) {
        console.error('タグ検索の投稿取得失敗');
      }
    },
  });
};
