import React, { useContext } from "react";

import API from 'lib/API';

import useCurrentAuth from 'hooks/useCurrentAuth';

import ActiveChatContext from 'contexts/ActiveChatContext';

import Badge from 'components/atoms/Badge';

import { ChatType } from "types/api/chat";
import { UserType } from 'types/api/user';

import "./ChatList.css";

interface IProps {
  chats: ChatType[] | void;
  setActiveChat: (chat: ChatType) => void;
}

export default function ChatList({ chats, setActiveChat }: IProps) {
  const { user } = useCurrentAuth();
  const { activeChat } = useContext(ActiveChatContext);

  const handleReceiveRandomMessage = (chat: ChatType, from: UserType) => {
    API('POST', '/api/messages', {
      id: Math.random() * 100,
      chatId: chat.id,
      from: from,
      text: Math.ceil(Math.random() * 1000),
    });
  }

  return (
    <>
      {chats ? chats.map((chat) => {
        const from = chat.members.find((member) => member.id !== user.id);

        if (!from) return null;

        return (
          <React.Fragment key={chat.id}>
            <button className={`chat-list__item ${chat.id === activeChat?.id ? 'chat-list__item_active' : ''}`} onClick={() => setActiveChat(chat)}>
              {from.name} {chat.unreadMessageCount ? <Badge>{chat.unreadMessageCount}</Badge> : null}
            </button>

            <a href="#" onClick={() => handleReceiveRandomMessage(chat, from)} style={{ position: 'absolute', fontSize: '11px', marginTop: '-28px' }}>
              Message from {from.name}
            </a>
          </React.Fragment>
        )
      }) : 'Loading...'}
    </>
  );
}
