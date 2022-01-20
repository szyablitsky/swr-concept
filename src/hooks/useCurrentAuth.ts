import { useLoadCurrentAuth } from 'hooks/api/auth';
import { UserType } from 'types/api/user';

export default function useCurrentAuth(): { user: UserType } {
  const { currentAuth } = useLoadCurrentAuth();

  if (!currentAuth.user) throw new Error('User not loaded')

  return { user: currentAuth.user };
}
