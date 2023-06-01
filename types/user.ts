export type TUser = {
  id: number;
  email: string;
  name: string;
  image: string;
  admin: boolean;
  created_at: string;
};

export type TReqUser = {
  name: string;
  image: string;
  email: string;
};

export type TResPostUser = {
  id: number;
  image: string;
  name: string;
};
