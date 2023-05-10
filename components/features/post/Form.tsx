import { css } from '@emotion/react';
import React, { memo, useState, useEffect } from 'react';
import Image from 'next/image';
import { TextBox } from '@/components/elements/TextBox';
import { SelectBox } from '@/components/elements/SelectBox';
import { prefectures } from '@/const/prefecture';
import { ButtonBox } from '@/components/elements/ButtonBox';
import useChangeImage from '@/hooks/useChangeImage';
import { imageRegistration } from '@/utils/imageRegistration';
import { useMutatePost } from '@/hooks/useMutatePost';
import { useQueryUser } from '@/hooks/useQueryUser';
import { postValidation } from '@/utils/postValidation';

export const Form = memo(() => {
  const { onChangeImageHandler, photoUrl, setPhotoUrl } = useChangeImage();
  const { onClickRegistration } = imageRegistration();
  const { postMutation } = useMutatePost();
  const { data: user } = useQueryUser();
  const { validation } = postValidation();
  const [postState, setPostState] = useState({
    title: '',
    text: '',
    prefecture: '',
    address: '',
  });
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    if (!photoUrl) {
      return;
    }

    let reader: FileReader | null = new FileReader();
    reader.onloadend = () => {
      const res = reader?.result;
      if (res && typeof res === 'string') {
        setPreviewUrl(res);
      }
    };
    reader.readAsDataURL(photoUrl);

    return () => {
      reader = null;
    };
  }, [photoUrl]);

  const onClickRegister = async (file: string | null) => {
    await postMutation.mutateAsync({
      title: postState.title,
      text: postState.text,
      image: file,
      prefecture: postState.prefecture,
      address: postState.address,
    });
  };

  return (
    <section css={formBox}>
      <div css={textBox}>
        <TextBox
          label="タイトル"
          value={postState.title}
          onChange={(e) =>
            setPostState({
              ...postState,
              title: e.target.value,
            })
          }
          fullWidth
        />
      </div>
      <div css={textBox}>
        <TextBox
          label="内容"
          value={postState.text}
          onChange={(e) =>
            setPostState({
              ...postState,
              text: e.target.value,
            })
          }
          fullWidth
          multiline
          rows={3}
        />
      </div>
      <ButtonBox onChange={onChangeImageHandler} upload />

      {previewUrl !== '' && (
        <div css={previewBox}>
          <Image src={previewUrl} fill alt="プレビュー" />
        </div>
      )}
      <div css={textBox}>
        <SelectBox
          label="都道府県"
          value={postState.prefecture}
          onChange={(e) =>
            setPostState({
              ...postState,
              prefecture: e.target.value,
            })
          }
          menuItem={prefectures}
        />
      </div>
      <div css={textBox}>
        <TextBox
          label="アドレス"
          value={postState.address}
          onChange={(e) =>
            setPostState({
              ...postState,
              address: e.target.value,
            })
          }
          fullWidth
        />
      </div>
      <ButtonBox
        onClick={() =>
          validation(postState) &&
          (onClickRegistration(photoUrl, onClickRegister, setPhotoUrl, setPreviewUrl, user),
          setPostState({
            title: '',
            text: '',
            prefecture: '',
            address: '',
          }))
        }
      >
        登録
      </ButtonBox>
    </section>
  );
});

Form.displayName = 'Form';

const formBox = css`
  margin: 0 auto;
  width: 100%;
  max-width: 500px;
`;

const textBox = css`
  margin: 20px 0;
`;

const previewBox = css`
  margin: 12px auto;
  width: 300px;
  height: 284px;
  position: relative;

  @media (max-width: 425px) {
    width: 280px;
    height: 264px;
  }

  img {
    object-fit: cover;
  }
`;
