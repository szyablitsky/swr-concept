import { ChatType } from 'types/api/chat';

type ChatNotificationType = {
  type: 'newMessage',
  chat: ChatType,
  messageCount: number,
}

export type NotificationType = ChatNotificationType; // | SomethingElseNotificationType | OneMoreNotificationType
