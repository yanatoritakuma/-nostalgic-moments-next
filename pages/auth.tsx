import { css } from '@emotion/react';
import Image from 'next/image';
import { useMutateAuth } from '@/hooks/useMutateAuth';
import { useEffect, useState } from 'react';
import { ButtonBox } from '@/components/elements/ButtonBox';
import { TextBox } from '@/components/elements/TextBox';
import useChangeImage from '@/hooks/useChangeImage';
import { imageRegistration } from '@/utils/imageRegistration';
import { authValidation } from '@/utils/validations/authValidation';

const auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { loginMutation, registerMutation } = useMutateAuth();
  const { onChangeImageHandler, photoUrl, setPhotoUrl } = useChangeImage();
  const { onClickRegistration } = imageRegistration();
  const { validation } = authValidation();

  const [authStatte, setAuthStatte] = useState({
    email: '',
    password: '',
    name: '',
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

  const onClikcAuth = async (file: string | null) => {
    await registerMutation
      .mutateAsync({
        email: authStatte.email,
        password: authStatte.password,
        name: authStatte.name,
        image: file ? file : '',
      })
      .then(() =>
        loginMutation.mutate({
          email: authStatte.email,
          password: authStatte.password,
        })
      );
  };

  return (
    <main css={authBox}>
      <h2>{isLogin ? 'ログイン' : 'アカウント作成'}</h2>

      <div css={inputBox}>
        <TextBox
          className="text"
          label="メール"
          value={authStatte.email}
          onChange={(e) =>
            setAuthStatte({
              ...authStatte,
              email: e.target.value,
            })
          }
          fullWidth
        />
        <TextBox
          className="text"
          label="パスワード"
          value={authStatte.password}
          onChange={(e) =>
            setAuthStatte({
              ...authStatte,
              password: e.target.value,
            })
          }
          fullWidth
          password
        />
        {!isLogin && (
          <>
            <TextBox
              className="text"
              label="名前"
              value={authStatte.name}
              onChange={(e) =>
                setAuthStatte({
                  ...authStatte,
                  name: e.target.value,
                })
              }
              fullWidth
            />
            <ButtonBox onChange={onChangeImageHandler} upload />
          </>
        )}
        {previewUrl !== '' && (
          <div css={previewBox}>
            <Image src={previewUrl} fill alt="プレビュー" />
          </div>
        )}
        <ButtonBox
          onClick={() =>
            validation(authStatte, isLogin) && isLogin
              ? loginMutation.mutate({
                  email: authStatte.email,
                  password: authStatte.password,
                })
              : onClickRegistration(photoUrl, onClikcAuth, setPhotoUrl, setPreviewUrl)
          }
        >
          {isLogin ? 'ログイン' : 'アカウント作成'}
        </ButtonBox>

        <span className="footSpan" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'アカウント作成画面に切り替え' : 'ログイン画面に切り替え'}
        </span>
      </div>
    </main>
  );
};

export default auth;

const authBox = css`
  margin: 100px auto;
  max-width: 1440px;
  width: 100%;

  h2 {
    text-align: center;
  }
`;

const inputBox = css`
  margin: 0 auto;
  width: 90%;
  max-width: 500px;

  .text {
    margin: 20px 0;
    display: block;
  }

  button {
    margin: 20px auto;
    display: block;
  }

  .footSpan {
    display: block;
    text-align: center;
    cursor: pointer;
  }
`;

const previewBox = css`
  margin: 12px auto;
  width: 300px;
  height: 284px;
  position: relative;

  img {
    object-fit: cover;
    border-radius: 50%;
  }
`;
