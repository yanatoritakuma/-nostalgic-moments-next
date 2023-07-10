import { useState } from 'react';
import { css } from '@emotion/react';
import { useMutateAuth } from '@/hooks/auth/useMutateAuth';
import { ButtonBox } from '@/components/elements/ButtonBox';
import { TextBox } from '@/components/elements/TextBox';
import { authValidation } from '@/utils/validations/authValidation';
import { useRouter } from 'next/router';
import { useQueryUser } from '@/hooks/user/useQueryUser';

const auth = () => {
  const { data: user } = useQueryUser();
  const [isLogin, setIsLogin] = useState(true);
  const { loginMutation, registerMutation } = useMutateAuth();
  const { validation } = authValidation();
  const router = useRouter();

  const [authStatte, setAuthStatte] = useState({
    email: '',
    password: '',
    name: '',
  });

  const createAccount = async () => {
    try {
      await registerMutation.mutateAsync({
        email: authStatte.email,
        password: authStatte.password,
        name: authStatte.name,
        image: '',
      });

      await loginMutation.mutateAsync({
        email: authStatte.email,
        password: authStatte.password,
      });

      await router.push('/auth/profilePicture');
    } catch (err) {
      console.error(err);
    }
  };

  const onClikcAuth = () => {
    if (isLogin) {
      loginMutation.mutate({
        email: authStatte.email,
        password: authStatte.password,
      });
    } else {
      createAccount();
    }
  };

  return (
    <main css={authBox}>
      {user === undefined ? (
        <>
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
            )}
            <ButtonBox onClick={() => validation(authStatte, isLogin) && onClikcAuth()}>
              {isLogin ? 'ログイン' : 'アカウント作成'}
            </ButtonBox>

            <span className="footSpan" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'アカウント作成画面に切り替え' : 'ログイン画面に切り替え'}
            </span>
          </div>
        </>
      ) : (
        <h3>ログイン済みです。</h3>
      )}
    </main>
  );
};

export default auth;

const authBox = css`
  margin: 100px auto;
  max-width: 1440px;
  width: 100%;

  h2,
  h3 {
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
