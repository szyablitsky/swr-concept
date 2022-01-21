import qs from 'query-string';
import useSWR, { KeyedMutator } from "swr";
import { UserRoleType, UserType, UserIncludesType } from 'types/api/user';

type UseLoadUsers = <K extends keyof UserIncludesType | never = never>(params?: {
  q?: string,
  role?: UserRoleType,
  includes?: K[],
}) => {
  users: UserType<K>[] | undefined,
  mutate: KeyedMutator<Partial<UserType<K>>[]>,
  isValidating: boolean,
}

export const useLoadUsers: UseLoadUsers = (params) => {
  const { data, isValidating, mutate } = useSWR(`/api/users?${qs.stringify(params || {})}`);

  return {
    mutate,
    users: data,
    isValidating: isValidating,
  };
};
