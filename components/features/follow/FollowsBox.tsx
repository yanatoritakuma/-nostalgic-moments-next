import { memo, useState } from 'react';
import { css } from '@emotion/react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { TabsBox } from '@/components/elements/TabsBox';
import { FollowsListBox } from '@/components/features/follow/FollowsListBox';
import { TResFollow } from '@/types/follow';

type Props = {
  open: boolean;
  setOpen: (value: React.SetStateAction<boolean>) => void;
  selectLabel: number;
  follow: TResFollow | undefined;
};

export const FollowsBox = memo((props: Props) => {
  const { open, setOpen, selectLabel, follow } = props;
  const [selectTab, setSelectTab] = useState(selectLabel);

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box css={followsBox}>
        <h3>{selectTab === 0 ? 'フォロー' : 'フォロワー'}</h3>
        <TabsBox
          labels={['フォロー', 'フォロワー']}
          selectTab={selectTab}
          setSelectTab={setSelectTab}
        />
        {selectTab === 0 ? (
          <FollowsListBox follows={follow?.follows} />
        ) : (
          <FollowsListBox follows={follow?.followers} />
        )}
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
