import { css } from '@emotion/react';
import { useMutateAuth } from '@/hooks/useMutateAuth';
import { useState } from 'react';

const auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { loginMutation, registerMutation, logoutMutation } = useMutateAuth();

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
    <div css={AuthBox}>
      <h2>ログイン</h2>
      <div>
        <span>メール</span>
        <input
          type="text"
          value={authStatte.email}
          onChange={(e) =>
            setAuthStatte({
              ...authStatte,
              email: e.target.value,
            })
          }
        />
        <span>パスワード</span>
        <input
          type="text"
          value={authStatte.password}
          onChange={(e) =>
            setAuthStatte({
              ...authStatte,
              password: e.target.value,
            })
          }
        />
        <span>名前</span>
        <input
          type="text"
          value={authStatte.name}
          onChange={(e) =>
            setAuthStatte({
              ...authStatte,
              name: e.target.value,
            })
          }
        />
        <span>画像</span>
        <input
          type="text"
          value={authStatte.image}
          onChange={(e) =>
            setAuthStatte({
              ...authStatte,
              image: e.target.value,
            })
          }
        />
        <button onClick={() => onClickAuth()}>ログイン</button>
        <button onClick={() => logoutMutation.mutate()}>ログアウト</button>
      </div>
    </div>
  );
};

export default auth;

const AuthBox = css`
  h2 {
    text-align: center;
  }
`;
