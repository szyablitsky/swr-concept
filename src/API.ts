import EE from 'lib/eventEmitter';
import qs from "query-string";

const db = {
  firms: [
    {
      id: 1,
      title: "Taxdome",
    }
  ],
  users: [
    {
      id: 1,
      name: "James",
      email: 'james@example.com',
      role: "client",
      firm: 1
    },
    {
      id: 2,
      name: "Robert",
      email: 'robert@example.com',
      role: "client",
      firm: 1
    },
    {
      id: 3,
      name: "Daniel",
      email: 'daniel@example.com',
      role: "client",
      firm: 1
    },
    {
      id: 4,
      name: "Michael",
      email: 'michael@example.com',
      role: "employee",
      firm: 1
    },
    {
      id: 5,
      name: "William",
      email: 'william@example.com',
      role: "employee",
      firm: 1
    },
    {
      id: 6,
      name: "David",
      email: 'david@example.com',
      role: "owner",
      firm: 1
    },
    {
      id: 6,
      name: "John",
      email: 'john@example.com',
      role: "client",
      firm: 1
    }
  ],
  chats: [
    {
      id: 1,
      members: [1, 4],
    },
    {
      id: 2,
      members: [1, 6],
    },
  ],
  messages: [
    {
      id: 1,
      chatId: 1,
      from: 4,
      text: 'Luke, I am Your Father',
      readAt: null,
      createdAt: new Date(),
    },
    {
      id: 2,
      chatId: 2,
      from: 6,
      text: 'Ah, you made it! I\'m so thrilled!',
      readAt: new Date(),
      createdAt: new Date(),
    },
    {
      id: 3,
      chatId: 2,
      from: 1,
      text: 'Where\'s the detonator?',
      readAt: null,
      createdAt: new Date(),
    },
    {
      id: 4,
      chatId: 2,
      from: 1,
      text: 'Where\'s the detonator?',
      readAt: null,
      createdAt: new Date(),
    },
    {
      id: 5,
      chatId: 2,
      from: 1,
      text: 'Where\'s the detonator?',
      readAt: null,
      createdAt: new Date(),
    },
  ],
};

let currentUser: any = null;

const getNotifications = () => {
  if (!currentUser) return [];

  return db.chats
    .map((chat) => {
      if (!chat.members.includes(currentUser.id)) return null;

      const newMessageCount = db.messages.filter((message) => {
        return message.chatId === chat.id && !message.readAt && message.from !== currentUser.id;
      }).length;

      if (newMessageCount === 0) return null;

      return {
        type: 'newMessage',
        messageCount: newMessageCount,
        chat,
      }
    })
    .filter(Boolean);
};

let previousNotificationsStr = '';

const notificationsToString = (notifications: any) => {
  return notifications.map((n: any) => `${n.chat.id}:${n.messageCount}`).sort().join(',');
}
const updateNotifications = () => {
  const notifications = getNotifications();
  const notificationsStr = notificationsToString(notifications);

  if (previousNotificationsStr !== notificationsStr) {
    previousNotificationsStr = notificationsStr;
    console.log('%c[EVENT] ', 'color: yellow;', 'notificationsUpdated')
    EE.emit('notificationsUpdated', notifications);
  }
};


const API = async (method: string, url: string, data?: any): Promise<any> => {
  console.log('%c[API] ', 'color: green;', method, url, data);

  await new Promise((res) => setTimeout(res, 800));

  const [path, queryString] = url.split("?");
  const query = qs.parse(queryString);

  const res = (() => {
    switch (method) {
      case "GET":
        switch (path) {
          case '/api/auth': {
            return { user: currentUser };
          }
          case '/api/users': {
            const { role, q } = query;
            const includes = query.includes ? Array.isArray(query.includes) ? query.includes : [query.includes] : null;

            return db.users
              .filter((user) => (
                (role ? user.role === role : true) && (q ? user.name.toLocaleLowerCase().startsWith((q as string).toLowerCase()) : true)
              ))
              .map((user) => {
                return {
                  ...user,
                  ...(includes?.includes('firm') ? {
                    firm: db.firms.find((firm) => firm.id === user.firm),
                  } : { firm: undefined }),
                  ...(includes?.includes('policy') ? {
                    policy: { canEdit: true },
                  } : { firm: undefined }),
                }
              });
          }
          case '/api/chats': {
            const memberIds = query.memberIds ? Array.isArray(query.memberIds) ? query.memberIds : [query.memberIds] : null;

            return db.chats
              .filter((chat) => {
                if (!memberIds) return true;
                return memberIds.map(Number).every((id) => chat.members.includes(id));
              })
              .map((chat) => {
                return {
                  ...chat,
                  members: chat.members.map((id) => db.users.find((user) => user.id === Number(id))),
                  unreadMessageCount: db.messages.filter(({ chatId, readAt, from }) => chatId === chat.id && !readAt && from !== currentUser.id).length,
                }
              });
          }
          case '/api/notifications': {
            return getNotifications();
          }
          case '/api/messages': {
            const { chatId } = query;

            return db.messages
              .filter((message) => {
                return message.chatId === Number(chatId);
              })
              .map((message) => {
                return {
                  ...message,
                  from: db.users.find((user) => user.id === message.from),
                }
              });
          }
          default:
        }
        break;

      case "POST":
        switch (path) {
          case '/api/auth': {
            const { role } = data;

            currentUser = db.users.find((user) => user.role === role) || null;

            previousNotificationsStr = notificationsToString(getNotifications());

            return { user: currentUser };
          }
          case '/api/messages': {
            const newMessage = {
              ...data,
              id: db.messages[db.messages.length - 1].id + 1,
              from: data.from.id,
              readAt: null,
              createdAt: new Date(),
            };

            db.messages = [ ...db.messages, newMessage];

            updateNotifications();

            return true;
          }
          default:
        }
        break;

      case "PATCH":
        switch (path) {
          case '/api/messages': {
            db.messages = db.messages.map((message) => {
              if (message.id === data.id) {
                return {
                  ...message,
                  ...data,
                }
              }

              return message;
            });

            updateNotifications();

            return db.messages.find(({ id }) => id === data.id);
          }
          case '/api/users': {
            db.users = db.users.map((user) => {
              if (user.id === data.id) {
                return {
                  ...user,
                  ...data,
                }
              }

              return user;
            });

            return db.users.find(({ id }) => id === data.id);
          }
          default:
        }
        break;

      default:
    }
  })();

  // console.log('[RESPONSE]', method, url, data, res);

  return res;
};

// @ts-ignore
window.db = db;

export default API;
