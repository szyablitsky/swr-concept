import React, { useCallback } from "react";
import API from 'lib/API';
import Message from 'components/molecules/Message';
import useSubscription from 'hooks/useSubscription';

import { useLoadMessages } from 'hooks/api/messages';
import useCurrentAuth from 'hooks/useCurrentAuth';

import Text from "components/atoms/Text";
import SendMessageForm from 'components/organisms/SendMessageForm';

import { ChatType } from "types/api/chat";
import { MessageType } from 'types/api/message';
import { NotificationType } from 'types/api/notification';

import "./Chat.css";

interface IProps {
  chat: ChatType;
}

export default function Chat({ chat }: IProps) {
  const { user } = useCurrentAuth();
  const { messages, isLoading, mutate } = useLoadMessages({ chatId: chat.id });
  const from = chat.members.find((member) => member.id !== user.id);

  const eventHandler = useCallback((notifications: NotificationType[]) => {
    const currentChatNotification = notifications.find(({ chat: { id } }) => id === chat.id);

    if (!currentChatNotification) return;

    mutate((messages) => {
      return [...(messages || []), ...currentChatNotification.messages];
    }, false);
  }, [chat.id, mutate]);

  useSubscription('notificationsUpdated', eventHandler);

  const handleMountMessage = async (message: MessageType) => {
    const outgoing = message.from.id === user.id;

    if (message.readAt || outgoing) return;

    const updatedMessage = await API('PATCH', '/api/messages', {
      id: message.id,
      readAt: new Date(),
    });

    mutate((messages = []) => {
      return messages.map((message) => {
        if (updatedMessage.id === message.id) return updatedMessage;
        return message;
      });
    }, false)
  }

  return (
    <div className="chat">
      <Text>
        Messages from: <strong>{from?.name}</strong>
        <i>{!messages && isLoading ? ' loading...' : isLoading ? ' updating...' : null}</i>
      </Text>

      {messages && (
        <>
          <div className="message-list">
            {messages.map((message) => {
              const outgoing = message.from.id === user.id;

              return (
                <div className={`message-list__item ${outgoing ? 'message-list__item_outgoing' : ''}`} key={message.id}>
                  <Message message={message} outgoing={outgoing} onMount={handleMountMessage} />
                </div>
              );
            })}
          </div>

          <div className="chat__form">
            <SendMessageForm chat={chat} mutate={mutate} />
          </div>
        </>
      )}
    </div>
  );
}
