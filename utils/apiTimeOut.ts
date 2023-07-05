import { useContext, useEffect } from 'react';
import { BackdropContext } from '@/provider/BackdropProvider';
import { MessageContext } from '@/provider/MessageProvider';

export const apiTimeOut = (isLoading: boolean) => {
  const { setBackdropFlag } = useContext(BackdropContext);
  const { setApiTimeOutFlag } = useContext(MessageContext);

  useEffect(() => {
    setBackdropFlag(true);
    let timeoutId: NodeJS.Timeout;

    // タイムアウトを設定
    const setAlertTimeout = () => {
      timeoutId = setTimeout(() => {
        if (isLoading === true) {
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
  }, [isLoading]);

  // prefecturesPostAPIを取得完了の監視
  useEffect(() => {
    if (isLoading === false) {
      setBackdropFlag(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);
};
