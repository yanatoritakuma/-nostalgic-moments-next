import { useContext } from 'react';
import { MessageContext } from '@/provider/MessageProvider';

export const postCommentValidation = () => {
  const { message, setMessage } = useContext(MessageContext);

  const postCommentValid = (postComment: string) => {
    if (postComment === '') {
      return setMessage({
        ...message,
        text: 'コメントは必須です。',
        type: 'error',
      });
    } else if (postComment.length > 50) {
      return setMessage({
        ...message,
        text: '50文字以下で入力してください。',
        type: 'error',
      });
    } else {
      return true;
    }
  };

  return { postCommentValid };
};
