import { memo, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { TabsBox } from '@/components/elements/TabsBox';
import { TResFollow } from '@/types/follow';
import Image from 'next/image';
import NoimageUser from '@/images/noimage-user.png';
import { useMutateFollow } from '@/hooks/follow/useMutateFollow';
import { ButtonBox } from '@/components/elements/ButtonBox';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from '@tanstack/react-query';
import { TError } from '@/types/error';
import { PaginationBox } from '@/components/common/PaginationBox';
import { countPages } from '@/utils/countPages';

type Props = {
  open: boolean;
  setOpen: (value: React.SetStateAction<boolean>) => void;
  selectLabel: number;
  setSelectLabel: React.Dispatch<React.SetStateAction<number>>;
  follow: TResFollow;
  followRefetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<TResFollow, TError>>;
  currentFollowPage: number;
  setCurrentFollowPage: React.Dispatch<React.SetStateAction<number>>;
};

export const FollowsBox = memo((props: Props) => {
  const {
    open,
    setOpen,
    selectLabel,
    setSelectLabel,
    follow,
    followRefetch,
    currentFollowPage,
    setCurrentFollowPage,
  } = props;
  const [selectFollow, setSselectFollow] = useState(follow?.follows);
  const { followMutation, deleteFollowMutation } = useMutateFollow();
  console.log('follow', follow);

  useEffect(() => {
    if (selectLabel === 0) {
      setSselectFollow(follow?.follows);
    } else {
      setSselectFollow(follow?.followers);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectLabel, follow]);

  const onClickFollow = async (userId: number) => {
    const reqFollow = {
      follow_user_id: userId,
    };
    try {
      await followMutation.mutateAsync(reqFollow);
      followRefetch();
    } catch (err) {
      console.error(err);
    }
  };

  const onClickDeleteFollow = async (followId: number) => {
    try {
      await deleteFollowMutation.mutateAsync(followId);
      followRefetch();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box css={followsBox}>
        <h3>{selectLabel === 0 ? 'フォロー' : 'フォロワー'}</h3>
        <TabsBox
          labels={['フォロー', 'フォロワー']}
          selectTab={selectLabel}
          setSelectTab={setSelectLabel}
        />
        {selectFollow?.map((follow) => (
          <div key={follow.id} css={listBox}>
            <div css={userImgBox}>
              {follow.followUserResponse.image !== '' ? (
                <Image
                  src={follow.followUserResponse.image}
                  fill
                  sizes="(max-width: 70px)"
                  alt="ユーザー画像"
                />
              ) : (
                <Image src={NoimageUser} fill sizes="(max-width: 70px)" alt="ユーザー画像" />
              )}
            </div>
            <span>{follow.followUserResponse.name}</span>
            {follow.followUserResponse.followBackId === 0 ? (
              <span className="postUserBox__followBtn">
                <ButtonBox onClick={() => onClickFollow(follow.followUserResponse.id)}>
                  フォローする
                </ButtonBox>
              </span>
            ) : (
              <span className="postUserBox__followBtn">
                <ButtonBox
                  onClick={() => onClickDeleteFollow(follow.followUserResponse.followBackId)}
                >
                  フォロー中
                </ButtonBox>
              </span>
            )}
          </div>
        ))}
        <PaginationBox
          count={countPages(
            selectLabel === 0 ? follow.followTotalPageCount : follow.followerTotalPageCount
          )}
          currentPage={currentFollowPage}
          setCurrentPage={setCurrentFollowPage}
        />
      </Box>
    </Modal>
  );
});

FollowsBox.displayName = 'FollowsBox';

const followsBox = css`
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 500px;
  height: auto;
  max-height: 90vh;
  background-color: #fff;
  border: 1px solid #333;
  border-radius: 10px;
  overflow-y: scroll;

  h3 {
    text-align: center;
  }

  button {
    margin: 20px auto;
    display: block;
  }
`;

const listBox = css`
  margin: 12px 0;
  display: flex;
  align-items: center;
  position: relative;

  .postUserBox__followBtn {
    position: absolute;
    right: 0;
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
