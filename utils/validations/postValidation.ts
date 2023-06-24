import { MessageContext } from '@/provider/MessageProvider';
import { TReqPost } from '@/types/post';
import { useContext } from 'react';
import validator from 'validator';

export const postValidation = () => {
  const { message, setMessage } = useContext(MessageContext);

  const postValid = (post: TReqPost, photoUrl: File | null) => {
    const containsJapanese = (fileName: string) => {
      const japaneseRegex =
        /[一-龠々〆ヵヶぁ-ゔゞァ-・ヽヾ゛゜ー「」｢｣()〔〕［］｛｝〈〉《》【】〖〗〘〙〚〛〜～]/;
      return japaneseRegex.test(fileName);
    };

    if (validator.isEmpty(post.title)) {
      return setMessage({
        ...message,
        text: 'タイトルは必須です。',
        type: 'error',
      });
    } else if (!validator.isLength(post.title, { max: 50 })) {
      return setMessage({
        ...message,
        text: 'タイトルは50文字以下で入力してください。',
        type: 'error',
      });
    } else if (validator.isEmpty(post.text)) {
      return setMessage({
        ...message,
        text: '内容は必須です。',
        type: 'error',
      });
    } else if (!validator.isLength(post.text, { max: 150 })) {
      return setMessage({
        ...message,
        text: '内容は150文字以下で入力してください。',
        type: 'error',
      });
    } else if (validator.isEmpty(post.prefecture)) {
      return setMessage({
        ...message,
        text: '都道府県は必須です。',
        type: 'error',
      });
    } else if (validator.isEmpty(post.address)) {
      return setMessage({
        ...message,
        text: '住所は必須です。',
        type: 'error',
      });
    } else if (!validator.isLength(post.address, { max: 50 })) {
      return setMessage({
        ...message,
        text: '住所は50文字以下で入力してください。',
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

  return { postValid };
};
