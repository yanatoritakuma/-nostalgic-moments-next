import { css } from '@emotion/react';
import React, { memo } from 'react';
import { AccordionBox } from '@/components/elements/AccordionBox';
import { chubu, chugoku, kantou, kinki, tohoku } from '@/const/prefecture';

export const Prefectures = memo(() => {
  return (
    <section css={prefecturesBox}>
      <h2>都道府県から選ぶ</h2>
      <div className="prefecturesBox__box">
        <div className="prefecturesBox__accordionBox">
          <AccordionBox
            title="北海道地方"
            links={[
              {
                name: '北海道',
                url: '/prefectures/hokkaido',
              },
            ]}
          />
        </div>
        <div className="prefecturesBox__accordionBox">
          <AccordionBox title="東北地方" links={tohoku} />
        </div>
        <div className="prefecturesBox__accordionBox">
          <AccordionBox title="関東地方" links={kantou} />
        </div>
        <div className="prefecturesBox__accordionBox">
          <AccordionBox title="中部地方" links={chubu} />
        </div>
        <div className="prefecturesBox__accordionBox">
          <AccordionBox title="近畿地方" links={kinki} />
        </div>
        <div className="prefecturesBox__accordionBox">
          <AccordionBox title="中国地方" links={chugoku} />
        </div>
      </div>
    </section>
  );
});

Prefectures.displayName = 'Prefectures';

const prefecturesBox = css`
  padding: 60px 0;
  background-color: #dddcd6;
  width: 100%;

  h2 {
    margin: 0 0 40px 0;
  }

  .prefecturesBox__box {
    margin: 0 auto;
    width: 90%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;

    @media (max-width: 425px) {
      grid-template-columns: 1fr 1fr;
    }
  }

  a {
    color: #0095d9;
  }

  .prefecturesBox__accordionBox {
    margin: 20px 0;
    width: 90%;
  }
`;
