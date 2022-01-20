import useNotifications from 'hooks/useNotifications';

export default function useNewMessagesCount() {
  const { notifications } = useNotifications();

  return notifications.reduce((acc, notification) => {
    acc += notification.messageCount;
    return acc;
  }, 0);
}
