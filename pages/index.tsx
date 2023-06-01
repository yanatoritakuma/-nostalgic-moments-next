import { css } from '@emotion/react';
import Image from 'next/image';
import TopImg from '@/images/top.jpg';
import Prefectures from '@/components/features/home/Prefectures';
import TagSearch from '@/components/features/home/TagSearch';
import { LikeTop } from '@/components/features/home/LikeTop';

export default function Home() {
  return (
    <main css={mainBox}>
      <section css={topImgBox}>
        <div className="filter"></div>
        <h1>NostalgicMoments</h1>
        <Image src={TopImg} fill priority alt="TOP画像" />
      </section>
      <Prefectures />
      <TagSearch />
      <LikeTop />
    </main>
  );
}

const mainBox = css`
  h2 {
    margin: 30px 0;
    text-align: center;
  }
`;

const topImgBox = css`
  display: block;
  width: 100%;
  height: 100vh;
  position: relative;

  .filter {
    display: block;
    background-color: #333;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    opacity: 0.5;
  }

  h1 {
    color: #fff;
    font-size: 36px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;

    @media (max-width: 425px) {
      font-size: 30px;
    }
  }

  img {
    object-fit: cover;
  }
`;
