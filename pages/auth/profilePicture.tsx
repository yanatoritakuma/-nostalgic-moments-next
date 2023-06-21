import { useEffect, useState } from 'react';
import Image from 'next/image';
import { css } from '@emotion/react';
import { useQueryUser } from '@/hooks/user/useQueryUser';
import { ButtonBox } from '@/components/elements/ButtonBox';
import { useChangeImage } from '@/hooks/useChangeImage';
import { imageRegistration } from '@/utils/imageRegistration';
import { useMutateUser } from '@/hooks/user/useMutateUser';
import { useRouter } from 'next/router';

const profilePicture = () => {
  const { data: user } = useQueryUser();
  const { onClickRegistration } = imageRegistration();
  const { updateUserMutation } = useMutateUser();
  const [previewUrl, setPreviewUrl] = useState('');
  const { onChangeImageHandler, photoUrl, setPhotoUrl } = useChangeImage();
  const router = useRouter();

  const registrationImage = async (file: string | null) => {
    try {
      if (user) {
        await updateUserMutation.mutateAsync({
          name: user.name,
          image: file ? file : user.image,
          email: user.email,
        });
        await router.push('/');
      }
    } catch (err) {
      console.error(err);
    }
  };

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

  return (
    <main css={profilePictureBox}>
      <div css={profilePictureInBox}>
        <h2>アカウントを作成しました！</h2>
        <p>
          はじめまして、
          {user?.name}さん
        </p>
        <p>プロフィール画像の設定をしませんか？</p>
        {previewUrl !== '' && (
          <div css={previewBox}>
            <Image src={previewUrl} fill alt="プレビュー" />
          </div>
        )}
        <ButtonBox onChange={onChangeImageHandler} upload />
        <ButtonBox
          onClick={() =>
            onClickRegistration(photoUrl, setPhotoUrl, setPreviewUrl, registrationImage)
          }
          disabled={photoUrl === null}
        >
          プロフィール画像設定
        </ButtonBox>
        <ButtonBox onClick={() => router.push('/')}>今は設定しない</ButtonBox>
      </div>
    </main>
  );
};

export default profilePicture;

const profilePictureBox = css`
  margin: 100px auto;
  max-width: 1440px;
  width: 100%;

  h2 {
    text-align: center;

    @media (max-width: 425px) {
      font-size: 20px;
    }
  }

  p {
    text-align: center;
  }
`;

const profilePictureInBox = css`
  margin: 0 auto;
  width: 90%;
  max-width: 500px;

  button {
    margin: 20px auto;
    display: block;
    width: 200px;
  }
`;

const previewBox = css`
  margin: 12px auto;
  width: 260px;
  height: 250px;
  position: relative;

  img {
    object-fit: cover;
    border-radius: 50%;
  }
`;
