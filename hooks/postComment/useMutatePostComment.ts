import axios from 'axios';

import { useMutation } from '@tanstack/react-query';
import { BackdropContext } from '@/provider/BackdropProvider';
import { useContext } from 'react';
import { MessageContext } from '@/provider/MessageProvider';
import { TReqPostComment } from '@/types/postComment';

export const useMutatePostComment = () => {
  const { setBackdropFlag } = useContext(BackdropContext);
  const { setMessage } = useContext(MessageContext);

  const postCommentMutation = useMutation(
    async (reqPostComment: TReqPostComment) =>
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/postComment`, reqPostComment),
    {
      onSuccess: () => {
        setBackdropFlag(false);
        setMessage({
          text: 'コメントしました。',
          type: 'success',
        });
      },
      onError: () => {
        setBackdropFlag(false);
        setMessage({
          text: 'コメント失敗しました。',
          type: 'error',
        });
      },
    }
  );

  const deletePostCommentMutation = useMutation(
    async (id: number) =>
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/postComment/${id}`),
    {
      onSuccess: () => {
        setBackdropFlag(false);
        setMessage({
          text: 'コメント削除完了',
          type: 'success',
        });
      },
      onError: () => {
        setBackdropFlag(false);
        setMessage({
          text: 'コメント削除失敗しました。',
          type: 'error',
        });
      },
    }
  );

  return { postCommentMutation, deletePostCommentMutation };
};
