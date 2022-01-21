import API from 'lib/API';
import { useSWRConfig } from 'swr';

export default function useLogin() {
  const { mutate, cache } = useSWRConfig();

  return async () => {
    await API("POST", "/api/auth", { role: null });
    await mutate('/api/auth', { user: null }, false);

    // @ts-ignore
    cache.clear();
  };
}
