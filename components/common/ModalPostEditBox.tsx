import { memo } from 'react';
import { css } from '@emotion/react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Form } from '@/components/features/post/Form';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '94%',
  maxWidth: '500px',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

type Props = {
  open: boolean;
  setOpen: (value: React.SetStateAction<boolean>) => void;
};

export const ModalPostEditBox = memo((props: Props) => {
  const { open, setOpen } = props;

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box css={editBox} sx={style}>
        <h3>編集</h3>
        <Form type="edit" setOpen={setOpen} />
      </Box>
    </Modal>
  );
});

ModalPostEditBox.displayName = 'ModalPostEditBox';

const editBox = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 94%;
  max-width: 500px;
  background-color: #fff;
  border: 1px solid #333;
  border-radius: 10px;

  h3 {
    text-align: center;
  }
`;
