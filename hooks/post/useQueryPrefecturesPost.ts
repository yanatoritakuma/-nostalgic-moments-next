import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { TError } from '@/types/error';
import { TPostPages } from '@/types/post';

export const useQueryPrefecturesPost = (prefecture: string, page: number, pageSize: number) => {
  const getPrefecturesPost = async () => {
    const { data } = await axios.get<TPostPages>(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/prefecture/${prefecture}?page=${page}&pageSize=${pageSize}`
    );
    return data;
  };
  return useQuery({
    queryKey: ['prefecturesPost'],
    queryFn: getPrefecturesPost,
    onError: (err: TError) => {
      if (err.response.status === 401 || err.response.status === 403) {
        console.error('都道府県別の投稿取得失敗');
      }
    },
  });
};
