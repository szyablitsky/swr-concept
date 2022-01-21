import React, { useEffect } from "react";

import { MessageType } from 'types/api/message';

import "./Message.css";

interface IProps {
  message: MessageType;
  outgoing: boolean;
  onMount: (message: MessageType) => void;
}

export default function Message({ message, outgoing, onMount }: IProps) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => onMount(message),[]);

  return (
    <div className={`message ${outgoing ? 'message_outgoing' : ''}`}>
      {message.text}

      <div className="message_status">
        <strong>sent {message.createdAt && '✓'}</strong>{' '}
        {message.readAt && <strong>read ✓</strong>}
      </div>
    </div>
  );
}
