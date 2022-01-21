import { ChatType } from 'types/api/chat';
import { MessageType } from 'types/api/message';

type ChatNotificationType = {
  type: 'newMessages',
  chat: ChatType,
  messages: MessageType[],
}

export type NotificationType = ChatNotificationType; // | SomethingElseNotificationType | OneMoreNotificationType
