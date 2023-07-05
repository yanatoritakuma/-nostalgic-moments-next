import { memo, useContext } from 'react';
import { css } from '@emotion/react';
import Modal from '@mui/material/Modal';
import { MessageContext } from '@/provider/MessageProvider';
import Link from 'next/link';

export const ApiTimeoutBox = memo(() => {
  const { apiTimeOutFlag, setApiTimeOutFlag } = useContext(MessageContext);
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
