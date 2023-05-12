export type TPost = {
  address: string;
  created_at: string;
  id: number;
  image: string;
  postUserResponse: {
    id: number;
    image: string;
    name: string;
  };
  prefecture: string;
  title: string;
  text: string;
  user_id: number;
};

export type TPostPages = {
  posts: TPost[];
  totalCount: number;
};

export type TReqPost = {
  title: string;
  text: string;
  image?: string | null;
  prefecture: string;
  address: string;
};
