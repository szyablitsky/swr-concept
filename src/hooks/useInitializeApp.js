import { useLoadCurrentAuth } from 'hooks/api/auth';
import { useLoadNotifications } from 'hooks/api/notifications';
import useSubscription from 'hooks/useSubscription';

export default function useInitializeApp() {
  const { currentAuth } = useLoadCurrentAuth();
  const { notifications, mutate } = useLoadNotifications();

  useSubscription('notificationsUpdated', mutate);

  return {
    isInitializing: !currentAuth || !notifications,
  }
}
