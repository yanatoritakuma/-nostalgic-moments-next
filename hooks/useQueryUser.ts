import { useRouter } from 'next/router';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export const useQueryUser = () => {
  const getUser = async () => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user`);
    return data;
  };
  return useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403) {
        // router.push("/");
      }
    },
  });
};
