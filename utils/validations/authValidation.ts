import { MessageContext } from '@/provider/MessageProvider';
import { TRegister } from '@/types/auth';
import { useContext } from 'react';
import validator from 'validator';

export const authValidation = () => {
  const { message, setMessage } = useContext(MessageContext);

  const validation = (register: TRegister, login: boolean) => {
    if (validator.isEmpty(register.email)) {
      return setMessage({
        ...message,
        text: 'メールアドレスは必須です。',
        type: 'error',
      });
    } else if (!validator.isEmail(register.email)) {
      return setMessage({
        ...message,
        text: 'メールアドレスの形式が正しくありません。',
        type: 'error',
      });
    } else if (validator.isEmpty(register.password)) {
      return setMessage({
        ...message,
        text: 'パスワードは必須です。',
        type: 'error',
      });
    } else if (!validator.isLength(register.password, { min: 6, max: 30 })) {
      return setMessage({
        ...message,
        text: 'パスワードは6文字以上30文字以下で入力してください。',
        type: 'error',
      });
    } else if (validator.isEmpty(register.name) && !login) {
      return setMessage({
        ...message,
        text: '名前は必須です。',
        type: 'error',
      });
    } else if (!validator.isLength(register.name, { max: 30 })) {
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
