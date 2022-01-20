import useSWRImmutable from 'swr/immutable';
import API from "API";
import { UserType } from 'types/api/user';

export const useLoadCurrentAuth = (): {
  currentAuth: { user: UserType | null },
} => {
  const { data } = useSWRImmutable("/api/auth", (url: string) => API("GET", url), {
    revalidateIfStale: false,
    revalidateOnFocus: false
  });

  return {
    currentAuth: data,
  };
};
