import { memo } from 'react';
import { css } from '@emotion/react';
import Image from 'next/image';
import NoimageUser from '@/images/noimage-user.png';
import { TFollow } from '@/types/follow';
import { useMutateFollow } from '@/hooks/follow/useMutateFollow';
import { ButtonBox } from '@/components/elements/ButtonBox';

type Props = {
  follows: TFollow[] | undefined;
};

export const FollowsListBox = memo((props: Props) => {
  const { follows } = props;
  const { followMutation, deleteFollowMutation } = useMutateFollow();

  const onClickFollow = async (userId: number) => {
    const reqFollow = {
      follow_user_id: userId,
    };
    try {
      await followMutation.mutateAsync(reqFollow);
    } catch (err) {
      console.error(err);
    }
  };

  const onClickDeleteFollow = async (followId: number) => {
    try {
      await deleteFollowMutation.mutateAsync(followId);
    } catch (err) {
      console.error(err);
    }
  };
  console.log('follow', follows);
  return (
    <section>
      {follows?.map((follow) => (
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
    </section>
  );
});

FollowsListBox.displayName = 'FollowsListBox';

const listBox = css`
  margin: 12px 0;
  display: flex;
  align-items: center;
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
