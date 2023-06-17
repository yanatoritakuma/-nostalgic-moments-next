import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { TError } from '@/types/error';
import { TPostPages } from '@/types/post';

export const useQueryTimeline = (page: number, pageSize: number) => {
  const getTimeline = async () => {
    const { data } = await axios.get<TPostPages>(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/timeLine?page=${page}&pageSize=${pageSize}`
    );
    return data;
  };
  return useQuery({
    queryKey: ['timeLinePost'],
    queryFn: getTimeline,
    onError: (err: TError) => {
      if (err.response.status === 401 || err.response.status === 403) {
        console.error('タイムラインの投稿取得失敗');
      }
    },
  });
};
