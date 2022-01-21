import { KeyedMutator } from 'swr';
import useSWRImmutable from 'swr/immutable';
import { NotificationType } from 'types/api/notification';

type UseLoadNotificationsType = () => {
  notifications: NotificationType[] | undefined,
  mutate: KeyedMutator<Partial<NotificationType>[]>,
}

export const useLoadNotifications: UseLoadNotificationsType = () => {
  const { data, mutate } = useSWRImmutable('/api/notifications');

  return {
    mutate,
    notifications: data,
  };
};
