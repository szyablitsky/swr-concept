import EE from 'lib/eventEmitter';
import { useEffect } from 'react';
import { NotificationType } from 'types/api/notification';

export default function useSubscription(event: string, handler: (notifications: NotificationType[]) => void) {
  useEffect(() => {
    const cb = handler;

    EE.on('notificationsUpdated', cb);

    return () => { EE.off('notificationsUpdated', cb) };
  }, [handler]);
}
