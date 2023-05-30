import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { PostBox } from '@/components/features/post/PostBox';
import { useQueryTagPost } from '@/hooks/post/useQueryTagPost';
import { useQueryUser } from '@/hooks/user/useQueryUser';
import { useRouter } from 'next/router';
import { PaginationBox } from '@/components/common/PaginationBox';
import { countPages } from '@/utils/countPages';

const tagSearch = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const { tag } = router.query;
  const { data: user } = useQueryUser();
  const { data: tagPost, refetch: tagPostRefetch } = useQueryTagPost(
    String(tag),
    currentPage,
    10,
    user?.id
  );

  useEffect(() => {
    tagPostRefetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tag]);

  // ページネーション再取得
  useEffect(() => {
    tagPostRefetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return (
    <main css={tagSearchBox}>
      <h2>検索結果</h2>
      <span className="tagSearchBox__text">#{tag}で検索</span>
      {tagPost !== undefined &&
        (tagPost.posts.length > 0 ? (
          <>
            <PostBox posts={tagPost.posts} user={user} refetch={tagPostRefetch} />
            <PaginationBox
              count={countPages(tagPost.totalPageCount)}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </>
        ) : (
          <p className="tagSearchBox__text">該当する結果が見つかりませんでした。</p>
        ))}
    </main>
  );
};

export default tagSearch;

const tagSearchBox = css`
  padding: 40px 80px;
  width: 100%;

  @media (max-width: 768px) {
    padding: 20px 40px;
  }

  @media (max-width: 425px) {
    padding: 20px 14px;
  }

  h2 {
    text-align: center;
  }

  .tagSearchBox__text {
    text-align: center;
    display: block;
    font-size: 18px;
  }
`;
