import React from "react";
import { ChatType } from 'types/api/chat';

const ActiveChatContext = React.createContext<{
  activeChat: ChatType | null,
}>({
  activeChat: null,
});

export default ActiveChatContext;
