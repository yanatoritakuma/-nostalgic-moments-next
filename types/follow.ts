export type TResFollow = {
  followTotalPageCount: number;
  followerTotalPageCount: number;
  followers: TFollow[];
  follows: TFollow[];
};

type TFollow = {
  id: number;
  follow_user_id: number;
  user_id: number;
};
