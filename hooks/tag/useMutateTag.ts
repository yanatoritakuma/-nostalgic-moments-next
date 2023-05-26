import axios from 'axios';

import { useMutation } from '@tanstack/react-query';
import { BackdropContext } from '@/provider/BackdropProvider';
import { useContext } from 'react';
import { MessageContext } from '@/provider/MessageProvider';
import { TReqTag } from '@/types/tag';

export const useMutateTag = () => {
  const { setBackdropFlag } = useContext(BackdropContext);
  const { setMessage } = useContext(MessageContext);

  const tagMutation = useMutation(
    async (reqTag: TReqTag[]) =>
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/tags`, reqTag),
    {
      onSuccess: () => {
        console.log('タグ登録完了');
      },
      onError: () => {
        setBackdropFlag(false);
        setMessage({
          text: 'タグ登録失敗しました。',
          type: 'error',
        });
      },
    }
  );

  const deleteTagMutation = useMutation(
    async (ids: number[]) =>
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/tags`, { data: { ids } }),
    {
      onSuccess: () => {
        console.log('タグ削除完了');
      },
      onError: () => {
        setBackdropFlag(false);
        setMessage({
          text: 'タグ削除失敗しました。',
          type: 'error',
        });
      },
    }
  );

  return { tagMutation, deleteTagMutation };
};
