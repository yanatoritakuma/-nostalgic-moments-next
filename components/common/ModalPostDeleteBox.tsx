import { memo } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

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

export const ModalPostDeleteBox = memo((props: Props) => {
  const { open, setOpen } = props;

  return (
    <div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <h3>削除</h3>
        </Box>
      </Modal>
    </div>
  );
});

ModalPostDeleteBox.displayName = 'ModalPostDeleteBox';
