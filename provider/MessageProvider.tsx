import React, { createContext, useState } from 'react';

type TMessage = {
  message: {
    text: string;
    type: 'error' | 'warning' | 'info' | 'success';
  };
  setMessage: React.Dispatch<
    React.SetStateAction<{
      text: string;
      type: 'error' | 'warning' | 'info' | 'success';
    }>
  >;
  apiTimeOutFlag: boolean;
  setApiTimeOutFlag: React.Dispatch<React.SetStateAction<boolean>>;
};

export const MessageContext = createContext<TMessage>({
  message: {
    text: '',
    type: 'success',
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setMessage: () => {},
  apiTimeOutFlag: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setApiTimeOutFlag: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const MessageProvider = (props: Props) => {
  const { children } = props;
  const [message, setMessage] = useState<{
    text: string;
    type: 'error' | 'warning' | 'info' | 'success';
  }>({
    text: '',
    type: 'success',
  });

  const [apiTimeOutFlag, setApiTimeOutFlag] = useState(false);

  return (
    <MessageContext.Provider value={{ message, setMessage, apiTimeOutFlag, setApiTimeOutFlag }}>
      {children}
    </MessageContext.Provider>
  );
};
