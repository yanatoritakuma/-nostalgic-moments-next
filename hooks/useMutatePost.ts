import axios from 'axios';

import { useMutation } from '@tanstack/react-query';
import { TReqPost } from '@/types/post';

export const useMutatePost = () => {
  const postMutation = useMutation(
    async (reqPost: TReqPost) =>
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/posts`, reqPost),
    {
      onSuccess: () => {
        alert('登録しました。');
      },
      onError: () => {
        alert('登録に失敗しました。');
      },
    }
  );

  return { postMutation };
};
