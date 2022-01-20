import EE from 'lib/eventEmitter';
import { useEffect } from 'react';

export default function useSubscription(event: string, handler: () => {}) {
  useEffect(() => {
    const cb = () => handler();

    EE.on('notificationsUpdated', cb);

    return () => { EE.off('notificationsUpdated', cb) };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
