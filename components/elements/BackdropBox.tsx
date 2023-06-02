import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { memo, useContext } from 'react';
import { BackdropContext } from '@/provider/BackdropProvider';

export const BackdropBox = memo(() => {
  const { backdropFlag } = useContext(BackdropContext);

  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdropFlag}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
});

BackdropBox.displayName = 'BackdropBox';
