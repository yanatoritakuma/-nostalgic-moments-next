import { useContext } from 'react';
import { MessageContext } from '@/provider/MessageProvider';
import validator from 'validator';

export const postCommentValidation = () => {
  const { message, setMessage } = useContext(MessageContext);

  const postCommentValid = (postComment: string) => {
    if (validator.isEmpty(postComment)) {
      return setMessage({
        ...message,
        text: 'コメントは必須です。',
        type: 'error',
      });
    } else if (!validator.isLength(postComment, { max: 50 })) {
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
