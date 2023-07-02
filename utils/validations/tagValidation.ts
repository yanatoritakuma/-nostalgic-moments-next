import { MessageContext } from '@/provider/MessageProvider';
import { useContext } from 'react';
import validator from 'validator';

export const tagValidation = () => {
  const { message, setMessage } = useContext(MessageContext);

  const tagVali = (tag: string, tagArray: string[]) => {
    if (validator.isEmpty(tag)) {
      return setMessage({
        ...message,
        text: '空文字は追加できません。',
        type: 'error',
      });
    } else if (!validator.isLength(tag, { max: 30 })) {
      return setMessage({
        ...message,
        text: '30文字以内で入力してください。',
        type: 'error',
      });
    } else if (tagArray.length >= 10) {
      return setMessage({
        text: 'タグは最大で10個までしか追加できません。',
        type: 'error',
      });
    } else if (tagArray.includes(tag)) {
      return setMessage({
        text: '同じ名前のタグは追加できません。',
        type: 'error',
      });
    } else {
      return true;
    }
  };

  return { tagVali };
};
