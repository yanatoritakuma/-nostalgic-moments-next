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
        setBackdropFlag(false);
        setMessage({
          text: '登録失敗しました。',
          type: 'error',
        });
      },
    }
  );

  const updatePostMutation = useMutation(
    async (reqPost: TReqPost) =>
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/posts/${reqPost.id}`, reqPost),
    {
      onSuccess: () => {
        setBackdropFlag(false);
        setMessage({
          text: '編集完了',
          type: 'success',
        });
      },
      onError: () => {
        setBackdropFlag(false);
        setMessage({
          text: '編集失敗しました。',
          type: 'error',
        });
      },
    }
  );

  const deletePostMutation = useMutation(
    async (id: number) => await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`),
    {
      onSuccess: () => {
        setBackdropFlag(false);
        setMessage({
          text: '削除完了',
          type: 'success',
        });
      },
      onError: () => {
        setBackdropFlag(false);
        setMessage({
          text: '削除失敗しました。',
          type: 'error',
        });
      },
    }
  );

  return { postMutation, updatePostMutation, deletePostMutation };
};
