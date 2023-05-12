import { memo, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { animateScroll as scroll } from 'react-scroll';

type Props = {
  count: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

export const PaginationBox = memo((props: Props) => {
  const { count, currentPage, setCurrentPage } = props;

  useEffect(() => {
    scroll.scrollToTop();
  }, [currentPage]);

  return (
    <Stack spacing={2} style={{ margin: '0 auto', width: 'fit-content' }}>
      <Pagination
        count={count}
        page={currentPage}
        onChange={(event: React.ChangeEvent<unknown>, value: number) => setCurrentPage(value)}
        color="primary"
      />
    </Stack>
  );
});

PaginationBox.displayName = 'PaginationBox';
