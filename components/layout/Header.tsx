import { css } from '@emotion/react';
import React, { memo, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useQueryUser } from '@/hooks/useQueryUser';

const Header = memo(() => {
  const [hambBtn, setHambBtn] = useState(false);
  const { data: user } = useQueryUser();
  console.log('user', user);

  return (
    <header css={HeaderBox}>
      <div css={HeaderInBox}>
        ロゴ
        <IconButton onClick={() => setHambBtn(!hambBtn)}>
          {!hambBtn ? <MenuIcon /> : <CloseIcon />}
        </IconButton>
      </div>
    </header>
  );
});

export default Header;

Header.displayName = 'Header';

const HeaderBox = css`
  background-color: #e2e1e1;
  width: 100%;
`;

const HeaderInBox = css`
  margin: 0 auto;
  padding: 20px;
  max-width: 1440px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
