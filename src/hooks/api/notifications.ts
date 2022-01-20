import { KeyedMutator } from 'swr';
import useSWRImmutable from 'swr/immutable';
import { NotificationType } from 'types/api/notification';
import API from "API";

export const useLoadNotifications = (): { notifications: NotificationType[] | undefined, mutate: KeyedMutator<Partial<NotificationType>[]>,  } => {
  const { data, mutate } = useSWRImmutable(`/api/notifications`, (url: string) => API("GET", url));

  return {
    mutate,
    notifications: data,
  };
};
