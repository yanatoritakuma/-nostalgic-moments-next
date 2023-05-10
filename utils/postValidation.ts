import { TReqPost } from '@/types/post';

export const postValidation = () => {
  const validation = (post: TReqPost) => {
    if (post.title === '') {
      return alert('タイトルは必須です。');
    } else if (post.text === '') {
      return alert('テキストは必須です。');
    } else if (post.prefecture === '') {
      return alert('都道府県は必須です。');
    } else if (post.address === '') {
      return alert('住所は必須です。');
    } else {
      return true;
    }
  };

  return { validation };
};
