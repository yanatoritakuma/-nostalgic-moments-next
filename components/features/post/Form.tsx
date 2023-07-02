import { css } from '@emotion/react';
import { memo, useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import { TextBox } from '@/components/elements/TextBox';
import { SelectBox } from '@/components/elements/SelectBox';
import { prefectures } from '@/const/prefecture';
import { ButtonBox } from '@/components/elements/ButtonBox';
import { useChangeImage } from '@/hooks/useChangeImage';
import { imageRegistration } from '@/utils/imageRegistration';
import { useMutatePost } from '@/hooks/post/useMutatePost';
import { useQueryUser } from '@/hooks/user/useQueryUser';
import { postValidation } from '@/utils/validations/postValidation';
import { PostContext } from '@/provider/PostProvider';
import { deleteImgStorage } from '@/utils/deleteImgStorage';
import { useMutateTag } from '@/hooks/tag/useMutateTag';
import { ChipBox } from '@/components/elements/ChipBox';
import { tagValidation } from '@/utils/validations/tagValidation';

type Props = {
  type: 'new' | 'edit';
  setOpen?: (value: React.SetStateAction<boolean>) => void;
};

export const Form = memo((props: Props) => {
  const { type, setOpen } = props;
  const { onChangeImageHandler, photoUrl, setPhotoUrl } = useChangeImage();
  const { onClickRegistration } = imageRegistration();
  const { postMutation, updatePostMutation } = useMutatePost();
  const { tagMutation, deleteTagMutation } = useMutateTag();
  const { data: user } = useQueryUser();
  const { postValid } = postValidation();
  const { tagVali } = tagValidation();
  const { postGlobal, setPostProcess } = useContext(PostContext);
  const { deleteImg } = deleteImgStorage();
  const [postState, setPostState] = useState({
    title: '',
    text: '',
    prefecture: '',
    address: '',
  });
  const [tagState, setTagState] = useState('');
  const [tagArray, setTagArray] = useState<string[]>([]);
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
    try {
      const res = await postMutation.mutateAsync({
        title: postState.title,
        text: postState.text,
        image: file,
        prefecture: postState.prefecture,
        address: postState.address,
      });

      if (tagArray.length !== 0) {
        await tagMutation.mutateAsync(
          tagArray.map((tag) => {
            return { name: tag, post_id: res.data.id };
          })
        );
      }
      setPostState({
        title: '',
        text: '',
        prefecture: '',
        address: '',
      });
      setTagArray([]);
    } catch (err) {
      console.error('err:', err);
    }
  };

  const postGlobalTagNames = postGlobal.tags?.map((tag) => {
    return tag.name;
  });

  const updateTargetTags = tagArray.filter((tag) => !postGlobalTagNames.includes(tag));
  const deleteTargetTags = postGlobalTagNames?.filter((tag) => !tagArray.includes(tag));
  const deleteTagIds = postGlobal.tags
    ?.filter((tag) => deleteTargetTags.includes(tag.name))
    .map((tag) => tag.id);

  const onClickUpdate = async (file: string | null) => {
    try {
      await updatePostMutation.mutateAsync({
        id: postGlobal.id,
        title: postState.title,
        text: postState.text,
        image: file !== null ? file : postGlobal.image,
        prefecture: postState.prefecture,
        address: postState.address,
      });
      setPostProcess(true);
      if (file !== null) {
        deleteImg(postGlobal.image, 'postImages', postGlobal.userId);
      }
      // 更新 タグが追加されている場合
      if (updateTargetTags.length !== 0) {
        await tagMutation.mutateAsync(
          updateTargetTags.map((tag) => {
            return { name: tag, post_id: postGlobal.id };
          })
        );
      }
      // 更新 タグが削除されている場合 todo:未実装
      if (deleteTagIds.length !== 0) {
        console.log('deleteTagIds', deleteTagIds);
        deleteTagMutation.mutateAsync(deleteTagIds);
      }
    } catch (err) {
      console.error('err:', err);
    }
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
      const tagNames = postGlobal.tags.map((tag) => {
        return tag.name;
      });
      setTagArray(tagNames);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postGlobal]);

  const onClickTagAdd = () => {
    if (tagVali(tagState, tagArray)) {
      setTagArray([...tagArray, tagState]), setTagState('');
    }
  };

  const onClickTagDelete = (ind: number) => {
    const newTagArray = tagArray.filter((_, index) => index !== ind);
    setTagArray(newTagArray);
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
      <div css={tagBox}>
        <TextBox
          label="タグ"
          value={tagState}
          onChange={(e) => setTagState(e.target.value)}
          fullWidth
        />
        <ButtonBox onClick={() => onClickTagAdd()}>追加</ButtonBox>
      </div>

      <div css={tagArrayBox}>
        {tagArray.map((tag, index) => (
          <div className="tagArrayBox__chipBox" key={index}>
            <ChipBox label={`#${tag}`} onClick={() => onClickTagDelete(index)} />
          </div>
        ))}
      </div>

      <ButtonBox
        onClick={() =>
          postValid(postState, photoUrl) &&
          (onClickRegistration(
            photoUrl,
            setPhotoUrl,
            setPreviewUrl,
            type === 'new' ? onClickRegister : onClickUpdate,
            user
          ),
          type === 'edit' && setOpen && setOpen(false))
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

const tagBox = css`
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    margin-left: 20px;
  }
`;

const tagArrayBox = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  align-items: center;
  text-align: start;
  overflow: hidden;

  .tagArrayBox__chipBox {
    margin: 0 18px 12px 0;
    font-size: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
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
