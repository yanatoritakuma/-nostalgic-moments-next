import { memo, useContext } from 'react';
import { css } from '@emotion/react';
import { TPost, TPostPages } from '@/types/post';
import Image from 'next/image';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import NoimageUser from '@/images/noimage-user.png';
import Noimage from '@/images/noimage.png';
import { useMutateLike } from '@/hooks/like/useMutateLike';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from '@tanstack/react-query';
import { TError } from '@/types/error';
import { TUser } from '@/types/user';
import { MessageContext } from '@/provider/MessageProvider';

type Props = {
  posts?: TPost[];
  prefecturesRefetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<TPostPages, TError>>;
  user: TUser | undefined;
};

export const PostBox = memo((props: Props) => {
  const { posts, prefecturesRefetch, user } = props;
  const { likeMutation, likeDeleteMutation } = useMutateLike();
  const { message, setMessage } = useContext(MessageContext);

  const onClickLike = async (postId: number) => {
    const req = {
      post_id: postId,
    };
    if (user) {
      await likeMutation.mutateAsync(req).then(() => prefecturesRefetch());
    } else {
      setMessage({
        ...message,
        text: 'いいねをするにはログインが必要です',
        type: 'error',
      });
    }
  };

  const onClickDeleteLike = async (likeId: number) => {
    await likeDeleteMutation.mutateAsync(likeId).then(() => prefecturesRefetch());
  };

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

            <div css={favoriteBox}>
              {post.like_id !== 0 ? (
                <>
                  <FavoriteIcon
                    onClick={() => onClickDeleteLike(post.like_id)}
                    className="favoriteBox__liked"
                  />
                  {post.like_count}
                </>
              ) : (
                <>
                  <FavoriteBorderIcon
                    onClick={() => onClickLike(post.id)}
                    className="favoriteBox__noLike"
                  />
                  {post.like_count}
                </>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
});

PostBox.displayName = 'PostBox';

const postBox = css`
  margin: 20px auto;
  padding: 24px;
  border: 2px solid #aaa;
  border-radius: 10px;
  max-width: 1200px;

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
  width: 100%;
  height: 600px;
  position: relative;

  @media (max-width: 768px) {
    height: 400px;
  }

  @media (max-width: 425px) {
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

const favoriteBox = css`
  display: flex;
  align-items: center;

  .favoriteBox__liked {
    color: #e9546b;
  }

  svg {
    margin-right: 8px;
  }
`;
