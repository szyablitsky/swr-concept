import React, { useState } from "react";
import { KeyedMutator } from 'swr';

import API from 'lib/API';

import useCurrentAuth from 'hooks/useCurrentAuth';

import { ChatType } from "types/api/chat";
import { MessageType } from 'types/api/message';

import "./SendMessageForm.css";

interface IProps {
  chat: ChatType;
  mutate: KeyedMutator<Partial<MessageType>[]>;
}

export default function SendMessageForm({ chat, mutate }: IProps) {
  const { user } = useCurrentAuth();
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  }

  const handleSendMessage = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const newMessage = {
      id: Math.random() * 100,
      chatId: chat.id,
      from: user,
      text: inputValue,
    };

    mutate((messages) => [...(messages || []), newMessage], false);
    setInputValue('');

    const postedMessage = await API('POST', '/api/messages', newMessage);

    mutate((messages) => (messages || []).map((message) => {
      if (message.id === newMessage.id) {
        console.log('newMessage', newMessage);
        console.log('postedMessage', postedMessage);
      }
      return message.id === newMessage.id ? postedMessage : message;
    }), false);
  }

  return (
    <form onSubmit={handleSendMessage} className="message-form">
      <input className="message-form__input" type="text" value={inputValue} onChange={handleInputChange} />
      <input className="message-form__button" type="submit" value="Send message" />
    </form>
  );
}
