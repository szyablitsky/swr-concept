import React, { useEffect, useState, useCallback } from 'react';

import { useLoadChats } from 'hooks/api/chats';
import useCurrentAuth from 'hooks/useCurrentAuth';
import useSubscription from 'hooks/useSubscription';

import ActiveChatContext from 'contexts/ActiveChatContext';

import Text from "components/atoms/Text";
import Layout from "components/organisms/Layout";
import ChatList from 'components/organisms/ChatList';
import Chat from 'components/organisms/Chat';

import { NotificationType } from 'types/api/notification';
import { ChatType } from 'types/api/chat';

import './Messages.css';

export default function MessagesPage() {
  const { user } = useCurrentAuth();
  const { chats, mutate } = useLoadChats({ memberIds: [user.id] });
  const [activeChat, setActiveChat] = useState<ChatType | null>(null);

  useEffect(() => {
    if (!activeChat && chats?.[0]) setActiveChat(chats[0]);
  }, [activeChat, chats]);

  const eventHandler = useCallback((notifications: NotificationType[]) => {
    mutate((chats) => (chats || []).map((chat) => {
      const notification = notifications.find(({ chat: { id } }) => id === chat.id);

      return notification && activeChat?.id !== notification.chat.id ? notification.chat : { ...chat, unreadMessageCount: 0 };
    }), false);
  }, [activeChat, mutate]);

  useSubscription('notificationsUpdated', eventHandler);

  return (
    <ActiveChatContext.Provider value={{ activeChat }}>
      <Layout>
        <Text tag="h1">Chats</Text>

        <div className="messages-page">
          <div className="messages-page__list">
            <ChatList chats={chats} setActiveChat={setActiveChat} />
          </div>

          <div className="messages-page__chat">
            {activeChat && <Chat chat={activeChat} />}
          </div>
        </div>
      </Layout>
    </ActiveChatContext.Provider>
  );
}
