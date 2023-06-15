import { css } from '@emotion/react';

const timelLine = () => {
  return (
    <main css={timelLineBox}>
      <h2>タイムライン</h2>
    </main>
  );
};

export default timelLine;

const timelLineBox = css`
  padding: 40px 80px;

  @media (max-width: 768px) {
    padding: 20px 40px;
  }

  @media (max-width: 425px) {
    padding: 20px 14px;
  }

  h2 {
    margin: 20px 0;
    text-align: center;
  }
`;
