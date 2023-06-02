import React, { useEffect } from 'react';
import { css } from '@emotion/react';
import { useQueryLikeTopPost } from '@/hooks/post/useQueryLikeTopPost';
import { useQueryUser } from '@/hooks/user/useQueryUser';
import { PostBox } from '@/components/features/post/PostBox';

const likeTop = () => {
  const { data: user } = useQueryUser();
  const { data: likeTopPost, refetch } = useQueryLikeTopPost(user?.id);
  console.log(likeTopPost);
  useEffect(() => {
    setTimeout(() => {
      refetch();
    }, 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <main css={likeTopBox}>
      <h2>いいねTOP</h2>
      <p className="likeTopBox__text">いいねの数が多いTOP10を表示しています。</p>
      <PostBox posts={likeTopPost?.likeTopTenPosts} user={user} likeRefetch={refetch} />
    </main>
  );
};

export default likeTop;

const likeTopBox = css`
  padding: 20px;
  height: 100%;
  min-height: 100vh;
  h2 {
    text-align: center;
  }

  .likeTopBox__text {
    text-align: center;
  }
`;
