import { memo, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useChangeImage } from '@/hooks/useChangeImage';
import { UserInfoInputBox } from '@/components/features/user/UserInfoInputBox';
import { useQueryUser } from '@/hooks/user/useQueryUser';
import { ButtonBox } from '@/components/elements/ButtonBox';
import { useMutateUser } from '@/hooks/user/useMutateUser';
import { imageRegistration } from '@/utils/imageRegistration';
import { deleteImgStorage } from '@/utils/deleteImgStorage';
import { userValidation } from '@/utils/validations/userValidation';

type Props = {
  open: boolean;
  setOpen: (value: React.SetStateAction<boolean>) => void;
};

export const ModalUserEditBox = memo((props: Props) => {
  const { open, setOpen } = props;
  const { onChangeImageHandler, photoUrl, setPhotoUrl } = useChangeImage();
  const { data: user } = useQueryUser();
  const { updateUserMutation } = useMutateUser();
  const { onClickRegistration } = imageRegistration();
  const { deleteImg } = deleteImgStorage();
  const { accountRegisterValidation } = userValidation();

  const [authStatte, setAuthStatte] = useState({
    email: '',
    name: '',
  });
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    if (user !== undefined) {
      setAuthStatte({
        ...authStatte,
        email: user.email,
        name: user.name,
      });

      setPreviewUrl(user.image);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, open]);

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

  const upDate = async (file: string | null) => {
    try {
      if (user) {
        await updateUserMutation
          .mutateAsync({
            name: authStatte.name,
            image: file ? file : user.image,
            email: authStatte.email,
          })
          .then(() => file && deleteImg(user.image, 'userImages', user.id));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box css={editBox}>
        <h3>編集</h3>
        <UserInfoInputBox
          authStatte={authStatte}
          setAuthStatte={setAuthStatte}
          onChangeImageHandler={onChangeImageHandler}
          previewUrl={previewUrl}
        />
        <ButtonBox
          onClick={() => {
            if (accountRegisterValidation(photoUrl, authStatte)) {
              onClickRegistration(photoUrl, setPhotoUrl, setPreviewUrl, upDate);
              setOpen(false);
            }
          }}
        >
          更新
        </ButtonBox>
      </Box>
    </Modal>
  );
});

ModalUserEditBox.displayName = 'ModalUserEditBox';

const editBox = css`
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 500px;
  height: auto;
  max-height: 90vh;
  background-color: #fff;
  border: 1px solid #333;
  border-radius: 10px;
  overflow-y: scroll;

  h3 {
    text-align: center;
  }

  button {
    margin: 20px auto;
    display: block;
  }
`;
