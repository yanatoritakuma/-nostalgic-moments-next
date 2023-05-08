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
