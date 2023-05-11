import axios from 'axios';

import { useMutation } from '@tanstack/react-query';
import { TReqPost } from '@/types/post';
import { BackdropContext } from '@/provider/BackdropProvider';
import { useContext } from 'react';
import { MessageContext } from '@/provider/MessageProvider';

export const useMutatePost = () => {
  const { setBackdropFlag } = useContext(BackdropContext);
  const { setMessage } = useContext(MessageContext);

  const postMutation = useMutation(
    async (reqPost: TReqPost) =>
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/posts`, reqPost),
    {
      onSuccess: () => {
        setBackdropFlag(false);
        setMessage({
          text: '登録完了',
          type: 'success',
        });
      },
      onError: () => {
        setMessage({
          text: '登録失敗しました。',
          type: 'error',
        });
      },
    }
  );

  return { postMutation };
};
