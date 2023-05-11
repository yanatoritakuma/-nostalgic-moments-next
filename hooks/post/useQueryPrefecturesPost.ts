import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { TError } from '@/types/error';
import { TPost } from '@/types/post';

export const useQueryPrefecturesPost = (prefecture: string) => {
  const getPrefecturesPost = async () => {
    const { data } = await axios.get<TPost[]>(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/prefecture/${prefecture}`
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
