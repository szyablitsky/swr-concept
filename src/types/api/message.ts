import { UserType } from 'types/api/user';

export type MessageType = {
  id: number,
  from: UserType,
  text: string,
  readAt: Date | null,
  createdAt: Date,
}
