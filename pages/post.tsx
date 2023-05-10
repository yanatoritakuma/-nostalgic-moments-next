import { css } from '@emotion/react';
import React from 'react';
import { Form } from '@/components/features/post/Form';

const post = () => {
  return (
    <main css={postBox}>
      <h2>投稿</h2>
      <Form />
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
`;
