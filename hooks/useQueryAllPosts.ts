import { useRouter } from 'next/router';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export const useQueryAllPosts = () => {
  const getUser = async () => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts`);
    return data;
  };
  return useQuery({
    queryKey: ['allPosts'],
    queryFn: getUser,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403) {
        // router.push("/");
      }
    },
  });
};
