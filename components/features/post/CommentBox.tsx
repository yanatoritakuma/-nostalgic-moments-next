import { memo, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import Image from 'next/image';
import { ButtonBox } from '@/components/elements/ButtonBox';
import { TextBox } from '@/components/elements/TextBox';
import { PaginationBox } from '@/components/common/PaginationBox';
import { useMutatePostComment } from '@/hooks/postComment/useMutatePostComment';
import { useQueryPostComment } from '@/hooks/postComment/useQueryPostComment';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from '@tanstack/react-query';
import { TPostPages } from '@/types/post';
import { TError } from '@/types/error';
import { countPages } from '@/utils/countPages';
import NoimageUser from '@/images/noimage-user.png';

type Props = {
  selectComment: number;
  postId: number;
  refetch?: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<TPostPages, TError>>;
};

export const CommentBox = memo((props: Props) => {
  const { selectComment, postId, refetch } = props;
  const [commentState, setCommentState] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { postCommentMutation } = useMutatePostComment();
  const { data: postComment, refetch: postCommentRefetch } = useQueryPostComment(
    selectComment,
    currentPage,
    10
  );

  const onClickPostComment = async (postId: number) => {
    try {
      await postCommentMutation.mutateAsync({
        comment: commentState,
        post_id: postId,
      });
      postCommentRefetch();
      if (refetch) {
        refetch();
      }
      setCommentState('');
    } catch (err) {
      console.error(err);
    }
  };

  // ページネーションでAPI再取得
  useEffect(() => {
    postCommentRefetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  useEffect(() => {
    if (selectComment !== -1) {
      postCommentRefetch();
      setCurrentPage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectComment]);

  return (
    <div id={String(postId)}>
      {selectComment === postId && (
        <div css={commentContentsBox}>
          <h3>コメント</h3>
          <div css={commentSendBox}>
            <TextBox
              label="コメント"
              value={commentState}
              onChange={(e) => setCommentState(e.target.value)}
              fullWidth
              multiline
              rows={3}
            />
            <ButtonBox onClick={() => onClickPostComment(postId)}>送信</ButtonBox>
          </div>
          {postComment?.comment.map((comment) => (
            <div key={comment.id} className="commentContentsBox__box">
              <div className="commentContentsBox__userBox">
                <div css={userImgBox}>
                  {comment.postUserResponse.image !== '' ? (
                    <Image
                      src={comment.postUserResponse.image}
                      fill
                      sizes="(max-width: 70px)"
                      alt="ユーザー画像"
                    />
                  ) : (
                    <Image src={NoimageUser} fill sizes="(max-width: 70px)" alt="ユーザー画像" />
                  )}
                </div>
                <span>{comment.postUserResponse.name}</span>
              </div>
              <p>{comment.comment}</p>
            </div>
          ))}
          {postComment?.totalCommentCount !== undefined && (
            <PaginationBox
              count={countPages(postComment?.totalCommentCount)}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              targetScroll={String(postId)}
            />
          )}
        </div>
      )}
    </div>
  );
});

CommentBox.displayName = 'CommentBox';

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
