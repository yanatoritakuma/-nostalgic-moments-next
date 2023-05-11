import { css } from '@emotion/react';
import { Form } from '@/components/features/post/Form';
import { useQueryUser } from '@/hooks/auth/useQueryUser';
import Link from 'next/link';

const post = () => {
  const { data: user } = useQueryUser();
  return (
    <main css={postBox}>
      {user?.id !== undefined ? (
        <>
          <h2>投稿</h2>
          <Form />
        </>
      ) : (
        <>
          <h2>ログインしていないユーザーは投稿できません。</h2>
          <Link className="authLink" href="/auth">
            ログイン画面へ
          </Link>
        </>
      )}
    </main>
  );
};

export default post;

const postBox = css`
  padding: 20px;
  background-color: #f7fcfe;
  text-align: center;
  height: 100%;
  min-height: 100vh;

  .authLink {
    margin-top: 30px;
    padding: 12px;
    display: inline-block;
    color: #0095d9;
    font-size: 18px;
    text-decoration: none;
    border: 1px solid #0095d9;
    border-radius: 20px;
  }
`;
