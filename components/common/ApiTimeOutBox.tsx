import { memo, useContext, useEffect } from 'react';
import { css } from '@emotion/react';
import Modal from '@mui/material/Modal';
import Link from 'next/link';
import { BackdropContext } from '@/provider/BackdropProvider';

export const ApiTimeoutBox = memo(() => {
  const { apiTimeOutFlag, setApiTimeOutFlag, backdropFlag, setBackdropFlag } =
    useContext(BackdropContext);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    // タイムアウトを設定（3分間）
    const setAlertTimeout = () => {
      timeoutId = setTimeout(() => {
        if (backdropFlag === true) {
          setApiTimeOutFlag(true);
          setBackdropFlag(false);
        }
      }, 30000);
    };

    // データがロードされたらタイムアウトをクリア
    const clearAlertTimeout = () => {
      clearTimeout(timeoutId);
    };

    // コンポーネントのマウント時にタイムアウトを設定
    setAlertTimeout();

    // コンポーネントのアンマウント時にタイムアウトをクリア
    return () => {
      clearAlertTimeout();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [backdropFlag]);

  return (
    <Modal open={apiTimeOutFlag} onClose={() => setApiTimeOutFlag(false)}>
      <div css={apiTimeoutBox}>
        <h3>タイムアウト</h3>
        <p>
          初期起動に時間がかかる場合があります。
          <br />
          時間をおいてから再度、アクセスしてください。
        </p>
        <Link href="/" onClick={() => setApiTimeOutFlag(false)}>
          ホームへ
        </Link>
      </div>
    </Modal>
  );
});

ApiTimeoutBox.displayName = 'ApiTimeoutBox';

const apiTimeoutBox = css`
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 500px;
  height: auto;
  max-height: 90vh;
  background-color: #fff;
  border: 1px solid #333;
  border-radius: 10px;
  overflow-y: scroll;

  h3 {
    text-align: center;
    color: #e9546b;
  }

  p {
    text-align: center;
    line-height: 1.5em;
  }

  a {
    margin: 20px auto;
    display: block;
    width: fit-content;
    color: #0095d9;
  }
`;
