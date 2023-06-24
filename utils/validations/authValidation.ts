import { MessageContext } from '@/provider/MessageProvider';
import { TRegister } from '@/types/auth';
import { useContext } from 'react';
import validator from 'validator';

export const authValidation = () => {
  const { message, setMessage } = useContext(MessageContext);

  const validation = (register: TRegister, login: boolean) => {
    if (register.email === '') {
      return setMessage({
        ...message,
        text: 'メールアドレスは必須です。',
        type: 'error',
      });
    } else if (register && !validator.isEmail(register.email)) {
      return setMessage({
        ...message,
        text: 'メールアドレスの形式が正しくありません。',
        type: 'error',
      });
    } else if (register.password === '') {
      return setMessage({
        ...message,
        text: 'パスワードは必須です。',
        type: 'error',
      });
    } else if (register.name === '' && !login) {
      return setMessage({
        ...message,
        text: '名前は必須です。',
        type: 'error',
      });
    } else if (register.name.length > 30) {
      return setMessage({
        ...message,
        text: '名前は30文字以下で入力してください。',
        type: 'error',
      });
    } else {
      return true;
    }
  };

  return { validation };
};
