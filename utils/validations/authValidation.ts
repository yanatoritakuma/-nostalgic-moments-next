import { MessageContext } from '@/provider/MessageProvider';
import { TRegister } from '@/types/auth';
import { useContext } from 'react';

export const authValidation = () => {
  const { message, setMessage } = useContext(MessageContext);

  const validation = (register: TRegister, login: boolean) => {
    if (register.email === '') {
      return setMessage({
        ...message,
        text: 'メールアドレスは必須です。',
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
    } else {
      return true;
    }
  };

  return { validation };
};