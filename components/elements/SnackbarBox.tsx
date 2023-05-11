import { forwardRef, memo, useContext, useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { MessageContext } from '@/provider/MessageProvider';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const SnackbarBox = memo(() => {
  const { message, setMessage } = useContext(MessageContext);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (message.text !== '') {
      setOpen(true);
    }
  }, [message]);

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <Alert
          onClose={() => {
            setOpen(false),
              setMessage({
                ...message,
                text: '',
              });
          }}
          severity={message.type}
          sx={{ width: '100%' }}
        >
          {message.text}
        </Alert>
      </Snackbar>
    </Stack>
  );
});

SnackbarBox.displayName = 'SnackbarBox';
