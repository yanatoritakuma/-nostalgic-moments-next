export type TResFollow = {
  followTotalPageCount: number;
  followerTotalPageCount: number;
  followers: TFollow[];
  follows: TFollow[];
};

export type TFollow = {
  id: number;
  follow_user_id: number;
  user_id: number;
  followUserResponse: TFollowUserResponse;
};

export type TReqFollow = {
  follow_user_id: number;
};

type TFollowUserResponse = {
  id: number;
  image: string;
  name: string;
  followBackId: number;
};
