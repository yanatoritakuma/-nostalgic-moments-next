import { css } from '@emotion/react';
import { useQueryAllPosts } from '@/hooks/useQueryAllPosts';
import { useQueryUserPost } from '@/hooks/useQueryUserPost';
import Image from 'next/image';
import TopImg from '@/images/top.jpg';
import Link from 'next/link';
import { AccordionBox } from '@/components/elements/AccordionBox';

export default function Home() {
  const { data: userPost } = useQueryUserPost();
  console.log('userPost', userPost);
  const { data: allPosts } = useQueryAllPosts();
  console.log('allPosts', allPosts);

  const tohoku = [
    {
      name: '青森',
      url: '/prefectures/aomori',
    },
    {
      name: '岩手県',
      url: '/prefectures/iwate',
    },
    {
      name: '秋田県',
      url: '/prefectures/akita',
    },
    {
      name: '宮城県',
      url: '/prefectures/miyagi',
    },
    {
      name: '山形県',
      url: '/prefectures/yamagata',
    },
    {
      name: '福島県',
      url: '/prefectures/fukushima',
    },
  ];

  const kantou = [
    {
      name: '茨城県',
      url: '/prefectures/ibaraki',
    },
    {
      name: '栃木県',
      url: '/prefectures/tochigi',
    },
    {
      name: '群馬県',
      url: '/prefectures/gunma',
    },
    {
      name: '埼玉県',
      url: '/prefectures/saitama',
    },
    {
      name: '千葉県',
      url: '/prefectures/chiba',
    },
    {
      name: '東京都',
      url: '/prefectures/tokyo',
    },
    {
      name: '神奈川県',
      url: '/prefectures/kanagawa',
    },
  ];

  return (
    <main css={mainBox}>
      <div css={topImgBox}>
        <div className="filter"></div>
        <h1>NostalgicMoments</h1>
        <Image src={TopImg} fill alt="TOP画像" />
      </div>
      <section css={refecturesBox}>
        <h2>都道府県から選ぶ</h2>
        <div className="refecturesBox__box">
          <Link href="/prefectures/hokkaido">北海道</Link>
          <div className="refecturesBox__accordionBox">
            <AccordionBox title="東北地方" links={tohoku} />
          </div>
          <div className="refecturesBox__accordionBox">
            <AccordionBox title="関東地方" links={kantou} />
          </div>
        </div>
      </section>
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

const refecturesBox = css`
  padding: 60px 0;
  background-color: #dddcd6;
  width: 100%;

  h2 {
    margin: 0 0 40px 0;
  }

  .refecturesBox__box {
    margin: 0 auto;
    width: 90%;
    display: flex;
    justify-content: space-between;
  }

  a {
    color: #0095d9;
  }

  .refecturesBox__accordionBox {
    margin: 20px 0;
    width: 34%;
  }
`;
