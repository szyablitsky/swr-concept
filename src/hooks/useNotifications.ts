import { NotificationType } from 'types/api/notification';
import { useLoadNotifications } from './api/notifications';

export default function useNotifications(): { notifications: NotificationType[] } {
  const { notifications } = useLoadNotifications();

  if (!notifications) throw new Error('Notifications not loaded')

  return { notifications };
}
