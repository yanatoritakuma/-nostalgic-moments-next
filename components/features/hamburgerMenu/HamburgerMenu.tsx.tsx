import { useMutateAuth } from '@/hooks/useMutateAuth';
import { css } from '@emotion/react';
import Link from 'next/link';
import React, { memo } from 'react';

type Props = {
  hambBtn: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
};

const HamburgerMenu = memo((props: Props) => {
  const { hambBtn, onClose } = props;
  const { logoutMutation } = useMutateAuth();
  return (
    <div css={menuBox(hambBtn)}>
      <Link href="/post">投稿</Link>
      <Link href="/">マイページ</Link>
      <span
        onClick={() => {
          logoutMutation.mutate();
          onClose;
        }}
      >
        ログアウト
      </span>
      <Link href="/">退会</Link>
    </div>
  );
});

export default HamburgerMenu;

HamburgerMenu.displayName = 'HamburgerMenu';

const menuBox = (hambBtn: boolean) => css`
  padding: 20px;
  background: #302833;
  border-radius: 0 0 0 10px;
  position: fixed;
  width: 90%;
  height: 80vh;
  max-width: 600px;

  right: ${hambBtn ? '0px' : '-800px'};
  transition: 0.3s;

  a,
  span {
    margin-bottom: 20px;
    padding-bottom: 8px;
    display: block;
    text-decoration: none;
    color: #fff;
    border-bottom: 1px solid #fff;
    cursor: pointer;
  }
`;
