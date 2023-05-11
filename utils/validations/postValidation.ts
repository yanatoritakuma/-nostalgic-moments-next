import { MessageContext } from '@/provider/MessageProvider';
import { TReqPost } from '@/types/post';
import { useContext } from 'react';

export const postValidation = () => {
  const { message, setMessage } = useContext(MessageContext);

  const validation = (post: TReqPost) => {
    if (post.title === '') {
      return setMessage({
        ...message,
        text: 'タイトルは必須です。',
        type: 'error',
      });
    } else if (post.title.length > 50) {
      return setMessage({
        ...message,
        text: 'タイトルは50文字以下で入力してください。',
        type: 'error',
      });
    } else if (post.text === '') {
      return setMessage({
        ...message,
        text: '内容は必須です。',
        type: 'error',
      });
    } else if (post.text.length > 150) {
      return setMessage({
        ...message,
        text: '内容は150文字以下で入力してください。',
        type: 'error',
      });
    } else if (post.prefecture === '') {
      return setMessage({
        ...message,
        text: '都道府県は必須です。',
        type: 'error',
      });
    } else if (post.address === '') {
      return setMessage({
        ...message,
        text: '住所は必須です。',
        type: 'error',
      });
    } else {
      return true;
    }
  };

  return { validation };
};
