import ActiveChatContext from 'contexts/ActiveChatContext';
import useNotifications from 'hooks/useNotifications';
import useSubscription from 'hooks/useSubscription';
import { useCallback, useContext, useEffect, useState } from 'react';
import { NotificationType } from 'types/api/notification';

export default function useNewMessagesCount() {
  const { notifications } = useNotifications();
  const { activeChat } = useContext(ActiveChatContext);
  const [count, setCount] = useState(0);

  const calculateCount = useCallback((notifications: NotificationType[]) => {
    const count = notifications.reduce((acc, { chat }) => {
      if (chat.id !== activeChat?.id) acc += chat.unreadMessageCount;

      return acc;
    }, 0);

    setCount(count);
  }, [activeChat?.id]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => calculateCount(notifications), [activeChat?.id]);
  useSubscription('notificationsUpdated', calculateCount);

  return count;
}
