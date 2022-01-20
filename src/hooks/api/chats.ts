import qs from "query-string";
import useSWR, { KeyedMutator } from "swr";
import { ChatType } from 'types/api/chat';
import API from "API";

type UseLoadChatsType = (params: {
  memberIds: number[],
}) => {
  chats: ChatType[] | undefined,
  mutate: KeyedMutator<Partial<ChatType>[]>,
}

export const useLoadChats: UseLoadChatsType = (params) => {
  const { data, mutate } = useSWR(
    `/api/chats?${qs.stringify(params)}`,
    (url: string) => API("GET", url),
  );

  return {
    chats: data,
    mutate,
  };
};
