import { memo, useContext, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { TPost, TPostPages } from '@/types/post';
import Image from 'next/image';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import NoimageUser from '@/images/noimage-user.png';
import Noimage from '@/images/noimage.png';
import { useMutateLike } from '@/hooks/like/useMutateLike';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from '@tanstack/react-query';
import { TError } from '@/types/error';
import { TUser } from '@/types/user';
import { MessageContext } from '@/provider/MessageProvider';
import { PostEditMenuBox } from '@/components/features/post/PostEditMenuBox';
import { PostContext } from '@/provider/PostProvider';
import { prefectures } from '@/const/prefecture';
import { useMutatePostComment } from '@/hooks/postComment/useMutatePostComment';
import { CommentBox } from '@/components/features/post/CommentBox';

type Props = {
  posts?: TPost[];
  refetch?: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<TPostPages, TError>>;
  user: TUser | undefined;
};

export const PostBox = memo((props: Props) => {
  const { posts, refetch, user } = props;
  const { likeMutation, likeDeleteMutation } = useMutateLike();
  const { message, setMessage } = useContext(MessageContext);
  const { postProcess, setPostProcess } = useContext(PostContext);
  const [moreFlag, setMoreFlag] = useState(-1);
  const [selectComment, setSelectComment] = useState(-1);

  const onClickLike = async (postId: number) => {
    try {
      const req = {
        post_id: postId,
      };

      if (!user) {
        setMessage({
          ...message,
          text: 'いいねをするにはログインが必要です',
          type: 'error',
        });
        return;
      }

      if (refetch) {
        await likeMutation.mutateAsync(req);
        refetch();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onClickDeleteLike = async (likeId: number) => {
    try {
      if (refetch) {
        await likeDeleteMutation.mutateAsync(likeId);
        refetch();
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (refetch && postProcess) {
      refetch();
      setPostProcess(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postProcess]);

  const getItemByValue = (value: string) => {
    const foundItem = prefectures.find((prefecture) => prefecture.value === value);
    return foundItem ? foundItem.item : null;
  };

  return (
    <>
      {posts?.map((post, index) => {
        return (
          <div key={post.id} css={postBox}>
            <div css={postUserBox}>
              {post.postUserResponse.image !== '' ? (
                <div css={userImgBox}>
                  <Image
                    src={post.postUserResponse.image}
                    fill
                    sizes="(max-width: 70px)"
                    alt="ユーザー画像"
                  />
                </div>
              ) : (
                <div css={userImgBox}>
                  <Image src={NoimageUser} fill sizes="(max-width: 70px)" alt="ユーザー画像" />
                </div>
              )}
              <span className="postUserBox__name">{post.postUserResponse.name}</span>
              {post.user_id === user?.id && (
                <div className="postUserBox__editBox">
                  <PostEditMenuBox posts={posts} index={index} />
                </div>
              )}
            </div>
            <h3>{post.title}</h3>
            <p>{post.text}</p>
            <div>
              <span>住所:</span>
              <span>
                {getItemByValue(post.prefecture)} {post.address}
              </span>
            </div>
            <div css={tagBox}>
              {moreFlag !== index ? (
                <>
                  {post.tagResponse.slice(0, 3).map((tag, tagInd) => (
                    <span key={tagInd}>#{tag.name}</span>
                  ))}
                  {post.tagResponse.length > 3 && (
                    <>
                      <span>...</span>
                      <span className="tagBox__more" onClick={() => setMoreFlag(index)}>
                        もっとみる
                      </span>
                    </>
                  )}
                </>
              ) : (
                <>
                  {post.tagResponse.map((tag, tagInd) => (
                    <span key={tagInd}>#{tag.name}</span>
                  ))}
                  {post.tagResponse.length > 3 && (
                    <span className="tagBox__more" onClick={() => setMoreFlag(-1)}>
                      元に戻す
                    </span>
                  )}
                </>
              )}
            </div>
            {post.image !== '' ? (
              <div css={postImgBox}>
                <Image src={post.image} fill priority sizes="100%" alt="投稿画像" />
              </div>
            ) : (
              <div css={postImgBox}>
                <Image src={Noimage} fill sizes="100%" alt="投稿画像" />
              </div>
            )}
            <div css={postFootBox}>
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
              <div
                css={commentBox}
                onClick={() =>
                  selectComment !== post.id ? setSelectComment(post.id) : setSelectComment(-1)
                }
              >
                <ChatBubbleOutlineIcon />
                {post.commentCount}
              </div>
            </div>
            <CommentBox selectComment={selectComment} postId={post.id} refetch={refetch} />
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

  @media (max-width: 425px) {
    padding: 12px;
  }
`;

const postUserBox = css`
  display: flex;
  align-items: center;
  position: relative;

  .postUserBox__name {
    font-size: 18px;
  }

  .postUserBox__editBox {
    position: absolute;
    top: 0;
    right: 0;
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

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }

  @media (max-width: 425px) {
    width: 50px;
    height: 50px;
  }

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
    cursor: pointer;
  }
`;

const tagBox = css`
  margin: 20px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  align-items: center;

  span {
    margin: 0 8px 8px 0;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .tagBox__more {
    font-size: 14px;
    color: #aaa;
    cursor: pointer;
  }
`;

const commentSendBox = css`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    display: block;
  }

  button {
    margin-left: 20px;

    @media (max-width: 768px) {
      margin: 20px auto;
      display: block;
    }
  }
`;

const postFootBox = css`
  display: flex;
  align-items: center;
`;

const commentBox = css`
  margin-left: 20px;
  display: flex;
  align-items: center;

  svg {
    margin-right: 8px;
    cursor: pointer;
  }
`;

const commentContentsBox = css`
  h3 {
    text-align: center;
  }
  .commentContentsBox__box {
    margin: 20px 0;
    padding: 20px;
    border: 1px solid #333;
    border-radius: 10px;
  }

  .commentContentsBox__userBox {
    display: flex;
    align-items: center;
  }
`;
