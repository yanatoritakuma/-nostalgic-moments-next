import { css } from '@emotion/react';
import { useQueryAllPosts } from '@/hooks/useQueryAllPosts';
import { useQueryUserPost } from '@/hooks/useQueryUserPost';
import Image from 'next/image';
import MapImg from '@/images/map.png';

export default function Home() {
  const { data: userPost } = useQueryUserPost();
  console.log('userPost', userPost);
  const { data: allPosts } = useQueryAllPosts();
  console.log('allPosts', allPosts);

  return (
    <main css={mainBox}>
      <h1>NostalgicMoments</h1>
      <div css={MapImgBox}>
        <Image src={MapImg} fill alt="地図" />
        <span className="hokkaido"></span>
      </div>
    </main>
  );
}

const mainBox = css`
  padding: 20px;

  h1 {
    margin: 40px 0;
    text-align: center;
  }
`;

const MapImgBox = css`
  margin: 20px auto;
  width: 980px;
  height: 800px;
  position: relative;

  @media (max-width: 1024px) {
    width: 680px;
    height: 500px;
  }

  @media (max-width: 768px) {
    width: 380px;
    height: 380px;
  }

  @media (max-width: 425px) {
    width: 320px;
    height: 320px;
  }

  @media (max-width: 375px) {
    width: 280px;
    height: 280px;
  }

  img {
    object-fit: contain;
  }

  .hokkaido {
    display: block;
    width: 230px;
    height: 176px;
    position: absolute;
    top: 0;
    right: 62px;
    cursor: pointer;

    @media (max-width: 1024px) {
      width: 145px;
      height: 108px;
      right: 72px;
    }
    @media (max-width: 768px) {
      width: 98px;
      height: 74px;
      top: 15px;
      right: 3px;
    }
    @media (max-width: 425px) {
      width: 85px;
      height: 60px;
      right: 2px;
    }
    @media (max-width: 375px) {
      width: 75px;
      height: 56px;
      top: 11px;
    }

    span {
      margin: 20px 0;
      display: block;
    }
  }
`;
