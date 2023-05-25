import { TTagRes } from '@/types/tag';

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
  like_count: number;
  like_id: number;
  tagResponse: TTagRes[];
};

export type TPostPages = {
  posts: TPost[];
  likePosts: TPost[];
  totalPageCount: number;
  totalLikeCount: number;
};

export type TReqPost = {
  id?: number;
  title: string;
  text: string;
  image?: string | null;
  prefecture: string;
  address: string;
};
