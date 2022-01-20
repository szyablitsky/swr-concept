import { UserType } from 'types/api/user';

export type ChatType = {
  id: number;
  members: UserType[];
  unreadMessageCount: number,
}
