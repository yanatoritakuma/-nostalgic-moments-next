import { css } from '@emotion/react';
import { useMutateAuth } from '@/hooks/useMutateAuth';
import { useState } from 'react';
import { ButtonBox } from '@/components/elements/ButtonBox';
import { TextBox } from '@/components/elements/TextBox';

const auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { loginMutation, registerMutation } = useMutateAuth();

  const [authStatte, setAuthStatte] = useState({
    email: '',
    password: '',
    name: '',
    image: '',
  });

  const onClickAuth = async () => {
    if (isLogin) {
      loginMutation.mutate({
        email: authStatte.email,
        password: authStatte.password,
      });
    } else {
      await registerMutation
        .mutateAsync({
          email: authStatte.email,
          password: authStatte.password,
          name: authStatte.name,
          image: authStatte.image,
        })
        .then(() =>
          loginMutation.mutate({
            email: authStatte.email,
            password: authStatte.password,
          })
        );
    }
  };
  return (
    <main css={AuthBox}>
      <h2>{isLogin ? 'ログイン' : 'アカウント作成'}</h2>

      <div css={InputBox}>
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
            <ButtonBox
              onChange={(e) =>
                setAuthStatte({
                  ...authStatte,
                  image: e.target.value,
                })
              }
              upload
            >
              画像
            </ButtonBox>
          </>
        )}
        <ButtonBox onClick={() => onClickAuth()}>
          {isLogin ? 'ログイン' : 'アカウント作成'}
        </ButtonBox>
        <span className="footSpan" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'アカウント作成' : 'ログイン'}
        </span>
      </div>
    </main>
  );
};

export default auth;

const AuthBox = css`
  margin: 100px auto;
  max-width: 1440px;
  width: 100%;

  h2 {
    text-align: center;
  }
`;

const InputBox = css`
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
