import { TTagRes } from '@/types/tag';
import { TResPostUser } from '@/types/user';

export type TPost = {
  address: string;
  created_at: string;
  id: number;
  image: string;
  postUserResponse: TResPostUser;
  prefecture: string;
  title: string;
  text: string;
  user_id: number;
  like_count: number;
  like_id: number;
  tagResponse: TTagRes[];
  commentCount: number;
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

export type TLikeTopTenPosts = {
  likeTopTenPosts: TPost[];
};
