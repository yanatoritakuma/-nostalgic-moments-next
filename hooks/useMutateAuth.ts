import axios from 'axios';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { TLogin, TRegister } from '@/types/auth';
import { TError } from '@/types/error';
import { useQueryUser } from '@/hooks/useQueryUser';

export const useMutateAuth = () => {
  const router = useRouter();
  const { refetch: userRefetch } = useQueryUser();

  const loginMutation = useMutation(
    async (user: TLogin) => await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, user),
    {
      onSuccess: () => {
        userRefetch();
        router.push('/');
      },
      onError: () => {
        alert('ログインに失敗しました。');
      },
    }
  );

  const registerMutation = useMutation(
    async (user: TRegister) => await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/signup`, user),
    {
      onError: () => {
        alert('アカウント作成に失敗しました。');
      },
    }
  );

  const logoutMutation = useMutation(
    async () => await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/logout`),
    {
      onSuccess: () => {
        router.push('/');
      },
      onError: (err: TError) => {
        if (err.response.data.message) {
          alert('ログアウトに失敗しました。');
        }
      },
    }
  );
  return { loginMutation, registerMutation, logoutMutation };
};
