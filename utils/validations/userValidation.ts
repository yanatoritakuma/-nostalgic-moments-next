import { MessageContext } from '@/provider/MessageProvider';
import { useContext } from 'react';

type TReqUpDate = {
  email: string;
  name: string;
};

export const userValidation = () => {
  const { message, setMessage } = useContext(MessageContext);

  const upDateValidation = (register: TReqUpDate) => {
    if (register.email === '') {
      return setMessage({
        ...message,
        text: 'メールアドレスは必須です。',
        type: 'error',
      });
    } else if (register.name === '') {
      return setMessage({
        ...message,
        text: '名前は必須です。',
        type: 'error',
      });
    } else {
      return true;
    }
  };

  return { upDateValidation };
};
