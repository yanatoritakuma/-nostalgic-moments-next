import { useMutateAuth } from '@/hooks/auth/useMutateAuth';
import { css } from '@emotion/react';
import Link from 'next/link';
import { memo, useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

type Props = {
  hambBtn: boolean;
  setHambBtn: React.Dispatch<React.SetStateAction<boolean>>;
};

export const HamburgerMenu = memo((props: Props) => {
  const { hambBtn, setHambBtn } = props;
  const { logoutMutation } = useMutateAuth();

  useEffect(() => {
    if (hambBtn) {
      setHambBtn(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hambBtn]);

  const list = () => (
    <Box css={menuBox} role="presentation" onClick={() => setHambBtn(false)}>
      <Link href="/" onClick={() => setHambBtn(false)}>
        HOME
      </Link>
      <Link href="/post" onClick={() => setHambBtn(false)}>
        投稿
      </Link>
      <Link href="/myPage" onClick={() => setHambBtn(false)}>
        マイページ
      </Link>
      <span
        onClick={() => {
          logoutMutation.mutate();
          setHambBtn(false);
        }}
      >
        ログアウト
      </span>
      <Link href="/" onClick={() => setHambBtn(false)}>
        退会
      </Link>
    </Box>
  );

  return (
    <Drawer anchor="right" open={hambBtn} onClose={() => setHambBtn(false)}>
      {list()}
    </Drawer>
  );
});

HamburgerMenu.displayName = 'HamburgerMenu';

const menuBox = css`
  padding: 20px;
  width: 400px;

  @media (max-width: 425px) {
    width: 240px;
  }

  a {
    margin: 20px 0;
    display: block;
    width: fit-content;
    text-decoration: none;
    cursor: pointer;
    color: #333;
  }
`;
