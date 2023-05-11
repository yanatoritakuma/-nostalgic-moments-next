import React, { createContext, useState } from 'react';

export const BackdropContext = createContext({
  backdropFlag: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  setBackdropFlag: (_flag: boolean) => {},
});

type Props = {
  children: React.ReactNode;
};

export const BackdropProvider = (props: Props) => {
  const { children } = props;
  const [backdropFlag, setBackdropFlag] = useState(false);

  return (
    <BackdropContext.Provider value={{ backdropFlag, setBackdropFlag }}>
      {children}
    </BackdropContext.Provider>
  );
};
