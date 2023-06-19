import { memo } from 'react';
import { css } from '@emotion/react';
import Link from 'next/link';

export const TimelLine = memo(() => {
  return (
    <section css={timelLineBox}>
      <h2>タイムライン</h2>
      <p>フォローしている人の最新の投稿が閲覧できます。</p>
      <Link href="/timelLine">タイムラインページへ</Link>
    </section>
  );
});

TimelLine.displayName = 'TimelLine';

const timelLineBox = css`
  padding: 60px 0;
  background-color: #efefef;

  p {
    text-align: center;
  }

  a {
    margin: 10px auto;
    display: block;
    width: fit-content;
    color: #0095d9;
  }
`;
