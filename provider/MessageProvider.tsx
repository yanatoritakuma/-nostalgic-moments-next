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
};

export const MessageContext = createContext<TMessage>({
  message: {
    text: '',
    type: 'success',
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setMessage: () => {},
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

  return (
    <MessageContext.Provider value={{ message, setMessage }}>{children}</MessageContext.Provider>
  );
};
