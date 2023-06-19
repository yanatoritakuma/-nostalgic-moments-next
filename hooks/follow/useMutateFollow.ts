import axios from 'axios';

import { useMutation } from '@tanstack/react-query';
import { BackdropContext } from '@/provider/BackdropProvider';
import { useContext } from 'react';
import { MessageContext } from '@/provider/MessageProvider';
import { TReqFollow } from '@/types/follow';

export const useMutateFollow = () => {
  const { setBackdropFlag } = useContext(BackdropContext);
  const { setMessage } = useContext(MessageContext);

  const followMutation = useMutation(
    async (reqFollow: TReqFollow) =>
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/follows`, reqFollow),
    {
      onSuccess: () => {
        setBackdropFlag(false);
        setMessage({
          text: 'フォロー完了',
          type: 'success',
        });
      },
      onError: () => {
        setBackdropFlag(false);
        setMessage({
          text: 'フォロー失敗しました。',
          type: 'error',
        });
      },
    }
  );

  const deleteFollowMutation = useMutation(
    async (id: number) => await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/follows/${id}`),
    {
      onSuccess: () => {
        setBackdropFlag(false);
        setMessage({
          text: 'フォロー解除しました。',
          type: 'success',
        });
      },
      onError: () => {
        setBackdropFlag(false);
        setMessage({
          text: 'フォロー解除に失敗しました。',
          type: 'error',
        });
      },
    }
  );

  return { followMutation, deleteFollowMutation };
};
