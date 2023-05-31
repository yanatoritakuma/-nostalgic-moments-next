import { TResPostUser } from '@/types/user';

export type TPostComment = {
  comment: TComment[];
  totalCommentCount: number;
};

type TComment = {
  id: number;
  comment: string;
  postUserResponse: TResPostUser;
};

export type TReqPostComment = {
  comment: string;
  post_id: number;
};
