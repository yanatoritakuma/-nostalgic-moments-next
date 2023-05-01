import axios from 'axios';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';

export const useMutateAuth = () => {
  const router = useRouter();
  const loginMutation = useMutation(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (user: any) => await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, user),
    {
      onSuccess: () => {
        router.push('/');
      },
      onError: (err) => {
        alert('ログインに失敗しました。');
      },
    }
  );

  const registerMutation = useMutation(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (user: any) => await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/signup`, user),
    {
      onError: (err) => {
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (err: any) => {
        if (err.response.data.message) {
          alert('ログアウトに失敗しました。');
        }
      },
    }
  );
  return { loginMutation, registerMutation, logoutMutation };
};
