import { MessageContext } from '@/provider/MessageProvider';
import { useContext } from 'react';

export const tagValidation = () => {
  const { message, setMessage } = useContext(MessageContext);

  const tagVali = (tag: string, tagArray: string[]) => {
    if (tag === '') {
      return setMessage({
        ...message,
        text: '空文字は追加できません。',
        type: 'error',
      });
    } else if (tag.length > 30) {
      return setMessage({
        ...message,
        text: '30文字以内で入力してください。',
        type: 'error',
      });
    } else if (tagArray.length >= 10) {
      return setMessage({
        text: 'タグは最大で10個までしか登録できません。',
        type: 'error',
      });
    } else {
      return true;
    }
  };

  return { tagVali };
};
