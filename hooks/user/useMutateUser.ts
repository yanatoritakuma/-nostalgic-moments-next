import axios from 'axios';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MessageContext } from '@/provider/MessageProvider';
import { useContext } from 'react';
import { BackdropContext } from '@/provider/BackdropProvider';
import { TReqUser, TUser } from '@/types/user';
import { useRouter } from 'next/router';

export const useMutateUser = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { message, setMessage } = useContext(MessageContext);
  const { setBackdropFlag } = useContext(BackdropContext);

  const updateUserMutation = useMutation(
    async (user: TReqUser) => await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/user`, user),
    {
      onSuccess: (res) => {
        const previousUser = queryClient.getQueryData<TUser>(['user']);
        if (previousUser) {
          queryClient.setQueryData(['user'], res.data);
        }
        setBackdropFlag(false);
        setMessage({
          ...message,
          text: 'ユーザー情報変更完了',
          type: 'success',
        });
      },
      onError: () => {
        setBackdropFlag(false);
        setMessage({
          ...message,
          text: 'ユーザー情報変更に失敗しました。',
          type: 'error',
        });
      },
    }
  );

  const deleteUserMutation = useMutation(
    async (id: number) => await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/user/${id}`),
    {
      onSuccess: () => {
        queryClient.clear();
        router.push('/');
        setBackdropFlag(false);
        setMessage({
          text: 'アカウント削除完了',
          type: 'success',
        });
      },
      onError: () => {
        setBackdropFlag(false);
        setMessage({
          text: 'アカウント削除失敗しました。',
          type: 'error',
        });
      },
    }
  );

  return { updateUserMutation, deleteUserMutation };
};
