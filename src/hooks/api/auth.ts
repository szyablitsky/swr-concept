import useSWRImmutable from 'swr/immutable';
import { UserType } from 'types/api/user';

export const useLoadCurrentAuth = (): {
  currentAuth: { user: UserType | null },
} => {
  const { data } = useSWRImmutable('/api/auth');

  return {
    currentAuth: data,
  };
};
