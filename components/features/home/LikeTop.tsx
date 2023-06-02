import { memo } from 'react';
import { css } from '@emotion/react';
import Link from 'next/link';

export const LikeTop = memo(() => {
  return (
    <section css={likeTopBox}>
      <h2>いいねTOP</h2>
      <p className="likeTopBox__text">いいね数の多い順で投稿を閲覧できます。</p>
      <Link href="/likeTop" className="likeTopBox__link">
        いいねTOPページ
      </Link>
    </section>
  );
});

LikeTop.displayName = 'LikeTop';

const likeTopBox = css`
  padding: 60px 0;
  background-color: #fce4d6;

  .likeTopBox__text {
    text-align: center;
  }

  .likeTopBox__link {
    margin: 10px auto;
    display: block;
    width: fit-content;
    color: #0095d9;
  }
`;
