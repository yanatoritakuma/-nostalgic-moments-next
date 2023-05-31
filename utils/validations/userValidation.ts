import { MessageContext } from '@/provider/MessageProvider';
import { useContext } from 'react';

type TReqUpDate = {
  email: string;
  name: string;
};

export const userValidation = () => {
  const { message, setMessage } = useContext(MessageContext);

  const upDateValidation = (register: TReqUpDate, photoUrl: File | null) => {
    const containsJapanese = (fileName: string) => {
      const japaneseRegex =
        /[一-龠々〆ヵヶぁ-ゔゞァ-・ヽヾ゛゜ー「」｢｣()〔〕［］｛｝〈〉《》【】〖〗〘〙〚〛〜～]/;
      return japaneseRegex.test(fileName);
    };

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
    } else if (photoUrl && containsJapanese(photoUrl.name)) {
      return setMessage({
        ...message,
        text: '画像名に日本語を入れないでください。',
        type: 'error',
      });
    } else {
      return true;
    }
  };

  return { upDateValidation };
};