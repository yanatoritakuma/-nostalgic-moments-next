import Button from '@mui/material/Button';
import { memo } from 'react';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

type Props = {
  children: string;
  onClick?: () => void;
  upload?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  variant?: 'text' | 'contained' | 'outlined';
};

export const ButtonBox = memo((props: Props) => {
  const { children, onClick, upload, onChange, variant } = props;

  return (
    <>
      {!upload ? (
        <Button onClick={onClick} variant={variant !== undefined ? variant : 'contained'}>
          {children}
        </Button>
      ) : (
        <IconButton color="primary" aria-label="upload picture" component="label">
          <input hidden accept="image/*" type="file" onChange={onChange} />
          <PhotoCamera />
        </IconButton>
      )}
    </>
  );
});

ButtonBox.displayName = 'ButtonBox';
