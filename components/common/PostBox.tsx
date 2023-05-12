import { memo } from 'react';
import { css } from '@emotion/react';
import { TPost } from '@/types/post';
import Image from 'next/image';
import NoimageUser from '@/images/noimage-user.png';
import Noimage from '@/images/noimage.png';

type Props = {
  posts?: TPost[];
};

const PostBox = memo((props: Props) => {
  const { posts } = props;
  return (
    <>
      {posts?.map((post) => {
        return (
          <div key={post.id} css={postBox}>
            <div css={postUserBox}>
              {post.postUserResponse.image !== '' ? (
                <div css={userImgBox}>
                  <Image src={post.postUserResponse.image} fill alt="ユーザー画像" />
                </div>
              ) : (
                <div css={userImgBox}>
                  <Image src={NoimageUser} fill alt="ユーザー画像" />
                </div>
              )}
              <span className="postUserBox__name">{post.postUserResponse.name}</span>
            </div>
            <h3>{post.title}</h3>
            <p>{post.text}</p>
            <div>
              <span>住所:</span>
              <span>{post.address}</span>
            </div>
            {post.image !== '' ? (
              <div css={postImgBox}>
                <Image src={post.image} fill alt="投稿画像" />
              </div>
            ) : (
              <div css={postImgBox}>
                <Image src={Noimage} fill alt="投稿画像" />
              </div>
            )}
          </div>
        );
      })}
    </>
  );
});

export default PostBox;

PostBox.displayName = 'PostBox';

const postBox = css`
  margin: 20px 0;
  padding: 24px;
  border: 2px solid #aaa;
  border-radius: 10px;

  h3 {
  }
`;

const postUserBox = css`
  display: flex;
  align-items: center;

  .postUserBox__name {
    font-size: 18px;
  }
`;

const postImgBox = css`
  margin: 12px auto;
  width: 80%;
  height: 600px;
  position: relative;

  @media (max-width: 768px) {
    height: 400px;
  }

  @media (max-width: 425px) {
    width: 100%;
    height: 200px;
  }

  img {
    object-fit: cover;
    border-radius: 10px;
  }
`;

const userImgBox = css`
  margin-right: 12px;
  width: 70px;
  height: 70px;
  position: relative;

  img {
    object-fit: cover;
    border-radius: 50%;
  }
`;
