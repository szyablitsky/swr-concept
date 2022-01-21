// @ts-ignore
import debounce from 'debounce';
import EE from 'lib/eventEmitter';
import qs from "query-string";

export const db = {
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
      id: 7,
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
    {
      id: 3,
      members: [1, 2],
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
      text: 'To be, or not to be...',
      readAt: new Date(),
      createdAt: new Date(),
    },
    {
      id: 3,
      chatId: 2,
      from: 1,
      text: 'That is the question...',
      readAt: null,
      createdAt: new Date(),
    },
    {
      id: 4,
      chatId: 3,
      from: 2,
      text: 'Hi! 👋',
      readAt: null,
      createdAt: new Date(),
    },
    {
      id: 5,
      chatId: 3,
      from: 2,
      text: 'What\'s up?',
      readAt: null,
      createdAt: new Date(),
    },
  ],
};

let currentUser: any = null;

const getUsers = (role: any, includes: any, q: any) => {
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
        } : { policy: undefined }),
      }
    });
};

const getMessages = (chatId: any) => {
  return db.messages
    .filter((message) => message.chatId === Number(chatId))
    .map((message) => ({
      ...message,
      from: db.users.find((user) => user.id === message.from),
    }));
};

const unread = (message: any) => !message.readAt && message.from?.id !== currentUser.id;

const getChats = (memberIds: any) => {
  return db.chats
    .filter((chat) => {
      if (!memberIds) return true;

      return memberIds.map(Number).every((id: any) => chat.members.includes(id));
    })
    .map((chat) => {
      return {
        ...chat,
        members: chat.members.map((id) => db.users.find((user) => user.id === Number(id))),
        unreadMessageCount: getMessages(chat.id).filter(unread).length,
      }
    });
};

const getNotifications = () => {
  if (!currentUser) return [];

  return getChats([currentUser.id])
    .map((chat) => ({
      type: 'newMessages',
      chat,
      messages: getMessages(chat.id).filter(unread),
    }))
    .filter(({ messages }) => messages.length > 0);
};

let previousNotificationsStr = '';

const notificationsToStr = (notifications: any) => {
  return notifications.map((n: any) => `${n.chat.id}:${n.chat.unreadMessageCount}`).sort().join(',');
}

const updateNotifications = debounce(() => {
  const notifications = getNotifications();
  const notificationsStr = notificationsToStr(notifications);

  if (previousNotificationsStr !== notificationsStr) {
    previousNotificationsStr = notificationsStr;
    console.log('%c[EVENT] ', 'color: yellow;', 'notificationsUpdated')
    EE.emit('notificationsUpdated', notifications);
  }
}, 300);


const API = async (method: string, url: string, data?: any): Promise<any> => {
  console.log('%c[API] ', 'color: green;', method, url, data);

  await new Promise((res) => setTimeout(res, 500));

  const [path, queryString] = url.split("?");
  const query = qs.parse(queryString);

  const response = (() => {
    switch (method) {
      case "GET":
        switch (path) {
          case '/api/auth': {
            return { user: currentUser };
          }
          case '/api/users': {
            const { role, q } = query;
            const includes = query.includes ? Array.isArray(query.includes) ? query.includes : [query.includes] : null;

            return getUsers(role, includes, q);
          }
          case '/api/chats': {
            const memberIds = query.memberIds ? Array.isArray(query.memberIds) ? query.memberIds : [query.memberIds] : null;

            return getChats(memberIds);
          }
          case '/api/notifications': {
            return getNotifications();
          }
          case '/api/messages': {
            const { chatId } = query;

            return getMessages(chatId);
          }
          default:
        }
        break;

      case "POST":
        switch (path) {
          case '/api/auth': {
            const { role } = data;

            currentUser = db.users.find((user) => user.role === role) || null;

            previousNotificationsStr = notificationsToStr(getNotifications());

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

            return {
              ...newMessage,
              from: db.users.find((user) => user.id === data.from.id),
            };
          }
          default:
        }
        break;

      case "PATCH":
        switch (path) {
          case '/api/messages': {
            db.messages = db.messages.map((message) => {
              if (message.id === data.id) return { ...message, ...data };

              return message;
            });

            updateNotifications();

            return db.messages.find(({ id }) => id === data.id);
          }
          case '/api/users': {
            db.users = db.users.map((user) => {
              if (user.id === data.id) return { ...user, ...data };

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

  return response;
};

// @ts-ignore
window.db = db;

export default API;
