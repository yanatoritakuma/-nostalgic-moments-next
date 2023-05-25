import { memo } from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

type Props = {
  label: string;
  onClick: () => void;
};

export const ChipBox = memo((props: Props) => {
  const { label, onClick } = props;

  return (
    <Stack direction="row" spacing={1}>
      <Chip label={label} variant="outlined" onDelete={onClick} />
    </Stack>
  );
});

ChipBox.displayName = 'ChipBox';
