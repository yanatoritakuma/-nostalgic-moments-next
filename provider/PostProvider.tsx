import React, { createContext, useState } from 'react';

type TPostGlobal = {
  postGlobal: {
    id: number;
    userId: number;
    title: string;
    text: string;
    image: string;
    prefecture: string;
    address: string;
  };

  setPostGlobal: React.Dispatch<
    React.SetStateAction<{
      id: number;
      userId: number;
      title: string;
      text: string;
      image: string;
      prefecture: string;
      address: string;
    }>
  >;
};

export const PostContext = createContext<TPostGlobal>({
  postGlobal: {
    id: 0,
    userId: 0,
    title: '',
    text: '',
    image: '',
    prefecture: '',
    address: '',
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setPostGlobal: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const PostProvider = (props: Props) => {
  const { children } = props;
  const [postGlobal, setPostGlobal] = useState({
    id: 0,
    userId: 0,
    title: '',
    text: '',
    image: '',
    prefecture: '',
    address: '',
  });

  return (
    <PostContext.Provider value={{ postGlobal, setPostGlobal }}>{children}</PostContext.Provider>
  );
};
