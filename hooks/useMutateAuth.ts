import axios from 'axios';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { TLogin, TRegister } from '@/types/auth';
import { TError } from '@/types/error';
import { useQueryUser } from '@/hooks/useQueryUser';
import { MessageContext } from '@/provider/MessageProvider';
import { useContext } from 'react';
import { BackdropContext } from '@/provider/BackdropProvider';

export const useMutateAuth = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { refetch: userRefetch } = useQueryUser();
  const { message, setMessage } = useContext(MessageContext);
  const { setBackdropFlag } = useContext(BackdropContext);

  const loginMutation = useMutation(
    async (user: TLogin) => await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, user),
    {
      onSuccess: () => {
        userRefetch();
        router.push('/');
      },
      onError: () => {
        setMessage({
          ...message,
          text: 'ログインに失敗しました。',
          type: 'error',
        });
      },
    }
  );

  const registerMutation = useMutation(
    async (user: TRegister) => await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/signup`, user),
    {
      onSuccess: () => {
        setBackdropFlag(false);
      },
      onError: () => {
        setMessage({
          ...message,
          text: 'アカウント作成に失敗しました。',
          type: 'error',
        });
      },
    }
  );

  const logoutMutation = useMutation(
    async () => await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/logout`),
    {
      onSuccess: () => {
        queryClient.clear();
        router.push('/');
        setTimeout(() => {
          router.reload();
        }, 500);
      },
      onError: (err: TError) => {
        if (err.response.data.message) {
          setMessage({
            ...message,
            text: 'ログアウトに失敗しました。',
            type: 'error',
          });
        }
      },
    }
  );
  return { loginMutation, registerMutation, logoutMutation };
};
