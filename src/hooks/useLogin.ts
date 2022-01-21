import API from 'lib/API';
import { useSWRConfig } from 'swr';
import { UserRoleType } from 'types/api/user';

export default function useLogin() {
  const { mutate, cache } = useSWRConfig();

  return async (role: UserRoleType) => {
    // @ts-ignore
    cache.clear();

    const currentAuth = await API("POST", "/api/auth", { role });

    await mutate("/api/auth", currentAuth, false);
    await mutate("/api/notifications");
  };
}
