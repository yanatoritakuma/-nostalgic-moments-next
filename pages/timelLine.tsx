import { useContext, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { PaginationBox } from '@/components/common/PaginationBox';
import { PostBox } from '@/components/features/post/PostBox';
import { useQueryTimeline } from '@/hooks/post/useQueryTimeline';
import { useQueryUser } from '@/hooks/user/useQueryUser';
import { countPages } from '@/utils/countPages';
import { BackdropContext } from '@/provider/BackdropProvider';

const timelLine = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { setBackdropFlag } = useContext(BackdropContext);
  const { data: user } = useQueryUser();
  const {
    data: timeline,
    refetch: timelineRefetch,
    isLoading: timelineIsLoading,
  } = useQueryTimeline(currentPage, 10);

  // API通信時間監視
  useEffect(() => {
    setBackdropFlag(timelineIsLoading);
  }, [timelineIsLoading, setBackdropFlag]);

  // ページネーションでタイムラインのAPI再取得
  useEffect(() => {
    timelineRefetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return (
    <main css={timelLineBox}>
      <h2>タイムライン</h2>
      {timeline !== undefined && (
        <>
          <PostBox posts={timeline.posts} user={user} refetch={timelineRefetch} />
          <PaginationBox
            count={countPages(timeline.totalPageCount)}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
      {timeline?.posts.length === 0 && (
        <span className="timelLineBox__noPost">投稿が見つかりません。</span>
      )}
    </main>
  );
};

export default timelLine;

const timelLineBox = css`
  padding: 40px 80px;

  @media (max-width: 768px) {
    padding: 20px 40px;
  }

  @media (max-width: 425px) {
    padding: 20px 14px;
  }

  h2 {
    margin: 20px 0;
    text-align: center;
  }

  .timelLineBox__noPost {
    display: block;
    text-align: center;
  }
`;
