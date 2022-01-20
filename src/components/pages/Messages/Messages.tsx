import Badge from 'components/uikit/Badge';
import { useLoadChats } from 'hooks/api/chats';
import Layout from "components/shared/Layout";
import Text from "components/uikit/Text";
import useCurrentAuth from 'hooks/useCurrentAuth';
import useSubscription from 'hooks/useSubscription';
import React, { useEffect, useState } from 'react';
import { ChatType } from 'types/api/chat';
import './Messages.css';

import Chat from './Chat';

export default function MessagesPage() {
  const { user } = useCurrentAuth();
  const { chats, mutate } = useLoadChats({ memberIds: [user.id] });
  const [activeChat, setActiveChat] = useState<ChatType | null>(null);

  useSubscription('notificationsUpdated', mutate);

  useEffect(() => {
    if (!activeChat && chats?.[0]) setActiveChat(chats[0]);
  }, [activeChat, chats]);

  return (
    <Layout>
      <Text tag="h1">Chats</Text>

      <div className="messages-page">
        <div className="messages-page__list">
          {chats ? chats.map((chat, i) => {
            const from = chat.members.find((member) => member.id !== user.id);

            return (
              <button className="messages-page__list-item" onClick={() => setActiveChat(chat)} key={chat.id}>
                {from?.name} {chat.unreadMessageCount ? <Badge>{chat.unreadMessageCount}</Badge> : null}
              </button>
            )
          }) : 'Loading...'}
        </div>

        <div className="messages-page__chat">
          {activeChat && <Chat chat={activeChat} />}
        </div>
      </div>
    </Layout>
  );
}
