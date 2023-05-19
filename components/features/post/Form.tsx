import { css } from '@emotion/react';
import { memo, useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import { TextBox } from '@/components/elements/TextBox';
import { SelectBox } from '@/components/elements/SelectBox';
import { prefectures } from '@/const/prefecture';
import { ButtonBox } from '@/components/elements/ButtonBox';
import useChangeImage from '@/hooks/useChangeImage';
import { imageRegistration } from '@/utils/imageRegistration';
import { useMutatePost } from '@/hooks/post/useMutatePost';
import { useQueryUser } from '@/hooks/auth/useQueryUser';
import { postValidation } from '@/utils/validations/postValidation';
import { PostContext } from '@/provider/PostProvider';
import { deleteImgStorage } from '@/utils/deleteImgStorage';

type Props = {
  type: 'new' | 'edit';
  setOpen?: (value: React.SetStateAction<boolean>) => void;
};

export const Form = memo((props: Props) => {
  const { type, setOpen } = props;
  const { onChangeImageHandler, photoUrl, setPhotoUrl } = useChangeImage();
  const { onClickRegistration } = imageRegistration();
  const { postMutation, updatePostMutation } = useMutatePost();
  const { data: user } = useQueryUser();
  const { validation } = postValidation();
  const { postGlobal, setPostProcess } = useContext(PostContext);
  const { deleteImg } = deleteImgStorage();
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

  const onClickUpdate = async (file: string | null) => {
    await updatePostMutation
      .mutateAsync({
        id: postGlobal.id,
        title: postState.title,
        text: postState.text,
        image: file !== null ? file : postGlobal.image,
        prefecture: postState.prefecture,
        address: postState.address,
      })
      .then(() => setPostProcess(true))
      .then(
        () =>
          postGlobal.image !== '' && deleteImg(postGlobal.image, 'postImages', postGlobal.userId)
      );
  };

  useEffect(() => {
    if (type === 'edit' && postGlobal.title !== undefined) {
      setPostState({
        ...postState,
        title: postGlobal.title,
        text: postGlobal.text,
        prefecture: postGlobal.prefecture,
        address: postGlobal.address,
      });
      setPreviewUrl(postGlobal.image);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postGlobal]);

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
          <Image src={previewUrl} fill sizes="100%" alt="プレビュー" />
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
          label="住所"
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
          (onClickRegistration(
            photoUrl,
            type === 'new' ? onClickRegister : onClickUpdate,
            setPhotoUrl,
            setPreviewUrl,
            user
          ),
          type === 'edit' && setOpen && setOpen(false),
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
  text-align: center;
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
    width: 100%;
    height: 260px;
  }

  img {
    object-fit: cover;
  }
`;
