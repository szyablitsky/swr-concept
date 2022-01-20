import API from 'API';
import Message from 'components/pages/Messages/Message';
import useSubscription from 'hooks/useSubscription';
import EE from 'lib/eventEmitter';
import React, { useEffect, useState } from "react";

import { useLoadMessages } from 'hooks/api/messages';
import useCurrentAuth from 'hooks/useCurrentAuth';

import Text from "components/uikit/Text";

import { ChatType } from "types/api/chat";

import "./Chat.css";
import { MessageType } from 'types/api/message';

interface IProps {
  chat: ChatType;
}

export default function Chat({ chat }: IProps) {
  const { user } = useCurrentAuth();
  const { messages, isLoading, mutate } = useLoadMessages({ chatId: chat.id });
  const from = chat.members.find((member) => member.id !== user.id);
  const [inputValue, setInputValue] = useState<string>('');

  useSubscription('notificationsUpdated', mutate);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  }
  const handleSendMessage = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const message = {
      id: Math.random() * 100,
      chatId: chat.id,
      from: user,
      text: inputValue,
    };

    API('POST', '/api/messages', message);
    mutate([...(messages || []), message]);
    setInputValue('');
  }
  const handleReceiveRandomMessage = () => {
    API('POST', '/api/messages', {
      id: Math.random() * 100,
      chatId: chat.id,
      from: from,
      text: Math.random() * 100,
    });
  }

  const handleMountMessage = async (message: MessageType) => {
    const outgoing = message.from.id === user.id;

    if (message.readAt || outgoing) return;

    await API('PATCH', '/api/messages', {
      id: message.id,
      readAt: new Date(),
    });

    // mutate((messages = []) => {
    //   return messages.map((message) => {
    //     if (updatedMessage.id === message.id) return updatedMessage;
    //     return message;
    //   });
    // }, false)
    mutate()
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
            <form onSubmit={handleSendMessage} className="message-form">
              <input className="message-form__input" type="text" value={inputValue} onChange={handleInputChange} />
              <input className="message-form__button" type="submit" value="Send message" />
            </form>

            <div style={{ marginTop: 20 }}>
              <button onClick={handleReceiveRandomMessage}>Receive random message</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
